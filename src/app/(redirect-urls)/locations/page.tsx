"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, Phone, Search, Users } from "lucide-react";

const LocationsPage = () => {
	const locations = [
		{
			name: "City Police Station",
			address: "Near Railway Station, Chhatrapati Sambhaji Nagar - 431001",
			phone: "+91-240-247-2001",
			hours: "24/7",
			officer: "Inspector Rajesh Patil",
			services: ["FIR Filing", "Verification", "General Complaints"],
			status: "Open",
			district: "Chhatrapati Sambhaji Nagar",
		},
		{
			name: "Cidco Police Station",
			address: "Cidco N-6, Chhatrapati Sambhaji Nagar - 431003",
			phone: "+91-240-247-2002",
			hours: "24/7",
			officer: "Inspector Sunita Deshmukh",
			services: ["Women Safety", "Community Policing", "Traffic"],
			status: "Open",
			district: "Chhatrapati Sambhaji Nagar",
		},
		{
			name: "Jalna Road Police Station",
			address: "Jalna Road, Chhatrapati Sambhaji Nagar - 431001",
			phone: "+91-240-247-2003",
			hours: "24/7",
			officer: "Inspector Vikram Singh",
			services: ["Traffic Management", "Emergency Response", "Patrol"],
			status: "24/7",
			district: "Chhatrapati Sambhaji Nagar",
		},
		{
			name: "Aurangpura Police Station",
			address: "Aurangpura, Chhatrapati Sambhaji Nagar - 431001",
			phone: "+91-240-247-2004",
			hours: "24/7",
			officer: "Inspector Meera Joshi",
			services: ["Cyber Crime", "Economic Offenses", "Investigation"],
			status: "Open",
			district: "Chhatrapati Sambhaji Nagar",
		},
		{
			name: "Waluj Police Station",
			address: "Waluj Industrial Area, Chhatrapati Sambhaji Nagar - 431136",
			phone: "+91-240-247-2005",
			hours: "24/7",
			officer: "Inspector Ajay Kumar",
			services: ["Industrial Security", "Labor Disputes", "Patrol"],
			status: "Open",
			district: "Chhatrapati Sambhaji Nagar",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Open":
				return "default";
			case "24/7":
				return "secondary";
			case "Closed":
				return "destructive";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Police Station Locations</h1>
					<p className="text-muted-foreground text-lg">Find police stations, contact information, and services available at each location in Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Search className="h-6 w-6" />
							Search Locations
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-4">
							<div>
								<Label htmlFor="district">District</Label>
								<Input
									id="district"
									placeholder="Enter district name"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="area">Area</Label>
								<Input
									id="area"
									placeholder="Enter area or locality"
									className="mt-1"
								/>
							</div>
							<div className="flex items-end">
								<Button className="w-full">
									<Search className="h-4 w-4 mr-2" />
									Search
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-6">
					{locations.map((location, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<CardTitle className="text-xl flex items-center gap-2">
											<MapPin className="h-5 w-5 text-primary" />
											{location.name}
										</CardTitle>
										<CardDescription className="text-base mt-2">{location.address}</CardDescription>
									</div>
									<div className="flex flex-col gap-2">
										<Badge variant={getStatusColor(location.status)}>{location.status}</Badge>
										<Badge variant="outline">{location.district}</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-3">
										<div className="flex items-center gap-2">
											<Phone className="h-4 w-4 text-muted-foreground" />
											<span className="font-medium">{location.phone}</span>
										</div>
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-muted-foreground" />
											<span>{location.hours}</span>
										</div>
										<div className="flex items-center gap-2">
											<Users className="h-4 w-4 text-muted-foreground" />
											<span>Officer: {location.officer}</span>
										</div>
									</div>
									<div>
										<h4 className="font-semibold mb-2">Services</h4>
										<div className="flex flex-wrap gap-2">
											{location.services.map((service, serviceIndex) => (
												<Badge
													key={serviceIndex}
													variant="outline"
												>
													{service}
												</Badge>
											))}
										</div>
									</div>
								</div>
								<div className="mt-4 flex gap-2">
									<Button size="sm">
										<Phone className="h-4 w-4 mr-2" />
										Call
									</Button>
									<Button
										size="sm"
										variant="outline"
									>
										<MapPin className="h-4 w-4 mr-2" />
										Directions
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="mt-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Emergency Contact</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">For immediate police assistance in case of emergency, call our 24/7 helpline</p>
							<Button
								size="lg"
								className="bg-red-600 hover:bg-red-700"
							>
								<Phone className="h-4 w-4 mr-2" />
								Call Emergency - 112
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LocationsPage;
