"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import { Clock, Download, FileText, Search } from "lucide-react";

const RTIPage = () => {
	const { t } = useLanguage();

	const rtiTypes = [
		{
			title: "Police Records",
			description: "Access police records, case files, and investigation reports from Chhatrapati Sambhaji Nagar Police",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: "Budget Information",
			description: "Get information about police budget, expenditure, and financial allocations",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: "Policies & Procedures",
			description: "Access police policies, procedures, and guidelines for various operations",
			icon: <FileText className="h-5 w-5" />,
		},
		{
			title: "Administrative Decisions",
			description: "Get information about administrative decisions, transfers, and appointments",
			icon: <FileText className="h-5 w-5" />,
		},
	];

	const recentRequests = [
		{
			id: "RTI001234",
			subject: "Request for police station wise crime statistics for 2023",
			date: "2024-01-15",
			status: "Under Review",
			deadline: "2024-02-15",
		},
		{
			id: "RTI001235",
			subject: "Information about police recruitment process and vacancies",
			date: "2024-01-10",
			status: "Response Ready",
			deadline: "2024-02-10",
		},
		{
			id: "RTI001236",
			subject: "Details of traffic violation fines collected in last quarter",
			date: "2024-01-05",
			status: "Completed",
			deadline: "2024-02-05",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Under Review":
				return "default";
			case "Response Ready":
				return "secondary";
			case "Completed":
				return "outline";
			default:
				return "destructive";
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold mb-4">RTI</h1>
					<p className="text-muted-foreground text-lg">Right to Information (RTI) services for accessing police records and information from Chhatrapati Sambhaji Nagar Police Department.</p>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Search className="h-6 w-6" />
							Search RTI Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="rti-number">RTI Number</Label>
									<Input
										id="rti-number"
										placeholder="Enter RTI number (e.g., RTI/2024/001234)"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="mobile">Mobile Number</Label>
									<Input
										id="mobile"
										placeholder="Enter your mobile number"
										className="mt-1"
									/>
								</div>
							</div>
							<Button className="w-full">
								<Search className="h-4 w-4 mr-2" />
								Search Status
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-center">RTI Information Types</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{rtiTypes.map((type, index) => (
							<Card
								key={index}
								className="hover:shadow-lg transition-shadow"
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										{type.icon}
										{type.title}
									</CardTitle>
									<CardDescription className="text-sm">{type.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<Button
										className="w-full"
										size="sm"
									>
										Request Information
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<FileText className="h-6 w-6" />
							New RTI Request
						</CardTitle>
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
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									placeholder="Brief description of information requested"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="description">Detailed Description</Label>
								<Textarea
									id="description"
									placeholder="Provide detailed description of the information you need"
									className="mt-1"
									rows={4}
								/>
							</div>
							<Button className="w-full">
								<FileText className="h-4 w-4 mr-2" />
								Submit Request
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Clock className="h-6 w-6" />
							Recent RTI Requests
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentRequests.map((request, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="font-semibold">{request.id}</span>
											<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>{request.status}</span>
										</div>
										<p className="text-sm text-muted-foreground">{request.subject}</p>
										<p className="text-xs text-muted-foreground mt-1">
											Submitted: {request.date} | Deadline: {request.deadline}
										</p>
									</div>
									<Button
										size="sm"
										variant="outline"
									>
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default RTIPage;
