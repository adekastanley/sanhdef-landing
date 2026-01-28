import { Hero } from "@/components/flow-landing/Hero";
import { FocusAreasGrid } from "@/components/flow-landing/FocusAreasGrid";
import { StatsSection } from "@/components/flow-landing/StatsSection";
import { FAQ } from "@/components/pages/faq";
import ContactPage from "./contact/page";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col font-sans bg-cream selection:bg-accent-green selection:text-cream">
			<Hero />
			<FocusAreasGrid />
			<StatsSection />
			<FAQ />
			<ContactPage />
			{/* Keeping the rest simple for now, can add more sections if needed */}
		</main>
	);
}
