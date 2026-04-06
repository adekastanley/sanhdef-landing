import { getContent } from "@/app/actions/landing";
import ResourcesClient from "@/components/pages/resourcespage/ResourcesClient";

export default async function ResourcesPage() {
	const heroData = await getContent("resources_hero");
	const resourcesData = await getContent("resources_list");

	return <ResourcesClient heroData={heroData} resourcesData={resourcesData} />;
}
