import React from "react";
import { DonateForm } from "./DonateForm";
import { ArrowDown } from "lucide-react";

export function DonateHero() {
	return (
		<section className="relative min-h-[90vh] flex items-center bg-navy text-white overflow-hidden pt-24 pb-12">
			{/* Abstract background elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] bg-pink/20 rounded-full blur-[120px] opacity-60 mix-blend-screen" />
				<div className="absolute top-1/2 -left-1/4 w-[50vw] h-[50vw] bg-blue/20 rounded-full blur-[100px] opacity-50 mix-blend-screen" />
				
				{/* Subtle grid pattern */}
				<div 
					className="absolute inset-0 opacity-[0.03]" 
					style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
				/>
			</div>

			<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
					
					{/* Left Content */}
					<div className="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
							<span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
							<span className="text-sm font-semibold tracking-wide text-white/90 uppercase">Make an Impact</span>
						</div>
						
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold leading-[1.1] tracking-tight">
							Fund the Future of <br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink to-blue">
								Public Health.
							</span>
						</h1>
						
						<p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl">
							Your contribution goes directly towards sustainable interventions in communities that need it most. We turn policy into tangible ground-level execution.
						</p>

						<div className="hidden lg:flex items-center gap-4 text-white/50 pt-8 mt-8 border-t border-white/10">
							<p className="text-sm font-medium uppercase tracking-widest">Trusted by global partners</p>
							<div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
						</div>
					</div>

					{/* Right Content - Donate Form */}
					<div className="lg:col-span-5 relative">
						<div className="absolute -inset-4 bg-gradient-to-b from-white/10 to-transparent blur-2xl rounded-[3rem] opacity-50" />
						<DonateForm />
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
				<span className="text-xs font-semibold uppercase tracking-widest">Discover Impact</span>
				<ArrowDown className="w-4 h-4" />
			</div>
		</section>
	);
}
