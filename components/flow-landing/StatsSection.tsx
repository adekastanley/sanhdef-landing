import { ArrowUpRight } from "lucide-react";

export function StatsSection() {
	return (
		<section className="py-24 px-4 bg-dark text-cream rounded-t-[3rem] -mt-10 relative z-10">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
				<div className="space-y-8">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm border border-white/10">
						<span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
						Impact Driven Data
					</div>

					<h2 className="font-serif text-4xl md:text-5xl leading-tight">
						Empowering communities <br />
						<span className="text-accent-green/80 italic">4x faster</span> than
						before.
					</h2>

					<p className="text-cream/70 text-lg leading-relaxed max-w-md">
						Our strategic initiatives have accelerated development outcomes
						across the region, heavily relying on community participation and
						data-driven insights.
					</p>

					<button className="group flex items-center gap-3 px-6 py-3 bg-cream text-dark rounded-full font-semibold hover:bg-white transition-colors">
						View Impact Reports
						<ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
					</button>
				</div>

				<div className="relative">
					{/* Abstract visual representation of impact - or use an image from public assets if available. 
                For now, creating a CSS-only visual card stack mimicking the design. */}

					<div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
						<div className="flex items-center justify-between mb-8">
							<div className="space-y-1">
								<div className="text-xs text-cream/50 uppercase tracking-widest">
									Lives Impacted
								</div>
								<div className="text-3xl font-serif">15,000+</div>
							</div>
							<div className="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center">
								<ArrowUpRight className="w-5 h-5 text-cream" />
							</div>
						</div>
						<div className="h-2 bg-white/10 rounded-full overflow-hidden">
							<div className="h-full w-[85%] bg-accent-green rounded-full"></div>
						</div>
						<div className="mt-2 text-right text-xs text-cream/50">
							85% Goal Reached
						</div>
					</div>

					<div className="absolute top-10 -left-10 z-0 bg-accent-green/20 backdrop-blur-sm border border-white/5 p-6 rounded-3xl w-full transform -rotate-6 scale-95 opacity-50">
						<div className="h-20"></div> {/* Spacer */}
					</div>
				</div>
			</div>
		</section>
	);
}
