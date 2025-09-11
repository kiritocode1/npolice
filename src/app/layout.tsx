import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import PageAccessibilityChanger from "@/components/Page-Accessibility-Changer";
import Navbar from "@/components/navbar";
import PoliceFooter from "@/components/PoliceFooter";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Chhatrapati Sambhaji Nagar Police | Official Website",
	description: "Official website of Chhatrapati Sambhaji Nagar Police Department. Access police services, report crimes, emergency contacts, and community safety information.",
	keywords: ["Chhatrapati Sambhaji Nagar Police", "Police Department", "Crime Report", "Emergency", "Safety", "Aurangabad Police", "Maharashtra Police"],
	authors: [{ name: "Chhatrapati Sambhaji Nagar Police Department" }],
	creator: "Chhatrapati Sambhaji Nagar Police Department",
	publisher: "Chhatrapati Sambhaji Nagar Police Department",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: "https://csmpolice.vercel.app",
		title: "Chhatrapati Sambhaji Nagar Police | Official Website",
		description: "Official website of Chhatrapati Sambhaji Nagar Police Department. Access police services, report crimes, emergency contacts, and community safety information.",
		siteName: "Chhatrapati Sambhaji Nagar Police",
		images: [
			{
				url: "/emblem.webp",
				width: 1200,
				height: 630,
				alt: "Chhatrapati Sambhaji Nagar Police Emblem",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Chhatrapati Sambhaji Nagar Police | Official Website",
		description: "Official website of Chhatrapati Sambhaji Nagar Police Department. Access police services, report crimes, emergency contacts, and community safety information.",
		images: ["/emblem.webp"],
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
	},
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	category: "Government",
	classification: "Official Government Website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					<LanguageProvider>
						<Navbar />
						{children}
						<PoliceFooter />
						<PageAccessibilityChanger />
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
