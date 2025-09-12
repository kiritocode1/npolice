"use client";

import Link from "next/link";
import { InteractiveHoverButton } from "./Shiny-button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";
import { Suspense } from "react";

function ArrowIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="h-4 w-4"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M5 12h14" />
			<path d="M13 5l7 7-7 7" />
		</svg>
	);
}

function StarIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="h-4 w-4"
			fill="currentColor"
		>
			<path d="M12 2l2.9 6.1 6.7.6-5 4.4 1.5 6.6L12 16.7 5.9 19.7 7.4 13 2.4 8.7l6.7-.6L12 2z" />
		</svg>
	);
}

// Loading component for Suspense
const MobilePortalLoading = () => (
	<section className="w-full px-4 pb-20 pt-20">
		<div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl ring-1 ring-black/5">
			<div className="px-6 py-8 text-center md:px-10 md:py-12">
				<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
					<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700">
						<StarIcon />
					</span>
					<span>Loading...</span>
				</div>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl">Loading Portal...</h1>
				<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">Please wait while we load the portal</p>
			</div>
			<div className="px-4 pb-8 space-y-4">
				<div className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-6 animate-pulse h-24"></div>
				<div className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-6 animate-pulse h-24"></div>
				<div className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-6 animate-pulse h-24"></div>
				<div className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-6 animate-pulse h-24"></div>
			</div>
		</div>
	</section>
);

export default function CustomsPortalBoxMobile() {
	const { t } = useLanguage();

	return (
		<Suspense fallback={<MobilePortalLoading />}>
			<section className="w-full px-4 pb-20 pt-20">
				<div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl ring-1 ring-black/5">
					{/* Top (hero) */}
					<div className="px-6 py-8 text-center md:px-10 md:py-12">
						<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
							<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700">
								<StarIcon />
							</span>
							<span>{t("portal.welcome")}</span>
						</div>
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl">{t("portal.title")}</h1>
						<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">{t("portal.description")}</p>
						<div className="mt-8">
							<Link href="/services">
								<InteractiveHoverButton
									className="w-50"
									text={t("portal.viewDetails")}
								/>
							</Link>
						</div>
					</div>

					{/* National Emblem - Center */}
					<div className="flex flex-col items-center justify-center px-6 py-8">
						<motion.div
							className="flex flex-col items-center justify-center"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							<Image
								src="/emblem.webp"
								alt="Indian National Emblem"
								width={80}
								height={80}
								quality={50}
								priority={false}
								sizes="80px"
							/>
							<h3 className="text-amber-800 font-semibold text-base text-center leading-tight mt-2 dark:text-amber-400">{t("portal.emblem.city")}</h3>
						</motion.div>
					</div>

					{/* Cards - Vertical List */}
					<div className="px-4 pb-8 space-y-4">
						{/* Card 1: Latest News & Updates */}
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
						>
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/file.svg')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>
							<div className="pr-12">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.news.title")}</h3>
								<p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{t("portal.cards.news.description")}</p>
							</div>
						</motion.div>

						{/* Card 2: Portal */}
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
						>
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/globe.svg')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>
							<div className="pr-12">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.portal.title")}</h3>
								<p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-300">{t("portal.cards.portal.description")}</p>
							</div>
						</motion.div>

						{/* Card 3: About Us */}
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
						>
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/window.svg')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>
							<div className="pr-12">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.about.title")}</h3>
								<p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-300">{t("portal.cards.about.description")}</p>
							</div>
						</motion.div>

						{/* Card 4: Police Services */}
						<motion.div
							className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden group cursor-pointer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
						>
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-cover bg-center"
								style={{ backgroundImage: "url('/emblem.webp')" }}
							/>
							<span
								aria-hidden="true"
								className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
							>
								<ArrowIcon />
							</span>
							<div className="pr-12">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.services.title")}</h3>
								<p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-300">{t("portal.cards.services.description")}</p>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</Suspense>
	);
}
