"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { FocusArea } from "@/components/admin/FocusAreasManager";

interface FocusAreasPageClientProps {
	items: FocusArea[];
	title: string;
}

export function FocusAreasPageClient({ items, title }: FocusAreasPageClientProps) {
	return (
		<div className="min-h-screen bg-cream text-dark">
			{/* Hero Section */}
			<section className="relative px-6 pt-32">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden rounded-[2.5rem] bg-navy flex flex-col justify-center items-center text-center px-6 shadow-xl">
						{/* Decorative abstract elements */}
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

						<div className="relative z-20 flex flex-col items-center">
							<motion.span
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-6 px-4 py-1.5 rounded-full border border-white/20"
							>
								Core Impact
							</motion.span>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.1] mb-6 max-w-4xl tracking-tight"
							>
								{title}
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="max-w-2xl text-cream/80 text-lg md:text-xl font-medium mb-10 leading-relaxed"
							>
								Discover the critical areas where our targeted initiatives drive sustainable growth, resilience, and systemic transformation across the continent.
							</motion.p>
						</div>
					</div>
				</div>
			</section>

			{/* Grid Section */}
			<section className="py-24 px-6">
				<div className="max-w-7xl mx-auto">
					<motion.div
						layout
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						<AnimatePresence mode="popLayout">
							{items.map((item) => (
								<motion.div
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.4 }}
									key={item.id}
								>
									<Card className="group h-full bg-white border border-dark/5 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-dark/5 transition-all duration-500 flex flex-col">
										{/* Image Banner */}
										{item.imageUrl && (
											<div className="w-full h-56 overflow-hidden relative">
												<img
													src={item.imageUrl}
													alt={item.title}
													className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
												/>
												<div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-500" />
											</div>
										)}
										<CardHeader className={`p-8 ${item.imageUrl ? 'pt-6' : ''} pb-4`}>
											<div className="flex justify-between items-start mb-4">
												{!item.imageUrl && (
													<div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center group-hover:bg-pink transition-colors duration-500 mb-2">
														<Target className="w-6 h-6 text-navy" />
													</div>
												)}
												{item.tag && (
													<Badge className="rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider border-none bg-pink text-dark ml-auto">
														{item.tag}
													</Badge>
												)}
											</div>
											<CardTitle className="text-2xl font-bold tracking-tight text-dark group-hover:text-navy transition-colors leading-tight">
												{item.title}
											</CardTitle>
										</CardHeader>
										<CardContent className="px-8 pt-0 grow">
											<p className="text-dark/60 leading-relaxed font-medium">
												{item.shortDesc}
											</p>
										</CardContent>
										<CardFooter className="px-8 pb-8 pt-4">
											<Link
												href={`/focus-areas/${item.id}`}
												className="group/link flex items-center justify-between w-full p-4 rounded-2xl bg-cream hover:bg-navy transition-all duration-300"
											>
												<span className="font-bold text-dark group-hover/link:text-cream">
													Read More
												</span>
												<ArrowRight className="w-5 h-5 text-navy group-hover/link:text-pink transition-transform group-hover/link:translate-x-1" />
											</Link>
										</CardFooter>
									</Card>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
