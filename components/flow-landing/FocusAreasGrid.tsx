import { Heart, Globe, Leaf, Users } from "lucide-react";
import Link from "next/link";

const focusAreas = [
	{
		title: "Community-Centred Solutions",
		description:
			"We co-create programs with communities to ensure relevance, ownership, and long-term impact.",
		icon: Heart,
		className: "col-span-1 md:col-span-2 row-span-2 bg-dark text-cream", // Large card
		// link: "/focus-areas/public-health",
	},
	{
		title: "Strong Technical Capacity",
		description:
			"Our partnership with Health Systems Consult Limited (HSCL) strengthens our ability to deliver evidence-based, data-driven interventions.",
		icon: Globe,
		className: "col-span-1 bg-[#E8E6D9] text-dark", // Lighter card
		// link: "/focus-areas/development",
	},
	{
		title: "Integrated Development Approach",
		description:
			"By working across health, development, environmental sustainability, and social empowerment, we address challenges holistically.",
		icon: Leaf,
		className: "col-span-1 bg-accent-green text-cream", // Green card
		// link: "/focus-areas/environment",
	},
	{
		title: "Trusted & Accountable",
		description:
			"We operate with transparency, strategic partnerships, and alignment to the Sustainable Development Goals to ensure measurable results.",
		icon: Users,
		className:
			"col-span-1 md:col-span-2 bg-white border border-dark/10 text-dark", // Wide bottom card
		// link: "/focus-areas/social-empowerment",
	},
];

export function FocusAreasGrid() {
	return (
		<section id="focus-areas" className="py-24 px-4 bg-cream">
			<div className="max-w-6xl mx-auto space-y-12">
				<div className="text-center space-y-4">
					<h2 className="font-serif text-4xl md:text-5xl text-dark">
						Why
						<span className="italic text-accent-green"> Choose</span>
						{/* Replaced with relevant title */}
						<span className="italic text-accent-green">Us</span>
					</h2>
					<p className="max-w-2xl mx-auto text-dark/70 font-sans">
						At SANHDEF, our strength lies in how we combine expertise,
						collaboration, and community insight to deliver sustainable impact.
						These core principles guide every program we design and every
						partnership we build.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
					{focusAreas.map((area, index) => (
						// <Link
						// 	key={index}
						// 	href={area.link}
						// 	className={`group relative p-8 rounded-3xl transition-all hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between overflow-hidden ${area.className}`}
						// >
						<section
							key={index}
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
								{/* <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
									Learn more <span className="text-lg">→</span>
								</div> */}
							</div>

							{/* Decorative noise/texture overlay could go here */}
							{/* </Link> */}
						</section>
					))}
				</div>
				{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
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


						</Link>
					))}
				</div> */}
			</div>
		</section>
	);
}
