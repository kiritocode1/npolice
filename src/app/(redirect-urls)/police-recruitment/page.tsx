"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function PoliceRecruitmentPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "पोलीस भरती" : "Police Recruitment"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<p>{language === "mr" ? "सध्याच्या भरतीसंबंधी माहिती लवकरच उपलब्ध होईल." : "Recruitment details will be available soon."}</p>
				</CardContent>
			</Card>
		</div>
	);
}
