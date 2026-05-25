import { MagneticButton } from "@/components/ui/mButton";

export function AboutHero({ data }: { data?: any }) {
	const topTag = data?.topTag || "About Us";
	const titleLine1 = data?.titleLine1 || "Sanitas Health and";
	const titleItalic = data?.titleItalic || "Development";
	const titleLine2 = data?.titleLine2 || "Foundation";
	const subtitleLine1 = data?.subtitleLine1 || "Empowering Healthy,";
	const subtitleHighlight = data?.subtitleHighlight || "Resilient Communities";
	const subtitleLine2 = data?.subtitleLine2 || "Across Nigeria and Beyond";

	return (
		<section className="relative w-full pt-32 pb-20 px-4 md:px-8 bg-cream">
			<div className="max-w-7xl mx-auto">
				<div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-navy flex flex-col justify-center items-center text-center px-6">
					{/* Decorative abstract elements */}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

					<div className="relative z-20 flex flex-col items-center">
						<span className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-6 px-4 py-1.5 rounded-full border border-white/20">
							{topTag}
						</span>

						<h1 className="font-sans font-bold text-5xl md:text-4xl lg:text-5xl text-cream leading-[1.1] mb-6 max-w-4xl tracking-tight">
							{titleLine1}
							<br />
							<span className="italic text-pink font-serif font-medium">
								{titleItalic}
							</span>{" "}
							{titleLine2}
						</h1>

						<p className="max-w-2xl text-cream/80 text-base md:text-xl font-medium leading-relaxed mt-4">
							{subtitleLine1}{" "}
							<span className="text-pink font-semibold">
								{subtitleHighlight}
							</span>{" "}
							{subtitleLine2}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
