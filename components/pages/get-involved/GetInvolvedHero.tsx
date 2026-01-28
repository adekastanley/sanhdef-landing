export function GetInvolvedHero() {
	return (
		<section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden rounded-b-[3rem] mx-auto">
			{/* Background Image Placeholder */}
			<div className="absolute inset-0 bg-dark/20 z-10" />
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
				style={{
					backgroundColor: "#2D5B40", // Fallback color
					// backgroundImage: "url('/assets/hero-involved.jpg')" // Placeholder
				}}
			>
				<div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent" />
			</div>

			<div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4 pt-20">
				<span className="text-cream/80 uppercase tracking-widest text-sm font-medium mb-4 backdrop-blur-md bg-white/10 px-4 py-1 rounded-full border border-white/20">
					Get Involved
				</span>

				<h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-6 max-w-4xl">
					Be the <span className="italic text-accent-yellow">Change</span>{" "}
					<br />
					You Want to See
				</h1>

				<p className="max-w-xl text-cream/90 text-lg md:text-xl font-light mb-8">
					Your support can make a lasting difference. Whether you donate or
					volunteer, you help us build healthier, more resilient communities.
				</p>
			</div>
		</section>
	);
}
