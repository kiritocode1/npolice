"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Star, ThumbsUp } from "lucide-react";

const FeedbackPage = () => {
	const feedbackTypes = [
		{
			value: "service",
			label: "Police Services",
			description: "Feedback about police services, response time, and overall service quality in Chhatrapati Sambhaji Nagar",
		},
		{
			value: "officer",
			label: "Officer Performance",
			description: "Feedback about individual police officers, their behavior, and professionalism",
		},
		{
			value: "facility",
			label: "Police Station Facilities",
			description: "Feedback about police station infrastructure, cleanliness, and facilities",
		},
		{
			value: "website",
			label: "Website & Digital Services",
			description: "Feedback about the police website, online services, and digital platforms",
		},
	];

	const ratingOptions = [
		{ value: "5", label: "Excellent" },
		{ value: "4", label: "Good" },
		{ value: "3", label: "Average" },
		{ value: "2", label: "Poor" },
		{ value: "1", label: "Very Poor" },
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">Feedback</h1>
					<p className="text-muted-foreground text-lg">Share your feedback about police services in Chhatrapati Sambhaji Nagar. Your input helps us improve and serve you better.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<MessageSquare className="h-6 w-6" />
							Feedback Form
						</CardTitle>
						<CardDescription>Please share your honest feedback about our services. All fields are optional except for the message.</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-6">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name">Name (Optional)</Label>
									<Input
										id="name"
										placeholder="Enter your name"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="email">Email (Optional)</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email address"
										className="mt-1"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="phone">Phone (Optional)</Label>
								<Input
									id="phone"
									placeholder="Enter your phone number"
									className="mt-1"
								/>
							</div>

							<div>
								<Label>Feedback Type</Label>
								<RadioGroup
									className="mt-2"
									defaultValue="service"
								>
									{feedbackTypes.map((type) => (
										<div
											key={type.value}
											className="flex items-start space-x-2"
										>
											<RadioGroupItem
												value={type.value}
												id={type.value}
											/>
											<Label
												htmlFor={type.value}
												className="flex-1"
											>
												<div className="font-medium">{type.label}</div>
												<div className="text-sm text-muted-foreground">{type.description}</div>
											</Label>
										</div>
									))}
								</RadioGroup>
							</div>

							<div>
								<Label>Overall Rating</Label>
								<RadioGroup
									className="mt-2"
									defaultValue="5"
								>
									{ratingOptions.map((rating) => (
										<div
											key={rating.value}
											className="flex items-center space-x-2"
										>
											<RadioGroupItem
												value={rating.value}
												id={`rating-${rating.value}`}
											/>
											<Label
												htmlFor={`rating-${rating.value}`}
												className="flex items-center gap-2"
											>
												<Star className="h-4 w-4 fill-yellow-400" />
												{rating.label}
											</Label>
										</div>
									))}
								</RadioGroup>
							</div>

							<div>
								<Label htmlFor="subject">Subject (Optional)</Label>
								<Input
									id="subject"
									placeholder="Brief description of your feedback"
									className="mt-1"
								/>
							</div>

							<div>
								<Label htmlFor="message">Your Feedback *</Label>
								<Textarea
									id="message"
									placeholder="Please share your detailed feedback about our services"
									className="mt-1"
									rows={5}
								/>
							</div>

							<Button
								className="w-full"
								size="lg"
							>
								<Send className="h-4 w-4 mr-2" />
								Submit Feedback
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<ThumbsUp className="h-6 w-6" />
							Thank You for Your Feedback
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center space-y-4">
							<p className="text-lg">Your feedback is valuable to us and helps us improve our services. We appreciate you taking the time to share your thoughts.</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button variant="outline">
									<MessageSquare className="h-4 w-4 mr-2" />
									Contact Us
								</Button>
								<Button variant="outline">
									<Star className="h-4 w-4 mr-2" />
									Rate Our Services
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FeedbackPage;
