"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Target, Users } from "lucide-react";

const MissionPage = () => {
	const values = [
		{
			icon: <Shield className="h-6 w-6" />,
			title: "Integrity & Honesty",
			description: "Maintain the highest standards of integrity, honesty, and ethical conduct in all police operations and interactions",
		},
		{
			icon: <Users className="h-6 w-6" />,
			title: "Service to Community",
			description: "Dedicated service to the citizens of Chhatrapati Sambhaji Nagar with respect, dignity, and professionalism",
		},
		{
			icon: <Target className="h-6 w-6" />,
			title: "Excellence in Performance",
			description: "Strive for excellence in all aspects of policing, from crime prevention to community engagement",
		},
		{
			icon: <Heart className="h-6 w-6" />,
			title: "Compassion & Empathy",
			description: "Show compassion and empathy towards victims, witnesses, and all members of the community",
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Our Mission</h1>
					<p className="text-muted-foreground text-lg">
						Learn about the mission, values, and commitment of Chhatrapati Sambhaji Nagar Police Department in serving and protecting our community.
					</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Mission Statement</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-center text-lg leading-relaxed">
							To maintain law and order, prevent crime, and ensure the safety and security of all citizens in Chhatrapati Sambhaji Nagar through professional policing, community
							partnership, and innovative approaches to law enforcement.
						</p>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Our Core Values</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{values.map((value, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-3">
										{value.icon}
										{value.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base">{value.description}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Our Commitment</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Protect and serve all citizens with equal respect and dignity, regardless of background or circumstances</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Maintain the highest standards of professionalism, integrity, and ethical conduct in all operations</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Foster strong community partnerships and engage in proactive crime prevention initiatives</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Continuously improve our services through innovation, training, and community feedback</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default MissionPage;
