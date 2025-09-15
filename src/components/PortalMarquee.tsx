"use client";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import React from "react";

// Define the type for individual portal props
interface Portal {
	src: string;
	alt: string;
	gradient: {
		from: string;
		via: string;
		to: string;
	};
}

// Define the props for the main component
interface PortalMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
	speed?: "normal" | "slow" | "fast";
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component for police portals.
 * It pauses on hover and uses shadcn/ui theme variables for styling.
 */
const PortalMarquee = React.forwardRef<HTMLDivElement, PortalMarqueeProps>(({ speed = "normal", className, ...props }, ref) => {
	const { t } = useLanguage();

	// Portal data with gradients
	const portals: Portal[] = [
		{
			src: "/portals/maharashtrapolice.webp",
			alt: "Maharashtra Police Portal",
			gradient: {
				from: "#1e40af",
				via: "#3b82f6",
				to: "#60a5fa",
			},
		},
		{
			src: "/portals/cybercrime.webp",
			alt: "Cyber Crime Portal",
			gradient: {
				from: "#dc2626",
				via: "#ef4444",
				to: "#f87171",
			},
		},
		{
			src: "/portals/grp.webp",
			alt: "GRP Portal",
			gradient: {
				from: "#059669",
				via: "#10b981",
				to: "#34d399",
			},
		},
		{
			src: "/portals/pgportal.webp",
			alt: "PG Portal",
			gradient: {
				from: "#7c3aed",
				via: "#8b5cf6",
				to: "#a78bfa",
			},
		},
		{
			src: "/portals/aaplesarkar.webp",
			alt: "Aaple Sarkar Portal",
			gradient: {
				from: "#ea580c",
				via: "#f97316",
				to: "#fb923c",
			},
		},
	];

	// Map speed prop to animation duration
	const durationMap = {
		normal: "40s",
		slow: "80s",
		fast: "5s",
	};
	const animationDuration = durationMap[speed];

	return (
		<>
			{/* The @keyframes for the marquee animation are defined directly here for robustness. */}
			<style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

			<section
				ref={ref}
				aria-label={t("portals.title")}
				className={cn("w-full bg-background text-foreground rounded-lg border overflow-hidden", className)}
				{...props}
			>
				{/* Header Section */}
				<div className="p-6 md:p-8 lg:p-10">
					<div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8 pb-6 md:pb-8 border-b">
						<h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance">{t("portals.title")}</h2>
						<p className="text-muted-foreground self-start lg:justify-self-end text-balance">{t("portals.description")}</p>
					</div>
				</div>

				{/* Marquee Section */}
				<div
					className="w-full overflow-hidden"
					style={{
						maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					}}
				>
					<div
						className="flex w-max items-center gap-4 py-4 pr-4 hover:[animation-play-state:paused] transition-all duration-300 ease-in-out"
						style={{
							animation: `marquee ${animationDuration} linear infinite`,
						}}
					>
						{/* Render portals twice to create a seamless loop */}
						{[...portals, ...portals].map((portal, index) => (
							<div
								key={index}
								className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-lg bg-secondary/70 overflow-hidden"
							>
								{/* Gradient background revealed on hover */}
								<div
									style={
										{
											"--from": portal.gradient.from,
											"--via": portal.gradient.via,
											"--to": portal.gradient.to,
										} as React.CSSProperties
									}
									className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)]"
								/>
								{/* Portal Image */}
								<img
									src={portal.src}
									alt={portal.alt}
									className="relative h-3/4 w-auto object-contain"
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
});

PortalMarquee.displayName = "PortalMarquee";

export { PortalMarquee };
