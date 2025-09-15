"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function MediaCoveragePage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "वृत्तांकन" : "Media Coverage"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "वृत्तपत्र आणि माध्यमांमधील कव्हरेज." : "Coverage across newspapers and media."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
