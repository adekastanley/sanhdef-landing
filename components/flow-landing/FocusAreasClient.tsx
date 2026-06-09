"use client";

import { motion } from "motion/react";
import { ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { FocusArea } from "../admin/FocusAreasManager";

interface FocusAreasClientProps {
	items: FocusArea[];
	limit?: number;
}

const itemVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
	},
};

export function FocusAreasClient({ items, limit }: FocusAreasClientProps) {
	// Display limited items if prop is provided, otherwise all
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div className="w-full flex flex-col gap-12 md:gap-16">
			{displayedItems.map((item, idx) => {
				const isImageLeft = idx % 2 === 0;

				return (
					<motion.div
						key={item.id}
						variants={itemVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-10% 0px" }}
						className={`flex flex-col ${
							isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
						} w-full rounded-2xl overflow-hidden shadow-lg bg-navy text-white`}
					>
						{/* Image Side */}
						<div className="w-full md:w-1/2 min-h-[300px] md:min-h-[400px] relative">
							{item.imageUrl ? (
								<img
									src={item.imageUrl}
									alt={item.title}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							) : (
								<div className="absolute inset-0 w-full h-full bg-navy/80 flex items-center justify-center">
									<span className="text-white/50 font-medium">No Image Provided</span>
								</div>
							)}
						</div>

						{/* Text Side */}
						<div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
							{item.tag && (
								<div className="flex items-center gap-2 mb-6">
									<div className="bg-pink rounded-full p-1">
										<AlertCircle className="w-4 h-4 text-white" />
									</div>
									<span className="text-xs tracking-widest uppercase font-semibold text-white/80">
										{item.tag}
									</span>
								</div>
							)}

							<h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight mb-8 leading-tight">
								{item.title}
							</h3>

							<div className="w-12 h-1 bg-pink mb-8 rounded-full" />

							<p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed mb-10">
								{item.shortDesc}
							</p>

							<div>
								<Link href={`/focus-areas/${item.id}`}>
									<button className="bg-pink text-dark hover:bg-pink-hover transition-colors rounded-full px-6 py-3 font-semibold flex items-center gap-2 group">
										Read More
										<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
									</button>
								</Link>
							</div>
						</div>
					</motion.div>
				);
			})}

			{limit && items.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex justify-center mt-8"
				>
					<Link href="/focus-areas">
						<button className="px-8 py-4 bg-navy text-white rounded-full font-semibold hover:bg-navy/90 transition-colors shadow-sm border border-navy/10 flex items-center gap-2 group">
							View All Focus Areas
							<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
						</button>
					</Link>
				</motion.div>
			)}
		</div>
	);
}
