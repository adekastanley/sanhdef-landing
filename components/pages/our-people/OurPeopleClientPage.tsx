"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import StoriesList from "@/components/pages/projectspage/StoriesList"; // Reusing existing stories list
import EventCard from "@/components/pages/projectspage/EventCard"; // Reusing existing event card
import OurPeopleGrid from "@/components/pages/projects/OurPeopleGrid"; // Importing the Team Grid
import { type ContentItem } from "@/app/actions/content";
import { type TeamMember } from "@/app/actions/team";
import { Separator } from "@/components/ui/separator";

interface OurPeopleClientPageProps {
	// leadership: TeamMember[];
	// team: TeamMember[];
	stories: ContentItem[];
	events: ContentItem[];
	currentStoriesPage: number;
	hasMoreStories: boolean;
}

export default function OurPeopleClientPage({
	// leadership,
	// team,
	stories,
	events,
	currentStoriesPage,
	hasMoreStories,
}: OurPeopleClientPageProps) {
	const [activeSection, setActiveSection] = useState("team");
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = 100;
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = element.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
			setActiveSection(id);
		}
	};

	// Handle hash navigation
	useEffect(() => {
		if (window.location.hash) {
			const id = window.location.hash.substring(1);
			setTimeout(() => {
				const element = document.getElementById(id);
				if (element) {
					const offset = 100;
					const bodyRect = document.body.getBoundingClientRect().top;
					const elementRect = element.getBoundingClientRect().top;
					const elementPosition = elementRect - bodyRect;
					const offsetPosition = elementPosition - offset;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth",
					});
					setActiveSection(id);
				}
			}, 500);
		}
	}, []);

	// Scroll Spy
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.3, rootMargin: "-100px 0px -50% 0px" },
		);

		const sections = ["leadership", "team", "stories", "events", "resources"];
		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<div className="min-h-screen bg-cream">
			<motion.div
				className="fixed top-0 left-0 right-0 h-1.5 bg-lime z-50 origin-left"
				style={{ scaleX }}
			/>

			{/* Hero Section */}
			<section className="relative w-full pt-32 pb-12 px-4 md:px-8 bg-cream">
				<div className="max-w-7xl mx-auto">
					<div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden rounded-[2.5rem] bg-dark-green flex flex-col justify-center items-center text-center px-6">
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7 }}
							className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold mb-6 text-cream tracking-tight max-w-4xl"
						>
							Our People
						</motion.h1>
						<div className="h-1.5 w-24 bg-lime mx-auto mb-6 rounded-full" />
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="text-lg md:text-xl max-w-2xl mx-auto text-cream/80 font-medium"
						>
							Meet the experts, innovators, and leaders dedicated to
							strengthening health systems and improving lives.
						</motion.p>
					</div>
				</div>
			</section>

			{/* Sticky Sub-navigation */}
			<div className="sticky top-[80px] z-40 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/60 border-b border-dark/5 w-full">
				<div className="container flex items-center justify-center h-16 overflow-x-auto no-scrollbar">
					<nav className="flex items-center space-x-8 text-sm font-bold">
						{[
							// { id: "leadership", label: "Leadership" },
							// { id: "team", label: "Our Team" },
							{ id: "stories", label: "Success Stories" },
							{ id: "events", label: "Events" },
							{ id: "resources", label: "Resources" },
						].map((item) => (
							<button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								className={cn(
									"transition-colors hover:text-lime uppercase tracking-widest px-2 py-3 border-b-[3px] border-transparent whitespace-nowrap",
									activeSection === item.id
										? "text-dark border-lime"
										: "text-dark/50",
								)}
							>
								{item.label}
							</button>
						))}
					</nav>
				</div>
			</div>

			<div className="container py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
				{/* Leadership Section */}
				{/* <section id="leadership" className="scroll-mt-32">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-sans font-bold text-dark mb-4 tracking-tight">
							Leadership
						</h2>
						<p className="text-dark/70 text-lg font-medium max-w-2xl mx-auto">
							Guiding our vision and strategy for sustainable impact.
						</p>
					</div>
					<OurPeopleGrid team={leadership} />
				</section> */}

				{/* <Separator className="border-dark/5" /> */}

				{/* Team Section */}
				{/* <section id="team" className="scroll-mt-32">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-sans font-bold text-dark mb-4 tracking-tight">
							Meet The Team
						</h2>
						<p className="text-dark/70 text-lg font-medium max-w-2xl mx-auto">
							A diverse group of professionals working together to deliver
							impact.
						</p>
					</div>
					<OurPeopleGrid team={team} />
				</section> */}

				{/* <Separator className="border-dark/5" /> */}

				{/* Stories Section */}
				<StoriesList
					stories={stories}
					currentPage={currentStoriesPage}
					hasMore={hasMoreStories}
				/>

				<Separator className="border-dark/5" />

				{/* Events Section */}
				<section id="events" className="scroll-mt-32">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
						<div>
							<h2 className="text-3xl lg:text-4xl font-sans font-bold text-dark mb-3 tracking-tight">
								Upcoming Events & Training
							</h2>
							<p className="text-dark/70 text-lg font-medium">
								Join us in our upcoming workshops, seminars, and training
								sessions.
							</p>
						</div>
					</div>

					{events.length === 0 ? (
						<div className="text-center py-24 bg-white rounded-[2rem] border border-dark/5 shadow-sm">
							<p className="text-dark/50 font-medium">
								No upcoming events scheduled.
							</p>
						</div>
					) : (
						<div className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x">
							{events.map((event) => (
								<div
									key={event.id}
									className="min-w-[300px] md:min-w-[350px] snap-center"
								>
									<EventCard event={event} />
								</div>
							))}
						</div>
					)}
				</section>

				<Separator className="border-dark/5" />

				{/* Resources Section */}
				<section
					id="resources"
					className="scroll-mt-32 min-h-[300px] flex flex-col justify-center items-center text-center bg-white rounded-[2rem] border border-dark/5 shadow-sm p-12"
				>
					<h2 className="text-3xl lg:text-4xl font-sans font-bold text-dark mb-4 tracking-tight">
						Resources
					</h2>
					<p className="text-dark/70 text-lg font-medium max-w-lg">
						Downloadable resources and guides will be available here.
					</p>
				</section>
			</div>
		</div>
	);
}
