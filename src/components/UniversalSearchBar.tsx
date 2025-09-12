"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronRight, CornerRightUp, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "../hooks/use-auto-resize-textarea";
// Import search data
import { getSearchData, SearchItem } from "../data/searchData";

const UniversalSearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchItem[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const { t, language } = useLanguage();
	const resultsRef = useRef<HTMLDivElement>(null);

	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight: 52,
		maxHeight: 200,
	});

	// Optimized search data with memoization
	const searchData = useMemo(() => getSearchData(t), [t]);

	// Search function
	const performSearch = (searchQuery: string) => {
		if (!searchQuery.trim()) {
			setResults([]);
			return;
		}

		const filteredResults = searchData.filter((item: SearchItem) => {
			const searchTerm = searchQuery.toLowerCase();
			return (
				item.title.toLowerCase().includes(searchTerm) ||
				item.description.toLowerCase().includes(searchTerm) ||
				item.keywords.some((keyword: string) => keyword.toLowerCase().includes(searchTerm)) ||
				item.category.toLowerCase().includes(searchTerm)
			);
		});

		setResults(filteredResults.slice(0, 10)); // Limit to 10 results
		setSelectedIndex(0);
	};

	// Debounced search
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			performSearch(query);
		}, 150);

		return () => clearTimeout(timeoutId);
	}, [query, searchData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setQuery(value);
		adjustHeight();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen || results.length === 0) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((prev) => (prev + 1) % results.length);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
				break;
			case "Enter":
				e.preventDefault();
				if (results[selectedIndex]) {
					window.location.href = results[selectedIndex].href;
				}
				break;
			case "Escape":
				setIsOpen(false);
				setQuery("");
				setResults([]);
				break;
		}
	};

	const handleSearch = () => {
		if (results[selectedIndex]) {
			window.location.href = results[selectedIndex].href;
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Scroll selected item into view
	useEffect(() => {
		if (resultsRef.current && selectedIndex >= 0) {
			const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
			if (selectedElement) {
				selectedElement.scrollIntoView({ block: "nearest" });
			}
		}
	}, [selectedIndex]);

	return (
		<div
			className="relative w-full max-w-3xl mx-auto min-w-0 sm:min-w-[400px] p-2 sm:p-4"
			ref={resultsRef}
		>
			{/* Search Input */}
			<div className="w-full py-2 sm:py-4">
				<div className="relative max-w-xl w-full mx-auto">
					<Textarea
						placeholder={language === "mr" ? "सर्व सेवा शोधा..." : "Search all services..."}
						className={cn(
							"w-full max-w-xl bg-black/5 dark:bg-white/5 rounded-3xl pl-4 sm:pl-6 pr-12 sm:pr-16",
							"placeholder:text-black/50 dark:placeholder:text-white/50",
							"border-none ring-black/20 dark:ring-white/20",
							"text-black dark:text-white text-wrap",
							"overflow-y-auto resize-none",
							"focus-visible:ring-0 focus-visible:ring-offset-0",
							"transition-[height] duration-100 ease-out",
							"leading-[1.2] py-3 sm:py-[16px]",
							"min-h-[48px] sm:min-h-[52px]",
							"max-h-[200px]",
							"text-sm sm:text-base",
							"[&::-webkit-resizer]:hidden",
						)}
						ref={textareaRef}
						value={query}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsOpen(true)}
					/>
					<div
						className={cn(
							"absolute top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1 transition-all duration-200",
							query ? "right-8 sm:right-10" : "right-2 sm:right-3",
						)}
					>
						<Mic className="w-3 h-3 sm:w-4 sm:h-4 text-black/70 dark:text-white/70" />
					</div>

					<button
						onClick={handleSearch}
						type="button"
						className={cn(
							"absolute top-1/2 -translate-y-1/2 right-2 sm:right-3",
							"rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1",
							"transition-all duration-200",
							query ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
						)}
					>
						<CornerRightUp className="w-3 h-3 sm:w-4 sm:h-4 text-black/70 dark:text-white/70" />
					</button>
				</div>
			</div>

			{/* Search Results */}
			{isOpen && (query || results.length > 0) && (
				<div className="absolute top-full left-2 right-2 sm:left-4 sm:right-4 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl z-50 max-h-80 sm:max-h-96 overflow-y-auto">
					{results.length === 0 && query ? (
						<div className="p-4 text-center text-muted-foreground">{language === "mr" ? "कोणतेही परिणाम सापडले नाहीत" : "No results found"}</div>
					) : (
						<div className="py-2">
							{results.map((item, index) => (
								<Link
									key={item.id}
									href={item.href}
									data-index={index}
									className={cn("flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 hover:bg-muted/50 transition-colors", index === selectedIndex && "bg-muted/50")}
									onClick={() => {
										setIsOpen(false);
										setQuery("");
										setResults([]);
									}}
								>
									<div className="flex-shrink-0 text-muted-foreground">{item.icon}</div>
									<div className="flex-1 min-w-0">
										<div className="font-medium text-foreground truncate text-sm sm:text-base">{item.title}</div>
										<div className="text-xs sm:text-sm text-muted-foreground truncate">{item.description}</div>
										<div className="text-xs text-muted-foreground/70 mt-1">{item.category}</div>
									</div>
									<div className="flex-shrink-0 text-muted-foreground">
										<ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default UniversalSearchBar;
