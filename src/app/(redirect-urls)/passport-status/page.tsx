"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function PassportStatusPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "पासपोर्ट स्थिती" : "Passport Status"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "पासपोर्ट पडताळणी स्थिती तपासण्यासाठी अधिकृत पोर्टलचा वापर करा." : "Use the official portal to check passport verification status."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
