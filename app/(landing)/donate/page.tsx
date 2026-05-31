import React from "react";
import { DonateHero } from "@/components/pages/donate/DonateHero";
import { ImpactSection } from "@/components/pages/donate/ImpactSection";
import { TrustBadges } from "@/components/pages/donate/TrustBadges";
import { FAQ } from "@/components/pages/faq";
import { getContent } from "@/app/actions/landing";

export const metadata = {
	title: "Donate | SANHDEF",
	description: "Fund the future of public health. Your contribution goes directly towards sustainable interventions in communities that need it most.",
};

export default async function DonatePage() {
	const faqData = await getContent("faq");

	return (
		<main className="flex min-h-screen flex-col font-sans bg-cream selection:bg-pink selection:text-white">
			<DonateHero />
			<TrustBadges />
			<ImpactSection />
			{/* Optional: We can reuse the FAQ section from the landing page, 
			    or ideally create a specific DonateFAQ in the future. 
			    For now, reusing the global FAQ. */}
			<div className="bg-white">
				<FAQ data={faqData} />
			</div>
		</main>
	);
}
