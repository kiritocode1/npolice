"use client";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { AlertTriangle, Building, Equal, FileText, Info, MapPin, Moon, Phone, Shield, Sun, UserCheck, Users, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LanguageSwitch from "./language-switch";
import NationalEmblem from "./National-Emblem";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";

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
		<div className="hidden lg:flex items-center gap-2 justify-end p-2 z-10 bg-background/95 backdrop-blur-sm">
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
	const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);
	const [openDesktopDropdown, setOpenDesktopDropdown] = React.useState<number | null>(null);
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
				<div className={cn("w-full px-4 transition-all duration-300 lg:px-8", isScrolled && "bg-background/80 backdrop-blur-lg border-b border-border/50")}>
					<div className="relative flex flex-wrap items-center justify-between gap-4 lg:gap-0 py-3">
						<div className="flex w-full justify-between lg:w-auto">
							<Link
								href="/"
								aria-label={t("dept.home")}
								className="flex gap-4 items-center group"
							>
								<div className="transition-transform duration-200 group-hover:scale-105">
									<NationalEmblem className="w-12 h-12" />
								</div>
								<div className="transition-transform duration-200 group-hover:scale-105">
									<Image
										src="/national-emblem/MaharashtraPolice.avif"
										alt="Maharashtra Police Logo"
										width={48}
										height={48}
										quality={50}
										priority={false}
										className="w-12 h-12 object-contain"
									/>
								</div>
								<div className="hidden sm:block">
									<p className="font-bold text-base lg:text-lg tracking-tight">{t("dept.name")}</p>
									<p className="text-xs text-muted-foreground">{t("dept.type")}</p>
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
								<ul className="flex gap-4 text-xs">
									{menuItems.map((item, index) => (
										<li key={index}>
											<DropdownMenu
												options={item.options}
												onOptionClick={() => setMenuState(false)}
												index={index}
												openDropdown={openDesktopDropdown}
												onDropdownToggle={setOpenDesktopDropdown}
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
								"bg-background data-[state=active]:block lg:data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent max-h-[80vh] overflow-y-auto lg:max-h-none lg:overflow-visible",
								menuState && "block lg:flex",
							)}
						>
							<div className="lg:hidden w-full">
								<nav
									role="navigation"
									aria-label="Mobile navigation"
								>
									<ul className="space-y-2 text-sm w-full">
										{menuItems.map((item, index) => (
											<li key={index}>
												<div className="space-y-1">
													<button
														onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
														className="text-foreground font-medium flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50 duration-150 transition-colors"
														aria-expanded={openDropdown === index}
													>
														<span>{item.name}</span>
														<svg
															className={`w-4 h-4 transition-transform duration-200 ${openDropdown === index ? "rotate-180" : ""}`}
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M19 9l-7 7-7-7"
															/>
														</svg>
													</button>
													{openDropdown === index && (
														<ul className="ml-4 space-y-1 border-l border-muted pl-4">
															{item.options.map((option, optionIndex) => (
																<li key={optionIndex}>
																	{option.href ? (
																		<Link
																			href={option.href}
																			className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm duration-150 transition-colors p-2 rounded-md hover:bg-muted/30"
																			onClick={() => {
																				setMenuState(false);
																				setOpenDropdown(null);
																			}}
																		>
																			{option.Icon}
																			{option.label}
																		</Link>
																	) : (
																		<button
																			onClick={() => {
																				setMenuState(false);
																				setOpenDropdown(null);
																			}}
																			className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm duration-150 transition-colors p-2 rounded-md hover:bg-muted/30 w-full text-left"
																		>
																			{option.Icon}
																			{option.label}
																		</button>
																	)}
																</li>
															))}
														</ul>
													)}
												</div>
											</li>
										))}
									</ul>
								</nav>
							</div>
							{/* Accessibility Controls for Mobile */}
							<div className="lg:hidden space-y-3">
								<div className="flex items-center justify-between">
									<LanguageSwitch />
									<ThemeToggle />
								</div>

								{/* Font Size Controls */}
								<div className="space-y-2">
									<p className="text-xs text-muted-foreground">Font Size</p>
									<div className="flex -space-x-px">
										<Button
											variant="outline"
											className="rounded-r-none focus:z-10 text-xs"
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
											className="rounded-none focus:z-10 text-xs"
											onClick={() => {
												document.body.style.fontSize = "16px";
											}}
											aria-label={t("accessibility.font.reset")}
										>
											A
										</Button>
										<Button
											variant="outline"
											className="rounded-l-none focus:z-10 text-xs"
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
								</div>

								{/* Quick Access Links */}
								<div className="flex flex-wrap gap-2">
									<Link
										href="#main-content"
										className="hover:underline text-xs px-2 py-1 rounded bg-muted/50"
										onClick={() => setMenuState(false)}
									>
										{t("accessibility.skip")}
									</Link>
									<Link
										href="/screen-reader-access"
										className="hover:underline text-xs px-2 py-1 rounded bg-muted/50"
										onClick={() => setMenuState(false)}
									>
										{t("accessibility.screen")}
									</Link>
									<Link
										href="/sitemap.xml"
										className="hover:underline text-xs px-2 py-1 rounded bg-muted/50"
										onClick={() => setMenuState(false)}
									>
										{t("accessibility.sitemap")}
									</Link>
								</div>
							</div>

							<div className="flex w-full flex-col space-y-2 sm:flex-row sm:gap-2 sm:space-y-0 md:w-fit">
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
