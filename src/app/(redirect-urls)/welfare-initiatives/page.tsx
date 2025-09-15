"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function WelfareInitiativesPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "कल्याणकारी उपक्रम" : "Welfare Initiatives"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "पोलीस कर्मचाऱ्यांसाठी कल्याणकारी योजना." : "Welfare programs for police personnel."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
