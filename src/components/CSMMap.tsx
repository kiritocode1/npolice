"use client";

import { MapPin, Navigation, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";

export default function CSMMap() {
	const { theme, resolvedTheme } = useTheme();
	const { t } = useLanguage();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDarkMode = mounted && resolvedTheme === "dark";

	// Use a map service that supports dark mode
	const mapUrl = isDarkMode
		? "https://www.openstreetmap.org/export/embed.html?bbox=75.2,19.7,75.4,19.9&layer=mapnik&marker=19.8,75.3"
		: "https://www.openstreetmap.org/export/embed.html?bbox=75.2,19.7,75.4,19.9&layer=mapnik&marker=19.8,75.3";

	if (!mounted) {
		return (
			<section className="w-full py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
				<div className="mx-auto max-w-7xl px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t("map.title")}</h2>
						<p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{t("map.description")}</p>
					</div>
					<div className="grid lg:grid-cols-2 gap-8 items-center">
						<div className="w-full h-96 bg-neutral-200 dark:bg-neutral-700 rounded-2xl flex items-center justify-center">
							<div className="text-neutral-500">Loading map...</div>
						</div>
						<div className="space-y-6">
							<div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
								<h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t("map.headquarters")}</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-3">
										<MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
										<div>
											<p className="font-medium text-neutral-900 dark:text-white">{t("map.location")}</p>
											<p className="text-sm text-neutral-600 dark:text-neutral-400">{t("map.state")}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="w-full py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t("map.title")}</h2>
					<p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{t("map.description")}</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 items-center">
					{/* Map Container */}
					<motion.div
						className="relative rounded-2xl overflow-hidden shadow-xl"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						{/* Map with Dark Mode Support */}
						<div className="w-full h-96 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center relative overflow-hidden rounded-2xl">
							{/* Map Container with Dark Mode Styling */}
							<div className={`w-full h-full ${isDarkMode ? "filter invert hue-rotate-180" : ""}`}>
								<iframe
									key={isDarkMode ? "dark" : "light"} // Force re-render on theme change
									src={mapUrl}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="rounded-2xl"
								></iframe>
							</div>

							{/* Dark mode overlay for better contrast */}
							{isDarkMode && <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none"></div>}
						</div>
					</motion.div>

					{/* Contact Information */}
					<motion.div
						className="space-y-6"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
							<h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">{t("map.headquarters")}</h3>

							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
									<div>
										<p className="font-medium text-neutral-900 dark:text-white">{t("map.location")}</p>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">{t("map.state")}</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
									<div>
										<p className="font-medium text-neutral-900 dark:text-white">{t("map.emergency")}</p>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">{t("map.helpline")}</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
									<div>
										<p className="font-medium text-neutral-900 dark:text-white">{t("map.email")}</p>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">{t("map.inquiries")}</p>
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="grid grid-cols-2 gap-4">
							<motion.button
								className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Navigation className="w-4 h-4" />
								<span className="font-medium">{t("map.directions")}</span>
							</motion.button>

							<motion.button
								className="border border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 p-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Phone className="w-4 h-4" />
								<span className="font-medium">{t("map.call")}</span>
							</motion.button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
