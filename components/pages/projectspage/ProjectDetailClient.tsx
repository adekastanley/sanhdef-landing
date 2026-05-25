"use client";

import { ContentItem } from "@/app/actions/content";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/mButton";

interface ProjectDetailClientProps {
	project: ContentItem;
}

export default function ProjectDetailClient({
	project,
}: ProjectDetailClientProps) {
	return (
		<main className="min-h-screen bg-cream text-dark">
			{/* Hero Section - Matches AboutHero styling */}
			<section className="relative w-full pt-32 pb-20 px-4 md:px-8 bg-cream">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-navy flex flex-col justify-end items-center text-center px-6">
						{/* Background Image / Decorative elements */}
						<div
							className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105 opacity-40 mix-blend-overlay"
							style={{
								backgroundImage: project.image_url
									? `url('${project.image_url}')`
									: undefined,
							}}
						/>
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
						<div className="absolute inset-0 bg-linear-to-t from-[#0c2f1e]/90 via-[#0c2f1e]/30 to-transparent pointer-events-none" />

						<div className="relative z-20 flex flex-col items-center pb-20">
							{/* Breadcrumb / Tag */}
							<div className="flex items-center gap-3 mb-8">
								<Link href="/projects" className="group">
									<span className="text-white/80 hover:text-white uppercase tracking-widest text-xs font-bold backdrop-blur-md bg-white/10 px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 transition-colors">
										<ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
										Projects
									</span>
								</Link>
								{project.published_date && (
									<span className="text-pink uppercase tracking-widest text-xs font-bold px-2">
										{format(new Date(project.published_date), "MMMM yyyy")}
									</span>
								)}
							</div>

							<h1 className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl text-cream leading-[1.1] mb-6 max-w-5xl tracking-tight">
								{project.title}
							</h1>

							{project.summary && (
								<p className="max-w-2xl text-cream/80 text-lg md:text-xl font-medium leading-relaxed mt-2">
									{project.summary}
								</p>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Content Section - Matches VisionSection Layout */}
			<section className="py-24 px-6 md:px-12">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
					{/* Left Column: Metadata or "About this Project" */}
					<div className="md:w-1/3 sticky top-24 space-y-8">
						<div>
							<h2 className="font-sans font-bold text-3xl md:text-4xl leading-tight mb-4 tracking-tight">
								Project{" "}
								<span className="italic font-serif text-pink">Overview</span>
							</h2>
							<div className="h-1 w-20 bg-pink/40" />
						</div>

						{/* Status Card if needed */}
						<div className="bg-white p-6 rounded-[2rem] border border-dark/5 shadow-sm space-y-6">
							<div className="space-y-1.5">
								<span className="text-xs uppercase tracking-widest text-dark/50 font-bold block">
									Status
								</span>
								<p className="font-bold text-lg capitalize text-dark">
									{project.status || "Ongoing"}
								</p>
							</div>
							{project.category && (
								<div className="space-y-1.5">
									<span className="text-xs uppercase tracking-widest text-dark/50 font-bold block">
										Category
									</span>
									<p className="font-bold text-lg capitalize text-dark">
										{project.category}
									</p>
								</div>
							)}
						</div>

						{/* CTA if applicable */}
						<Link href="/contact" className="block">
							<MagneticButton className="w-full">
								Partner on this Project
							</MagneticButton>
						</Link>
					</div>

					{/* Right Column: Main Content */}
					<div className="md:w-2/3 space-y-8 text-lg leading-relaxed text-dark/80">
						{/* We can render HTML content here safely if sanitized, or just text with whitespace if plain text */}
						{/* Assuming simple text or markdown-like structure for now, preserving line breaks */}
						<div className="prose prose-lg max-w-none font-sans font-medium text-dark/80 whitespace-pre-wrap">
							{project.content}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
