"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Building, Mail, MapPin, Phone, Shield, Users } from "lucide-react";

const OrganizationPage = () => {
	const { t } = useLanguage();

	const departments = [
		{
			name: "Crime Investigation Department",
			description: "Handles criminal investigations, case management, and law enforcement operations in Chhatrapati Sambhaji Nagar",
			officers: "1,200+",
			stations: "15+",
			icon: <Shield className="h-5 w-5" />,
			color: "bg-blue-600",
		},
		{
			name: "Traffic Management Department",
			description: "Manages traffic flow, road safety, and transportation regulations across the city",
			officers: "800+",
			stations: "8+",
			icon: <MapPin className="h-5 w-5" />,
			color: "bg-orange-600",
		},
		{
			name: "Women Safety Cell",
			description: "Dedicated department for women safety, Pink Patrol units, and gender-based violence prevention",
			officers: "300+",
			stations: "5+",
			icon: <Users className="h-5 w-5" />,
			color: "bg-pink-600",
		},
		{
			name: "Cyber Crime Cell",
			description: "Specialized unit for investigating cyber crimes, online fraud, and digital security threats",
			officers: "150+",
			stations: "3+",
			icon: <Building className="h-5 w-5" />,
			color: "bg-purple-600",
		},
	];

	const hierarchy = [
		{
			level: "Director General of Police (DGP)",
			description: "Highest ranking police officer in Maharashtra state, responsible for overall police administration",
			count: "1",
			icon: <Shield className="h-6 w-6" />,
		},
		{
			level: "Additional Director General of Police (ADGP)",
			description: "Senior officers responsible for specialized departments and regional administration",
			count: "5",
			icon: <Shield className="h-6 w-6" />,
		},
		{
			level: "Inspector General of Police (IGP)",
			description: "Regional commanders responsible for multiple districts and specialized units",
			count: "15",
			icon: <Shield className="h-6 w-6" />,
		},
		{
			level: "Superintendent of Police (SP)",
			description: "District-level commanders responsible for law and order in their respective districts",
			count: "50+",
			icon: <Shield className="h-6 w-6" />,
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Organization Structure</h1>
					<p className="text-muted-foreground text-lg">Learn about the organizational structure, departments, and hierarchy of Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Department Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-4 gap-6 text-center">
							<div>
								<div className="text-3xl font-bold text-primary mb-2">50,000+</div>
								<div className="text-sm text-muted-foreground">Police Officers</div>
							</div>
							<div>
								<div className="text-3xl font-bold text-primary mb-2">1,200+</div>
								<div className="text-sm text-muted-foreground">Police Stations</div>
							</div>
							<div>
								<div className="text-3xl font-bold text-primary mb-2">36</div>
								<div className="text-sm text-muted-foreground">Districts</div>
							</div>
							<div>
								<div className="text-3xl font-bold text-primary mb-2">24/7</div>
								<div className="text-sm text-muted-foreground">Service</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Specialized Departments</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{departments.map((dept, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<div className={`p-2 ${dept.color} rounded-lg`}>{dept.icon}</div>
										{dept.name}
									</CardTitle>
									<CardDescription className="text-base">{dept.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-4 mb-4">
										<div className="text-center">
											<div className="text-2xl font-bold text-primary">{dept.officers}</div>
											<div className="text-sm text-muted-foreground">Officers</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-primary">{dept.stations}</div>
											<div className="text-sm text-muted-foreground">Stations</div>
										</div>
									</div>
									<Button
										className="w-full"
										size="sm"
									>
										Learn More
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Police Hierarchy</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							{hierarchy.map((level, index) => (
								<div
									key={index}
									className="flex items-center gap-4 p-4 border rounded-lg"
								>
									<div className="p-3 bg-primary/10 rounded-lg">{level.icon}</div>
									<div className="flex-1">
										<h3 className="font-semibold text-lg">{level.level}</h3>
										<p className="text-sm text-muted-foreground">{level.description}</p>
									</div>
									<Badge
										variant="outline"
										className="text-lg px-4 py-2"
									>
										{level.count}
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Contact Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">For organizational inquiries or to learn more about our structure, contact our administration office</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<Phone className="h-4 w-4 mr-2" />
									Call Us
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<Mail className="h-4 w-4 mr-2" />
									Email Us
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default OrganizationPage;
