import { motion } from "motion/react";

export default function OurMission() {
	return (
		<section id="mission" className="scroll-mt-32">
			<div className="grid md:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl font-bold text-dark mb-6 tracking-tight">
						Our Mission
					</h2>
					<div className="w-20 h-1 bg-lime mb-8" />
					<p className="text-lg text-dark/70 leading-relaxed font-medium">
						At SANHDEF, our cross-cutting and varied experience in providing
						solutions provides us with a holistic and deep knowledge of the
						health and development sector in Africa.
					</p>
					<p className="text-lg text-dark/70 leading-relaxed mt-4 font-medium">
						Our mission is to enable organizations and communities globally to
						reach their full potential through innovative training, expert
						consultancy, and strategic solutions that enhance global health
						security.
					</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="bg-dark/5 aspect-video rounded-[2rem] overflow-hidden flex items-center justify-center p-2 border border-dark/5"
				>
					{/* Placeholder for mission image */}
					<img
						src="/assets/three.jpg"
						alt="Mission"
						className="w-full h-full object-cover rounded-[1.5rem]"
						onError={(e) => {
							e.currentTarget.src = "https://placehold.co/600x400";
						}}
					/>
				</motion.div>
			</div>
		</section>
	);
}
