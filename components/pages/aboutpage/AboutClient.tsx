"use client";

import { AboutHero } from "@/components/pages/aboutpage/AboutHero";
import { VisionSection } from "@/components/pages/aboutpage/VisionSection";
import { PeopleGrid } from "@/components/pages/aboutpage/PeopleGrid";
import type { TeamMember } from "@/app/actions/team";

interface AboutClientProps {
	leadership: TeamMember[];
	boardMembers: TeamMember[];
}

export default function AboutClient({
	leadership,
	boardMembers,
}: AboutClientProps) {
	return (
		<main className="min-h-screen bg-cream text-dark max-w-7xl mx-auto">
			<AboutHero />

			<VisionSection />

			<PeopleGrid
				title="Our Leadership"
				description="Dedicated individuals passionate about holistic well-being."
				people={leadership.map((m) => ({
					name: m.name,
					role: m.role,
					image: m.image_url,
				}))}
				showJoinCard={true}
			/>

			<PeopleGrid
				title="Board Members"
				people={boardMembers.map((m) => ({
					name: m.name,
					role: m.role,
					image: m.image_url,
				}))}
				showJoinCard={false}
			/>
		</main>
	);
}
