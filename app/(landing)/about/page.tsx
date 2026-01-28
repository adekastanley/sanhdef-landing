import { getTeamMembers } from "@/app/actions/team";
import AboutClient from "@/components/pages/aboutpage/AboutClient";

export default async function About() {
	// Fetch data concurrently
	const [leadership, board] = await Promise.all([
		getTeamMembers("leadership"),
		getTeamMembers("board"),
	]);

	return <AboutClient leadership={leadership} boardMembers={board} />;
}
