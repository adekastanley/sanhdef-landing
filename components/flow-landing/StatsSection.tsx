import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/app/actions/landing";
import Link from "next/link";

export async function StatsSection() {
	const data = await getContent("stats");

	const title = data?.title || "Metrics that matter\nclient-focused";
	const buttonText = data?.buttonText || "View Impact Reports";
	const buttonLink = data?.buttonLink || "/projects";

	const stats = data?.stats || [
		{
			title: "+1023",
			subtitle: "Total Projects",
			desc: "Impact across various regions.",
		},
		{
			title: "70%",
			subtitle: "Community Participation",
			desc: "High engagement.",
		},
		{
			title: "+234",
			subtitle: "Active Partners",
			desc: "Strong global network.",
		},
	];

	return (
		<section className="py-24 px-4 bg-cream text-dark">
			<div className="max-w-7xl mx-auto space-y-16">
				<div className="text-center space-y-4">
					<h2 className="font-sans font-bold text-4xl md:text-5xl leading-tight text-balance whitespace-pre-line">
						{title}
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{stats.map((stat: any, i: number) => (
						<div
							key={i}
							className="bg-[#f0efea] p-10 rounded-3xl text-left space-y-6 flex flex-col justify-between border border-dark/5 hover:border-dark/10 transition-colors h-full"
						>
							<div className="text-sm text-dark/70 mb-8 max-w-[200px] leading-relaxed">
								{stat.desc}
							</div>
							<div>
								<div className="text-5xl md:text-6xl font-sans font-bold mb-2 tracking-tight">
									{stat.title}
								</div>
								<div className="text-sm font-semibold text-dark/80">
									{stat.subtitle}
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-center pt-12">
					<Link href={buttonLink}>
						<button className="group flex items-center gap-3 px-8 py-3 bg-pink text-dark rounded-full font-semibold hover:bg-pink-hover transition-colors">
							{buttonText}
							<ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
