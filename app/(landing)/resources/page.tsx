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
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Video, Download } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const resources = [
	{
		id: 1,
		title: "Supply Chain Optimization Guide",
		description:
			"A comprehensive guide to optimizing your last-mile delivery network in remote areas.",
		type: "Guide",
		format: "PDF",
		isFree: true,
		icon: FileText,
		url: "/resources/supply-chain-guide",
	},
	{
		id: 2,
		title: "Logistics Analytics Dashboard Template",
		description:
			"Ready-to-use dashboard templates for tracking key performance indicators in logistics.",
		type: "Template",
		format: "Excel",
		isFree: false,
		price: "$49",
		icon: Download,
		url: "/resources/dashboard-template",
	},
	{
		id: 3,
		title: "Effective Warehouse Management",
		description:
			"Video course covering the fundamentals of modern warehouse management systems.",
		type: "Course",
		format: "Video",
		isFree: false,
		price: "$199",
		icon: Video,
		url: "/resources/warehouse-course",
	},
	{
		id: 4,
		title: "Remote Delivery Case Studies",
		description:
			"Real-world examples of successful delivery strategies in challenging terrains.",
		type: "Case Study",
		format: "PDF",
		isFree: true,
		icon: FileText,
		url: "/resources/case-studies",
	},
	{
		id: 5,
		title: "Inventory Tracking Spreadsheet",
		description:
			"Simple yet powerful spreadsheet for small to medium-sized inventory tracking.",
		type: "Tool",
		format: "Excel",
		isFree: true,
		icon: Download,
		url: "/resources/inventory-sheet",
	},
	{
		id: 6,
		title: "Global Logistics Trends Report 2025",
		description:
			"In-depth analysis of upcoming trends in global logistics and supply chain management.",
		type: "Report",
		format: "PDF",
		isFree: false,
		price: "$99",
		icon: FileText,
		url: "/resources/trends-report",
	},
];

export default function ResourcesPage() {
	const [filter, setFilter] = useState<"all" | "free" | "paid">("all");

	const filteredResources = resources.filter((resource) => {
		if (filter === "all") return true;
		if (filter === "free") return resource.isFree;
		if (filter === "paid") return !resource.isFree;
		return true;
	});

	return (
		<main className="min-h-screen bg-cream text-dark">
			{/* Shared Hero Section Pattern */}
			<section className="relative h-[60vh] max-w-7xl min-h-[500px] w-full overflow-hidden rounded-b-[3rem] mx-auto">
				<div className="absolute inset-0 bg-dark/20 z-10" />
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
					style={{ backgroundColor: "#2D5B40" }}
				>
					<div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent" />
				</div>

				<div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4 pt-20">
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-cream/80 uppercase tracking-widest text-sm font-medium mb-4 backdrop-blur-md bg-white/10 px-4 py-1 rounded-full border border-white/20"
					>
						Resources
					</motion.span>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-6 max-w-4xl"
					>
						Resources
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="max-w-xl text-cream/90 text-lg md:text-xl font-light mb-8"
					>
						Explore our collection of guides, templates, and courses to help you
						succeed.
					</motion.p>
				</div>
			</section>

			{/* Resources Grid */}
			<section className="py-20 px-4">
				<div className="container mx-auto max-w-7xl">
					{/* Filter Controls */}
					<div className="flex justify-center mb-12">
						<div className="flex p-1 bg-white rounded-full border border-gray-200/60 shadow-sm">
							<FilterButton
								active={filter === "all"}
								onClick={() => setFilter("all")}
							>
								All Resources
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
								Paid
							</FilterButton>
						</div>
					</div>

					<motion.div
						layout
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						<AnimatePresence mode="popLayout">
							{filteredResources.map((resource) => (
								<motion.div
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.3 }}
									key={resource.id}
								>
									<Card className="group hover:shadow-lg transition-all duration-300 border-black/5 bg-white overflow-hidden flex flex-col h-full">
										<CardHeader className="relative pb-0">
											<div className="flex justify-between items-start mb-4">
												<div className="p-3 bg-cream rounded-full group-hover:bg-[#2D5B40]/10 transition-colors">
													<resource.icon className="w-6 h-6 text-[#2D5B40]" />
												</div>
												<Badge
													variant={resource.isFree ? "secondary" : "default"}
													className={`${
														resource.isFree
															? "bg-green-100 text-green-800 hover:bg-green-200"
															: "bg-blue-100 text-blue-800 hover:bg-blue-200"
													} border-0`}
												>
													{resource.isFree ? "Free" : "Paid"}
												</Badge>
											</div>
											<CardTitle className="text-xl font-serif text-dark group-hover:text-[#2D5B40] transition-colors">
												{resource.title}
											</CardTitle>
											<CardDescription className="mt-2 text-dark/60">
												{resource.type} • {resource.format}
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-4 grow">
											<p className="text-dark/70 leading-relaxed">
												{resource.description}
											</p>
											{!resource.isFree && (
												<div className="mt-2 text-[#2D5B40] font-semibold">
													{resource.price}
												</div>
											)}
										</CardContent>
										<CardFooter className="pt-0 mt-auto border-t border-gray-100 p-6">
											<Link
												href={resource.url}
												className="flex items-center justify-between w-full text-sm font-medium text-[#2D5B40] group-hover:underline underline-offset-4"
											>
												<span>
													{resource.isFree ? "Access Now" : "Buy Now"}
												</span>
												<ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
											</Link>
										</CardFooter>
									</Card>
								</motion.div>
							))}
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
			className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
				active
					? "bg-[#2D5B40] text-white shadow-md"
					: "text-gray-500 hover:text-dark hover:bg-gray-100"
			}`}
		>
			{children}
		</button>
	);
}
