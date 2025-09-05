"use client";

import Link from "next/link";
import { InteractiveHoverButton } from "./Shiny-button";
import { motion } from "framer-motion";

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
	return (
		<section className="w-full px-4 pb-6">
			<div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl  ring-1 ring-black/5">
				{/* Top (hero) */}
				<div className="px-6 py-8 text-center md:px-10 md:py-12">
					<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
						<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700">
							<StarIcon />
						</span>
						<span>Welcome to Chatrapati Shambhaji Nagar Police Department</span>
					</div>

					<h1 className="text-pretty mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-neutral-900 md:text-5xl dark:text-white">One-Stop Portal For Police Services</h1>

					<p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-neutral-600 md:text-base">
						The Chatrapati Shambhaji Nagar Police Department is your go-to source for police services—simplifying import, export, and compliance for businesses and travelers.
					</p>

					<div className="mt-6">
						<Link href="/services">
							<InteractiveHoverButton
								className="w-50"
								text="View Details"
							></InteractiveHoverButton>
						</Link>
					</div>
				</div>

				{/* Cards row - Sunrise Layout */}
				<div className="flex items-end justify-center gap-4 px-6 pb-8 md:px-10 h-96">
					{/* Card 1: Latest News & Updates - Tallest (leftmost) */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm w-48 h-80 flex flex-col justify-between"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45"
						>
							<ArrowIcon />
						</span>

						<div className="mt-16">
							<h3 className="text-base font-semibold text-neutral-900">Latest News & Updates</h3>
							<p className="mt-2 text-sm leading-6 text-neutral-600">Stay updated with the latest police regulations and announcements.</p>
						</div>
					</motion.div>

					{/* Card 2: Portal - Medium height */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm w-44 h-64 flex flex-col justify-between"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45"
						>
							<ArrowIcon />
						</span>
						<div className="flex-1 flex items-center justify-center">
							<div className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50"></div>
						</div>
						<div>
							<h3 className="text-sm font-semibold text-neutral-900">Portal Access</h3>
							<p className="mt-1 text-xs leading-5 text-neutral-600">Gateway to police services</p>
						</div>
					</motion.div>

					{/* National Emblem - Center, shortest */}
					<motion.div
						className="flex flex-col items-center justify-center w-40 h-48"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<div className="w-20 h-20 rounded-full border-4 border-amber-400 bg-amber-50 flex items-center justify-center mb-3">
							<div className="text-center">
								<span className="text-amber-700 font-bold text-xs">National</span>
								<br />
								<span className="text-amber-700 font-bold text-xs">Emblem</span>
							</div>
						</div>
						<h3 className="text-amber-800 font-semibold text-sm text-center leading-tight">
							Chatrapati
							<br />
							Shambhaji Nagar
						</h3>
					</motion.div>

					{/* Card 3: About Us - Medium height */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm w-44 h-64 flex flex-col justify-between"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45"
						>
							<ArrowIcon />
						</span>
						<div className="flex-1 flex items-center justify-center">
							<div className="w-full h-16 rounded-2xl bg-neutral-50"></div>
						</div>
						<div>
							<h3 className="text-sm font-semibold text-neutral-900">About Us</h3>
							<p className="mt-1 text-xs leading-5 text-neutral-600">Our mission and services</p>
						</div>
					</motion.div>

					{/* Card 4: Police Services - Tallest (rightmost) */}
					<motion.div
						className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm w-48 h-80 flex flex-col justify-between"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
					>
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45"
						>
							<ArrowIcon />
						</span>
						<div className="mt-16">
							<h3 className="text-base font-semibold text-neutral-900">Police Services</h3>
							<p className="mt-2 text-sm leading-6 text-neutral-600">Comprehensive police services for citizens of Chatrapati Shambhaji Nagar.</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
