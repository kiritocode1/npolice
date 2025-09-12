import { Shield, Users, FileText, Phone, AlertTriangle, Info, Building, MapPin, UserCheck } from "lucide-react";

export interface SearchItem {
	id: string;
	title: string;
	description: string;
	href: string;
	category: string;
	icon: React.ReactNode;
	keywords: string[];
}

export const getSearchData = (t: (key: string) => string): SearchItem[] => [
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
	{
		id: "rti",
		title: "RTI",
		description: "Right to Information",
		href: "/rti",
		category: "Main",
		icon: <FileText className="h-4 w-4" />,
		keywords: ["rti", "information", "right", "अधिकार"],
	},
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
		icon: <Users className="h-4 w-4" />,
		keywords: ["sp", "superintendent", "police", "information", "सुपरिटेंडेंट"],
	},
	{
		id: "history",
		title: t("nav.about.history"),
		description: "Police department history",
		href: "/history",
		category: "About Us",
		icon: <FileText className="h-4 w-4" />,
		keywords: ["history", "इतिहास", "पोलिस", "विभाग"],
	},
	{
		id: "organization",
		title: t("nav.about.organization"),
		description: "Department organization structure",
		href: "/organization",
		category: "About Us",
		icon: <Building className="h-4 w-4" />,
		keywords: ["organization", "structure", "संस्था", "रचना"],
	},

	// Services Dropdown
	{
		id: "citizen-services",
		title: t("nav.services.citizen"),
		description: "Services for citizens",
		href: "/citizen-services",
		category: "Services",
		icon: <Users className="h-4 w-4" />,
		keywords: ["citizen", "services", "नागरिक", "सेवा"],
	},
	{
		id: "online-services",
		title: t("nav.services.online"),
		description: "Online police services",
		href: "/online-services",
		category: "Services",
		icon: <FileText className="h-4 w-4" />,
		keywords: ["online", "services", "ऑनलाइन", "सेवा"],
	},
	{
		id: "complaint",
		title: t("nav.services.complaint"),
		description: "File a complaint",
		href: "/complaint",
		category: "Services",
		icon: <AlertTriangle className="h-4 w-4" />,
		keywords: ["complaint", "file", "तक्रार", "दाखल"],
	},
	{
		id: "fir-status",
		title: t("nav.services.fir"),
		description: "Check FIR status",
		href: "/fir-status",
		category: "Services",
		icon: <FileText className="h-4 w-4" />,
		keywords: ["fir", "status", "check", "दर्जा"],
	},

	// Contact Dropdown
	{
		id: "contact-us",
		title: t("nav.contact.us"),
		description: "Contact information",
		href: "/contact",
		category: "Contact",
		icon: <Phone className="h-4 w-4" />,
		keywords: ["contact", "phone", "संपर्क", "फोन"],
	},
	{
		id: "emergency",
		title: t("nav.contact.emergency"),
		description: "Emergency contact numbers",
		href: "/emergency",
		category: "Contact",
		icon: <AlertTriangle className="h-4 w-4" />,
		keywords: ["emergency", "urgent", "आणीबाणी", "तातडीचे"],
	},
	{
		id: "locations",
		title: t("nav.contact.locations"),
		description: "Police station locations",
		href: "/locations",
		category: "Contact",
		icon: <MapPin className="h-4 w-4" />,
		keywords: ["locations", "stations", "स्थान", "थाने"],
	},

	// Additional Services
	{
		id: "verification",
		title: "Verification Services",
		description: "Document verification",
		href: "/verification",
		category: "Services",
		icon: <UserCheck className="h-4 w-4" />,
		keywords: ["verification", "documents", "सत्यापन", "कागदपत्रे"],
	},
	{
		id: "reports",
		title: "Reports",
		description: "Download police reports",
		href: "/reports",
		category: "Services",
		icon: <FileText className="h-4 w-4" />,
		keywords: ["reports", "download", "अहवाल", "डाउनलोड"],
	},
	{
		id: "guidelines",
		title: "Guidelines",
		description: "Police guidelines and procedures",
		href: "/guidelines",
		category: "Information",
		icon: <Info className="h-4 w-4" />,
		keywords: ["guidelines", "procedures", "मार्गदर्शक", "प्रक्रिया"],
	},
];
