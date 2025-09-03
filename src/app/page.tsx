import CustomsPortalBox from "@/components/portal-box";

const page = () => {
	return (
		<main
			id="main-content"
			className="min-w-full min-h-[96vh] flex items-end justify-center "
			style={{
				backgroundImage: "url('/sunrise.svg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="w-full   flex items-end justify-center">
				<CustomsPortalBox/>
			</div>
		</main>
	);
};

export default page;
