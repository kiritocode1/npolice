"use client";

import CustomsPortalBox from "@/components/portal-box";
import PeopleRow from "@/components/people-row";
import { useLanguage } from "@/contexts/language-context";
import PictureScrollSection from "@/components/Picture-Scroll-Section";

const Page = () => {
	const { t } = useLanguage();

	return (
		<main>
			<div
				className="min-w-full min-h-[96vh] flex items-end justify-center "
				style={{
					backgroundImage: "url('/sunrise.svg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="w-full   flex items-end justify-center">
					<CustomsPortalBox />
				</div>
			</div>

			<div className="w-full py-12 bg-muted/30 dark:bg-muted/10">
				{/* Leadership Team */}
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-foreground mb-2">{t("leadership.title")}</h2>
					<p className="text-muted-foreground">{t("leadership.subtitle")}</p>
				</div>

				<PeopleRow
					people={[
						{
							id: "1",
							name: "Shri. Devendra Fadnavis",
							nameMarathi: "श्री. देवेंद्र फडणवीस",
							position: "Hon'ble Chief Minister",
							positionMarathi: "माननीय मुख्यमंत्री",
							image: "/people/1.png",
						},
						{
							id: "2",
							name: "Shri. Eknath Shinde",
							nameMarathi: "श्री. एकनाथ शिंदे",
							position: "Hon'ble Deputy Chief Minister",
							positionMarathi: "माननीय उपमुख्यमंत्री",
							image: "/people/2.png",
						},
						{
							id: "3",
							name: "Shri. Ajit Pawar",
							nameMarathi: "श्री अजित पवार",
							position: "Hon'ble Deputy Chief Minister",
							positionMarathi: "माननीय उपमुख्यमंत्री",
							image: "/people/3.png",
						},
						{
							id: "4",
							name: "Dr. Pankaj Bhoyar",
							nameMarathi: "डॉ. पंकज भोयर",
							position: "Hon'ble Minister of State, Home(Rural)",
							positionMarathi: "माननीय राज्यमंत्री, गृह(ग्रामीण)",
							image: "/people/4.png",
						},
						{
							id: "5",
							name: "Shri. Yogesh Kadam",
							nameMarathi: "श्री. योगेश कदम",
							position: "Hon'ble Minister of State, Home(Urban)",
							positionMarathi: "माननीय राज्यमंत्री, गृह(शहरी)",
							image: "/people/5.png",
						},
						{
							id: "6",
							name: "Shri. Iqbal Singh Chahal",
							nameMarathi: "श्री. इकबाल सिंह चहल",
							position: "Additional Chief Secretary (Home)",
							positionMarathi: "अतिरिक्त मुख्य सचिव (गृह)",
							image: "/people/6.png",
						},
						{
							id: "7",
							name: "Smt. Rashmi Shukla",
							nameMarathi: "श्रीमती. रश्मी शुक्ला",
							position: "Director General of Police",
							positionMarathi: "पोलिस महासंचालक",
							image: "/people/7.png",
						},
					]}
				/>
			</div>

			<div
				className="w-full min-h-[96vh] grid place-content-center "
				id="main-content"
			></div>

			<div>
				<PictureScrollSection />
			</div>
		</main>
	);
};

export default Page;
