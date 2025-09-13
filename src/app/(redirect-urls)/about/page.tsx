"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Award, Shield, Target, Users } from "lucide-react";

const AboutPage = () => {
	const { t } = useLanguage();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-4">About Us</h1>
					<p className="text-muted-foreground text-lg">
						Chhatrapati Sambhaji Nagar Police Department is committed to serving and protecting the citizens with integrity, professionalism, and dedication to maintaining law and order.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="h-5 w-5" />
								Our Mission
							</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription className="text-base">
								To maintain law and order, prevent crime, and ensure the safety and security of all citizens in Chhatrapati Sambhaji Nagar through professional policing and community
								partnership.
							</CardDescription>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Target className="h-5 w-5" />
								Our Vision
							</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription className="text-base">
								To be a modern, efficient, and citizen-friendly police force that upholds the highest standards of professionalism and serves as a model for law enforcement excellence.
							</CardDescription>
						</CardContent>
					</Card>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-5 w-5" />
							Department Statistics
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">2,500+</div>
								<div className="text-sm text-muted-foreground">Police Officers</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">15</div>
								<div className="text-sm text-muted-foreground">Police Stations</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">8</div>
								<div className="text-sm text-muted-foreground">Zones</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-primary">24/7</div>
								<div className="text-sm text-muted-foreground">Emergency Service</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Award className="h-5 w-5" />
							Key Achievements
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Reduced crime rate by 15% in 2023 through community policing initiatives</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Implemented digital FIR system improving response time by 40%</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Launched women safety initiatives with 24/7 helpline and patrol units</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AboutPage;
