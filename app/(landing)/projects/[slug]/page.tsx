import { getItemBySlug } from "@/app/actions/content";
import ProjectDetailClient from "@/components/pages/projectspage/ProjectDetailClient";
import { notFound, redirect } from "next/navigation";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
	const resolvedParams = await params;
	const project = await getItemBySlug(resolvedParams.slug, "project");

	if (!project) {
		// If project not found, user requested to return a regular page with all projects.
		// We could redirect to /projects or render the Projects List here.
		// Given the request "return a regular page... that shows all projects", redirecting to /projects seems most appropriate as that IS the regular page showing all projects.
		// Alternatively, we can just call notFound() if they fix the 404 page.
		// Let's redirect for now.
		redirect("/projects");
	}

	return <ProjectDetailClient project={project} />;
}
