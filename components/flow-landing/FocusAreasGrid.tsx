import { getContent } from "@/app/actions/landing";
import { FocusAreasClient } from "./FocusAreasClient";

export async function FocusAreasGrid() {
	const data = await getContent("focus_areas");

	const features = data?.features || [
		{
			title: "Health Programmes",
			desc: "Design & implementation",
		},
		{
			title: "Climate Change",
			desc: "Environmental resilience",
		},
		{
			title: "Education",
			desc: "Human capital development",
		},
		{
			title: "Agriculture",
			desc: "Food security & systems",
		},
		{
			title: "Policy Analysis",
			desc: "Development & advisory",
		},
		{
			title: "Energy",
			desc: "Sustainable power solutions",
		},
		{
			title: "Social Empowerment",
			desc: "Equity & community focus",
		},
		{
			title: "Digital Transformation",
			desc: "Health-tech & systems",
		},
	];

	return (
		<section
			id="focus-areas"
			className="relative w-full py-24 md:py-36 px-4 bg-navy text-white overflow-hidden"
		>
			{/* Subtle radial glow */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,77,109,0.07),transparent)]" />

			<div className="relative max-w-6xl mx-auto">
				<FocusAreasClient features={features} />
			</div>
		</section>
	);
}
