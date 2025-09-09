"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "mr";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
	en: {
		// Navigation
		"nav.home": "Home",
		"nav.about": "About",
		"nav.services": "Services",
		"nav.contact": "Contact",
		"nav.emergency": "Emergency",

		// Home dropdown
		"nav.home.dashboard": "Dashboard",
		"nav.home.news": "Latest News",
		"nav.home.announcements": "Announcements",

		// About dropdown
		"nav.about.us": "About Us",
		"nav.about.mission": "Our Mission",
		"nav.about.leadership": "Leadership",
		"nav.about.history": "History",

		// Services dropdown
		"nav.services.verification": "Police Verification",
		"nav.services.fir": "FIR Registration",
		"nav.services.traffic": "Traffic Services",
		"nav.services.women": "Women Safety",
		"nav.services.community": "Community Policing",

		// Contact dropdown
		"nav.contact.us": "Contact Us",
		"nav.contact.stations": "Police Stations",
		"nav.contact.emergency": "Emergency Contacts",
		"nav.contact.feedback": "Feedback",

		// Emergency dropdown
		"nav.emergency.call": "Call 112",
		"nav.emergency.women": "Women Helpline",
		"nav.emergency.child": "Child Helpline",
		"nav.emergency.report": "Report Crime",

		// Buttons
		"btn.emergency": "Emergency",
		"btn.contact": "Contact Us",

		// Accessibility
		"accessibility.skip": "Skip to main content",
		"accessibility.screen": "Screen Reader Access",
		"accessibility.sitemap": "Sitemap",
		"accessibility.theme": "Toggle theme",
		"accessibility.font.increase": "Increase font size",
		"accessibility.font.reset": "Reset font size",
		"accessibility.font.decrease": "Decrease font size",
		"accessibility.menu.open": "Open Menu",
		"accessibility.menu.close": "Close Menu",

		// Department name
		"dept.name": "Chatrapati Shambhaji Nagar",
		"dept.type": "Police Department",
		"dept.home": "Chatrapati Shambhaji Nagar Police Department - Home",

		// Portal
		"portal.welcome": "Welcome to Chatrapati Shambhaji Nagar Police Department",
		"portal.title": "One-Stop Portal For Police Services",
		"portal.description": "The Chatrapati Shambhaji Nagar Police Department is your go-to source for police services—simplifying access to various police services for citizens.",
		"portal.viewDetails": "View Details",

		// Portal Cards
		"portal.cards.news.title": "Latest News & Updates",
		"portal.cards.news.description": "Stay updated with the latest police regulations and announcements.",
		"portal.cards.portal.title": "Portal Access",
		"portal.cards.portal.description": "Gateway to police services",
		"portal.cards.about.title": "About Us",
		"portal.cards.about.description": "Our mission and services",
		"portal.cards.services.title": "Police Services",
		"portal.cards.services.description": "Comprehensive police services for citizens of Chatrapati Shambhaji Nagar.",

		// Portal Emblem
		"portal.emblem.national": "National",
		"portal.emblem.emblem": "Emblem",
		"portal.emblem.city": "Chatrapati\nShambhaji Nagar",

		// Leadership Team
		"leadership.title": "Leadership Team",
		"leadership.subtitle": "Meet our dedicated  leadership",

		// Picture Scroll Section
		"picture.title": "Chatrapati Shambhaji Nagar",
		"picture.subtitle": "A city of heritage, culture, and modern development",
		"picture.description": "Welcome to the heart of Maharashtra, where tradition meets progress and every citizen is valued.",
	},
	mr: {
		// Navigation
		"nav.home": "मुख्यपृष्ठ",
		"nav.about": "आमच्याबद्दल",
		"nav.services": "सेवा",
		"nav.contact": "संपर्क",
		"nav.emergency": "आणीबाणी",

		// Home dropdown
		"nav.home.dashboard": "डॅशबोर्ड",
		"nav.home.news": "ताज्या बातम्या",
		"nav.home.announcements": "घोषणा",

		// About dropdown
		"nav.about.us": "आमच्याबद्दल",
		"nav.about.mission": "आमचे ध्येय",
		"nav.about.leadership": "नेतृत्व",
		"nav.about.history": "इतिहास",

		// Services dropdown
		"nav.services.verification": "पोलिस सत्यापन",
		"nav.services.fir": "FIR नोंदणी",
		"nav.services.traffic": "वाहतूक सेवा",
		"nav.services.women": "महिला सुरक्षा",
		"nav.services.community": "समुदाय पोलिसिंग",

		// Contact dropdown
		"nav.contact.us": "संपर्क करा",
		"nav.contact.stations": "पोलिस स्टेशन",
		"nav.contact.emergency": "आणीबाणी संपर्क",
		"nav.contact.feedback": "अभिप्राय",

		// Emergency dropdown
		"nav.emergency.call": "112 कॉल करा",
		"nav.emergency.women": "महिला हेल्पलाइन",
		"nav.emergency.child": "बाल हेल्पलाइन",
		"nav.emergency.report": "गुन्हा नोंदवा",

		// Buttons
		"btn.emergency": "आणीबाणी",
		"btn.contact": "संपर्क करा",

		// Accessibility
		"accessibility.skip": "मुख्य सामग्रीवर जा",
		"accessibility.screen": "स्क्रीन रीडर प्रवेश",
		"accessibility.sitemap": "साइटमॅप",
		"accessibility.theme": "थीम बदला",
		"accessibility.font.increase": "फॉन्ट आकार वाढवा",
		"accessibility.font.reset": "फॉन्ट आकार रीसेट करा",
		"accessibility.font.decrease": "फॉन्ट आकार कमी करा",
		"accessibility.menu.open": "मेनू उघडा",
		"accessibility.menu.close": "मेनू बंद करा",

		// Department name
		"dept.name": "छत्रपती संभाजीनगर",
		"dept.type": "पोलिस विभाग",
		"dept.home": "छत्रपती संभाजीनगर पोलिस विभाग - मुख्यपृष्ठ",

		// Portal
		"portal.welcome": "छत्रपती संभाजीनगर पोलिस विभागात आपले स्वागत आहे",
		"portal.title": "पोलिस सेवांसाठी वन-स्टॉप पोर्टल",
		"portal.description": "छत्रपती संभाजीनगर पोलिस विभाग हे नागरिकांसाठी विविध पोलिस सेवांचा प्रवेश सुलभ करणारा आपला विश्वसनीय स्रोत आहे.",
		"portal.viewDetails": "तपशील पहा",

		// Portal Cards
		"portal.cards.news.title": "ताज्या बातम्या आणि अपडेट्स",
		"portal.cards.news.description": "नवीनतम पोलिस नियम आणि घोषणांची माहिती मिळवा.",
		"portal.cards.portal.title": "पोर्टल प्रवेश",
		"portal.cards.portal.description": "पोलिस सेवांचे प्रवेशद्वार",
		"portal.cards.about.title": "आमच्याबद्दल",
		"portal.cards.about.description": "आमचे ध्येय आणि सेवा",
		"portal.cards.services.title": "पोलिस सेवा",
		"portal.cards.services.description": "छत्रपती संभाजीनगरच्या नागरिकांसाठी सर्वसमावेशक पोलिस सेवा.",

		// Portal Emblem
		"portal.emblem.national": "राष्ट्रीय",
		"portal.emblem.emblem": "चिन्ह",
		"portal.emblem.city": "छत्रपती\nसंभाजीनगर",

		// Leadership Team
		"leadership.title": "नेतृत्व संघ",
		"leadership.subtitle": "आमच्या समर्पित  नेतृत्वाशी भेटा",

		// Picture Scroll Section
		"picture.title": "छत्रपती संभाजीनगर",
		"picture.subtitle": "वारसा, संस्कृती आणि आधुनिक विकासाचे शहर",
		"picture.description": "महाराष्ट्राच्या हृदयस्थानी आपले स्वागत आहे, जिथे परंपरा आणि प्रगती एकत्र येतात आणि प्रत्येक नागरिकाला महत्त्व दिले जाते.",
	},
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
	const [language, setLanguage] = useState<Language>("mr"); // Default to Marathi

	useEffect(() => {
		// Load saved language preference
		const savedLang = localStorage.getItem("language") as Language;
		if (savedLang && (savedLang === "en" || savedLang === "mr")) {
			setLanguage(savedLang);
		}
	}, []);

	useEffect(() => {
		// Save language preference
		localStorage.setItem("language", language);
	}, [language]);

	const t = (key: string): string => {
		return translations[language][key as keyof (typeof translations)[typeof language]] || key;
	};

	return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};
