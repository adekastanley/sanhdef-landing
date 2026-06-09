// import { Hero } from "@/components/flow-landing/Hero";
import { FocusAreasGrid } from "@/components/flow-landing/FocusAreasGrid";
import { StatsSection } from "@/components/flow-landing/StatsSection";
import { HomeProjectsSection } from "@/components/flow-landing/HomeProjectsSection";
import { FAQ } from "@/components/pages/faq";
import ContactPage from "./contact/page";

import { getContent } from "@/app/actions/landing";
import HeroHeader from "@/components/hero";

export default async function Home() {
	const faqData = await getContent("faq");

	return (
		<main className="flex min-h-screen flex-col font-sans bg-cream selection:bg-blue selection:text-cream">
			<HeroHeader />
			{/* <Hero /> */}
			<FocusAreasGrid />

			<StatsSection />
			<HomeProjectsSection />
			<FAQ data={faqData} />
			<ContactPage />
			{/* Keeping the rest simple for now, can add more sections if needed */}
		</main>
	);
}
