"use client";

import { AboutHero } from "@/components/pages/aboutpage/AboutHero";
import { VisionSection } from "@/components/pages/aboutpage/VisionSection";
import { PeopleGrid } from "@/components/pages/aboutpage/PeopleGrid";

const leadership = [
	{ name: "Grace Davis", role: "Executive Director" },
	{ name: "James Wilson", role: "Director of Programs" },
	{ name: "Ada Okeke", role: "Head of Operations" },
];

const boardMembers = [
	{ name: "Dr. Samuel Smith", role: "Board Chair" },
	{ name: "Sarah Johnson", role: "Board Secretary" },
	{ name: "Michael Chang", role: "Member" },
	{ name: "Fatima Ali", role: "Member" },
];

export default function About() {
	return (
		<main className="min-h-screen bg-cream text-dark">
			<AboutHero />

			<VisionSection />

			<PeopleGrid
				title="Our Leadership"
				description="Dedicated individuals passionate about holistic well-being."
				people={leadership}
				showJoinCard={true}
			/>

			<PeopleGrid
				title="Board Members"
				people={boardMembers}
				showJoinCard={false}
			/>
		</main>
	);
}
