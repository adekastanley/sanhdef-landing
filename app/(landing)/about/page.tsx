import { getTeamMembers } from "@/app/actions/team";
import AboutClient from "@/components/pages/aboutpage/AboutClient";
import { getContent } from "@/app/actions/landing";

export default async function About() {
	// Fetch data concurrently
	const [leadership, board, heroData, visionData] = await Promise.all([
		getTeamMembers("leadership"),
		getTeamMembers("board"),
		getContent("about_hero"),
		getContent("about_vision"),
	]);

	return (
		<AboutClient 
			leadership={leadership} 
			boardMembers={board} 
			heroData={heroData}
			visionData={visionData}
		/>
	);
}
