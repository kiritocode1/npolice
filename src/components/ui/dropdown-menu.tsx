"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type DropdownOption = {
	label: string;
	href?: string;
	onClick?: () => void;
	Icon?: React.ReactNode;
};

type DropdownMenuProps = {
	options: DropdownOption[];
	children: React.ReactNode;
	className?: string;
	buttonClassName?: string;
	onOptionClick?: () => void;
};

const DropdownMenu = ({ options, children, className, buttonClassName, onOptionClick }: DropdownMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: DropdownOption) => {
		if (option.onClick) {
			option.onClick();
		}
		if (onOptionClick) {
			onOptionClick();
		}
		setIsOpen(false);
	};

	return (
		<div className={cn("relative", className)}>
			<Button
				onClick={toggleDropdown}
				variant="ghost"
				className={cn("px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-150 relative group", buttonClassName)}
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				{children}
				<motion.span
					className="ml-1"
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
				>
					<ChevronDown className="h-3 w-3" />
				</motion.span>
				<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
			</Button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ y: -10, opacity: 0, scale: 0.95 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: -10, opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="absolute z-50 w-48 mt-2 p-1 bg-background/95 backdrop-blur-lg rounded-lg shadow-lg border border-border/50 flex flex-col gap-1"
					>
						{options && options.length > 0 ? (
							options.map((option, index) => (
								<motion.div
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{
										duration: 0.15,
										delay: index * 0.05,
									}}
									key={option.label}
								>
									{option.href ? (
										<a
											href={option.href}
											className="px-3 py-2 cursor-pointer text-sm rounded-md w-full text-left flex items-center gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
											onClick={() => handleOptionClick(option)}
										>
											{option.Icon}
											{option.label}
										</a>
									) : (
										<button
											onClick={() => handleOptionClick(option)}
											className="px-3 py-2 cursor-pointer text-sm rounded-md w-full text-left flex items-center gap-x-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
										>
											{option.Icon}
											{option.label}
										</button>
									)}
								</motion.div>
							))
						) : (
							<div className="px-3 py-2 text-muted-foreground text-xs">No options</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export { DropdownMenu };
