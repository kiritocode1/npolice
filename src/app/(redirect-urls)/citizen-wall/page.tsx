"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function CitizenWallPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "सिटीझन वॉल" : "Citizen Wall"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "नागरिकांकडून अभिप्राय आणि कौतुक संदेश." : "Citizen feedback and appreciation messages."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
