import { MagneticButton } from "@/components/ui/mButton";

export function AboutHero() {
	return (
		<section className="relative w-full pt-32 pb-20 px-4 md:px-8 bg-cream">
			<div className="max-w-7xl mx-auto">
				<div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-dark-green flex flex-col justify-center items-center text-center px-6">
					{/* Decorative abstract elements */}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

					<div className="relative z-20 flex flex-col items-center">
						<span className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-6 px-4 py-1.5 rounded-full border border-white/20">
							About Us
						</span>

						<h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.1] mb-6 max-w-4xl tracking-tight">
							Sanitas Health and
							<br />
							<span className="italic text-lime font-serif font-medium">
								Development
							</span>{" "}
							Foundation
						</h1>

						<p className="max-w-2xl text-cream/80 text-base md:text-xl font-medium leading-relaxed mt-4">
							Empowering Healthy,{" "}
							<span className="text-lime font-semibold">
								Resilient Communities
							</span>{" "}
							Across Nigeria and Beyond
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
