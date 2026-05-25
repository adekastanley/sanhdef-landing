import { getItemBySlug } from "@/app/actions/content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SuccessStoryPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function SuccessStoryPage({
	params,
}: SuccessStoryPageProps) {
	const { slug } = await params;
	const story = await getItemBySlug(slug);

	if (!story) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-cream pb-20 pt-32">
			{/* Hero Section */}
			<div className="relative h-[50vh] min-h-[400px] w-full container mx-auto rounded-[2.5rem] overflow-hidden">
				<Image
					src={story.image_url || "/assets/placeholder.jpg"}
					alt={story.title}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-t from-navy via-navy/60 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 px-8 pb-12 text-cream">
					<Link
						href="/projects#stories"
						className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-pink mb-6 transition-colors"
					>
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Success Stories
					</Link>
					<Badge className="bg-pink text-dark font-bold px-3 py-1 uppercase tracking-widest mb-4 border-none shadow-sm">
						Success Story
					</Badge>
					<h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold leading-tight max-w-4xl mb-6">
						{story.title}
					</h1>
					<div className="flex flex-wrap items-center gap-6 text-cream/80 font-medium">
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-pink" />
							{new Date(story.published_date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="container max-w-5xl mx-auto mt-16 px-6">
				<div className="flex flex-col md:flex-row gap-16">
					<div className="flex-1">
						<div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-dark prose-p:text-dark/80 prose-p:font-medium prose-p:leading-relaxed prose-a:text-pink hover:prose-a:text-pink/80 prose-li:text-dark/80 prose-li:font-medium">
							<p className="lead text-2xl text-dark font-medium mb-8 leading-relaxed">
								{story.summary}
							</p>
							<div
								dangerouslySetInnerHTML={{ __html: story.content }}
								className="whitespace-pre-wrap"
							/>
						</div>
					</div>

					{/* Sidebar / Share Actions */}
					<div className="md:w-72 shrink-0 space-y-8">
						<div className="sticky top-32 p-8 bg-white rounded-[2rem] border border-dark/5 shadow-sm">
							<h3 className="font-sans font-bold text-dark text-xl mb-6 tracking-tight">
								Share this story
							</h3>
							<div className="flex flex-col gap-4">
								<Button
									variant="outline"
									className="justify-start w-full border-dark/10 text-dark font-bold rounded-full h-12 hover:bg-pink hover:border-pink hover:text-dark transition-all"
								>
									<Share2 className="mr-3 h-4 w-4" /> Share Link
								</Button>
								{/* Add real social share buttons here if needed */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
