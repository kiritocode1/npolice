import Navbar from "@/components/navbar";
import PageAccessibilityChanger from "@/components/Page-Accessibility-Changer";

const page = () => {
	return (
		<div>
			<Navbar />
			<main
				id="main-content"
				className="pt-32"
			>
				<PageAccessibilityChanger />
			</main>
		</div>
	);
};

export default page;
