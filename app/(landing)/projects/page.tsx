import { getItems } from "@/app/actions/content";
import { ProjectsClientPage } from "@/components/pages/projectspage/ProjectsClientPage";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
	const projects = await getItems("project");

	return <ProjectsClientPage projects={projects} />;
}
