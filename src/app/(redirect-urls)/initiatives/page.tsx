"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function InitiativesPage() {
	const { language } = useLanguage();

	return (
		<div className="container mx-auto px-4 py-12">
			<Card className="max-w-5xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">{language === "mr" ? "उपक्रम" : "Initiatives"}</CardTitle>
					<CardDescription>
						{language === "mr" ? "छत्रपती संभाजीनगर शहर पोलीस तर्फे राबविण्यात येणारे नागरिक-केंद्रित उपक्रम" : "Citizen-centric initiatives by the Chatrapati Sambhajinagar City Police"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
					<ul className="list-disc pl-5 space-y-2">
						<li>{language === "mr" ? "सायबर जागरूकता मोहिमा" : "Cyber awareness campaigns"}</li>
						<li>{language === "mr" ? "महिला सुरक्षा कार्यक्रम" : "Women safety programs"}</li>
						<li>{language === "mr" ? "समुदाय पोलिसिंग आणि जनसहभाग" : "Community policing and outreach"}</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
