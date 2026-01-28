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
			<section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-b-[3rem] mx-auto">
				<div className="absolute inset-0 bg-dark/20 z-10" />
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
					style={{ backgroundColor: "#2D5B40" }}
				>
					<div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent" />
				</div>

				<div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4 pt-20">
					<span className="text-cream/80 uppercase tracking-widest text-sm font-medium mb-4 backdrop-blur-md bg-white/10 px-4 py-1 rounded-full border border-white/20">
						Our Impact
					</span>
					<h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-6 max-w-4xl">
						Our Projects
					</h1>
					<p className="max-w-xl text-cream/90 text-lg md:text-xl font-light mb-8">
						Delivering sustainable solutions and empowering communities through
						targeted health and development initiatives.
					</p>
				</div>
			</section>

			<section className="py-24 px-6 md:px-12">
				<div className="max-w-7xl mx-auto space-y-24">
					{/* Featured Project */}
					{featuredProject && (
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div className="relative aspect-video md:aspect-square overflow-hidden rounded-2xl group">
								<div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-all duration-500 z-10" />
								<img
									src={featuredProject.image_url || "/placeholder-project.jpg"}
									alt={featuredProject.title}
									className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
								/>
							</div>
							<div className="space-y-6">
								<div className="space-y-2">
									<span className="text-accent-green uppercase tracking-widest text-xs font-bold">
										Featured Project
									</span>
									<h2 className="font-serif text-4xl md:text-5xl leading-tight">
										{featuredProject.title}
									</h2>
								</div>
								<p className="text-dark/70 text-lg leading-relaxed line-clamp-4">
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
							<h3 className="font-serif text-3xl mb-12 border-b border-dark/10 pb-4">
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
											className="block overflow-hidden rounded-xl aspect-[4/3] relative mb-2"
										>
											<div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors z-10" />
											<img
												src={
													project.image_url || "https://placehold.co/600x400"
												}
												alt={project.title}
												className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
											/>
										</Link>
										<div className="space-y-2">
											{project.published_date && (
												<span className="text-accent-green text-xs font-medium uppercase tracking-wider block">
													{format(
														new Date(project.published_date),
														"MMMM yyyy",
													)}
												</span>
											)}
											<h4 className="font-serif text-2xl group-hover:text-accent-green transition-colors">
												<Link href={`/projects/${project.slug}`}>
													{project.title}
												</Link>
											</h4>
											<p className="text-dark/60 text-sm line-clamp-3 leading-relaxed">
												{project.summary}
											</p>
											<Link
												href={`/projects/${project.slug}`}
												className="inline-flex items-center text-sm font-semibold uppercase tracking-wide mt-2 group-hover:translate-x-1 transition-transform"
											>
												Read More <ArrowUpRight className="ml-1 w-3 h-3" />
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{projects.length === 0 && (
						<div className="text-center py-24 text-dark/50">
							<p>No projects found. Check back soon!</p>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
