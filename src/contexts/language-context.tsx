"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
		"nav.home": "Home Page",
		"nav.home.simple": "Home",
		"nav.about": "About Us",
		"nav.special": "Special Units",
		"nav.citizen": "Citizen Corner",
		"nav.police": "Police Corner",

		// Home dropdown
		"nav.home.dashboard": "Dashboard",
		"nav.home.news": "Latest News",
		"nav.home.announcements": "Announcements",

		// About dropdown
		"nav.about.us": "About Us",
		"nav.about.senior": "Senior Officer Profile",
		"nav.about.organization": "Organizational Structure",
		"nav.about.jurisdiction": "Jurisdiction Map",
		"nav.about.initiatives": "Initiatives",
		"nav.about.gallery": "Photo Gallery",
		"nav.about.history": "History of Nashik Police",
		"nav.about.stations": "Police Station Incharge",
		"nav.about.contact": "Contact Us",
		"nav.about.feedback": "Feedback",

		// Special Units dropdown
		"nav.special.crime": "Crime Branch",
		"nav.special.crime.unit1": "Crime Branch Unit 1",
		"nav.special.crime.unit2": "Crime Branch Unit 2",
		"nav.special.crime.pcb": "Central Crime Unit (PCB)",
		"nav.special.crime.antiGunda": "Anti-Gunda Squad",
		"nav.special.crime.antiNarcotic": "Anti-Narcotic Cell",
		"nav.special.crime.antiExtortion": "Anti-Extortion Cell",
		"nav.special.crime.technical": "Technical Analysis",
		"nav.special.crime.wing": "Technical Analysis Wing",
		"nav.special.crime.women": "Women Safety Cell",
		"nav.special.crime.economic": "Economic Offence Wing",
		"nav.special.control": "Control Room",
		"nav.special.headquarters": "Police Headquarters",
		"nav.special.bomb": "Bomb Detection and Disposal Squad",
		"nav.special.transport": "Motor Transport Organization",

		// Citizen Corner dropdown
		"nav.citizen.cyberTips": "Cyber Security Tips",
		"nav.citizen.cyberAwareness": "Cyber Awareness",
		"nav.citizen.recruitment": "Police Recruitment",
		"nav.citizen.pressRelease": "Press Release",
		"nav.citizen.rti": "Right to Information",
		"nav.citizen.publicService": "Maharashtra Public Service Rights Act",
		"nav.citizen.passport": "Passport Status",
		"nav.citizen.websites": "Useful Websites",
		"nav.citizen.wall": "Citizen Wall",
		"nav.citizen.tenders": "Tenders",

		// Police Corner dropdown
		"nav.police.circular": "Circular / Notification",
		"nav.police.welfare": "Welfare Initiatives",
		"nav.police.media": "Media Coverage",
		"nav.police.crimeReview": "Crime Review",
		"nav.police.goodWork": "Good Work",

		// Buttons
		"btn.emergency": "Emergency",
		"btn.contact": "Contact Us",
		"nav.emergency.call": "Call 112",

		// Portal Marquee
		"portals.title": "Maharashtra Police Central Grievance Handling & Resolution Platforms",
		"portals.description": "Access to various police service portals",

		// Individual Portal Details
		"portals.maharashtra.title": "Citizen Portal Maharashtra Police",
		"portals.maharashtra.description": "Official portal for registering police-related complaints and obtaining updated information",
		"portals.cybercrime.title": "Cyber Crime Portal",
		"portals.cybercrime.description": "Portal for registering cyber crimes and obtaining guidance",
		"portals.grp.title": "Public Grievances",
		"portals.grp.description": "Easily submit and track public grievances online",
		"portals.pg.title": "P.G. Portal",
		"portals.pg.description": "Portal for public grievances with government services",
		"portals.aaple.title": "Aaple Sarkar",
		"portals.aaple.description": "Official portal for citizen services and grievances in Maharashtra",

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

		// External Link Modal
		"externalLink.title": "Leaving Our Website",
		"externalLink.message": "You are about to leave the Chatrapati Shambhaji Nagar Police Department website and visit an external site.",
		"externalLink.disclaimer.title": "Disclaimer",
		"externalLink.disclaimer.text": "Chatrapati Shambhaji Nagar Police Department is not responsible for the content, accuracy, or updates of external websites.",
		"externalLink.cancel": "Stay Here",
		"externalLink.continue": "Continue to External Site",

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

		// Map Section
		"map.title": "Find Us",
		"map.description": "Visit our headquarters in Chhatrapati Sambhajinagar. We're here to serve you with dedication and commitment.",
		"map.headquarters": "Police Headquarters",
		"map.location": "Chhatrapati Sambhajinagar Rural Police",
		"map.state": "Maharashtra, India",
		"map.emergency": "Emergency: 100",
		"map.helpline": "Helpline: 1090",
		"map.email": "police@csr.gov.in",
		"map.inquiries": "General Inquiries",
		"map.directions": "Get Directions",
		"map.call": "Call Now",

		// Footer
		"footer.title": "Chatrapati Sambhajinagar",
		"footer.subtitle": "Police Department Official Website issued by Govt. of Maharashtra",
		"footer.description":
			"Welcome to Chhatrapati Sambhajinagar Rural Police Department, where we are committed to ensuring the safety and security of our citizens. Our mission is to maintain law and order, prevent crime, and provide efficient police services to the community. We believe in transparency, accountability, and building trust with the public through professional policing. Our dedicated officers work around the clock to protect and serve the people of Maharashtra with integrity and excellence.",
		"footer.visits": "Visits",
		"footer.copyright": "Made with",
		"footer.for": "for the people of",
		"footer.maharashtra": "Maharashtra 🇮🇳",
		"footer.police": "Chhatrapati Sambhajinagar Rural Police",

		// Bento Grid
		"bento.updates.title": "Latest Updates",
		"bento.updates.description": "Stay informed with the latest news and updates from Chhatrapati Sambhajinagar Rural Police",
		"bento.dgp.title": "DGP's Message",
		"bento.dgp.description": "A message from our Superintendent of Police",
		"bento.dgp.message":
			"The purpose of this website is to provide the platform to the citizens to voice their grievances & offer suggestions. I hope that this interactive relationship between Police & Public will help us in preventing crime & winning trust of People.",
		"bento.dgp.author": "Smt. Rashmi Shukla (DGP)",
		"bento.dgp.position": "Director General of Police, Chhatrapati Sambhajinagar Rural Police",
		"bento.events.title": "Recent Events",
		"bento.events.description": "Latest events and activities from our department",
		"bento.services.title": "Online Services and Forms",
		"bento.services.description": "Access various police services and forms online",
		"bento.info.title": "Popular Information",
		"bento.info.description": "Essential information and resources for citizens",
		"bento.news.title1": "सराईत घरफोड्या जेरबंद",
		"bento.news.content1": "04 घरफोडीचे गुन्हे उघड.... स्थानिक गुन्हे शाखा, छत्रपती संभाजीनगर ग्रामीण यांची कारवाई.",
		"bento.news.title2": "Traffic Safety Campaign",
		"bento.news.content2": "New traffic safety measures implemented across major highways in the district.",
		"bento.news.title3": "Community Outreach Program",
		"bento.news.content3": "Police department launches new community engagement initiatives for better public relations.",

		// City Tour Section
		"city.tour.title": "City Tour",
		"city.tour.subtitle": "Discover the beauty and heritage of Chhatrapati Sambhajinagar",
		"city.tour.forts.title": "Historic Forts",
		"city.tour.forts.content":
			"Explore the magnificent historic forts that stand as testaments to CSM's rich cultural heritage and architectural brilliance. These ancient structures tell stories of valor, culture, and the glorious past of Maharashtra.",
		"city.tour.cityscape.title": "Modern Cityscape",
		"city.tour.cityscape.content":
			"Discover the vibrant modern cityscape of CSM, showcasing contemporary architecture and urban development. Experience the perfect blend of tradition and modernity in this rapidly growing city.",
		"city.tour.landmarks.title": "Cultural Landmarks",
		"city.tour.landmarks.content":
			"Visit iconic cultural landmarks that define the identity and spirit of Chhatrapati Sambhajinagar city. These monuments preserve the rich Maratha heritage and cultural significance.",
		"city.tour.nature.title": "Natural Beauty",
		"city.tour.nature.content":
			"Experience the natural beauty and scenic landscapes that surround the historic city of CSM. From rolling hills to serene lakes, nature's bounty complements the city's urban charm.",
	},
	mr: {
		// Navigation
		"nav.home": "मुख्यपृष्ठ",
		"nav.home.simple": "मुख्यपृष्ठ",
		"nav.about": "आमच्या विषयी",
		"nav.special": "विशेष पथके",
		"nav.citizen": "नागरिकांकरिता",
		"nav.police": "पोलीस विभाग",

		// Home dropdown
		"nav.home.dashboard": "डॅशबोर्ड",
		"nav.home.news": "ताज्या बातम्या",
		"nav.home.announcements": "घोषणा",

		// About dropdown
		"nav.about.us": "आमच्या विषयी",
		"nav.about.senior": "वरिष्ठ अधिकारी प्रोफाइल",
		"nav.about.organization": "संघटनात्मक रचना",
		"nav.about.jurisdiction": "अधिकार क्षेत्र नकाशा",
		"nav.about.initiatives": "उपक्रम",
		"nav.about.gallery": "छायाचित्र संग्रह",
		"nav.about.history": "नाशिक पोलीसांचा इतिहास",
		"nav.about.stations": "पोलीस स्टेशन प्रभारी",
		"nav.about.contact": "आमच्याशी संपर्क साधा",
		"nav.about.feedback": "अभिप्राय",

		// Special Units dropdown
		"nav.special.crime": "गुन्हे शाखा",
		"nav.special.crime.unit1": "गुन्हे शाखा विविध क्रमांक १",
		"nav.special.crime.unit2": "गुन्हे शाखा विविध क्रमांक २",
		"nav.special.crime.pcb": "मध्यवर्ती गुन्हे शाखा",
		"nav.special.crime.antiGunda": "गुंडाविरोधी पथक",
		"nav.special.crime.antiNarcotic": "अंमली पदार्थ विरोधी सेल",
		"nav.special.crime.antiExtortion": "खंडणी विरोधी पथक",
		"nav.special.crime.technical": "तांत्रिक विश्लेषण",
		"nav.special.crime.wing": "तांत्रिक विश्लेषण विंग",
		"nav.special.crime.women": "महिला सुरक्षा कक्ष",
		"nav.special.crime.economic": "आर्थिक गुन्हे शाखा",
		"nav.special.control": "नियंत्रण कक्ष",
		"nav.special.headquarters": "पोलीस मुख्यालय",
		"nav.special.bomb": "बाँब शोधक व नाशक पथक",
		"nav.special.transport": "मोटर वाहन विभाग",

		// Citizen Corner dropdown
		"nav.citizen.cyberTips": "सायबर सुरक्षा टिप्स",
		"nav.citizen.cyberAwareness": "सायबर जनजागृती",
		"nav.citizen.recruitment": "पोलीस भरती",
		"nav.citizen.pressRelease": "प्रेस प्रकाशन",
		"nav.citizen.rti": "माहितीचा अधिकार",
		"nav.citizen.publicService": "महाराष्ट्र लोकसेवा हक्क अधिनियम",
		"nav.citizen.passport": "पासपोर्ट स्थिती",
		"nav.citizen.websites": "उपयुक्त वेबसाइट",
		"nav.citizen.wall": "सिटीझन वॉल",
		"nav.citizen.tenders": "निविदा",

		// Police Corner dropdown
		"nav.police.circular": "परिपत्रक / अधिसूचना",
		"nav.police.welfare": "कल्याणकारी उपक्रम",
		"nav.police.media": "वृत्तांकन",
		"nav.police.crimeReview": "गुन्हे आढावा",
		"nav.police.goodWork": "उत्कृष्ट कामगिरी",

		// Buttons
		"btn.emergency": "आणीबाणी",
		"btn.contact": "संपर्क करा",
		"nav.emergency.call": "112 कॉल करा",

		// Portal Marquee
		"portals.title": "महाराष्ट्र पोलीस केंद्रीय तक्रार हाताळणी आणि निराकरण प्लॅटफॉर्म",
		"portals.description": "विविध पोलीस सेवा पोर्टल्सचा प्रवेश",

		// Individual Portal Details
		"portals.maharashtra.title": "महाराष्ट्र पोलीस",
		"portals.maharashtra.description": "पोलीस संबंधित तक्रारी नोंदविण्यासाठी आणि अद्ययावत माहिती मिळविण्यासाठी अधिकृत पोर्टल",
		"portals.cybercrime.title": "सायबर क्राइम पोर्टल",
		"portals.cybercrime.description": "सायबर क्राइम नोंदविण्यासाठी आणि मार्गदर्शन मिळविण्यासाठी पोर्टल",
		"portals.grp.title": "सार्वजनिक तक्रारी",
		"portals.grp.description": "सार्वजनिक तक्रारी ऑनलाइन सहज सादर करा आणि त्याचा मागोवा घ्या",
		"portals.pg.title": "सार्वजनिक तक्रारी",
		"portals.pg.description": "सार्वजनिक तक्रारी ऑनलाइन सहज सादर करा आणि त्याचा मागोवा घ्या",
		"portals.aaple.title": "आपले सरकार",
		"portals.aaple.description": "महाराष्ट्रातील नागरिक सेवा आणि तक्रारींसाठी अधिकृत पोर्टल",

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

		// External Link Modal
		"externalLink.title": "आमच्या वेबसाइटवरून बाहेर जात आहात",
		"externalLink.message": "आपण छत्रपती संभाजीनगर पोलिस विभागाच्या वेबसाइटवरून बाहेर जाऊन बाह्य साइटला भेट देणार आहात.",
		"externalLink.disclaimer.title": "सूचना",
		"externalLink.disclaimer.text": "छत्रपती संभाजीनगर पोलिस विभाग बाह्य वेबसाइटच्या सामग्री, अचूकता किंवा अद्यतनांसाठी जबाबदार नाही.",
		"externalLink.cancel": "येथेच रहा",
		"externalLink.continue": "बाह्य साइटवर जा",

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

		// Map Section
		"map.title": "आमच्याला शोधा",
		"map.description": "छत्रपती संभाजीनगरमध्ये आमच्या मुख्यालयाला भेट द्या. आम्ही समर्पण आणि प्रतिबद्धतेसह आपल्या सेवेत उपस्थित आहोत.",
		"map.headquarters": "पोलिस मुख्यालय",
		"map.location": "छत्रपती संभाजीनगर ग्रामीण पोलिस",
		"map.state": "महाराष्ट्र, भारत",
		"map.emergency": "आणीबाणी: 100",
		"map.helpline": "हेल्पलाइन: 1090",
		"map.email": "police@csr.gov.in",
		"map.inquiries": "सामान्य चौकशी",
		"map.directions": "दिशा मिळवा",
		"map.call": "आता कॉल करा",

		// Footer
		"footer.title": "छत्रपती संभाजीनगर",
		"footer.subtitle": "महाराष्ट्र सरकारच्या वतीने जारी केलेले पोलिस विभागाचे अधिकृत वेबसाइट",
		"footer.description":
			"छत्रपती संभाजीनगर ग्रामीण पोलिस विभागात आपले स्वागत आहे, जिथे आम्ही आमच्या नागरिकांच्या सुरक्षा आणि सुरक्षिततेची हमी देण्यासाठी प्रतिबद्ध आहोत. आमचे ध्येय कायदा आणि सुव्यवस्था राखणे, गुन्हे रोखणे आणि समुदायाला कार्यक्षम पोलिस सेवा पुरवणे हे आहे. आम्ही पारदर्शकता, जबाबदारी आणि व्यावसायिक पोलिसिंगद्वारे जनतेशी विश्वास निर्माण करण्यावर विश्वास ठेवतो. आमचे समर्पित अधिकारी महाराष्ट्रातील लोकांचे सचोटी आणि उत्कृष्टतेसह संरक्षण आणि सेवा करण्यासाठी चोवीस तास काम करतात.",
		"footer.visits": "भेटी",
		"footer.copyright": "बनवले",
		"footer.for": "लोकांसाठी",
		"footer.maharashtra": "महाराष्ट्र 🇮🇳",
		"footer.police": "छत्रपती संभाजीनगर ग्रामीण पोलिस",

		// Bento Grid
		"bento.updates.title": "नवीनतम अपडेट्स",
		"bento.updates.description": "छत्रपती संभाजीनगर ग्रामीण पोलिसच्या नवीनतम बातम्या आणि अपडेट्ससह सूचित रहा",
		"bento.dgp.title": "DGP चे संदेश",
		"bento.dgp.description": "आमच्या पोलिस अधीक्षकांचा संदेश",
		"bento.dgp.message":
			"या वेबसाइटचा उद्देश नागरिकांना त्यांच्या तक्रारी व्यक्त करण्यासाठी आणि सूचना देण्यासाठी मंच प्रदान करणे आहे. मला आशा आहे की पोलिस आणि जनता यांच्यातील हा परस्परसंबंध आम्हाला गुन्हे रोखण्यात आणि लोकांचा विश्वास जिंकण्यात मदत करेल.",
		"bento.dgp.author": "श्रीमती. रश्मी शुक्ला (DGP)",
		"bento.dgp.position": "पोलिस महासंचालक, छत्रपती संभाजीनगर ग्रामीण पोलिस",
		"bento.events.title": "अलीकडील कार्यक्रम",
		"bento.events.description": "आमच्या विभागातील नवीनतम कार्यक्रम आणि क्रियाकलाप",
		"bento.services.title": "ऑनलाइन सेवा आणि फॉर्म",
		"bento.services.description": "विविध पोलिस सेवा आणि फॉर्म ऑनलाइन प्रवेश करा",
		"bento.info.title": "लोकप्रिय माहिती",
		"bento.info.description": "नागरिकांसाठी आवश्यक माहिती आणि संसाधने",
		"bento.news.title1": "सराईत घरफोड्या जेरबंद",
		"bento.news.content1": "04 घरफोडीचे गुन्हे उघड.... स्थानिक गुन्हे शाखा, छत्रपती संभाजीनगर ग्रामीण यांची कारवाई.",
		"bento.news.title2": "वाहतूक सुरक्षा मोहीम",
		"bento.news.content2": "जिल्ह्यातील प्रमुख महामार्गांवर नवीन वाहतूक सुरक्षा उपाय लागू केले.",
		"bento.news.title3": "समुदाय आउटरीच कार्यक्रम",
		"bento.news.content3": "चांगल्या सार्वजनिक संबंधांसाठी पोलिस विभागाने नवीन समुदाय व्यस्तता पुढाकार सुरू केले.",

		// City Tour Section
		"city.tour.title": "शहर भ्रमण",
		"city.tour.subtitle": "छत्रपती संभाजीनगरच्या सौंदर्य आणि वारसाचा शोध घ्या",
		"city.tour.forts.title": "ऐतिहासिक किल्ले",
		"city.tour.forts.content":
			"CSM च्या समृद्ध सांस्कृतिक वारसा आणि वास्तुशिल्प प्रतिभेचे साक्षीदार असलेल्या भव्य ऐतिहासिक किल्ल्यांचा शोध घ्या. ही प्राचीन रचना वीरता, संस्कृती आणि महाराष्ट्राच्या गौरवशाली भूतकाळाच्या कथा सांगतात.",
		"city.tour.cityscape.title": "आधुनिक शहरी दृश्य",
		"city.tour.cityscape.content":
			"CSM च्या जीवंत आधुनिक शहरी दृश्याचा शोध घ्या, जे समकालीन वास्तुकला आणि शहरी विकास दाखवते. या वेगाने वाढत्या शहरात परंपरा आणि आधुनिकतेचे परिपूर्ण मिश्रण अनुभवा.",
		"city.tour.landmarks.title": "सांस्कृतिक स्थळे",
		"city.tour.landmarks.content": "छत्रपती संभाजीनगर शहराची ओळख आणि भावना परिभाषित करणाऱ्या प्रतिष्ठित सांस्कृतिक स्थळांची भेट द्या. ही स्मारके समृद्ध मराठा वारसा आणि सांस्कृतिक महत्त्व जपतात.",
		"city.tour.nature.title": "नैसर्गिक सौंदर्य",
		"city.tour.nature.content":
			"CSM च्या ऐतिहासिक शहराला वेढलेल्या नैसर्गिक सौंदर्य आणि नयनरम्य भूदृश्यांचा अनुभव घ्या. लहरी डोंगरांपासून ते शांत तळ्यांपर्यंत, निसर्गाची दानशीलता शहराच्या शहरी आकर्षणाला पूरक आहे.",
	},
};

interface LanguageProviderProps {
	children: any;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
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
