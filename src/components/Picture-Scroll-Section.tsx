"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/language-context";

export default function Section() {
	const container = useRef<HTMLDivElement>(null);
	const { t } = useLanguage();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

	return (
		<div
			ref={container}
			className="relative flex items-center justify-center h-screen overflow-hidden"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className="relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
				<p className="w-[50vw] text-[2vw] self-end uppercase mix-blend-difference">{t("picture.description")}</p>
				<div className="text-center">
					<p className="text-[5vw] uppercase mix-blend-difference font-bold">{t("picture.title")}</p>
					<p className="text-[2vw] mt-4 mix-blend-difference">{t("picture.subtitle")}</p>
				</div>
			</div>
			<div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
				<motion.div
					style={{ y }}
					className="relative w-full h-full"
				>
					<Image
						src="/csm-snapshots/1.png"
						fill
						alt="Chatrapati Shambhaji Nagar cityscape"
						style={{ objectFit: "cover" }}
					/>
				</motion.div>
			</div>
		</div>
	);
}
