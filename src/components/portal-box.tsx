import Link from "next/link";
import { InteractiveHoverButton } from "./Shiny-button";

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

				{/* Cards row */}
				<div className="grid grid-cols-1 gap-4 px-6 pb-8 md:grid-cols-2 md:px-10 lg:grid-cols-4">
					{/* Card 1: Latest News & Updates */}
					<div className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm h-80">
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring -rotate-45"
						>
							<ArrowIcon />
						</span>

						<div className="mt-20">
							<h3 className="text-base font-semibold text-neutral-900">Latest News & Updates</h3>
							<p className="mt-1 text-sm leading-6 text-neutral-600">Stay updated with the latest customs regulations, trade policies, and important announcements.</p>
						</div>
					</div>

					{/* Card 2: Crest / Portal */}
					<div className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm ">
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45"
						>
							<ArrowIcon />
						</span>
						<div className="flex h-28 w-full items-center justify-center ">
							<div className="flex h-24 w-24 items-center justify-center rounded-full border border-neutral-200 bg-white "></div>
						</div>
						<div className="mt-3">
							<h3 className="text-base font-semibold text-neutral-900">Chatrapati Shambhaji Nagar Police Department</h3>
							<p className="mt-1 text-sm leading-6 text-neutral-600">Central gateway for declarations, duties, and policy references.</p>
						</div>
					</div>

					{/* Card 3: About Us */}
					<div className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45"
						>
							<ArrowIcon />
						</span>
						<div className="flex h-28 w-full items-center justify-center rounded-2xl bg-neutral-50"></div>
						<div className="mt-3">
							<h3 className="text-base font-semibold text-neutral-900">About Us</h3>
							<p className="mt-1 text-sm leading-6 text-neutral-600">Learn about our mission, services, and commitment to secure and efficient police services.</p>
						</div>
					</div>

					{/* Card 4: Airport Customs & Traveler Info */}
					<div className="relative rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
						<span
							aria-hidden="true"
							className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 ring-1 -rotate-45"
						>
							<ArrowIcon />
						</span>
						<div className="flex h-28 w-full items-center justify-center rounded-2xl bg-neutral-50">
							<span className="text-center text-sm font-medium text-neutral-600">Police Services</span>
						</div>
						<div className="mt-3">
							<h3 className="text-base font-semibold text-neutral-900">Police Services</h3>
							<p className="mt-1 text-sm leading-6 text-neutral-600">Police services for the citizens of Chatrapati Shambhaji Nagar.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
