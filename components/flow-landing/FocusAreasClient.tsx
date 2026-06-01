"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface Feature {
	title: string;
	desc: string;
}

interface FocusAreasClientProps {
	features: Feature[];
}

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const headingVariants = {
	hidden: { y: 24, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
	},
};

const rowVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
	},
};

export function FocusAreasClient({ features }: FocusAreasClientProps) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-15% 0px" });

	return (
		<div ref={ref} className="w-full">
			{/* Section label */}
			<motion.p
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
				variants={headingVariants}
				className="text-xs md:text-sm font-sans font-semibold uppercase tracking-[0.2em] text-pink mb-14"
			>
				Focus Areas
			</motion.p>

			{/* Animated rows */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
				className="flex flex-col"
			>
				{features.map((feature, idx) => (
					<motion.div
						key={idx}
						variants={rowVariants}
						className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/10 hover:border-pink/40 transition-colors duration-500 cursor-default"
					>
						{/* Title + description */}
						<div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10">
							<h3 className="text-2xl md:text-4xl font-sans font-bold tracking-tight text-white transition-transform duration-500 group-hover:-translate-x-1">
								{feature.title}
							</h3>
							<p className="text-white/50 font-sans font-medium text-sm md:text-base mt-1 md:mt-0 transition-colors duration-500 group-hover:text-white/75">
								{feature.desc}
							</p>
						</div>

						{/* Arrow accent */}
						<div className="mt-4 md:mt-0 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-pink">
							<ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
