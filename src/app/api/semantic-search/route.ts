import { getSearchData } from "@/data/searchData";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client (server-side only)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // Server-side env var
});

// Cache for embeddings with 1-hour expiry
interface CachedEmbedding {
	embedding: number[];
	timestamp: number;
}

interface CachedSimilarity {
	similarities: number[];
	timestamp: number;
}

const embeddingCache = new Map<string, CachedEmbedding>();
const similarityCache = new Map<string, CachedSimilarity>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Global variables for caching
let documentEmbeddings: number[][] = [];
let documents: any[] = [];

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

// Initialize embeddings
async function initializeEmbeddings(searchData: any[]): Promise<void> {
	if (documentEmbeddings.length === searchData.length && documents.length === searchData.length) {
		return; // Already initialized
	}

	try {
		documents = searchData;
		const documentTexts = documents.map((doc) => `${doc.title} ${doc.description} ${doc.category} ${doc.keywords.join(" ")}`);

		// Generate embeddings for all documents
		documentEmbeddings = await Promise.all(documentTexts.map((text) => generateEmbedding(text)));

		console.log("🔍 Server: Embeddings initialized", {
			documentCount: documents.length,
			embeddingCount: documentEmbeddings.length,
		});
	} catch (error) {
		console.error("Failed to initialize embeddings:", error);
		throw error;
	}
}

export async function POST(request: NextRequest) {
	try {
		const { query } = await request.json();

		if (!query || typeof query !== "string") {
			return NextResponse.json({ error: "Query is required" }, { status: 400 });
		}

		// Get search data and strip React components for serialization
		const rawSearchData = getSearchData((key: string) => key);
		const searchData = rawSearchData.map((item) => ({
			...item,
			icon: null, // Remove React components for server processing
		}));

		// Initialize embeddings if needed
		await initializeEmbeddings(searchData);

		// Generate query embedding
		const queryEmbedding = await generateEmbedding(query);

		// Check similarity cache first
		const similarityCacheKey = `${query.toLowerCase().trim()}_${documentEmbeddings.length}`;
		const cachedSimilarity = similarityCache.get(similarityCacheKey);

		let similarities: number[];
		if (cachedSimilarity && Date.now() - cachedSimilarity.timestamp < CACHE_DURATION) {
			similarities = cachedSimilarity.similarities;
			console.log("🔍 Server: Using cached similarities for query:", query);
		} else {
			// Calculate similarities
			similarities = documentEmbeddings.map((docEmb) => cosineSimilarity(queryEmbedding, docEmb));

			// Cache the similarities
			similarityCache.set(similarityCacheKey, {
				similarities,
				timestamp: Date.now(),
			});

			console.log("🔍 Server: Calculated new similarities for query:", query);
		}

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

		console.log("🔍 Server: Semantic search results:", {
			query,
			resultCount: results.length,
			topResults: results.slice(0, 3).map((r: any) => ({ title: r.title, score: similarities[documents.indexOf(r)] })),
		});

		return NextResponse.json({ results });
	} catch (error) {
		console.error("Semantic search API error:", error);
		return NextResponse.json({ error: "Semantic search failed" }, { status: 500 });
	}
}
