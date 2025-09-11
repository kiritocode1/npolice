"use cache";

import PortalBoxResponsive from "@/components/portal-box-responsive";
import PeopleRow from "@/components/people-row";
import PictureScrollSection from "@/components/Picture-Scroll-Section";
import ExpandableCards from "@/components/ui/custom/Scrollable-gallery";
import PoliceBentoGrid from "@/components/PoliceBentoGrid";
import CSMMap from "@/components/CSMMap";
import PerformanceGate from "@/components/performance-gate";
import Image from "next/image";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const Page = async () => {
	// Cache for 1 hour
	cacheLife("1h");

	// Tag for on-demand revalidation
	cacheTag("page-home");
	return (
		<main>
			<div className="relative min-w-full min-h-[96vh] flex items-end justify-center overflow-hidden">
				{/* Hero background image as Next/Image for proper preload and LCP control */}
				<Image
					src="/sunrise.svg"
					alt=""
					fill
					priority
					fetchPriority="high"
					sizes="100vw"
					className="object-cover object-center select-none pointer-events-none"
				/>
				<div className="relative z-10 w-full flex items-end justify-center">
					<PerformanceGate>
						<PortalBoxResponsive />
					</PerformanceGate>
				</div>
			</div>

			<div className="w-full py-12 bg-muted/30 dark:bg-muted/10">
				{/* Leadership Team */}
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-foreground mb-2">Leadership Team</h2>
					<p className="text-muted-foreground">Meet our dedicated leaders serving Chhatrapati Sambhaji Nagar</p>
				</div>

				<PerformanceGate>
					<PeopleRow />
				</PerformanceGate>
			</div>

			<div
				className="w-full min-h-full mb-40 "
				id="main-content"
			>
				<PerformanceGate>
					<PoliceBentoGrid />
				</PerformanceGate>
			</div>

			<div>
				<PerformanceGate>
					<PictureScrollSection />
				</PerformanceGate>
			</div>

			<div className="w-full py-12 bg-muted/30 dark:bg-muted/10">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-foreground mb-2">City Tour</h2>
					<p className="text-muted-foreground">Discover the beauty and heritage of Chhatrapati Sambhaji Nagar</p>
				</div>
				<PerformanceGate>
					<ExpandableCards />
				</PerformanceGate>
			</div>

			{/* Map Section */}
			<PerformanceGate>
				<CSMMap />
			</PerformanceGate>
		</main>
	);
};

export default Page;
