"use client";

import { Check, Copy, MessageCircle, Phone, X } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

const drawerVariants = {
	hidden: {
		x: "100%",
		opacity: 0,
		rotateY: 5,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		x: 0,
		opacity: 1,
		rotateY: 0,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
			mass: 0.8,
			staggerChildren: 0.07,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: {
		x: 20,
		opacity: 0,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 30,
			mass: 0.8,
		},
	},
};

const emergencyContacts = [
	{ name: "SOS Dial", numbers: ["100", "112"], isEmergency: true },
	{ name: "Main Control", numbers: ["0240-2240500", "9226514013"], hasWhatsApp: true },
	{ name: "Damini Patak", numbers: ["1091", "0240-2240500"], hasWhatsApp: true },
	{ name: "Traffic Helpline", numbers: ["8454999999"], hasWhatsApp: true },
	{ name: "Child Care", numbers: ["1098"] },
	{ name: "Elder Helpline", numbers: ["1090"] },
	{ name: "Women Helpline", numbers: ["1091"] },
	{ name: "Cyber Crime", numbers: ["1930", "0240-2326514"] },
	{ name: "Narcotics", numbers: ["0240-2240500", "9529019061"] },
];

const socialMediaIcons = [
	{ name: "Facebook", icon: "f", color: "bg-blue-600" },
	{ name: "YouTube", icon: "▶", color: "bg-red-600" },
	{ name: "Instagram", icon: "📷", color: "bg-pink-600" },
	{ name: "Twitter", icon: "🐦", color: "bg-blue-400" },
	{ name: "WhatsApp", icon: "💬", color: "bg-green-500" },
	{ name: "Location", icon: "📍", color: "bg-gray-600" },
];

const EmergencyContactsDrawer = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [copiedNumber, setCopiedNumber] = React.useState<string | null>(null);

	const copyToClipboard = async (number: string) => {
		try {
			await navigator.clipboard.writeText(number);
			setCopiedNumber(number);
			setTimeout(() => setCopiedNumber(null), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const makeCall = (number: string) => {
		window.open(`tel:${number}`, "_self");
	};

	const openWhatsApp = (number: string) => {
		window.open(`https://wa.me/91${number.replace(/\D/g, "")}`, "_blank");
	};

	// Keyboard shortcut handler
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "F3") {
				event.preventDefault();
				setIsOpen(!isOpen);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	return (
		<div className="fixed bottom-28 right-8 z-50">
			<Drawer
				direction="right"
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DrawerTrigger asChild>
					<div className="group">
						<Button
							aria-label="Emergency Contacts"
							className="flex items-center justify-center gap-3 rounded-full w-16 group-hover:w-64 h-16 bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300 overflow-hidden pr-4 pl-0 group-hover:pl-6 "
						>
							<Phone className="w-12 h-12 shrink-0 translate-x-1 hover:translate-x-0 " />
							<div className="overflow-hidden max-w-0 group-hover:max-w-[160px] transition-all duration-300">
								<span className="block text-white text-base font-medium whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
									Emergency Contacts
								</span>
							</div>
						</Button>
					</div>
				</DrawerTrigger>
				<DrawerContent className="h-full w-1/2 ml-auto p-6 rounded-l-2xl shadow-xl">
					<motion.div
						variants={drawerVariants}
						initial="hidden"
						animate="visible"
						className="h-full flex flex-col"
					>
						{/* Header */}
						<motion.div variants={itemVariants}>
							<DrawerHeader className="px-0 pb-4">
								<div className="flex items-center justify-between">
									<DrawerTitle className="text-xl font-semibold text-black dark:text-white">Emergency Contacts</DrawerTitle>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											className="text-black border-gray-200 hover:bg-gray-50 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
										>
											Ctrl+F3
										</Button>
										<DrawerClose asChild>
											<Button
												variant="ghost"
												size="sm"
												className="h-8 w-8 p-0"
											>
												<X className="w-4 h-4" />
											</Button>
										</DrawerClose>
									</div>
								</div>
							</DrawerHeader>
						</motion.div>

						{/* Emergency Contacts Table */}
						<motion.div
							variants={itemVariants}
							className="flex-1 overflow-y-auto"
						>
							<div className="space-y-3">
								{emergencyContacts.map((contact, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										transition={{ delay: index * 0.05 }}
										className={`p-4 rounded-lg border ${
											contact.isEmergency ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600"
										}`}
									>
										<div className="flex items-center justify-between mb-2">
											<h3 className={`font-semibold ${contact.isEmergency ? "text-red-700 dark:text-red-300" : "text-gray-900 dark:text-white"}`}>{contact.name}</h3>
											{contact.isEmergency && (
												<span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-200 rounded-full dark:bg-red-800 dark:text-red-200">EMERGENCY</span>
											)}
										</div>
										<div className="space-y-2">
											{contact.numbers.map((number, numIndex) => (
												<div
													key={numIndex}
													className="flex items-center gap-2"
												>
													<span className="text-sm text-gray-600 dark:text-gray-300 font-mono">{number}</span>
													<div className="flex gap-1">
														<Button
															size="sm"
															variant="outline"
															onClick={() => makeCall(number)}
															className="h-7 px-2"
														>
															<Phone className="w-3 h-3" />
														</Button>
														<Button
															size="sm"
															variant="outline"
															onClick={() => copyToClipboard(number)}
															className="h-7 px-2"
														>
															{copiedNumber === number ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
														</Button>
														{contact.hasWhatsApp && (
															<Button
																size="sm"
																variant="outline"
																onClick={() => openWhatsApp(number)}
																className="h-7 px-2 text-green-600 hover:text-green-700"
															>
																<MessageCircle className="w-3 h-3" />
															</Button>
														)}
													</div>
												</div>
											))}
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>


						{/* Footer */}
						<motion.div
							variants={itemVariants}
							className="mt-4 text-center"
						>
							<span className="text-xs text-gray-500 dark:text-gray-400">Chhatrapati Sambhajinagar City Police</span>
						</motion.div>
					</motion.div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default EmergencyContactsDrawer;
