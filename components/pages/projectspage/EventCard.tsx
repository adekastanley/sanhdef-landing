import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ContentItem } from "@/app/actions/content";

interface EventCardProps {
	event: ContentItem;
}

export default function EventCard({ event }: EventCardProps) {
	// Determine category based on DB or title fallback
	const isTraining = event.category
		? event.category === "training"
		: event.title.toLowerCase().includes("training");

	const isClosed = event.status === "closed";

	return (
		<Link
			href={`/events/${event.slug}`}
			className={`group h-full block ${isClosed ? "opacity-75" : ""}`}
		>
			<Card className="overflow-hidden border border-dark/5 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white rounded-3xl transition-all duration-300 h-full flex flex-col">
				<div className="relative h-48 w-full overflow-hidden bg-dark/5">
					<Image
						src={event.image_url || "/assets/placeholder.jpg"}
						alt={event.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						unoptimized
					/>
					<div className="absolute top-3 left-3">
						<Badge
							className={`${
								isTraining
									? "bg-dark-green text-white hover:bg-[#0c2f1e]"
									: "bg-lime text-dark hover:bg-lime-hover"
							} border-none font-semibold px-3 py-1`}
						>
							{isTraining ? "Training" : "Event"}
						</Badge>
					</div>
					<div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
						<div className="flex items-center text-white/90 text-xs font-medium gap-3">
							<span className="flex items-center gap-1.5">
								<Calendar className="h-3.5 w-3.5 text-lime" />
								{new Date(event.published_date).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								})}
							</span>
							<span className="flex items-center gap-1.5">
								<MapPin className="h-3.5 w-3.5 text-lime" />
								Location
							</span>
						</div>
					</div>
				</div>
				<CardContent className="flex-1 p-6 flex flex-col">
					<h3 className="text-xl font-bold text-dark mb-3 group-hover:text-lime transition-colors line-clamp-2 leading-snug">
						{event.title}
					</h3>
					<p className="text-dark/70 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed font-medium">
						{event.summary}
					</p>
					<div className="flex items-center justify-between mt-auto">
						<div className="text-dark font-semibold text-sm flex items-center group-hover:text-lime transition-colors">
							View Details{" "}
							<ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</div>

						{isClosed && (
							<Badge
								variant="secondary"
								className="flex items-center gap-1.5 bg-dark/5 text-dark/70 hover:bg-dark/10"
							>
								<Lock className="h-3 w-3" /> Closed
							</Badge>
						)}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
