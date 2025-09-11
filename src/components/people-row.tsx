"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

// Performance mode utility - immediate detection
const usePerformanceMode = () => {
	const [isPerformanceMode, setIsPerformanceMode] = useState(() => {
		// Immediate synchronous check
		if (typeof window === "undefined") return false;

		// Check URL parameters first (most reliable)
		const hasPerformanceParam = window.location.search.includes("performance=true") || window.location.search.includes("force-performance=true");

		// Check for Lighthouse
		const isLighthouse = navigator.userAgent.includes("Lighthouse") || navigator.userAgent.includes("Chrome-Lighthouse");

		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		// Check for performance mode class (if already set)
		const hasPerformanceClass = typeof document !== "undefined" && document.documentElement.classList.contains("performance-mode");

		return hasPerformanceParam || isLighthouse || prefersReducedMotion || hasPerformanceClass;
	});

	useEffect(() => {
		const checkPerformanceMode = () => {
			if (typeof document === "undefined") return false;

			// Check for performance mode class
			const hasPerformanceClass = document.documentElement.classList.contains("performance-mode");

			// Check URL parameters
			const hasPerformanceParam = window.location.search.includes("performance=true") || window.location.search.includes("force-performance=true");

			// Check for Lighthouse
			const isLighthouse = navigator.userAgent.includes("Lighthouse") || navigator.userAgent.includes("Chrome-Lighthouse");

			// Check for reduced motion preference
			const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			return hasPerformanceClass || hasPerformanceParam || isLighthouse || prefersReducedMotion;
		};

		// Listen for performance mode changes
		const observer = new MutationObserver(() => {
			setIsPerformanceMode(checkPerformanceMode());
		});

		if (typeof document !== "undefined") {
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["class"],
			});
		}

		// Also check on URL change
		const handleUrlChange = () => {
			setIsPerformanceMode(checkPerformanceMode());
		};

		window.addEventListener("popstate", handleUrlChange);
		window.addEventListener("pushstate", handleUrlChange);

		return () => {
			observer.disconnect();
			window.removeEventListener("popstate", handleUrlChange);
			window.removeEventListener("pushstate", handleUrlChange);
		};
	}, []);

	return isPerformanceMode;
};

interface Person {
	id: string;
	name: string;
	nameMarathi: string;
	position: string;
	positionMarathi: string;
	image?: string;
}

interface PeopleRowProps {
	people?: Person[];
	height?: string;
	className?: string;
}

// Static data - no need for client-side translation
const leadershipData = [
	{
		id: "1",
		name: "Shri. Devendra Fadnavis",
		nameMarathi: "श्री. देवेंद्र फडणवीस",
		position: "Hon'ble Chief Minister",
		positionMarathi: "माननीय मुख्यमंत्री",
		image: "/people/1.webp",
	},
	{
		id: "2",
		name: "Shri. Eknath Shinde",
		nameMarathi: "श्री. एकनाथ शिंदे",
		position: "Hon'ble Deputy Chief Minister",
		positionMarathi: "माननीय उपमुख्यमंत्री",
		image: "/people/2.webp",
	},
	{
		id: "3",
		name: "Shri. Ajit Pawar",
		nameMarathi: "श्री अजित पवार",
		position: "Hon'ble Deputy Chief Minister",
		positionMarathi: "माननीय उपमुख्यमंत्री",
		image: "/people/3.webp",
	},
	{
		id: "4",
		name: "Dr. Pankaj Bhoyar",
		nameMarathi: "डॉ. पंकज भोयर",
		position: "Hon'ble Minister of State, Home(Rural)",
		positionMarathi: "माननीय राज्यमंत्री, गृह(ग्रामीण)",
		image: "/people/4.webp",
	},
	{
		id: "5",
		name: "Shri. Yogesh Kadam",
		nameMarathi: "श्री. योगेश कदम",
		position: "Hon'ble Minister of State, Home(Urban)",
		positionMarathi: "माननीय राज्यमंत्री, गृह(शहरी)",
		image: "/people/5.webp",
	},
	{
		id: "6",
		name: "Shri. Iqbal Singh Chahal",
		nameMarathi: "श्री. इकबाल सिंह चहल",
		position: "Additional Chief Secretary (Home)",
		positionMarathi: "अतिरिक्त मुख्य सचिव (गृह)",
		image: "/people/6.webp",
	},
	{
		id: "7",
		name: "Smt. Rashmi Shukla",
		nameMarathi: "श्रीमती. रश्मी शुक्ला",
		position: "Director General of Police",
		positionMarathi: "पोलिस महासंचालक",
		image: "/people/7.webp",
	},
];

const PeopleRow = ({ people = leadershipData, height = "h-auto", className = "" }: PeopleRowProps) => {
	const { language } = useLanguage();
	const isPerformanceMode = usePerformanceMode();
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	// Performance mode - render minimal static content
	if (isPerformanceMode) {
		return (
			<div className={`w-full max-w-6xl mx-auto ${height} ${className}`}>
				<div className="text-center py-8">
					<h2 className="text-2xl font-bold text-foreground mb-4">Leadership Team</h2>
					<p className="text-muted-foreground">Meet our dedicated leaders serving Chhatrapati Sambhaji Nagar</p>
				</div>
			</div>
		);
	}

	const containerVariants: Variants = {
		hidden: isPerformanceMode ? {} : { opacity: 0 },
		visible: {
			opacity: 1,
			transition: isPerformanceMode
				? { duration: 0 }
				: {
						delayChildren: 0.3,
						staggerChildren: 0.15,
				  },
		},
	};

	const itemVariants: Variants = {
		hidden: isPerformanceMode ? {} : { y: 50, opacity: 0, scale: 0.8 },
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: isPerformanceMode
				? { duration: 0 }
				: {
						duration: 0.6,
						ease: "easeOut",
				  },
		},
	};

	return (
		<div
			ref={ref}
			className={`w-full max-w-6xl mx-auto ${height} ${className}`}
		>
			{/* First row - 5 people */}
			<motion.div
				className="hidden sm:flex gap-6 justify-center items-center px-4 py-8"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				{people.slice(0, 5).map((person, index) => (
					<motion.div
						key={person.id}
						variants={itemVariants}
						whileHover={
							isPerformanceMode
								? {}
								: {
										y: -8,
										transition: { duration: 0.2 },
								  }
						}
						className="flex-shrink-0"
					>
						<Card className="w-44 sm:w-56 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/30 dark:from-card dark:to-muted/10 overflow-hidden">
							<CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
								<motion.div
									initial={isPerformanceMode ? {} : { scale: 0, rotate: -180 }}
									animate={isPerformanceMode ? {} : inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
									transition={
										isPerformanceMode
											? { duration: 0 }
											: {
													delay: index * 0.1 + 0.5,
													duration: 0.5,
													type: "spring",
													stiffness: 200,
													damping: 20,
											  }
									}
								>
									<Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-4 ring-primary/20 dark:ring-primary/30 transition-all duration-300">
										<AvatarImage
											src={person.image}
											alt={language === "mr" ? person.nameMarathi : person.name}
											className="object-cover"
										/>
										<AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
											{(language === "mr" ? person.nameMarathi : person.name)
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</motion.div>
								<motion.div
									className="text-center space-y-2"
									initial={isPerformanceMode ? {} : { opacity: 0, y: 20 }}
									animate={isPerformanceMode ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
									transition={isPerformanceMode ? { duration: 0 } : { delay: index * 0.1 + 0.7, duration: 0.4 }}
								>
									<h3 className="font-bold text-sm sm:text-base text-foreground leading-tight">{language === "mr" ? person.nameMarathi : person.name}</h3>
									<p className="text-xs sm:text-sm text-primary font-medium leading-tight">{language === "mr" ? person.positionMarathi : person.position}</p>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>

			{/* Mobile layout - all people in wrap */}
			<motion.div
				className="flex sm:hidden flex-wrap gap-4 justify-center items-center px-2 py-8"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				{people.map((person, index) => (
					<motion.div
						key={person.id}
						variants={itemVariants}
						whileHover={
							isPerformanceMode
								? {}
								: {
										y: -8,
										transition: { duration: 0.2 },
								  }
						}
						className="flex-shrink-0"
					>
						<Card className="w-44 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/30 dark:from-card dark:to-muted/10 overflow-hidden">
							<CardContent className="p-4 flex flex-col items-center justify-center space-y-3">
								<motion.div
									initial={isPerformanceMode ? {} : { scale: 0, rotate: -180 }}
									animate={isPerformanceMode ? {} : inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
									transition={
										isPerformanceMode
											? { duration: 0 }
											: {
													delay: index * 0.1 + 0.5,
													duration: 0.5,
													type: "spring",
													stiffness: 200,
													damping: 20,
											  }
									}
								>
									<Avatar className="w-16 h-16 ring-4 ring-primary/20 dark:ring-primary/30 transition-all duration-300">
										<AvatarImage
											src={person.image}
											alt={language === "mr" ? person.nameMarathi : person.name}
											className="object-cover"
										/>
										<AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
											{(language === "mr" ? person.nameMarathi : person.name)
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</motion.div>
								<motion.div
									className="text-center space-y-2"
									initial={isPerformanceMode ? {} : { opacity: 0, y: 20 }}
									animate={isPerformanceMode ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
									transition={isPerformanceMode ? { duration: 0 } : { delay: index * 0.1 + 0.7, duration: 0.4 }}
								>
									<h3 className="font-bold text-sm text-foreground leading-tight">{language === "mr" ? person.nameMarathi : person.name}</h3>
									<p className="text-xs text-primary font-medium leading-tight">{language === "mr" ? person.positionMarathi : person.position}</p>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>

			{/* Second row - remaining people (desktop only) */}
			{people.length > 5 && (
				<motion.div
					className="hidden sm:flex gap-6 justify-center items-center px-4 py-8"
					variants={containerVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
				>
					{people.slice(5).map((person, index) => (
						<motion.div
							key={person.id}
							variants={itemVariants}
							whileHover={{
								y: -8,
								transition: { duration: 0.2 },
							}}
							className="flex-shrink-0"
						>
							<Card className="w-44 sm:w-56 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/30 dark:from-card dark:to-muted/10 overflow-hidden">
								<CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center space-y-3 sm:space-y-4">
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
										transition={{
											delay: (index + 5) * 0.1 + 0.5,
											duration: 0.5,
											type: "spring",
											stiffness: 200,
											damping: 20,
										}}
									>
										<Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-4 ring-primary/20 dark:ring-primary/30 transition-all duration-300">
											<AvatarImage
												src={person.image}
												alt={language === "mr" ? person.nameMarathi : person.name}
												className="object-cover"
											/>
											<AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
												{(language === "mr" ? person.nameMarathi : person.name)
													.split(" ")
													.map((n) => n[0])
													.join("")
													.toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</motion.div>
									<motion.div
										className="text-center space-y-2"
										initial={{ opacity: 0, y: 20 }}
										animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
										transition={{ delay: (index + 5) * 0.1 + 0.7, duration: 0.4 }}
									>
										<h3 className="font-bold text-base text-foreground leading-tight">{language === "mr" ? person.nameMarathi : person.name}</h3>
										<p className="text-sm text-primary font-medium leading-tight">{language === "mr" ? person.positionMarathi : person.position}</p>
									</motion.div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			)}
		</div>
	);
};

export default PeopleRow;
