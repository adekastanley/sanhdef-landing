"use client";

import { GetInvolvedHero } from "@/components/pages/get-involved/GetInvolvedHero";
import { InvolvementSection } from "@/components/pages/get-involved/InvolvementSection";
import SectionOne from "@/components/pages/get-involved/sectionOne";

export default function GetInvolved() {
	return (
		<main className="min-h-screen bg-cream max-w-7xl mx-auto">
			<GetInvolvedHero />

			<SectionOne />

			<InvolvementSection
				title="Make a Donation"
				description="Your financial contribution brings life-saving health interventions and sustainable development programs to communities in need. Every dollar goes directly towards impactful projects."
				features={[
					{ label: "Direct Impact", value: "100%" },
					{ label: "Tax Deductible", value: "Yes" },
				]}
				ctaText="Donate Now"
				ctaLink="#donate"
				isReversed={false}
			/>

			<InvolvementSection
				title="Volunteer with Us"
				description="Join our network of passionate individuals dedicating their time and skills to transform lives. Whether you are a health professional, student, or community leader, there is a place for you."
				features={[
					{ label: "Community Members", value: "500+" },
					{ label: "Active Projects", value: "12" },
				]}
				ctaText="Volunteer"
				ctaLink="/get-involved/careers"
				isReversed={true}
			/>
		</main>
	);
}
