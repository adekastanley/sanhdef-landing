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
			<section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-b-[3rem] mx-auto">
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
					style={{
						backgroundColor: "#2D5B40", // Fallback
						backgroundImage: project.image_url
							? `url('${project.image_url}')`
							: undefined,
					}}
				>
					<div className="absolute inset-0 bg-dark/40" />
					<div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/30 to-transparent" />
				</div>

				<div className="relative z-20 container mx-auto h-full flex flex-col justify-end items-center text-center px-4 pb-20">
					{/* Breadcrumb / Tag */}
					<div className="flex items-center gap-2 mb-6">
						<Link href="/projects" className="group">
							<span className="text-cream/80 hover:text-white uppercase tracking-widest text-sm font-medium backdrop-blur-md bg-white/10 px-4 py-1 rounded-full border border-white/20 flex items-center gap-2 transition-colors">
								<ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
								Projects
							</span>
						</Link>
						{project.published_date && (
							<span className="text-cream/60 uppercase tracking-widest text-sm font-medium px-2">
								{format(new Date(project.published_date), "MMMM yyyy")}
							</span>
						)}
					</div>

					<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6 max-w-5xl">
						{project.title}
					</h1>

					{project.summary && (
						<p className="max-w-2xl text-cream/90 text-lg md:text-xl font-light leading-relaxed">
							{project.summary}
						</p>
					)}
				</div>
			</section>

			{/* Content Section - Matches VisionSection Layout */}
			<section className="py-24 px-6 md:px-12">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
					{/* Left Column: Metadata or "About this Project" */}
					<div className="md:w-1/3 sticky top-24 space-y-8">
						<div>
							<h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
								Project{" "}
								<span className="italic text-accent-green">Overview</span>
							</h2>
							<div className="h-1 w-20 bg-accent-green/30" />
						</div>

						{/* Status Card if needed */}
						<div className="bg-white p-6 rounded-2xl border border-dark/5 shadow-sm space-y-4">
							<div className="space-y-1">
								<span className="text-xs uppercase tracking-wider text-dark/50 font-semibold">
									Status
								</span>
								<p className="font-medium text-lg capitalize">
									{project.status || "Ongoing"}
								</p>
							</div>
							{project.category && (
								<div className="space-y-1">
									<span className="text-xs uppercase tracking-wider text-dark/50 font-semibold">
										Category
									</span>
									<p className="font-medium text-lg capitalize">
										{project.category}
									</p>
								</div>
							)}
						</div>

						{/* CTA if applicable */}
						<Link href="/contact">
							<MagneticButton className="w-full">
								Partner on this Project
							</MagneticButton>
						</Link>
					</div>

					{/* Right Column: Main Content */}
					<div className="md:w-2/3 space-y-8 text-lg leading-relaxed text-dark/80">
						{/* We can render HTML content here safely if sanitized, or just text with whitespace if plain text */}
						{/* Assuming simple text or markdown-like structure for now, preserving line breaks */}
						<div className="prose prose-lg max-w-none font-sans text-dark/80 whitespace-pre-wrap">
							{project.content}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
