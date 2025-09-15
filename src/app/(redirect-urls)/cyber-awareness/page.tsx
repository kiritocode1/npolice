"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function CyberAwarenessPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "सायबर जनजागृती" : "Cyber Awareness"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "सायबर सुरक्षिततेबद्दल माहिती आणि जनजागृती उपक्रम." : "Information and outreach initiatives for cyber safety."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
