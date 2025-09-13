"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { CheckCircle, Clock, FileText, Phone, Shield, Users } from "lucide-react";

const OnlineServicesPage = () => {
	const { t } = useLanguage();

	const services = [
		{
			title: "Online FIR Filing",
			description: "File First Information Reports online through our digital portal for faster processing and tracking",
			icon: <FileText className="h-5 w-5" />,
			color: "bg-blue-600",
			status: "Available",
			time: "24/7",
		},
		{
			title: "Police Verification",
			description: "Get police verification for employment, passport, or other official purposes",
			icon: <Shield className="h-5 w-5" />,
			color: "bg-green-600",
			status: "Available",
			time: "24/7",
		},
		{
			title: "Complaint Registration",
			description: "Register complaints about police services, corruption, or other grievances",
			icon: <Users className="h-5 w-5" />,
			color: "bg-orange-600",
			status: "Available",
			time: "24/7",
		},
		{
			title: "Emergency Response",
			description: "24/7 emergency helpline and immediate response services for Chhatrapati Sambhaji Nagar",
			icon: <Phone className="h-5 w-5" />,
			color: "bg-red-600",
			status: "Available",
			time: "24/7",
		},
	];

	const features = [
		{
			title: "Secure & Encrypted",
			description: "All your data is protected with advanced encryption and security measures",
			icon: <Shield className="h-5 w-5" />,
		},
		{
			title: "Fast Processing",
			description: "Quick processing and instant responses for all your service requests",
			icon: <Clock className="h-5 w-5" />,
		},
		{
			title: "Real-time Tracking",
			description: "Track the status of your applications and requests in real-time",
			icon: <CheckCircle className="h-5 w-5" />,
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Available":
				return "default";
			case "Coming Soon":
				return "secondary";
			default:
				return "outline";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Online Services</h1>
					<p className="text-muted-foreground text-lg">Access police services online 24/7 from anywhere in Chhatrapati Sambhaji Nagar. Fast, secure, and convenient digital services.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Key Features</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6">
							{features.map((feature, index) => (
								<Card
									key={index}
									className="hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											{feature.icon}
											{feature.title}
										</CardTitle>
										<CardDescription className="text-base">{feature.description}</CardDescription>
									</CardHeader>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">Available Services</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{services.map((service, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<CardTitle className="flex items-center gap-2 text-xl">
												<div className={`p-2 ${service.color} rounded-lg`}>{service.icon}</div>
												{service.title}
											</CardTitle>
											<CardDescription className="text-base mt-2">{service.description}</CardDescription>
										</div>
										<Badge variant={getStatusColor(service.status)}>{service.status}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Clock className="h-4 w-4" />
											{service.time}
										</div>
									</div>
									<Button className="w-full">Access Service</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl text-center">Benefits of Online Services</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>24/7 availability - access services anytime, anywhere</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Faster processing and reduced waiting times</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Real-time tracking and status updates</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
								<p>Secure and encrypted data transmission</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">Need Help?</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">If you need assistance with any of our online services or have technical issues, contact us</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg">
									<Phone className="h-4 w-4 mr-2" />
									Call Support
								</Button>
								<Button
									size="lg"
									variant="outline"
								>
									<FileText className="h-4 w-4 mr-2" />
									Get Help
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default OnlineServicesPage;
