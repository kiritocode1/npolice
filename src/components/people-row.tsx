import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { useInView } from "react-intersection-observer";

interface Person {
	id: string;
	name: string;
	nameMarathi: string;
	position: string;
	positionMarathi: string;
	image?: string;
}

interface PeopleRowProps {
	people: Person[];
	height?: string;
	className?: string;
}

const PeopleRow = ({ people, height = "h-auto", className = "" }: PeopleRowProps) => {
	const { language } = useLanguage();
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.15,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 50, opacity: 0, scale: 0.8 },
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
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
										delay: index * 0.1 + 0.5,
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
									transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
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
						whileHover={{
							y: -8,
							transition: { duration: 0.2 },
						}}
						className="flex-shrink-0"
					>
						<Card className="w-44 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-background to-muted/30 dark:from-card dark:to-muted/10 overflow-hidden">
							<CardContent className="p-4 flex flex-col items-center justify-center space-y-3">
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
									transition={{
										delay: index * 0.1 + 0.5,
										duration: 0.5,
										type: "spring",
										stiffness: 200,
										damping: 20,
									}}
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
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
									transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
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
