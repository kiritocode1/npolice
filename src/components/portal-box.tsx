"use client";

import Link from "next/link";
import { InteractiveHoverButton } from "./Shiny-button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

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

export default function CustomsPortalBox() {
	const { t } = useLanguage();

	return (
		<section className="w-full px-4 pb-20 pt-20">
			<div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl  ring-1 ring-black/5">
				{/* Top (hero) */}
				<div className="px-6 py-8 text-center md:px-10 md:py-12">
					<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
						<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700">
							<StarIcon />
						</span>
						<span>{t("portal.welcome")}</span>
					</div>

					<h1 className="text-pretty mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-neutral-900 md:text-5xl dark:text-white">{t("portal.title")}</h1>

					<p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-neutral-600 md:text-base">{t("portal.description")}</p>

					<div className="mt-6">
						<Link href="/services">
							<InteractiveHoverButton
								className="w-50"
								text={t("portal.viewDetails")}
							></InteractiveHoverButton>
						</Link>
					</div>
				</div>

				{/* Cards row - Sunrise Layout */}
				<div className="flex items-end justify-center gap-8 px-4 pb-8 md:px-6 h-[500px] w-full max-w-full">
					{/* Card 1: Latest News & Updates - Tallest (leftmost) */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm flex-1 max-w-xs h-96 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
						>
							<ArrowIcon />
						</span>

						<div className="mt-20">
							<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.news.title")}</h3>
							<p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{t("portal.cards.news.description")}</p>
						</div>
					</motion.div>

					{/* Card 2: Portal - Medium height */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm flex-1 max-w-xs h-80 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
						>
							<ArrowIcon />
						</span>
						<div className="flex-1 flex items-center justify-center"></div>
						<div>
							<h3 className="text-base font-semibold text-neutral-900 dark:text-white">{t("portal.cards.portal.title")}</h3>
							<p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-300">{t("portal.cards.portal.description")}</p>
						</div>
					</motion.div>

					{/* National Emblem - Center, shortest */}
					<motion.div
						className="flex flex-col items-center justify-center flex-1 max-w-xs h-64"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<Image src="/emblem.png" alt="Indian National Emblem" width={100} height={100} />
						<h3 className="text-amber-800 font-semibold text-base text-center leading-tight dark:text-amber-400">{t("portal.emblem.city")}</h3>
					</motion.div>

					{/* Card 3: About Us - Medium height */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm flex-1 max-w-xs h-80 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
						>
							<ArrowIcon />
						</span>
						<div className="flex-1 flex items-center justify-center"></div>
						<div>
							<h3 className="text-base font-semibold text-neutral-900 dark:text-white">{t("portal.cards.about.title")}</h3>
							<p className="mt-2 text-sm leading-5 text-neutral-600 dark:text-neutral-300">{t("portal.cards.about.description")}</p>
						</div>
					</motion.div>

					{/* Card 4: Police Services - Tallest (rightmost) */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm flex-1 max-w-xs h-96 flex flex-col justify-between dark:bg-neutral-800 dark:border-neutral-700"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45 dark:bg-neutral-700 dark:text-neutral-300"
						>
							<ArrowIcon />
						</span>
						<div className="mt-20">
							<h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t("portal.cards.services.title")}</h3>
							<p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{t("portal.cards.services.description")}</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
