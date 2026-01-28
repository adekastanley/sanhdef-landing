export default function SectionOne() {
	return (
		<section className="py-24 px-6 md:px-12 bg-white text-dark">
			<div className="max-w-7xl mx-auto flex flex-col  gap-12 md:gap-10 items-start">
				{/* top Title */}
				<div className="md:w-1/3 ">
					<h2 className="font-serif text-4xl md:text-5xl leading-tight">
						GET <br />
						<span className="italic text-accent-green">INVOLVED</span>
					</h2>
				</div>

				{/* bottom Content */}
				<div className="md:w-2/3 space-y-8">
					<h3 className="text-xl md:text-2xl font-medium leading-relaxed">
						Support life-changing programs that improve health, strengthen
						communities, and create sustainable impact.
					</h3>

					<div className="space-y-6 text-dark/70 leading-relaxed font-sans">
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
