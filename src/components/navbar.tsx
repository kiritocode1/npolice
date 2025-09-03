"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";
import { Moon, Sun, Equal, X, Shield, Users, FileText, Phone, AlertTriangle, Info, Building, MapPin, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import NationalEmblem from "./National-Emblem";
import { DropdownMenu } from "./ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import LanguageSwitch from "./language-switch";

const getMenuItems = (t: (key: string) => string) => [
	{
		name: t("nav.home"),
		href: "/",
		options: [
			{ label: t("nav.home.dashboard"), href: "/", Icon: <Shield className="h-4 w-4" /> },
			{ label: t("nav.home.news"), href: "/news", Icon: <FileText className="h-4 w-4" /> },
			{ label: t("nav.home.announcements"), href: "/announcements", Icon: <AlertTriangle className="h-4 w-4" /> },
		],
	},
	{
		name: t("nav.about"),
		href: "/about",
		options: [
			{ label: t("nav.about.us"), href: "/about", Icon: <Info className="h-4 w-4" /> },
			{ label: t("nav.about.mission"), href: "/mission", Icon: <Shield className="h-4 w-4" /> },
			{ label: t("nav.about.leadership"), href: "/leadership", Icon: <Users className="h-4 w-4" /> },
			{ label: t("nav.about.history"), href: "/history", Icon: <FileText className="h-4 w-4" /> },
		],
	},
	{
		name: t("nav.services"),
		href: "/services",
		options: [
			{ label: t("nav.services.verification"), href: "/verification", Icon: <UserCheck className="h-4 w-4" /> },
			{ label: t("nav.services.fir"), href: "/fir", Icon: <FileText className="h-4 w-4" /> },
			{ label: t("nav.services.traffic"), href: "/traffic", Icon: <MapPin className="h-4 w-4" /> },
			{ label: t("nav.services.women"), href: "/women-safety", Icon: <Shield className="h-4 w-4" /> },
			{ label: t("nav.services.community"), href: "/community", Icon: <Users className="h-4 w-4" /> },
		],
	},
	{
		name: t("nav.contact"),
		href: "/contact",
		options: [
			{ label: t("nav.contact.us"), href: "/contact", Icon: <Phone className="h-4 w-4" /> },
			{ label: t("nav.contact.stations"), href: "/stations", Icon: <Building className="h-4 w-4" /> },
			{ label: t("nav.contact.emergency"), href: "/emergency-contacts", Icon: <AlertTriangle className="h-4 w-4" /> },
			{ label: t("nav.contact.feedback"), href: "/feedback", Icon: <FileText className="h-4 w-4" /> },
		],
	},
	{
		name: t("nav.emergency"),
		href: "/emergency",
		options: [
			{ label: t("nav.emergency.call"), href: "tel:112", Icon: <Phone className="h-4 w-4" /> },
			{ label: t("nav.emergency.women"), href: "tel:1091", Icon: <Shield className="h-4 w-4" /> },
			{ label: t("nav.emergency.child"), href: "tel:1098", Icon: <Users className="h-4 w-4" /> },
			{ label: t("nav.emergency.report"), href: "/report-crime", Icon: <AlertTriangle className="h-4 w-4" /> },
		],
	},
];

interface ThemeToggleProps {
	className?: string;
}

function ThemeToggle({ className }: ThemeToggleProps) {
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);

	const base = cn("flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300", className);
	const containerClass = isDark ? "bg-zinc-950 border border-zinc-800" : "bg-white border border-zinc-200";
	const knobClass = isDark ? "transform translate-x-0 bg-zinc-800" : "transform translate-x-8 bg-gray-200";

	if (!mounted) return <div className={cn(base, "bg-white/50 border border-zinc-200")} />;

	return (
		<div
			className={cn(base, containerClass)}
			onClick={() => setTheme(isDark ? "light" : "dark")}
			role="button"
			tabIndex={0}
			aria-label="Toggle theme"
		>
			<div className="flex justify-between items-center w-full">
				<div className={cn("flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300", knobClass)}>
					{isDark ? (
						<Moon
							className="w-4 h-4 text-white"
							strokeWidth={1.5}
						/>
					) : (
						<Sun
							className="w-4 h-4 text-gray-700"
							strokeWidth={1.5}
						/>
					)}
				</div>
				<div className={cn("flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300", isDark ? "bg-transparent" : "transform -translate-x-8")}>
					{isDark ? (
						<Sun
							className="w-4 h-4 text-gray-500"
							strokeWidth={1.5}
						/>
					) : (
						<Moon
							className="w-4 h-4 text-black"
							strokeWidth={1.5}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

const AccessibilityMenu = () => {
	const { t } = useLanguage();

	return (
		<div className="flex items-center gap-2 justify-end p-2 z-10 bg-background/95 backdrop-blur-sm">
			<Link
				href="#main-content"
				className="hover:underline text-sm"
			>
				{t("accessibility.skip")}
			</Link>
			<span className="text-muted-foreground">|</span>
			<Link
				href="/screen-reader-access"
				className="hover:underline text-sm"
			>
				{t("accessibility.screen")}
			</Link>
			<Link
				href="/sitemap.xml"
				className="hover:underline text-sm"
			>
				{t("accessibility.sitemap")}
			</Link>
			<span className="text-muted-foreground">|</span>
			<LanguageSwitch />
			<div className="flex -space-x-px">
				<Button
					variant="outline"
					className="rounded-r-none focus:z-10"
					onClick={() => {
						const currentSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
						const newSize = Math.min(currentSize + 2, 24);
						document.body.style.fontSize = `${newSize}px`;
					}}
					aria-label={t("accessibility.font.increase")}
				>
					+A
				</Button>
				<Button
					variant="outline"
					className="rounded-none focus:z-10"
					onClick={() => {
						document.body.style.fontSize = "16px";
					}}
					aria-label={t("accessibility.font.reset")}
				>
					A
				</Button>
				<Button
					variant="outline"
					className="rounded-l-none focus:z-10"
					onClick={() => {
						const currentSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
						const newSize = Math.max(currentSize - 2, 12);
						document.body.style.fontSize = `${newSize}px`;
					}}
					aria-label={t("accessibility.font.decrease")}
				>
					-A
				</Button>
			</div>
			<ThemeToggle />
		</div>
	);
};

const Navbar = () => {
	const [menuState, setMenuState] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const { t } = useLanguage();

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const menuItems = getMenuItems(t);

	return (
		<header>
			<AccessibilityMenu />
			<nav
				data-state={menuState && "active"}
				className="fixed left-0 w-full z-20 px-2 top-12"
			>
				<div className={cn("mx-auto w-full px-6 transition-all duration-300 lg:px-12", isScrolled && "bg-background/80 backdrop-blur-lg border-b border-border/50")}>
					<div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 py-4">
						<div className="flex w-full justify-between lg:w-auto">
							<Link
								href="/"
								aria-label={t("dept.home")}
								className="flex gap-3 items-center group"
							>
								<div className="transition-transform duration-200 group-hover:scale-105">
									<NationalEmblem className="w-12 h-12" />
								</div>
								<div className="hidden sm:block">
									<p className="font-bold text-lg lg:text-xl tracking-tight">{t("dept.name")}</p>
									<p className="text-sm text-muted-foreground">{t("dept.type")}</p>
								</div>
							</Link>

							<button
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState ? t("accessibility.menu.close") : t("accessibility.menu.open")}
								aria-expanded={menuState}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
							>
								<Equal className="data-[state=active]:rotate-180 data-[state=active]:scale-0 data-[state=active]:opacity-0 m-auto size-6 duration-200" />
								<X className="data-[state=active]:rotate-0 data-[state=active]:scale-100 data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</button>
						</div>

						<div className="absolute inset-0 m-auto hidden size-fit lg:block">
							<nav
								role="navigation"
								aria-label="Main navigation"
							>
								<ul className="flex gap-6 text-sm">
									{menuItems.map((item, index) => (
										<li key={index}>
											<DropdownMenu
												options={item.options}
												onOptionClick={() => setMenuState(false)}
											>
												{item.name}
											</DropdownMenu>
										</li>
									))}
								</ul>
							</nav>
						</div>

						<div
							className={cn(
								"bg-background data-[state=active]:block lg:data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
								menuState && "block lg:flex",
							)}
						>
							<div className="lg:hidden">
								<nav
									role="navigation"
									aria-label="Mobile navigation"
								>
									<ul className="space-y-4 text-base">
										{menuItems.map((item, index) => (
											<li key={index}>
												<div className="space-y-2">
													<Link
														href={item.href}
														className="text-foreground font-medium block duration-150 transition-colors"
														onClick={() => setMenuState(false)}
													>
														{item.name}
													</Link>
													<ul className="ml-4 space-y-1">
														{item.options.map((option, optionIndex) => (
															<li key={optionIndex}>
																{option.href ? (
																	<Link
																		href={option.href}
																		className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm duration-150 transition-colors"
																		onClick={() => setMenuState(false)}
																	>
																		{option.Icon}
																		{option.label}
																	</Link>
																) : (
																	<button
																		onClick={() => setMenuState(false)}
																		className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm duration-150 transition-colors"
																	>
																		{option.Icon}
																		{option.label}
																	</button>
																)}
															</li>
														))}
													</ul>
												</div>
											</li>
										))}
									</ul>
								</nav>
							</div>
							<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-2 sm:space-y-0 md:w-fit">
								<Button
									asChild
									variant="outline"
									size="sm"
									className={cn(isScrolled && "lg:hidden")}
								>
									<Link href="tel:112">
										<span>{t("nav.emergency.call")}</span>
									</Link>
								</Button>
								<Button
									asChild
									size="sm"
									className={cn(isScrolled && "lg:hidden")}
								>
									<Link href="/contact">
										<span>{t("btn.contact")}</span>
									</Link>
								</Button>
								<Button
									asChild
									size="sm"
									className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
								>
									<Link href="tel:112">
										<span>{t("btn.emergency")}</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
