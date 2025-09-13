"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

const ContactPage = () => {
	const contactInfo = [
		{
			title: "Emergency Helpline",
			value: "+91-240-247-1000",
			description: "24/7 emergency response and immediate assistance",
			icon: <Phone className="h-5 w-5" />,
		},
		{
			title: "General Information",
			value: "info.aurangabad@mahapolice.gov.in",
			description: "For general inquiries and information",
			icon: <Mail className="h-5 w-5" />,
		},
		{
			title: "Police Commissionerate",
			value: "Police Commissionerate, Chhatrapati Sambhaji Nagar - 431001",
			description: "Main administrative office location",
			icon: <MapPin className="h-5 w-5" />,
		},
		{
			title: "Office Hours",
			value: "9:00 AM - 6:00 PM (Mon-Sat)",
			description: "Administrative office timings",
			icon: <Clock className="h-5 w-5" />,
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Contact Us</h1>
					<p className="text-muted-foreground text-lg">Get in touch with Chhatrapati Sambhaji Nagar Police Department for assistance, information, or to report any concerns.</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Send us a Message</CardTitle>
							<CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
						</CardHeader>
						<CardContent>
							<form className="space-y-4">
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="name">Full Name</Label>
										<Input
											id="name"
											placeholder="Enter your full name"
											className="mt-1"
										/>
									</div>
									<div>
										<Label htmlFor="email">Email Address</Label>
										<Input
											id="email"
											type="email"
											placeholder="Enter your email address"
											className="mt-1"
										/>
									</div>
								</div>
								<div>
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										placeholder="Enter your phone number"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="subject">Subject</Label>
									<Input
										id="subject"
										placeholder="Enter the subject of your message"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										placeholder="Enter your message here"
										className="mt-1"
										rows={4}
									/>
								</div>
								<Button className="w-full">
									<Send className="h-4 w-4 mr-2" />
									Send Message
								</Button>
							</form>
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Contact Information</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{contactInfo.map((info, index) => (
										<div
											key={index}
											className="flex items-start gap-3"
										>
											<div className="p-2 bg-primary/10 rounded-lg">{info.icon}</div>
											<div className="flex-1">
												<h3 className="font-semibold">{info.title}</h3>
												<p className="text-lg font-medium text-primary">{info.value}</p>
												<p className="text-sm text-muted-foreground">{info.description}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">Emergency Contact</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-center space-y-4">
									<p className="text-lg">For immediate police assistance in case of emergency</p>
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
			</div>
		</div>
	);
};

export default ContactPage;
