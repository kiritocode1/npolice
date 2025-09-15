"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function PublicServiceRightsPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "लोकसेवा हक्क" : "Public Service Rights"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "नागरिकांचे सेवा हक्क आणि प्रक्रियेची माहिती." : "Information on citizens' service rights and processes."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
