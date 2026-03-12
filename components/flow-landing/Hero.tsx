import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/mButton";

export function Hero() {
	return (
		<section className="relative w-full bg-cream text-dark pt-32 pb-20 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div className="z-10 space-y-6 md:space-y-8 pr-4 md:pr-10 text-left">
					<h1 className="font-sans font-semibold text-5xl md:text-7xl leading-[1.1] tracking-tight text-dark text-balance">
						The platform powering your operations
					</h1>

					<p className="text-base md:text-lg text-dark/70 font-medium leading-relaxed font-sans max-w-lg">
						Sanitas Health and Development Foundation (SANHDEF) establishes
						dynamic collaborations to tackle public health, development,
						environmental, and social challenges.
					</p>

					<div className="flex items-center gap-4 pt-4">
						<Link href="/get-involved">
							<MagneticButton
								variant="primary-lime"
								size="lg"
								className="font-semibold min-px-8 flex items-center gap-2  "
							>
								<span>Get Involved</span>
								<ArrowRight className="w-5 h-5 inline ml-2" />
							</MagneticButton>
						</Link>
					</div>

					<div className="pt-8 flex gap-8 border-t border-dark/10 mt-8">
						<div>
							<div className="text-4xl font-semibold text-dark">5K+</div>
							<div className="text-sm text-dark/60 font-medium uppercase tracking-wider mt-1">
								Partners
							</div>
						</div>
						<div>
							<div className="text-4xl font-semibold text-dark">2K+</div>
							<div className="text-sm text-dark/60 font-medium uppercase tracking-wider mt-1">
								Projects
							</div>
						</div>
						<div>
							<div className="text-4xl font-semibold text-dark">120+</div>
							<div className="text-sm text-dark/60 font-medium uppercase tracking-wider mt-1">
								Communities
							</div>
						</div>
					</div>
				</div>

				<div className="relative w-full h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-xl bg-dark/5">
					<div className="absolute inset-0 bg-[url('/assets/samg.webp')] bg-cover bg-center hover:scale-105 transition-transform duration-700" />
				</div>
			</div>
		</section>
	);
}
