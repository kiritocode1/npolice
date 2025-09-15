"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function CyberSecurityTipsPage() {
	const { language } = useLanguage();
	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "सायबर सुरक्षा टिप्स" : "Cyber Security Tips"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm text-muted-foreground">
					<ul className="list-disc pl-5 space-y-2">
						<li>{language === "mr" ? "मजबूत पासवर्ड वापरा" : "Use strong passwords"}</li>
						<li>{language === "mr" ? "OTP कधीही शेअर करू नका" : "Never share OTP"}</li>
						<li>{language === "mr" ? "फिशिंग लिंकपासून सावध रहा" : "Beware of phishing links"}</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
