import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/mButton";
import { getContent } from "@/app/actions/landing";

export async function FocusAreasGrid() {
	const data = await getContent("focus_areas");

	const title = data?.title || "Smarter service with SANHDEF intelligence";
	const description =
		data?.description ||
		"At SANHDEF, our strength lies in how we combine expertise, collaboration, and community insight to deliver sustainable impact.";
	const buttonText = data?.buttonText || "More About Us";
	const buttonLink = data?.buttonLink || "/about";
	const imageUrl = data?.imageUrl || "/assets/samg.webp";

	const benefits = data?.benefits || [
		"Community-Centred Solutions",
		"Strong Technical Capacity",
		"Integrated Development Approach",
		"Trusted & Accountable",
	];

	const features = data?.features || [
		{
			title: "Community Centred",
			desc: "Our programs ensure relevance, ownership, and long-term impact.",
		},
		{
			title: "Data Insights",
			desc: "Evidence-based, data-driven interventions for all our focus areas.",
		},
		{
			title: "Integrated Approach",
			desc: "Holistic approaches tackling health and environmental sustainability.",
		},
	];

	return (
		<section id="focus-areas" className="py-24 px-4 bg-dark-green text-white">
			<div className="max-w-7xl mx-auto space-y-24">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left: Image Card */}
					<div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10">
						<div
							className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
							style={{ backgroundImage: `url('${imageUrl}')` }}
						/>
					</div>

					{/* Right: Content */}
					<div className="space-y-8">
						<h2 className="font-sans font-semibold text-4xl md:text-5xl leading-tight">
							{title}
						</h2>
						<p className="text-white/70 text-lg leading-relaxed max-w-xl">
							{description}
						</p>

						<ul className="space-y-4">
							{benefits.map((item: string, i: number) => (
								<li
									key={i}
									className="flex items-center gap-4 text-white/90 font-medium text-lg"
								>
									<CheckCircle2 className="w-6 h-6 text-lime shrink-0" />
									{item}
								</li>
							))}
						</ul>

						<div className="pt-6">
							<Link href={buttonLink}>
								<MagneticButton
									variant="primary-lime"
									size="lg"
									className="font-semibold px-8 flex items-center gap-2"
								>
									{buttonText}
									<ArrowRight className="w-5 h-5 text-dark ml-2 inline" />
								</MagneticButton>
							</Link>
						</div>
					</div>
				</div>

				{/* Features underneath */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
					{features.map((feature: any, i: number) => (
						<div key={i} className="space-y-4 text-center md:text-left group">
							<div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto md:mx-0 group-hover:scale-110 transition-transform">
								<span className="text-dark-green font-bold text-xl">
									{i + 1}
								</span>
							</div>
							<h3 className="text-2xl font-semibold">{feature.title}</h3>
							<p className="text-white/60 text-base leading-relaxed">
								{feature.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
