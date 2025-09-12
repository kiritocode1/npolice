"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight, Shield, Users, FileText, Phone, AlertTriangle, Info, Building, MapPin, UserCheck, ChevronRight, CornerRightUp, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface SearchItem {
	id: string;
	title: string;
	description: string;
	href: string;
	category: string;
	icon: React.ReactNode;
	keywords: string[];
}

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

	// Comprehensive search data based on your navigation structure
	const searchData: SearchItem[] = [
		// Home & Main Navigation
		{
			id: "home",
			title: t("nav.home"),
			description: "Main dashboard and homepage",
			href: "/",
			category: "Main",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["home", "dashboard", "main", "मुख्यपृष्ठ"],
		},
		{ id: "rti", title: "RTI", description: "Right to Information", href: "/rti", category: "Main", icon: <FileText className="h-4 w-4" />, keywords: ["rti", "information", "right", "अधिकार"] },
		{
			id: "dashboard",
			title: t("nav.home.dashboard"),
			description: "Police dashboard",
			href: "/dashboard",
			category: "Main",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["dashboard", "डॅशबोर्ड"],
		},

		// About Us Dropdown
		{
			id: "mission",
			title: t("nav.about.mission"),
			description: "Our mission and vision",
			href: "/mission",
			category: "About Us",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["mission", "vision", "ध्येय", "उद्देश"],
		},
		{
			id: "senior-officers",
			title: "Senior Officers",
			description: "Meet our senior police officers",
			href: "/senior-officers",
			category: "About Us",
			icon: <Users className="h-4 w-4" />,
			keywords: ["senior", "officers", "leadership", "वरिष्ठ", "अधिकारी"],
		},
		{
			id: "sp-till-date",
			title: "SP Till Date",
			description: "Superintendent of Police information",
			href: "/sp-till-date",
			category: "About Us",
			icon: <UserCheck className="h-4 w-4" />,
			keywords: ["sp", "superintendent", "अधीक्षक"],
		},
		{
			id: "org-structure",
			title: "Organizational Structure",
			description: "Police department structure",
			href: "/org-structure",
			category: "About Us",
			icon: <Building className="h-4 w-4" />,
			keywords: ["organization", "structure", "संस्था", "रचना"],
		},
		{
			id: "special-units",
			title: "Special Units",
			description: "Special police branches and units",
			href: "/special-units",
			category: "About Us",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["special", "units", "branches", "विशेष", "शाखा"],
		},
		{
			id: "jurisdiction-map",
			title: "Jurisdiction Map",
			description: "Police jurisdiction areas",
			href: "/jurisdiction-map",
			category: "About Us",
			icon: <MapPin className="h-4 w-4" />,
			keywords: ["jurisdiction", "map", "area", "क्षेत्र", "नकाशा"],
		},
		{
			id: "initiatives",
			title: "Initiatives",
			description: "Police department initiatives",
			href: "/initiatives",
			category: "About Us",
			icon: <Info className="h-4 w-4" />,
			keywords: ["initiatives", "programs", "पुढाकार", "कार्यक्रम"],
		},
		{
			id: "photo-gallery",
			title: "Photo Gallery",
			description: "Police department photos",
			href: "/gallery",
			category: "About Us",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["gallery", "photos", "images", "गॅलरी", "फोटो"],
		},
		{
			id: "station-incharge",
			title: "Police Station Incharge",
			description: "Station incharge information",
			href: "/station-incharge",
			category: "About Us",
			icon: <Building className="h-4 w-4" />,
			keywords: ["station", "incharge", "स्टेशन", "प्रभारी"],
		},
		{
			id: "important-contacts",
			title: "Important Contacts",
			description: "Key contact information",
			href: "/contacts",
			category: "About Us",
			icon: <Phone className="h-4 w-4" />,
			keywords: ["contacts", "phone", "संपर्क", "फोन"],
		},

		// Special Units Sub-items
		{
			id: "police-hq",
			title: "Police Headquarter",
			description: "Main police headquarters",
			href: "/police-hq",
			category: "Special Units",
			icon: <Building className="h-4 w-4" />,
			keywords: ["headquarters", "hq", "मुख्यालय"],
		},
		{
			id: "anti-terrorism",
			title: "Anti Terrorism Cell",
			description: "Counter-terrorism operations",
			href: "/anti-terrorism",
			category: "Special Units",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["terrorism", "anti-terror", "आतंकवाद", "विरोधी"],
		},
		{
			id: "women-help",
			title: "Women Help Cell",
			description: "Women safety and support",
			href: "/women-help",
			category: "Special Units",
			icon: <Users className="h-4 w-4" />,
			keywords: ["women", "help", "safety", "महिला", "सहायता"],
		},
		{
			id: "district-special",
			title: "District Special Branch",
			description: "District special operations",
			href: "/district-special",
			category: "Special Units",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["district", "special", "जिल्हा", "विशेष"],
		},
		{
			id: "crime-branch",
			title: "Crime Branch",
			description: "Criminal investigation unit",
			href: "/crime-branch",
			category: "Special Units",
			icon: <AlertTriangle className="h-4 w-4" />,
			keywords: ["crime", "investigation", "गुन्हा", "तपास"],
		},
		{
			id: "traffic-branch",
			title: "Traffic Branch",
			description: "Traffic management and control",
			href: "/traffic-branch",
			category: "Special Units",
			icon: <MapPin className="h-4 w-4" />,
			keywords: ["traffic", "vehicles", "वाहतूक", "वाहने"],
		},
		{
			id: "bdds",
			title: "BDDS",
			description: "Bomb Detection and Disposal Squad",
			href: "/bdds",
			category: "Special Units",
			icon: <AlertTriangle className="h-4 w-4" />,
			keywords: ["bdds", "bomb", "detection", "बॉम्ब", "शोध"],
		},
		{
			id: "cctns",
			title: "CCTNS",
			description: "Crime and Criminal Tracking Network",
			href: "/cctns",
			category: "Special Units",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["cctns", "tracking", "network", "जाळे", "मागोवा"],
		},
		{
			id: "anti-narcotics",
			title: "Anti Narcotics Cell",
			description: "Drug enforcement unit",
			href: "/anti-narcotics",
			category: "Special Units",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["narcotics", "drugs", "नशीबाजी", "औषधे"],
		},
		{
			id: "welfare-branch",
			title: "Police Welfare Branch",
			description: "Officer welfare services",
			href: "/welfare-branch",
			category: "Special Units",
			icon: <Users className="h-4 w-4" />,
			keywords: ["welfare", "officers", "कल्याण", "अधिकारी"],
		},
		{
			id: "human-trafficking",
			title: "Anti Human Trafficking",
			description: "Human trafficking prevention",
			href: "/human-trafficking",
			category: "Special Units",
			icon: <Users className="h-4 w-4" />,
			keywords: ["trafficking", "human", "मानव", "तस्करी"],
		},
		{
			id: "economic-offence",
			title: "Economic Offence Wing",
			description: "Financial crime investigation",
			href: "/economic-offence",
			category: "Special Units",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["economic", "financial", "crime", "आर्थिक", "गुन्हा"],
		},
		{
			id: "trial-monitoring",
			title: "Trial Monitoring",
			description: "Court case monitoring",
			href: "/trial-monitoring",
			category: "Special Units",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["trial", "monitoring", "court", "न्यायालय", "मॉनिटरिंग"],
		},
		{
			id: "motor-transport",
			title: "Motor Transport Branch",
			description: "Vehicle management",
			href: "/motor-transport",
			category: "Special Units",
			icon: <MapPin className="h-4 w-4" />,
			keywords: ["motor", "transport", "vehicles", "मोटर", "वाहतूक"],
		},
		{
			id: "wireless-branch",
			title: "Wireless Branch",
			description: "Communication systems",
			href: "/wireless-branch",
			category: "Special Units",
			icon: <Phone className="h-4 w-4" />,
			keywords: ["wireless", "communication", "संप्रेषण", "वायरलेस"],
		},

		// Report Us Dropdown
		{
			id: "online-complaint",
			title: "Online Complaint",
			description: "File complaints online",
			href: "/online-complaint",
			category: "Report Us",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["complaint", "online", "तक्रार", "ऑनलाइन"],
		},
		{
			id: "arms-license",
			title: "Arms License Form",
			description: "Apply for arms license",
			href: "/arms-license",
			category: "Report Us",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["arms", "license", "weapon", "शस्त्र", "परवाना"],
		},
		{
			id: "liquor-form",
			title: "Liquor Form",
			description: "Liquor license application",
			href: "/liquor-form",
			category: "Report Us",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["liquor", "alcohol", "दारू", "मद्य"],
		},
		{
			id: "petroleum-form",
			title: "Petroleum Form",
			description: "Petroleum license form",
			href: "/petroleum-form",
			category: "Report Us",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["petroleum", "fuel", "इंधन", "पेट्रोलियम"],
		},
		{
			id: "loudspeaker-form",
			title: "Loudspeaker Form",
			description: "Loudspeaker permission form",
			href: "/loudspeaker-form",
			category: "Report Us",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["loudspeaker", "sound", "ध्वनी", "लाऊडस्पीकर"],
		},
		{
			id: "paid-protection",
			title: "Paid Protection Service",
			description: "Hire security services",
			href: "/paid-protection",
			category: "Report Us",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["protection", "security", "paid", "सुरक्षा", "पैसे"],
		},
		{
			id: "industrial-complaint",
			title: "Industrial Complaint",
			description: "Industrial area complaints",
			href: "/industrial-complaint",
			category: "Report Us",
			icon: <Building className="h-4 w-4" />,
			keywords: ["industrial", "factory", "उद्योग", "कारखाना"],
		},
		{
			id: "tenant-info",
			title: "Tenant Information",
			description: "Tenant registration and info",
			href: "/tenant-info",
			category: "Report Us",
			icon: <Users className="h-4 w-4" />,
			keywords: ["tenant", "rent", "भाडेकरू", "किराया"],
		},
		{
			id: "block-mobile",
			title: "Block Stolen/Lost Mobile",
			description: "Block stolen mobile phones",
			href: "/block-mobile",
			category: "Report Us",
			icon: <Phone className="h-4 w-4" />,
			keywords: ["mobile", "stolen", "lost", "block", "मोबाइल", "चोरी"],
		},
		{
			id: "financial-fraud",
			title: "Financial Fraud",
			description: "Report financial fraud",
			href: "/financial-fraud",
			category: "Report Us",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["fraud", "financial", "scam", "घोटाळा", "आर्थिक"],
		},

		// Citizen Corner Dropdown
		{
			id: "citizen-wall",
			title: "Citizen Wall",
			description: "Citizen feedback and messages",
			href: "/citizen-wall",
			category: "Citizen Corner",
			icon: <Users className="h-4 w-4" />,
			keywords: ["citizen", "wall", "feedback", "नागरिक", "भिंत"],
		},
		{
			id: "recruitments",
			title: "Police Recruitments",
			description: "Job opportunities in police",
			href: "/recruitments",
			category: "Citizen Corner",
			icon: <Users className="h-4 w-4" />,
			keywords: ["recruitment", "jobs", "career", "भरती", "नोकरी"],
		},
		{
			id: "press-release",
			title: "Press Release",
			description: "Official press releases",
			href: "/press-release",
			category: "Citizen Corner",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["press", "release", "news", "प्रेस", "बातमी"],
		},
		{
			id: "accident-compensation",
			title: "Accident Compensation",
			description: "Accident compensation claims",
			href: "/accident-compensation",
			category: "Citizen Corner",
			icon: <AlertTriangle className="h-4 w-4" />,
			keywords: ["accident", "compensation", "claim", "अपघात", "नुकसानभरपाई"],
		},
		{
			id: "passport-status",
			title: "Passport Status",
			description: "Check passport application status",
			href: "/passport-status",
			category: "Citizen Corner",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["passport", "status", "application", "पासपोर्ट", "स्थिती"],
		},
		{
			id: "useful-websites",
			title: "Useful Websites",
			description: "Helpful government websites",
			href: "/useful-websites",
			category: "Citizen Corner",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["websites", "useful", "links", "वेबसाइट", "उपयुक्त"],
		},
		{
			id: "tenders",
			title: "Tenders",
			description: "Government tenders and contracts",
			href: "/tenders",
			category: "Citizen Corner",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["tenders", "contracts", "bids", "निविदा", "ठेके"],
		},
		{
			id: "faqs",
			title: "FAQs",
			description: "Frequently asked questions",
			href: "/faqs",
			category: "Citizen Corner",
			icon: <Info className="h-4 w-4" />,
			keywords: ["faq", "questions", "help", "प्रश्न", "मदत"],
		},

		// Police Corner Dropdown
		{
			id: "circular",
			title: "Circular",
			description: "Official circulars and orders",
			href: "/circular",
			category: "Police Corner",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["circular", "orders", "official", "परिपत्रक", "आदेश"],
		},
		{
			id: "welfare-activities",
			title: "Welfare Activities",
			description: "Police welfare programs",
			href: "/welfare-activities",
			category: "Police Corner",
			icon: <Users className="h-4 w-4" />,
			keywords: ["welfare", "activities", "programs", "कल्याण", "कार्यक्रम"],
		},
		{
			id: "crime-reviews",
			title: "Crime Reviews",
			description: "Crime analysis and reviews",
			href: "/crime-reviews",
			category: "Police Corner",
			icon: <AlertTriangle className="h-4 w-4" />,
			keywords: ["crime", "reviews", "analysis", "गुन्हा", "पुनरावलोकन"],
		},
		{
			id: "good-work",
			title: "Good Work",
			description: "Recognition of good police work",
			href: "/good-work",
			category: "Police Corner",
			icon: <Shield className="h-4 w-4" />,
			keywords: ["good", "work", "recognition", "चांगले", "काम"],
		},

		// Acts Dropdown
		{
			id: "public-service-act",
			title: "Public Service Act",
			description: "Public service regulations",
			href: "/public-service-act",
			category: "Acts",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["public", "service", "act", "सार्वजनिक", "सेवा"],
		},
		{
			id: "new-laws",
			title: "New Laws",
			description: "Recently enacted laws",
			href: "/new-laws",
			category: "Acts",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["new", "laws", "recent", "नवीन", "कायदे"],
		},
		{
			id: "mpa-act",
			title: "MPA Act",
			description: "Maharashtra Police Act",
			href: "/mpa-act",
			category: "Acts",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["mpa", "maharashtra", "police", "act", "महाराष्ट्र", "पोलिस"],
		},
		{
			id: "ndps-act",
			title: "NDPS Act",
			description: "Narcotic Drugs and Psychotropic Substances Act",
			href: "/ndps-act",
			category: "Acts",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["ndps", "narcotic", "drugs", "नशीबाजी", "औषधे"],
		},
		{
			id: "it-act",
			title: "IT Act",
			description: "Information Technology Act",
			href: "/it-act",
			category: "Acts",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["it", "technology", "cyber", "तंत्रज्ञान", "सायबर"],
		},
		{
			id: "atrocity-act",
			title: "Atrocity Act",
			description: "Prevention of Atrocities Act",
			href: "/atrocity-act",
			category: "Acts",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["atrocity", "prevention", "अत्याचार", "प्रतिबंध"],
		},
		{
			id: "mv-act",
			title: "MV Act",
			description: "Motor Vehicles Act",
			href: "/mv-act",
			category: "Acts",
			icon: <FileText className="h-4 w-4" />,
			keywords: ["mv", "motor", "vehicles", "वाहने", "मोटर"],
		},
	];

	// Search function
	const searchItems = (searchQuery: string) => {
		if (!searchQuery.trim()) {
			setResults([]);
			return;
		}

		const query = searchQuery.toLowerCase();
		const filtered = searchData.filter(
			(item) =>
				item.title.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query) ||
				item.category.toLowerCase().includes(query) ||
				item.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
		);

		setResults(filtered);
		setSelectedIndex(0);
	};

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setQuery(value);
		searchItems(value);
		adjustHeight();
	};

	// Handle search submission
	const handleSearch = () => {
		if (!query.trim()) return;
		if (results[selectedIndex]) {
			window.location.href = results[selectedIndex].href;
			setIsOpen(false);
			setQuery("");
			adjustHeight(true);
		}
	};

	// Handle key navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex((prev) => Math.max(prev - 1, 0));
				break;
			case "Enter":
				if (!e.shiftKey) {
					e.preventDefault();
					handleSearch();
				}
				break;
			case "Escape":
				setIsOpen(false);
				setQuery("");
				setResults([]);
				adjustHeight(true);
				break;
		}
	};

	// Handle click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Focus input when opened
	useEffect(() => {
		if (isOpen && textareaRef.current) {
			textareaRef.current.focus();
		}
	}, [isOpen]);

	return (
		<div
			className="relative w-full max-w-3xl mx-auto min-w-[400px] p-4"
			ref={resultsRef}
		>
			{/* Search Input */}
			<div className="w-full py-4">
				<div className="relative max-w-xl w-full mx-auto">
					<Textarea
						placeholder={language === "mr" ? "सर्व सेवा शोधा..." : "Search all services..."}
						className={cn(
							"max-w-xl bg-black/5 dark:bg-white/5 rounded-3xl pl-6 pr-16",
							"placeholder:text-black/50 dark:placeholder:text-white/50",
							"border-none ring-black/20 dark:ring-white/20",
							"text-black dark:text-white text-wrap",
							"overflow-y-auto resize-none",
							"focus-visible:ring-0 focus-visible:ring-offset-0",
							"transition-[height] duration-100 ease-out",
							"leading-[1.2] py-[16px]",
							"min-h-[52px]",
							"max-h-[200px]",
							"[&::-webkit-resizer]:hidden",
						)}
						ref={textareaRef}
						value={query}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsOpen(true)}
					/>
					<div className={cn("absolute top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1 transition-all duration-200", query ? "right-10" : "right-3")}>
						<Mic className="w-4 h-4 text-black/70 dark:text-white/70" />
					</div>

					<button
						onClick={handleSearch}
						type="button"
						className={cn(
							"absolute top-1/2 -translate-y-1/2 right-3",
							"rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1",
							"transition-all duration-200",
							query ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
						)}
					>
						<CornerRightUp className="w-4 h-4 text-black/70 dark:text-white/70" />
					</button>
				</div>
			</div>

			{/* Search Results */}
			{isOpen && (query || results.length > 0) && (
				<div className="absolute top-full left-4 right-4 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
					{results.length === 0 && query ? (
						<div className="p-4 text-center text-muted-foreground">{language === "mr" ? "कोणतेही परिणाम सापडले नाहीत" : "No results found"}</div>
					) : (
						<div className="py-2">
							{results.map((item, index) => (
								<Link
									key={item.id}
									href={item.href}
									className={cn("flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors", index === selectedIndex && "bg-muted/50")}
									onClick={() => {
										setIsOpen(false);
										setQuery("");
										setResults([]);
									}}
								>
									<div className="flex-shrink-0 text-muted-foreground">{item.icon}</div>
									<div className="flex-1 min-w-0">
										<div className="font-medium text-foreground truncate">{item.title}</div>
										<div className="text-sm text-muted-foreground truncate">{item.description}</div>
										<div className="text-xs text-muted-foreground/70 mt-1">{item.category}</div>
									</div>
									<div className="flex-shrink-0 text-muted-foreground">
										<ChevronRight className="h-4 w-4" />
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
