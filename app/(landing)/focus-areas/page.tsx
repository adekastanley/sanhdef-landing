import { getContent } from "@/app/actions/landing";
import { FocusAreasPageClient } from "@/components/flow-landing/FocusAreasPageClient";
import type { FocusArea } from "@/components/admin/FocusAreasManager";

export const dynamic = "force-dynamic";

export default async function FocusAreasListPage() {
	const data = await getContent("focus_areas");
	const items: FocusArea[] = data?.items || [];
	const title = data?.title || "Focus Areas";

	return (
		<FocusAreasPageClient items={items} title={title} />
	);
}
