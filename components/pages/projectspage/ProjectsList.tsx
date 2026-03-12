import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ContentItem } from "@/app/actions/content";

interface ProjectsListProps {
	projects: ContentItem[];
	years: string[];
	currentYear: string;
	currentPage: number;
	hasMore: boolean;
}

export default function ProjectsList({
	projects,
	years,
	currentYear,
	currentPage,
	hasMore,
}: ProjectsListProps) {
	return (
		<section id="projects" className="scroll-mt-32">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
				<div>
					<h2 className="text-4xl font-bold text-dark mb-3 tracking-tight">
						Key Projects
					</h2>
					<p className="text-dark/70 font-medium text-lg">
						Explore our ongoing and completed initiatives.
					</p>
				</div>

				{/* Filter & Pagination Controls */}
				<div className="flex flex-wrap items-center gap-3">
					<div className="flex items-center gap-2 bg-dark/5 p-1.5 rounded-xl border border-dark/5">
						<span className="text-xs font-semibold px-2 text-dark/60 uppercase flex items-center gap-1.5 tracking-wider">
							<Filter className="h-3.5 w-3.5" /> Year
						</span>
						<div className="flex gap-1">
							<Link
								href={`/projects?year=all#projects`}
								scroll={false}
								className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
									currentYear === "all"
										? "bg-white shadow-sm text-lime"
										: "text-dark/70 hover:text-dark hover:bg-dark/5"
								}`}
							>
								All
							</Link>
							{years.slice(0, 3).map((y) => (
								<Link
									key={y}
									href={`/projects?year=${y}#projects`}
									scroll={false}
									className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
										currentYear === y
											? "bg-white shadow-sm text-lime"
											: "text-dark/70 hover:text-dark hover:bg-dark/5"
									}`}
								>
									{y}
								</Link>
							))}
						</div>
					</div>

					<div className="flex items-center gap-2 ml-2">
						{currentPage > 1 && (
							<Link
								href={`/projects?page=${currentPage - 1}&year=${currentYear}#projects`}
								scroll={false}
							>
								<Button
									variant="outline"
									size="icon"
									className="h-10 w-10 border-dark/10 hover:bg-dark/5 rounded-xl"
								>
									<ArrowRight className="h-5 w-5 rotate-180 text-dark/70" />
								</Button>
							</Link>
						)}
						{hasMore && (
							<Link
								href={`/projects?page=${currentPage + 1}&year=${currentYear}#projects`}
								scroll={false}
							>
								<Button
									variant="outline"
									size="icon"
									className="h-10 w-10 border-dark/10 hover:bg-dark/5 rounded-xl"
								>
									<ArrowRight className="h-5 w-5 text-dark/70" />
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>

			{projects.length === 0 ? (
				<div className="text-center py-24 bg-dark/5 rounded-[2rem] border border-dark/5">
					<p className="text-dark/60 font-medium text-lg">
						No projects found for the selected criteria.
					</p>
				</div>
			) : (
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<Link
							key={project.id}
							href={`/projects/${project.slug}`}
							className="group"
						>
							<Card className="overflow-hidden border border-dark/5 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white rounded-3xl transition-all duration-300 h-full flex flex-col">
								<div className="relative h-56 w-full overflow-hidden bg-dark/5">
									<Image
										src={project.image_url || "/assets/placeholder.jpg"}
										alt={project.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										unoptimized
									/>
									<div className="absolute top-4 right-4">
										<Badge className="bg-white text-dark shadow-sm hover:bg-white text-xs font-semibold px-3 py-1">
											{new Date(project.published_date).getFullYear()}
										</Badge>
									</div>
								</div>
								<CardContent className="flex-1 p-6 flex flex-col">
									<h3 className="text-xl font-bold text-dark mb-3 group-hover:text-lime transition-colors line-clamp-2 leading-snug">
										{project.title}
									</h3>
									<p className="text-dark/70 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed font-medium">
										{project.summary}
									</p>
									<div className="flex items-center text-dark font-semibold text-sm mt-auto group-hover:text-lime transition-colors">
										Read More{" "}
										<ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
