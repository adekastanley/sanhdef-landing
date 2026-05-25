import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "../ui/mButton";
import { getContent } from "@/app/actions/landing";

export async function Hero() {
	const data = await getContent("hero");

	const title = data?.title || "The platform powering your operations";
	const description =
		data?.description ||
		"Sanitas Health and Development Foundation (SANHDEF) establishes dynamic collaborations to tackle public health, development, environmental, and social challenges.";
	const buttonText = data?.buttonText || "Get Involved";
	const buttonLink = data?.buttonLink || "/get-involved";
	const imageUrl = data?.imageUrl || "/assets/samg.webp";

	const stats = data?.stats || [
		{ value: "5K+", label: "Partners" },
		{ value: "2K+", label: "Projects" },
		{ value: "120+", label: "Communities" },
	];

	return (
		<section className="relative w-full bg-cream text-dark pt-32 pb-20 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div className="z-10 space-y-6 md:space-y-8 pr-4 md:pr-10 text-left">
					<h1 className="font-sans font-semibold text-5xl md:text-7xl leading-[1.1] tracking-tight text-dark text-balance">
						{title}
					</h1>

					<p className="text-base md:text-lg text-dark/70 font-medium leading-relaxed font-sans max-w-lg">
						{description}
					</p>

					<div className="flex items-center gap-4 pt-4">
						<Link href={buttonLink}>
							<MagneticButton
								variant="primary-pink"
								size="lg"
								className="font-semibold min-px-8 flex items-center gap-2  "
							>
								<span>{buttonText}</span>
								<ArrowRight className="w-5 h-5 inline ml-2" />
							</MagneticButton>
						</Link>
					</div>

					<div className="pt-8 flex gap-8 border-t border-dark/10 mt-8">
						{stats.map((stat: any, index: number) => (
							<div key={index}>
								<div className="text-4xl font-semibold text-dark">
									{stat.value}
								</div>
								<div className="text-sm text-dark/60 font-medium uppercase tracking-wider mt-1">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="relative w-full h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-xl bg-dark/5">
					<div
						className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
						style={{ backgroundImage: `url('${imageUrl}')` }}
					/>
				</div>
			</div>
		</section>
	);
}
