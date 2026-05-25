"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Share2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ContentItem } from "@/app/actions/content";
import { EventRegistrationModal } from "@/components/pages/projectspage/EventRegistrationModal";
import { motion } from "motion/react";
import Markdown from "react-markdown";

interface EventDetailClientProps {
	event: ContentItem;
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isTraining = event.category === "training";
	const isClosed = event.status === "closed";

	return (
		<main className="min-h-screen pt-32 pb-24 bg-cream">
			{/* Back Navigation */}
			<div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
				<Link
					href="/projects"
					className="inline-flex items-center text-dark/70 hover:text-pink transition-colors font-bold text-sm uppercase tracking-widest mb-4"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Events
				</Link>
			</div>

			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
				>
					{/* Image */}
					<div className="relative h-[400px] lg:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-sm border border-dark/5">
						<Image
							src={event.image_url || "/assets/placeholder.jpg"}
							alt={event.title}
							fill
							className="object-cover"
							priority
							unoptimized
						/>
						<div className="absolute top-6 left-6">
							<Badge
								className={`${
									isTraining ? "bg-navy text-white" : "bg-pink text-dark"
								} border-none text-sm px-4 py-1.5 font-bold shadow-sm`}
							>
								{isTraining ? "Training" : "Event"}
							</Badge>
						</div>
					</div>

					{/* Content Info */}
					<div className="space-y-8">
						<div>
							<h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight tracking-tight">
								{event.title}
							</h1>
							<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-dark/70 mb-8 border-y border-dark/10 py-6">
								<div className="flex items-center gap-3">
									<Calendar className="h-5 w-5 text-pink" />
									<span className="font-semibold">
										{new Date(event.published_date).toLocaleDateString(
											"en-US",
											{
												weekday: "long",
												year: "numeric",
												month: "long",
												day: "numeric",
											},
										)}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<MapPin className="h-5 w-5 text-pink" />
									<span className="font-semibold">Location TBD</span>
								</div>
							</div>
						</div>

						<div className="prose prose-lg max-w-none text-dark/80">
							<p className="text-xl text-dark/90 font-medium leading-relaxed">
								{event.summary}
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 pt-4">
							<Button
								size="lg"
								className={`px-8 h-14 text-base font-bold rounded-full transition-all ${
									isClosed
										? "bg-dark/10 text-dark/50 cursor-not-allowed"
										: "bg-pink text-dark hover:bg-pink-hover shadow-md hover:shadow-lg"
								}`}
								disabled={isClosed}
								onClick={() => !isClosed && setIsModalOpen(true)}
							>
								{isClosed ? "Registration Closed" : "Register Now"}
							</Button>

							<Button
								variant="outline"
								size="lg"
								className="h-14 px-8 text-base font-bold rounded-full border border-dark/10 text-dark hover:bg-dark/5"
							>
								<Share2 className="mr-2 h-5 w-5" /> Share Event
							</Button>
						</div>
					</div>
				</motion.div>
			</section>

			{/* Full Content */}
			<section className="max-w-3xl mx-auto px-6 md:px-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-dark/5">
				<div className="prose prose-lg max-w-none font-sans font-medium text-dark/80">
					<h2 className="text-3xl font-bold text-dark mb-6 tracking-tight">
						Event Details
					</h2>
					<Markdown>{event.content}</Markdown>
				</div>
			</section>

			<EventRegistrationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				eventId={event.id}
				eventTitle={event.title}
			/>
		</main>
	);
}
