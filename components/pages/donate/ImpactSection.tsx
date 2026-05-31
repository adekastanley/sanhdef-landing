import React from "react";
import { Stethoscope, BookOpen, Droplets, Leaf } from "lucide-react";

export function ImpactSection() {
	const impacts = [
		{
			icon: <Stethoscope className="w-8 h-8 text-pink" />,
			amount: "$50",
			title: "Essential Care",
			description: "Provides basic medical supplies and health screenings for a family of four in underserved communities.",
		},
		{
			icon: <BookOpen className="w-8 h-8 text-blue" />,
			amount: "$100",
			title: "Education Access",
			description: "Funds educational materials and community health worker training for preventative care programs.",
		},
		{
			icon: <Droplets className="w-8 h-8 text-teal-500" />,
			amount: "$250",
			title: "Clean Water",
			description: "Supports the installation of sustainable water filtration systems in rural clinics and schools.",
		},
		{
			icon: <Leaf className="w-8 h-8 text-green-500" />,
			amount: "$500+",
			title: "Systemic Change",
			description: "Invests in long-term infrastructure and policy-level interventions to create lasting regional impact.",
		},
	];

	return (
		<section className="py-24 bg-cream text-dark">
			<div className="container mx-auto px-4 md:px-8 max-w-7xl">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-3xl md:text-5xl font-sans font-bold mb-6 text-navy">
						Where Your Money Goes
					</h2>
					<p className="text-lg text-dark/70 font-medium">
						We believe in radical transparency. Every dollar is allocated strategically to maximize impact on the ground, minimizing overhead while scaling results.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{impacts.map((item, index) => (
						<div 
							key={index} 
							className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-dark/5 group"
						>
							<div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								{item.icon}
							</div>
							<div className="text-3xl font-bold text-navy mb-2">{item.amount}</div>
							<h3 className="text-xl font-semibold mb-3">{item.title}</h3>
							<p className="text-dark/60 leading-relaxed text-sm">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
