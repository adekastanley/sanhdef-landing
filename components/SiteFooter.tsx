import Link from "next/link";

const navLinks = {
	siteLinks: [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "Who We Are",
			link: "/about",
		},
		{
			title: "What We Do",
			link: "/our-work",
		},
		{
			title: "Our Impact",
			link: "/projects",
		},
		{
			title: "Careers",
			link: "/careers",
		},
	],
};
export function SiteFooter() {
	return (
		<footer className="w-full">
			{/* Top Section - Light */}

			{/* Bottom Section - Dark */}
			<div className="bg-dark text-cream py-20 px-6 md:px-12">
				<div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
					{/* Brand / Logo Area */}
					<div className="md:col-span-4 space-y-6">
						<h3 className="font-serif text-3xl md:text-4xl leading-tight text-white">
							Sanitas Health <br />
							<span className="text-white/60">and Development Foundation</span>
						</h3>
						<p className="text-white/40 text-sm max-w-xs">
							Providing innovative solutions for health and development in
							Africa since 2011.
						</p>
					</div>

					{/* Locations Column 1 */}
					<div className="md:col-span-3 space-y-8">
						<div className="space-y-4">
							<h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
								Abuja (Head Office)
							</h4>
							<div className="space-y-1 text-sm md:text-base text-white/80">
								<a href="mailto:info@sanhdef.org">info@sanhdef.org</a>
								<a href="tel:+234 903 025 0139">+234 903 025 0139</a>
								<p className="opacity-70">
									Plot 856 Olu Awotesu Street, <br /> Jabi District Abuja
								</p>
							</div>
							<a
								href="#"
								className="inline-block text-accent-yellow text-xs font-bold border-b border-accent-yellow/30 pb-0.5 hover:border-accent-yellow"
							>
								SEE ON MAP ↗
							</a>
						</div>
					</div>

					{/* Locations Column 2 (Placeholder or Second Office if known, using generic for now) */}
					<div className="md:col-span-2 space-y-8">
						<div className="space-y-4">
							<h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
								Socials
							</h4>
							<div className="flex flex-col gap-2 text-sm text-white/80">
								<a
									href="#"
									className="hover:text-accent-yellow transition-colors"
								>
									LinkedIn ↗
								</a>
								<a
									href="#"
									className="hover:text-accent-yellow transition-colors"
								>
									Twitter / X ↗
								</a>
								<a
									href="#"
									className="hover:text-accent-yellow transition-colors"
								>
									Instagram ↗
								</a>
							</div>
						</div>
					</div>

					{/* Newsletter / CTA */}
					<div className="md:col-span-3 space-y-8 flex flex-col justify-between">
						<div className="space-y-4">
							<p className="text-sm font-medium text-white/90">
								WANT TO STAY INFORMED ON OUR IMPACT?
							</p>
							<a
								href="#"
								className="inline-flex items-center gap-2 text-xl font-serif text-white hover:text-accent-yellow transition-colors"
							>
								Sign up for our newsletter <span>→</span>
							</a>
						</div>

						<div className="pt-8 text-[10px] text-white/20 uppercase tracking-widest flex justify-between">
							<span>© {new Date().getFullYear()} SANHDEF</span>
							<span>Privacy Policy</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
