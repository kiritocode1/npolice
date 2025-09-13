import { SearchItem } from "@/data/searchData";

// Dynamic import to avoid SSR issues
let pipeline: any = null;

// Global variables for caching
let extractor: any = null;
let documentEmbeddings: number[][] = [];
let documents: SearchItem[] = [];
let isSemanticSearchAvailable = true;

// Initialize the embedding pipeline
export async function initializeSemanticSearch(searchData: SearchItem[]) {
	if (extractor && documents.length === searchData.length) {
		return; // Already initialized
	}

	// Check if we're in browser environment
	if (typeof window === "undefined") {
		throw new Error("Semantic search only works in browser environment");
	}

	try {
		// Dynamic import to avoid SSR issues
		if (!pipeline) {
			// Try to load transformers with a timeout
			const transformersPromise = import("@xenova/transformers");
			const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Transformers load timeout")), 10000));

			const transformers = (await Promise.race([transformersPromise, timeoutPromise])) as any;

			if (!transformers || !transformers.pipeline) {
				throw new Error("Failed to load transformers module");
			}
			pipeline = transformers.pipeline;
		}

		// Create embedding pipeline
		extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

		// Prepare documents for embedding
		documents = searchData;
		const documentTexts = documents.map((doc) => `${doc.title} ${doc.description} ${doc.category} ${doc.keywords.join(" ")}`);

		// Generate embeddings for all documents
		documentEmbeddings = await Promise.all(documentTexts.map((text) => extractor(text, { pooling: "mean", normalize: true })));
	} catch (error) {
		console.error("Failed to initialize semantic search:", error);
		isSemanticSearchAvailable = false;
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

// Enhanced text search function with natural language support
function textSearch(query: string, searchData: SearchItem[]): SearchItem[] {
	const searchTerm = query.toLowerCase();

	// Natural language synonyms and patterns
	const synonyms: { [key: string]: string[] } = {
		help: ["support", "assist", "aid", "service", "complaint", "emergency", "contact"],
		me: ["my", "myself", "personal"],
		need: ["want", "require", "looking for", "seeking"],
		find: ["search", "locate", "get", "access"],
		how: ["way", "method", "process", "procedure"],
		where: ["location", "place", "address"],
		when: ["time", "schedule", "hours"],
		what: ["information", "details", "about"],
		file: ["submit", "report", "register", "complaint"],
		check: ["status", "verify", "lookup", "track"],
		police: ["officer", "cop", "law enforcement", "authority"],
		emergency: ["urgent", "crisis", "help", "danger"],
		contact: ["phone", "call", "reach", "get in touch"],
		officer: ["police", "cop", "authority", "senior"],
		complaint: ["grievance", "issue", "problem", "concern"],
		status: ["progress", "update", "check", "tracking"],
		service: ["help", "support", "assistance", "aid"],
	};

	// Expand query with synonyms
	const expandQuery = (term: string): string[] => {
		const words = term.split(" ").filter((w) => w.length > 1);
		const expanded = [...words];

		words.forEach((word) => {
			if (synonyms[word]) {
				expanded.push(...synonyms[word]);
			}
		});

		return [...new Set(expanded)]; // Remove duplicates
	};

	const expandedTerms = expandQuery(searchTerm);

	return searchData
		.map((item: SearchItem) => {
			let score = 0;
			const title = item.title.toLowerCase();
			const description = item.description.toLowerCase();
			const category = item.category.toLowerCase();
			const keywords = item.keywords.map((k) => k.toLowerCase());
			const allText = `${title} ${description} ${category} ${keywords.join(" ")}`;

			// Exact title match gets highest score
			if (title === searchTerm) score += 100;
			else if (title.includes(searchTerm)) score += 50;

			// Check each expanded term
			expandedTerms.forEach((term) => {
				// Title matches
				if (title.includes(term)) {
					score += term === searchTerm ? 50 : 30;
				}

				// Description matches
				if (description.includes(term)) {
					score += term === searchTerm ? 30 : 20;
				}

				// Category matches
				if (category.includes(term)) {
					score += term === searchTerm ? 20 : 15;
				}

				// Keywords matches
				const keywordMatches = keywords.filter((k) => k.includes(term)).length;
				score += keywordMatches * (term === searchTerm ? 10 : 8);
			});

			// Natural language patterns
			if (searchTerm.includes("help") || searchTerm.includes("support")) {
				if (category === "services" || category === "contact") score += 25;
				if (keywords.some((k) => ["complaint", "emergency", "contact"].includes(k))) score += 20;
			}

			if (searchTerm.includes("emergency") || searchTerm.includes("urgent")) {
				if (keywords.some((k) => ["emergency", "urgent", "contact"].includes(k))) score += 30;
			}

			if (searchTerm.includes("officer") || searchTerm.includes("police")) {
				if (keywords.some((k) => ["officer", "police", "senior", "leadership"].includes(k))) score += 25;
			}

			if (searchTerm.includes("file") || searchTerm.includes("submit")) {
				if (keywords.some((k) => ["complaint", "file", "submit"].includes(k))) score += 25;
			}

			if (searchTerm.includes("check") || searchTerm.includes("status")) {
				if (keywords.some((k) => ["status", "check", "fir"].includes(k))) score += 25;
			}

			// Partial word matches with higher weight for meaningful words
			const queryWords = searchTerm.split(" ").filter((w) => w.length > 2);
			queryWords.forEach((word) => {
				if (title.includes(word)) score += 5;
				if (description.includes(word)) score += 3;
				if (keywords.some((k) => k.includes(word))) score += 2;
			});

			// Boost score for items that match multiple terms
			const matchingTerms = expandedTerms.filter((term) => allText.includes(term)).length;
			if (matchingTerms > 1) {
				score += matchingTerms * 5;
			}

			return { item, score };
		})
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 10)
		.map((result) => result.item);
}

// Semantic search function
export async function semanticSearch(query: string, searchData: SearchItem[]): Promise<SearchItem[]> {
	if (!query.trim() || !isSemanticSearchAvailable) return [];

	try {
		if (!extractor || documentEmbeddings.length === 0) {
			await initializeSemanticSearch(searchData);
		}

		// Generate query embedding
		const queryEmbedding = await extractor(query, { pooling: "mean", normalize: true });

		// Calculate similarities
		const similarities = documentEmbeddings.map((docEmb) => cosineSimilarity(queryEmbedding.data, docEmb));

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

		return results;
	} catch (error) {
		console.error("Semantic search failed:", error);
		isSemanticSearchAvailable = false;
		return [];
	}
}

// Hybrid search combining semantic and text search
export async function hybridSearch(query: string, searchData: SearchItem[]): Promise<SearchItem[]> {
	// For now, use enhanced text search only due to transformers module issues
	// This provides better results than basic text search
	return textSearch(query, searchData);
}
