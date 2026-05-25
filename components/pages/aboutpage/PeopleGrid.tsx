import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

interface Person {
	name: string;
	role: string;
	image?: string; // Optional URL
}

interface PeopleGridProps {
	title: string;
	description?: string;
	people: Person[];
	showJoinCard?: boolean;
}

export function PeopleGrid({
	title,
	description,
	people,
	showJoinCard = false,
}: PeopleGridProps) {
	return (
		<section className="py-24 px-6 md:px-12 bg-cream">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
					<div className="max-w-xl">
						<h2 className="font-serif text-4xl md:text-5xl text-dark mb-4 tracking-tight">
							{title}
						</h2>
						{description && (
							<p className="text-dark/70 text-lg font-medium">{description}</p>
						)}
					</div>
					{/* Optional decorative line or button could go here */}
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Team Members */}
					{people.map((person, index) => (
						<div key={index} className="group relative break-inside-avoid">
							<div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-dark/5 shadow-sm border border-dark/5">
								{/* Placeholder / Image */}
								{person.image ? (
									<div
										className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
										style={{ backgroundImage: `url(${person.image})` }}
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center bg-dark/5 text-dark/20">
										<div className="w-1/3 h-1/3 rounded-full bg-current opacity-20" />
									</div>
								)}

								{/* Overlay info */}
								<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

								<div className="absolute bottom-0 left-0 p-6 w-full text-white translate-y-2 group-hover:translate-y-0 transition-transform">
									<h3 className="font-bold text-lg">{person.name}</h3>
									<p className="text-sm font-medium opacity-90 text-pink">
										{person.role}
									</p>
								</div>
							</div>
						</div>
					))}

					{/* Join Team Card */}
					{showJoinCard && (
						<Link
							href="/get-involved/careers"
							className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-navy text-white flex flex-col justify-between p-8 hover:bg-[#0c2f1e] transition-colors shadow-sm"
						>
							<div className="space-y-4">
								<h3 className="font-sans font-bold text-3xl tracking-tight">
									Join the Team
								</h3>
								<p className="text-base text-white/70 leading-relaxed font-medium">
									Embark on a transformative journey with us. Join the team
									shaping the future of wellness innovation.
								</p>
							</div>

							<div className="w-full py-3 rounded-full bg-pink text-dark text-center font-bold text-base flex items-center justify-center gap-2 group-hover:gap-3 transition-all hover:bg-pink-hover mt-4">
								Join Now <ArrowRight className="w-5 h-5" />
							</div>
						</Link>
					)}
				</div>
			</div>
		</section>
	);
}
