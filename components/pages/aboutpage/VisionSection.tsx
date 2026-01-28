export function VisionSection() {
	return (
		<section className="py-24 px-6 md:px-12 bg-cream text-dark">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start">
				{/* Left Title */}
				<div className="md:w-1/3 lg:sticky top-24">
					<h2 className="font-serif text-4xl md:text-5xl leading-tight">
						WHO WE <br />
						<span className="italic text-accent-green">ARE</span>
					</h2>
				</div>

				{/* Right Content */}
				<div className="md:w-2/3 space-y-8">
					<h3 className="text-xl md:text-2xl font-medium leading-relaxed">
						Sanitas Health and Development Foundation (SANHDEF) is a Nigerian
						NGO dedicated to transforming lives through evidence-based public
						health programs, sustainable development initiatives, and
						community-centred solutions. In technical partnership with Health
						Systems Consult Limited (HSCL), we work collaboratively with
						governments, partners, and communities to address complex challenges
						and accelerate progress toward the Sustainable Development Goals.
					</h3>

					<div className="space-y-6 text-dark/70 leading-relaxed font-sans">
						<p>
							Through dynamic collaborations and ingenious initiatives, we are
							unwavering in our mission to propel the achievement of Sustainable
							Development Goals. SANHDEF has a technical partnership with our
							parent company Health Systems Consult Limited (HSCL), which
							further enhances our capacity to deliver impactful solutions.
						</p>
					</div>

					<div className="pt-8 grid grid-cols-2 gap-8 border-t border-dark/10">
						<div>
							<div className="text-4xl font-serif text-accent-green mb-2">
								10+
							</div>
							<div className="text-sm uppercase tracking-wide opacity-60">
								Years of Impact
							</div>
						</div>
						<div>
							<div className="text-4xl font-serif text-accent-green mb-2">
								36+
							</div>
							<div className="text-sm uppercase tracking-wide opacity-60">
								States Reached
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
