import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/mButton";
import { getContent } from "@/app/actions/landing";

export async function FocusAreasGrid() {
	const data = await getContent("focus_areas");

	const title = data?.title || "Intelligence built in the boardroom. Progress sustained in the community.";
	const description =
		data?.description ||
		"SANHDEF brings macro logic straight to the field without dilution. We integrate rigorous systems thinking with community-centered engagement, ensuring that every intervention is structurally sound and locally sustained.";
	const buttonText = data?.buttonText || "More About Us";
	const buttonLink = data?.buttonLink || "/about";
	const imageUrl = data?.imageUrl || "/assets/samg.webp";

	const benefits = data?.benefits || [
		"Deep Local Intelligence",
		"Boardroom-Grade Rigor",
		"Policy-to-Implementation Seamlessness",
	];

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
		<section id="focus-areas" className="py-24 px-4 bg-navy text-white">
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
									<CheckCircle2 className="w-6 h-6 text-pink shrink-0" />
									{item}
								</li>
							))}
						</ul>

						<div className="pt-6">
							<Link href={buttonLink}>
								<MagneticButton
									variant="primary-pink"
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
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-white/10">
					{features.map((feature: any, i: number) => (
						<div key={i} className="space-y-4 text-center md:text-left group">
							<div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto md:mx-0 group-hover:scale-110 transition-transform">
								<span className="text-navy font-bold text-xl">
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
