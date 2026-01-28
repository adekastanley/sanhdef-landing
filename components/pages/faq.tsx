"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
	{
		question: "What does SANHDEF do?",
		answer:
			"SANHDEF works to improve public health, promote sustainable development, support environmental initiatives, and empower communities through evidence-based programs and partnerships.",
	},
	{
		question: "Where does SANHDEF operate?",
		answer:
			"We primarily operate across Nigeria, working closely with communities, government institutions, and development partners to deliver impactful interventions.",
	},
	{
		question: "Who can partner with SANHDEF?",
		answer:
			"We collaborate with government agencies, NGOs, donor organizations, private sector partners, and community-based groups aligned with our mission.",
	},
	{
		question: "How is SANHDEF funded?",
		answer:
			"Our programs are supported through grants, partnerships, and donor funding, all managed with strict accountability and transparency standards.",
	},
	{
		question: "How can I support or get involved?",
		answer:
			"You can support SANHDEF through partnerships, funding opportunities, volunteering, or advocacy. Visit our Contact page to learn more.",
	},
	{
		question: "Is SANHDEF affiliated with any other organization?",
		answer:
			"Yes, SANHDEF has a technical partnership with Health Systems Consult Limited (HSCL), which strengthens our capacity to deliver high-quality solutions.",
	},
];

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section id="faq" className="py-20 md:py-32 bg-background">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 mb-4">
						<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
						<span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
							FAQ
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
						Got questions?
					</h2>
					<p className="text-lg text-muted-foreground">
						We&apos;ve got answers. If you can&apos;t find what you&apos;re
						looking for, chat with our team.
					</p>
				</div>

				{/* FAQ Items */}
				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="border border-border rounded-xl overflow-hidden bg-card"
						>
							<button
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className="w-full flex items-center justify-between p-6 text-left"
							>
								<span className="text-lg font-medium text-foreground pr-4">
									{faq.question}
								</span>
								<ChevronDown
									className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
										openIndex === index ? "rotate-180" : ""
									}`}
								/>
							</button>
							<div
								className={`overflow-hidden transition-all duration-200 ${
									openIndex === index ? "max-h-96" : "max-h-0"
								}`}
							>
								<p className="px-6 pb-6 text-muted-foreground leading-relaxed">
									{faq.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
