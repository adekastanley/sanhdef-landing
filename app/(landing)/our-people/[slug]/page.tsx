import { getItemBySlug } from "@/app/actions/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectDetailPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function ProjectDetailPage({
	params,
}: ProjectDetailPageProps) {
	const { slug } = await params;
	const project = await getItemBySlug(slug);

	if (!project || project.type !== "project") {
		notFound();
	}

	return (
		<div className="min-h-screen bg-cream pt-32 pb-12">
			<article className="container px-4 md:px-6 mx-auto max-w-4xl">
				{/* Back Link */}
				<Link
					href="/projects"
					className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-dark/50 hover:text-lime mb-8 transition-colors"
				>
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
				</Link>

				{/* Header */}
				<header className="mb-10 space-y-6">
					<div className="flex items-center gap-3 text-sm font-semibold tracking-wide text-dark/60">
						<Badge
							variant="outline"
							className="border-lime text-dark bg-lime/10 px-3 py-1 uppercase tracking-widest rounded-full"
						>
							Project
						</Badge>
						<span className="flex items-center gap-1.5">
							<Calendar className="h-4 w-4 text-lime" />
							{new Date(project.published_date).toLocaleDateString(undefined, {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</span>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight text-dark leading-tight">
						{project.title}
					</h1>
					<p className="text-xl md:text-2xl text-dark/70 font-medium leading-relaxed max-w-3xl">
						{project.summary}
					</p>
				</header>

				{/* Featured Image */}
				{project.image_url && (
					<div className="relative w-full aspect-video rounded-[2rem] overflow-hidden mb-16 shadow-lg border border-dark/5">
						<Image
							src={project.image_url}
							alt={project.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				)}

				{/* Content */}
				<div
					className="prose prose-lg md:prose-xl max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-dark prose-p:text-dark/80 prose-p:font-medium prose-p:leading-relaxed prose-a:text-lime hover:prose-a:text-lime/80 prose-li:text-dark/80 prose-li:font-medium"
					dangerouslySetInnerHTML={{ __html: project.content }}
				/>

				{/* Footer / Share */}
				<div className="mt-16 pt-8 border-t border-dark/10 flex justify-between items-center">
					<div className="text-sm font-bold uppercase tracking-widest text-dark/50">
						Share this project
					</div>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="icon"
							className="rounded-full border-dark/10 text-dark hover:bg-lime hover:border-lime hover:text-dark transition-all"
						>
							<Share2 className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</article>
		</div>
	);
}
