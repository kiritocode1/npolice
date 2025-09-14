import { SearchItem } from "@/data/searchData";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true, // Only for client-side usage
});

// Cache for embeddings with 1-hour expiry
interface CachedEmbedding {
	embedding: number[];
	timestamp: number;
}

// Cache for similarity calculations with 1-hour expiry
interface CachedSimilarity {
	similarities: number[];
	timestamp: number;
}

const embeddingCache = new Map<string, CachedEmbedding>();
const similarityCache = new Map<string, CachedSimilarity>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Generate embedding using OpenAI
async function generateEmbedding(text: string): Promise<number[]> {
	// Check cache first
	const cacheKey = text.toLowerCase().trim();
	const cached = embeddingCache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.embedding;
	}

	try {
		const response = await openai.embeddings.create({
			model: "text-embedding-ada-002",
			input: text,
		});

		const embedding = response.data[0].embedding;

		// Cache the result
		embeddingCache.set(cacheKey, {
			embedding,
			timestamp: Date.now(),
		});

		return embedding;
	} catch (error) {
		console.error("OpenAI embedding generation failed:", error);
		throw error;
	}
}

// Cosine similarity function
function cosineSimilarity(a: number[], b: number[]): number {
	if (a.length !== b.length) return 0;

	let dotProduct = 0;
	let normA = 0;
	let normB = 0;

	for (let i = 0; i < a.length; i++) {
		dotProduct += a[i] * b[i];
		normA += a[i] * a[i];
		normB += b[i] * b[i];
	}

	if (normA === 0 || normB === 0) return 0;

	return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Global variables for caching
let documentEmbeddings: number[][] = [];
let documents: SearchItem[] = [];
let isOpenAISearchAvailable = true;

// Initialize OpenAI search with document embeddings
export async function initializeOpenAISearch(searchData: SearchItem[]): Promise<void> {
	if (documentEmbeddings.length === searchData.length && documents.length === searchData.length) {
		return; // Already initialized
	}

	try {
		documents = searchData;
		const documentTexts = documents.map((doc) => `${doc.title} ${doc.description} ${doc.category} ${doc.keywords.join(" ")}`);

		// Generate embeddings for all documents
		documentEmbeddings = await Promise.all(documentTexts.map((text) => generateEmbedding(text)));

		console.log("🔍 OpenAI Embeddings Generated:", {
			documentCount: documents.length,
			embeddingCount: documentEmbeddings.length,
			firstEmbedding: documentEmbeddings[0]?.slice(0, 5), // First 5 dimensions
			embeddingDimensions: documentEmbeddings[0]?.length,
			cacheSize: embeddingCache.size,
		});
	} catch (error) {
		console.error("Failed to initialize OpenAI search:", error);
		isOpenAISearchAvailable = false;
		throw error;
	}
}

// OpenAI-based semantic search
export async function openAISemanticSearch(query: string, searchData: SearchItem[]): Promise<SearchItem[]> {
	if (!query.trim() || !isOpenAISearchAvailable) return [];

	try {
		// Initialize if needed
		if (documentEmbeddings.length === 0) {
			await initializeOpenAISearch(searchData);
		}

		// Generate query embedding
		const queryEmbedding = await generateEmbedding(query);

		console.log("🔍 Query Embedding:", {
			query,
			embedding: queryEmbedding.slice(0, 5), // First 5 dimensions
			dimensions: queryEmbedding.length,
		});

		// Check similarity cache first
		const similarityCacheKey = `${query.toLowerCase().trim()}_${documentEmbeddings.length}`;
		const cachedSimilarity = similarityCache.get(similarityCacheKey);

		let similarities: number[];
		if (cachedSimilarity && Date.now() - cachedSimilarity.timestamp < CACHE_DURATION) {
			similarities = cachedSimilarity.similarities;
			console.log("🔍 Using cached similarities for query:", query);
		} else {
			// Calculate similarities
			similarities = documentEmbeddings.map((docEmb) => cosineSimilarity(queryEmbedding, docEmb));

			// Cache the similarities
			similarityCache.set(similarityCacheKey, {
				similarities,
				timestamp: Date.now(),
			});

			console.log("🔍 Calculated new similarities for query:", query);
		}

		console.log("🔍 Similarity Scores:", {
			query,
			similarities: similarities.slice(0, 5), // First 5 scores
			maxSimilarity: Math.max(...similarities),
			avgSimilarity: similarities.reduce((a, b) => a + b, 0) / similarities.length,
			cached: !!cachedSimilarity,
		});

		// Map to results with scores and sort
		const results = documents
			.map((doc, i) => ({
				doc,
				score: similarities[i],
			}))
			.filter((result) => result.score > 0.1) // Filter out very low similarity
			.sort((a, b) => b.score - a.score)
			.slice(0, 10) // Limit to 10 results
			.map((result) => result.doc);

		console.log("🔍 Search Results:", {
			query,
			resultCount: results.length,
			topResults: results.slice(0, 3).map((r) => ({ title: r.title, score: similarities[documents.indexOf(r)] })),
		});

		return results;
	} catch (error) {
		console.error("OpenAI semantic search failed:", error);
		isOpenAISearchAvailable = false;
		return [];
	}
}

// Clear cache (useful for testing or manual cache management)
export function clearEmbeddingCache(): void {
	embeddingCache.clear();
	similarityCache.clear();
}

// Get cache stats
export function getCacheStats(): {
	embeddingSize: number;
	similaritySize: number;
	embeddingKeys: string[];
	similarityKeys: string[];
} {
	return {
		embeddingSize: embeddingCache.size,
		similaritySize: similarityCache.size,
		embeddingKeys: Array.from(embeddingCache.keys()),
		similarityKeys: Array.from(similarityCache.keys()),
	};
}
