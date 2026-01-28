import { MagneticButton } from "@/components/ui/mButton";
import Link from "next/link";
interface InvolvementSectionProps {
	title: string;
	description: string;
	features: { label: string; value: string }[];
	ctaText: string;
	ctaLink: string;
	image?: string;
	isReversed?: boolean; // To alternate layout
}

export function InvolvementSection({
	title,
	description,
	features,
	ctaText,
	ctaLink,
	// image,
	isReversed = false,
}: InvolvementSectionProps) {
	return (
		<section
			className={`py-24 px-6 md:px-12 ${isReversed ? "bg-white" : "bg-cream"} text-dark`}
		>
			<div
				className={`max-w-7xl mx-auto flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-24 items-start`}
			>
				{/* Left Title / Header */}
				<div className="md:w-1/3 sticky top-24">
					<h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
						{title.split(" ").map((word, i) => (
							<span
								key={i}
								className={
									i % 2 !== 0 ? "italic text-accent-green block" : "block"
								}
							>
								{word}
							</span>
						))}
					</h2>
					<Link href={ctaLink}>
						<MagneticButton size="lg" className="mt-4">
							{ctaText}
						</MagneticButton>
					</Link>
				</div>

				{/* Right Content */}
				<div className="md:w-2/3 space-y-8">
					<h3 className="text-xl md:text-2xl font-medium leading-relaxed">
						{description}
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-dark/10 pt-8 mt-8">
						{features.map((feature, idx) => (
							<div key={idx}>
								<div className="text-3xl font-serif text-accent-green mb-2">
									{feature.value}
								</div>
								<div className="text-sm uppercase tracking-wide opacity-60">
									{feature.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
