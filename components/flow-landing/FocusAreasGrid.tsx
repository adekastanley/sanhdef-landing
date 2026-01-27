import { Heart, Globe, Leaf, Users } from "lucide-react";
import Link from "next/link";

const focusAreas = [
	{
		title: "Public Health",
		description:
			"Improving community health outcomes through targeted interventions and accessible care programs.",
		icon: Heart,
		className: "col-span-1 md:col-span-2 row-span-2 bg-dark text-cream", // Large card
		link: "/focus-areas/public-health",
	},
	{
		title: "Development Initiatives",
		description:
			"Driving sustainable growth and infrastructure development in underserved regions.",
		icon: Globe,
		className: "col-span-1 bg-[#E8E6D9] text-dark", // Lighter card
		link: "/focus-areas/development",
	},
	{
		title: "Environmental Sustainability",
		description:
			"Promoting eco-friendly practices and resource conservation for a greener future.",
		icon: Leaf,
		className: "col-span-1 bg-accent-green text-cream", // Green card
		link: "/focus-areas/environment",
	},
	{
		title: "Social Empowerment",
		description:
			"Empowering individuals and communities through education, advocacy, and support.",
		icon: Users,
		className:
			"col-span-1 md:col-span-2 bg-white border border-dark/10 text-dark", // Wide bottom card
		link: "/focus-areas/social-empowerment",
	},
];

export function FocusAreasGrid() {
	return (
		<section id="focus-areas" className="py-24 px-4 bg-cream">
			<div className="max-w-6xl mx-auto space-y-12">
				<div className="text-center space-y-4">
					<h2 className="font-serif text-4xl md:text-5xl text-dark">
						Flow is made for{" "}
						<span className="italic text-accent-green">You</span>
						{/* Replaced with relevant title */}
						Our <span className="italic text-accent-green">Focus Areas</span>
					</h2>
					<p className="max-w-2xl mx-auto text-dark/70 font-sans">
						We are dedicated to tackling crucial community issues through four
						key pillars of action.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
					{focusAreas.map((area, index) => (
						<Link
							key={index}
							href={area.link}
							className={`group relative p-8 rounded-3xl transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between overflow-hidden ${area.className}`}
						>
							<div className="relative z-10 space-y-4">
								<div className="w-12 h-12 rounded-full bg-current/10 flex items-center justify-center">
									<area.icon className="w-6 h-6 opacity-80" />
								</div>
								<h3 className="font-serif text-2xl md:text-3xl leading-tight">
									{area.title}
								</h3>
							</div>

							<div className="relative z-10 pt-8">
								<p className="opacity-80 text-sm md:text-base leading-relaxed">
									{area.description}
								</p>
								<div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
									Learn more <span className="text-lg">→</span>
								</div>
							</div>

							{/* Decorative noise/texture overlay could go here */}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
