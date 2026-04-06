"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ExternalLink,
	FileText,
	Video,
	Download,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const getIcon = (iconName: string) => {
	switch (iconName) {
		case "FileText":
			return FileText;
		case "Download":
			return Download;
		case "Video":
			return Video;
		default:
			return FileText;
	}
};

export default function ResourcesClient({
	heroData,
	resourcesData,
}: {
	heroData?: any;
	resourcesData?: any[];
}) {
	const [filter, setFilter] = useState<"all" | "free" | "paid">("all");

	const topTag = heroData?.topTag || "Resources & Insights";
	const titleLine1 = heroData?.titleLine1 || "Tools for";
	const titleItalic = heroData?.titleItalic || "Impact";
	const description = heroData?.description || "Explore our collection of specialized guides, templates, and courses designed to empower global health and supply chain success.";

	const resources = resourcesData || [];

	const filteredResources = resources.filter((resource) => {
		if (filter === "all") return true;
		if (filter === "free") return resource.isFree;
		if (filter === "paid") return !resource.isFree;
		return true;
	});

	return (
		<main className="min-h-screen bg-cream text-dark">
			{/* Redesigned Hero Section */}
			<section className="relative px-6 pt-32">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-dark-green flex flex-col justify-center items-center text-center px-6">
						{/* Decorative abstract elements */}
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

						<div className="relative z-20 flex flex-col items-center">
							<motion.span
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-6 px-4 py-1.5 rounded-full border border-white/20"
							>
								{topTag}
							</motion.span>

							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.1] mb-6 max-w-4xl tracking-tight"
							>
								{titleLine1}{" "}
								<span className="italic text-lime font-serif font-medium">
									{titleItalic}
								</span>
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="max-w-2xl text-cream/80 text-lg md:text-xl font-medium mb-10 leading-relaxed"
							>
								{description}
							</motion.p>
						</div>
					</div>
				</div>
			</section>

			{/* Resources Grid */}
			<section className="py-24 px-6">
				<div className="max-w-7xl mx-auto">
					{/* Filter Controls */}
					<div className="flex justify-center mb-20">
						<div className="flex p-2 bg-white gap-4 rounded-full border border-dark/5 shadow-sm">
							<FilterButton
								active={filter === "all"}
								onClick={() => setFilter("all")}
							>
								All
							</FilterButton>
							<FilterButton
								active={filter === "free"}
								onClick={() => setFilter("free")}
							>
								Free
							</FilterButton>
							<FilterButton
								active={filter === "paid"}
								onClick={() => setFilter("paid")}
							>
								Premium
							</FilterButton>
						</div>
					</div>

					<motion.div
						layout
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						<AnimatePresence mode="popLayout">
							{filteredResources.map((resource) => {
								const IconComponent = getIcon(resource.icon);

								return (
									<motion.div
										layout
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.4 }}
										key={resource.id}
									>
										<Card className="group h-full bg-white border border-dark/5 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-dark/5 transition-all duration-500 flex flex-col">
											<CardHeader className="p-8 pb-4">
												<div className="flex justify-between items-start mb-6">
													<div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center group-hover:bg-lime transition-colors duration-500">
														<IconComponent className="w-6 h-6 text-dark-green" />
													</div>
													<Badge
														className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider border-none ${
															resource.isFree
																? "bg-dark-green/5 text-dark-green"
																: "bg-lime text-dark"
														}`}
													>
														{resource.isFree ? "Free" : "Premium"}
													</Badge>
												</div>
												<CardTitle className="text-2xl font-bold tracking-tight text-dark group-hover:text-dark-green transition-colors leading-tight">
													{resource.title}
												</CardTitle>
												<div className="mt-3 flex items-center gap-2 text-dark/40 text-xs font-bold uppercase tracking-widest">
													<span>{resource.type}</span>
													<span className="w-1 h-1 rounded-full bg-dark/10" />
													<span>{resource.format}</span>
												</div>
											</CardHeader>
											<CardContent className="px-8 pt-0 grow">
												<p className="text-dark/60 leading-relaxed font-medium">
													{resource.description}
												</p>
												{!resource.isFree && resource.price && (
													<div className="mt-4 text-dark-green font-bold text-xl">
														{resource.price}
													</div>
												)}
											</CardContent>
											<CardFooter className="px-8 pb-8 pt-4">
												<Link
													href={resource.url || "#"}
													className="group/link flex items-center justify-between w-full p-4 rounded-2xl bg-cream hover:bg-dark-green transition-all duration-300"
												>
													<span className="font-bold text-dark group-hover/link:text-cream">
														{resource.isFree ? "Access Resource" : "Purchase Now"}
													</span>
													<ArrowRight className="w-5 h-5 text-dark-green group-hover/link:text-lime transition-transform group-hover/link:translate-x-1" />
												</Link>
											</CardFooter>
										</Card>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</motion.div>
				</div>
			</section>
		</main>
	);
}

function FilterButton({
	active,
	children,
	onClick,
}: {
	active: boolean;
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
				active
					? "bg-dark-green text-cream shadow-lg"
					: "text-dark/40 hover:text-dark hover:bg-cream"
			}`}
		>
			{children}
		</button>
	);
}
