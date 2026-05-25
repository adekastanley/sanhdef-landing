export default function SectionOne() {
	return (
		<section className="py-24 px-6 md:px-12 bg-cream text-dark">
			<div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-24 items-start md:flex-row">
				{/* top Title */}
				<div className="md:w-1/3 lg:sticky top-24">
					<h2 className="font-sans font-bold text-4xl md:text-5xl leading-tight tracking-tight">
						GET <br />
						<span className="italic font-serif text-pink block mt-2">
							INVOLVED
						</span>
					</h2>
				</div>

				{/* bottom Content */}
				<div className="md:w-2/3 space-y-8 bg-white p-10 md:p-14 rounded-[2.5rem] border border-dark/5 shadow-sm">
					<h3 className="text-2xl md:text-3xl font-sans font-bold leading-tight text-dark">
						Support life-changing programs that improve health, strengthen
						communities, and create sustainable impact.
					</h3>

					<div className="w-20 h-1.5 bg-pink rounded-full" />

					<div className="space-y-6 text-dark/70 font-medium text-lg leading-relaxed pt-2">
						<p>
							Your donation directly supports evidence-based public health
							interventions, community development projects, and initiatives
							aligned with the Sustainable Development Goals.
						</p>
						<p>
							Every contribution helps us reach underserved communities and
							deliver solutions where they are needed most.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
