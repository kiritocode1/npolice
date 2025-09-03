"use client";

import React from "react";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
	className?: string;
}

const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
	const { language, setLanguage } = useLanguage();

	const toggleLanguage = () => {
		setLanguage(language === "en" ? "mr" : "en");
	};

	return (
		<Button
			onClick={toggleLanguage}
			variant="ghost"
			size="sm"
			className={cn("flex items-center gap-2 text-sm hover:text-foreground transition-colors duration-150", className)}
			aria-label={`Switch to ${language === "en" ? "Marathi" : "English"}`}
		>
			<Globe className="h-4 w-4" />
			<span className="font-medium">{language === "en" ? "EN" : "मराठी"}</span>
		</Button>
	);
};

export default LanguageSwitch;
