"use cache";

import PortalBoxResponsive from "@/components/portal-box-responsive";
import PeopleRow from "@/components/people-row";
import PictureScrollSection from "@/components/Picture-Scroll-Section";
import ExpandableCards from "@/components/ui/custom/Scrollable-gallery";
import PoliceBentoGrid from "@/components/PoliceBentoGrid";
import CSMMap from "@/components/CSMMap";
import { Suspense } from "react";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const Page = async () => {
	// Cache for 1 hour
	cacheLife("1h");

	// Tag for on-demand revalidation
	cacheTag("page-home");
	return (
		<main>
			<div className="min-h-screen w-full bg-white dark:bg-zinc-950 relative">
				{/* Morning Haze - Light Mode */}
				<div
					className="absolute inset-0 z-0 dark:hidden"
					style={{
						backgroundImage: `
							radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.4) 0%, transparent 60%),
							radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.4) 0%, transparent 70%),
							radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.5) 0%, transparent 80%)
						`,
					}}
				/>
				{/* Dark Mode Gradient */}
				<div
					className="absolute inset-0 z-0 hidden dark:block"
					style={{
						backgroundImage: `
							radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.3) 0%, transparent 60%),
							radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.3) 0%, transparent 70%),
							radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.4) 0%, transparent 80%)
						`,
					}}
				/>
				{/* Your Content/Components */}
				<div className="relative z-10 w-full flex items-end justify-center min-h-[96vh]">
					<Suspense
						fallback={
							<div className="flex items-center justify-center min-h-[96vh]">
								<div className="text-lg">Loading Portal...</div>
							</div>
						}
					>
						<PortalBoxResponsive />
					</Suspense>
				</div>
			</div>

			<div className="w-full py-12 bg-muted/30 dark:bg-muted/10">
				{/* Leadership Team */}
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-foreground mb-2">Leadership Team</h2>
					<p className="text-muted-foreground">Meet our dedicated leaders serving Chhatrapati Sambhaji Nagar</p>
				</div>

				<Suspense
					fallback={
						<div className="flex items-center justify-center py-12">
							<div className="text-lg">Loading Team...</div>
						</div>
					}
				>
					<PeopleRow />
				</Suspense>
			</div>

			<div
				className="w-full min-h-full mb-40 "
				id="main-content"
			>
				<Suspense
					fallback={
						<div className="flex items-center justify-center py-20">
							<div className="text-lg">Loading Services...</div>
						</div>
					}
				>
					<PoliceBentoGrid />
				</Suspense>
			</div>

			<div>
				<Suspense
					fallback={
						<div className="flex items-center justify-center py-12">
							<div className="text-lg">Loading Gallery...</div>
						</div>
					}
				>
					<PictureScrollSection />
				</Suspense>
			</div>

			<div className="w-full py-12 bg-muted/30 dark:bg-muted/10">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-foreground mb-2">City Tour</h2>
					<p className="text-muted-foreground">Discover the beauty and heritage of Chhatrapati Sambhaji Nagar</p>
				</div>
				<Suspense
					fallback={
						<div className="flex items-center justify-center py-12">
							<div className="text-lg">Loading City Tour...</div>
						</div>
					}
				>
					<ExpandableCards />
				</Suspense>
			</div>

			{/* Map Section */}
			<Suspense
				fallback={
					<div className="flex items-center justify-center py-12">
						<div className="text-lg">Loading Map...</div>
					</div>
				}
			>
				<CSMMap />
			</Suspense>
		</main>
	);
};

export default Page;
