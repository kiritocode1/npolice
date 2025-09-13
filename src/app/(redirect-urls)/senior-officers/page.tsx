"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Award, Mail, MapPin, Phone, Users } from "lucide-react";

const SeniorOfficersPage = () => {
	const { t } = useLanguage();

	const officers = [
		{
			name: "Shri. Manoj Lohiya, IPS",
			position: "Commissioner of Police",
			department: "Chhatrapati Sambhaji Nagar Police Commissionerate",
			experience: "25+ years",
			email: "cp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1000",
			location: "Police Commissionerate, Chhatrapati Sambhaji Nagar",
			achievements: ["Implemented digital policing initiatives", "Reduced crime rate by 15% in 2023"],
			rank: "CP",
		},
		{
			name: "Shri. Rajesh Bansode, IPS",
			position: "Additional Commissioner of Police",
			department: "Crime & Administration",
			experience: "20+ years",
			email: "addlcp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1001",
			location: "Police Commissionerate, Chhatrapati Sambhaji Nagar",
			achievements: ["Led major crime investigations", "Established cyber crime cell"],
			rank: "ACP",
		},
		{
			name: "Smt. Priya Sharma, IPS",
			position: "Deputy Commissioner of Police",
			department: "Traffic & Women Safety",
			experience: "15+ years",
			email: "dcp.aurangabad@mahapolice.gov.in",
			phone: "+91-240-247-1002",
			location: "Police Commissionerate, Chhatrapati Sambhaji Nagar",
			achievements: ["Improved traffic management", "Enhanced women safety measures"],
			rank: "DCP",
		},
	];

	const getRankColor = (rank: string) => {
		switch (rank) {
			case "DGP":
				return "destructive";
			case "ADGP":
				return "default";
			case "IGP":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Senior Officers</h1>
					<p className="text-muted-foreground text-lg">Meet the senior leadership team of Chhatrapati Sambhaji Nagar Police Department, dedicated to serving and protecting our community.</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{officers.map((officer, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="text-center">
									<div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
										<Users className="h-12 w-12 text-primary" />
									</div>
									<CardTitle className="text-xl">{officer.name}</CardTitle>
									<CardDescription className="text-base font-medium">{officer.position}</CardDescription>
									<div className="flex justify-center gap-2 mt-2">
										<Badge variant={getRankColor(officer.rank)}>{officer.rank}</Badge>
										<Badge variant="outline">{officer.department}</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<p className="text-sm text-muted-foreground">Experience</p>
									<p className="font-medium">{officer.experience}</p>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2 text-sm">
										<Mail className="h-4 w-4 text-muted-foreground" />
										<span className="truncate">{officer.email}</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Phone className="h-4 w-4 text-muted-foreground" />
										<span>{officer.phone}</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<MapPin className="h-4 w-4 text-muted-foreground" />
										<span>{officer.location}</span>
									</div>
								</div>

								<div>
									<p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
										<Award className="h-4 w-4" />
										Key Achievements
									</p>
									<ul className="space-y-1">
										{officer.achievements.map((achievement, idx) => (
											<li
												key={idx}
												className="text-sm flex items-start gap-2"
											>
												<div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
												<span>{achievement}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="flex gap-2">
									<Button
										size="sm"
										className="flex-1"
									>
										<Mail className="h-4 w-4 mr-2" />
										Contact
									</Button>
									<Button
										size="sm"
										variant="outline"
									>
										<Phone className="h-4 w-4 mr-2" />
										Call
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Leadership Excellence</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">
								Our senior officers bring decades of experience and expertise to ensure the highest standards of policing and community service in Chhatrapati Sambhaji Nagar.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<Users className="h-4 w-4 mr-2" />
									Meet the Team
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<Award className="h-4 w-4 mr-2" />
									View Achievements
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SeniorOfficersPage;
