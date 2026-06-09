import { getContent } from "@/app/actions/landing";
import { getItems } from "@/app/actions/content";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export async function HomeProjectsSection() {
	const config = await getContent("home_projects");
	const title = config?.title || "Recent Projects";
	const subtext = config?.subtext || "Explore our latest initiatives creating lasting change.";
	const selectedIds: string[] = config?.selectedProjectIds || [];

	let projects = [];
	if (selectedIds.length > 0) {
		const allProjects = await getItems("project", 50, 1, "all");
		projects = allProjects.filter((p) => selectedIds.includes(p.id));
		// Match the order of selectedIds if possible
		projects.sort((a, b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id));
	} else {
		projects = await getItems("project", 3, 1, "all");
	}

	if (projects.length === 0) return null;

	return (
		<section className="py-24 px-4 md:px-8 bg-white overflow-hidden relative">
			<div className="max-w-7xl mx-auto relative z-10">
				<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
					<div className="max-w-2xl">
						<h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-navy mb-4">
							{title}
						</h2>
						<p className="text-lg text-dark/70 font-medium">
							{subtext}
						</p>
					</div>
					<Link href="/projects">
						<Button className="rounded-full bg-pink hover:bg-pink-hover text-dark font-semibold px-8 py-6 shadow-sm flex items-center gap-2 group">
							View All Projects
							<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{projects.map((project) => (
						<Link
							key={project.id}
							href={`/projects/${project.slug}`}
							className="group block"
						>
							<Card className="overflow-hidden border border-dark/5 shadow-sm hover:shadow-xl bg-cream rounded-3xl transition-all duration-300 h-full flex flex-col">
								<div className="relative w-full h-56 overflow-hidden bg-dark/5">
									<Image
										src={project.image_url || "/assets/placeholder.jpg"}
										alt={project.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										unoptimized
									/>
									<div className="absolute top-4 right-4">
										<Badge className="bg-white text-dark shadow-sm hover:bg-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
											{new Date(project.published_date).getFullYear()}
										</Badge>
									</div>
								</div>
								<CardContent className="p-8 flex-1 flex flex-col">
									<h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-pink transition-colors leading-tight line-clamp-2">
										{project.title}
									</h3>
									<p className="text-dark/70 line-clamp-3 mb-6 text-base leading-relaxed font-medium flex-1">
										{project.summary}
									</p>
									<div className="flex items-center text-dark font-bold text-sm group-hover:text-pink transition-colors uppercase tracking-widest mt-auto">
										Explore
										<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
				
				<div className="mt-12 flex justify-center md:hidden">
					<Link href="/projects">
						<Button variant="outline" className="rounded-full border-dark/10 font-semibold px-8 py-6 w-full">
							View All Projects
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
