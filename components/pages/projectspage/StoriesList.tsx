import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ContentItem } from "@/app/actions/content";

import { Button } from "@/components/ui/button";

interface StoriesListProps {
	stories: ContentItem[];
	currentPage: number;
	hasMore: boolean;
}

export default function StoriesList({
	stories,
	currentPage,
	hasMore,
}: StoriesListProps) {
	return (
		<section id="stories" className="scroll-mt-32">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
				<div>
					<h2 className="text-4xl font-bold text-dark mb-3 tracking-tight">
						Success Stories
					</h2>
					<p className="text-dark/70 font-medium text-lg">
						Real impact, real lives. See how we are making a difference.
					</p>
				</div>

				{/* Pagination Controls */}
				<div className="flex items-center gap-2">
					{currentPage > 1 && (
						<Link
							href={`/projects?storiesPage=${currentPage - 1}#stories`}
							scroll={false}
						>
							<Button
								variant="outline"
								size="sm"
								className="rounded-xl border-dark/10 hover:bg-dark/5 text-dark/80"
							>
								Previous
							</Button>
						</Link>
					)}
					{(hasMore || currentPage > 1) && (
						<span className="text-sm text-dark/60 font-medium px-3">
							Page {currentPage}
						</span>
					)}
					{hasMore && (
						<Link
							href={`/projects?storiesPage=${currentPage + 1}#stories`}
							scroll={false}
						>
							<Button
								variant="outline"
								size="sm"
								className="rounded-xl border-dark/10 hover:bg-dark/5 text-dark/80"
							>
								Next
							</Button>
						</Link>
					)}
				</div>
			</div>

			{stories.length === 0 ? (
				<div className="text-center py-24 bg-dark/5 rounded-[2rem] border border-dark/5">
					<p className="text-dark/60 font-medium text-lg">No stories yet.</p>
				</div>
			) : (
				<div className="grid gap-8 md:grid-cols-2">
					{stories.map((story) => (
						<Link
							key={story.id}
							href={`/success-stories/${story.slug}`}
							className="group h-full"
						>
							<Card className="overflow-hidden border border-dark/5 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white rounded-3xl transition-all duration-300 h-full flex flex-col md:flex-row">
								<div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden bg-dark/5">
									<Image
										src={story.image_url || "/assets/placeholder.jpg"}
										alt={story.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
										unoptimized
									/>
								</div>
								<CardContent className="flex-1 p-8 flex flex-col justify-center">
									<Quote className="h-8 w-8 text-lime/50 fill-current mb-4" />
									<h3 className="text-xl font-bold text-dark group-hover:text-lime transition-colors line-clamp-2 mb-3 leading-snug">
										{story.title}
									</h3>
									<p className="text-dark/70 line-clamp-3 mb-6 font-medium text-sm leading-relaxed">
										{story.summary}
									</p>
									<div className="flex items-center gap-2 text-sm font-semibold text-dark group-hover:text-lime transition-colors mt-auto">
										Read Full Story{" "}
										<ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
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
