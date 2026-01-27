import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
	return (
		<section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center bg-cream text-dark">
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
				{/* Abstract background element/noise if needed, staying simple for now */}
			</div>

			<div className="z-10 max-w-4xl space-y-6">
				<h1 className="font-serif text-6xl md:text-8xl leading-tight">
					Driving Positive{" "}
					<span className="italic text-accent-green">Change</span>
				</h1>

				<p className="max-w-2xl mx-auto text-lg md:text-xl text-dark/80 font-medium leading-relaxed font-sans">
					Sanitas Health and Development Foundation (SANHDEF) establishes
					dynamic collaborations to tackle public health, development,
					environmental, and social challenges.
				</p>

				<div className="flex items-center justify-center gap-4 pt-8">
					<Link
						href="/about-us"
						className="px-8 py-3 rounded-full bg-dark text-cream font-semibold hover:bg-dark/90 transition-all flex items-center gap-2"
					>
						Who We Are <ArrowRight className="w-4 h-4" />
					</Link>
					<Link
						href="#focus-areas"
						className="px-8 py-3 rounded-full border border-dark/20 text-dark font-semibold hover:bg-dark/5 transition-all text-sm"
					>
						Our Focus
					</Link>
				</div>
			</div>

			{/* Decorative dashed line from design */}
			<div className="absolute bottom-0 left-0 w-full overflow-hidden">
				<svg
					className="w-full h-24 text-dark/10"
					preserveAspectRatio="none"
					viewBox="0 0 1200 100"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 50 C 300 100, 900 0, 1200 50"
						stroke="currentColor"
						strokeWidth="2"
						strokeDasharray="8 8"
					/>
				</svg>
			</div>
		</section>
	);
}
