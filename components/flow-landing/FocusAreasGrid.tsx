import { getContent } from "@/app/actions/landing";
import { FocusAreasClient } from "./FocusAreasClient";
import { FocusArea } from "../admin/FocusAreasManager";

export async function FocusAreasGrid() {
	const data = await getContent("focus_areas");

	const items: FocusArea[] = data?.items || [];
	const title = data?.title || "Create Lasting Change";

	return (
		<section
			id="focus-areas"
			className="relative w-full py-24 md:py-36 bg-cream text-dark overflow-hidden"
		>
			<div className="relative max-w-7xl mx-auto px-4 md:px-8">
				<div className="mb-16 text-center">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-navy">
						{title}
					</h2>
				</div>
				<FocusAreasClient items={items} limit={4} />
			</div>
		</section>
	);
}
