"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function UsefulWebsitesPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "उपयुक्त वेबसाइट्स" : "Useful Websites"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "लवकरच अधिकृत दुवे उपलब्ध होतील." : "Official links coming soon."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
