"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function PressReleasePage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "प्रेस प्रकाशन" : "Press Release"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "विभागाच्या अधिकृत घोषण्या आणि बातम्या." : "Official announcements and news from the department."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
