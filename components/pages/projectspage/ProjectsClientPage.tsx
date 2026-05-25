"use client";

import { ContentItem } from "@/app/actions/content";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/mButton";

interface ProjectsClientPageProps {
	projects: ContentItem[];
}

export function ProjectsClientPage({ projects }: ProjectsClientPageProps) {
	const featuredProject = projects[0];
	const otherProjects = projects.slice(1);

	return (
		<main className="min-h-screen bg-cream text-dark">
			{/* Shared Hero Section Pattern */}
			<section className="relative w-full pt-32 pb-20 px-4 md:px-8 bg-cream">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-navy flex flex-col justify-center items-center text-center px-6">
						{/* Decorative abstract elements */}
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

						<div className="relative z-20 flex flex-col items-center">
							<span className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-6 px-4 py-1.5 rounded-full border border-white/20">
								Our Impact
							</span>

							<h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.1] mb-6 max-w-4xl tracking-tight">
								Our Projects
							</h1>

							<p className="max-w-2xl text-cream/80 text-base md:text-xl font-medium leading-relaxed mt-4">
								Delivering sustainable solutions and empowering communities
								through targeted health and development initiatives.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-24 px-6 md:px-12">
				<div className="max-w-7xl mx-auto space-y-24">
					{/* Featured Project */}
					{featuredProject && (
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div className="relative aspect-video md:aspect-square overflow-hidden rounded-[2rem] group border border-dark/5 shadow-sm">
								<div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-all duration-500 z-10" />
								<img
									src={featuredProject.image_url || "/placeholder-project.jpg"}
									alt={featuredProject.title}
									className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
								/>
							</div>
							<div className="space-y-6">
								<div className="space-y-3">
									<span className="text-pink uppercase tracking-widest text-sm font-bold block">
										Featured Project
									</span>
									<h2 className="font-serif text-4xl md:text-5xl leading-tight font-bold tracking-tight text-dark">
										{featuredProject.title}
									</h2>
								</div>
								<p className="text-dark/70 text-lg font-medium leading-relaxed line-clamp-4">
									{featuredProject.summary}
								</p>
								<Link href={`/projects/${featuredProject.slug}`}>
									<MagneticButton>View Project</MagneticButton>
								</Link>
							</div>
						</div>
					)}

					{/* Project Grid */}
					{otherProjects.length > 0 && (
						<div>
							<h3 className="font-serif text-4xl font-bold tracking-tight text-dark mb-12 border-b border-dark/10 pb-6">
								More Projects
							</h3>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
								{otherProjects.map((project) => (
									<div
										key={project.id}
										className="group flex flex-col space-y-4"
									>
										<Link
											href={`/projects/${project.slug}`}
											className="block overflow-hidden rounded-[2rem] aspect-[4/3] relative mb-2 shadow-sm border border-dark/5"
										>
											<div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors z-10" />
											<img
												src={
													project.image_url || "https://placehold.co/600x400"
												}
												alt={project.title}
												className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
											/>
										</Link>
										<div className="space-y-3">
											{project.published_date && (
												<span className="text-pink text-xs font-bold uppercase tracking-widest block">
													{format(
														new Date(project.published_date),
														"MMMM yyyy",
													)}
												</span>
											)}
											<h4 className="font-bold text-2xl text-dark group-hover:text-pink transition-colors leading-snug">
												<Link href={`/projects/${project.slug}`}>
													{project.title}
												</Link>
											</h4>
											<p className="text-dark/70 font-medium text-sm line-clamp-3 leading-relaxed">
												{project.summary}
											</p>
											<Link
												href={`/projects/${project.slug}`}
												className="inline-flex items-center text-sm font-semibold uppercase tracking-widest mt-2 text-dark group-hover:text-pink group-hover:translate-x-1 transition-all"
											>
												Read More <ArrowUpRight className="ml-1.5 w-4 h-4" />
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{projects.length === 0 && (
						<div className="text-center py-24 bg-dark/5 rounded-[2rem] border border-dark/5 text-dark/60 font-medium text-lg">
							<p>No projects found. Check back soon!</p>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
