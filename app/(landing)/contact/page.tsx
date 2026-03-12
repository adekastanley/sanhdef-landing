"use client";

import { motion } from "motion/react";

import {
	IconBrandInstagram,
	IconBrandX,
	IconBrandFacebook,
	IconBrandYoutube,
} from "@tabler/icons-react";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
	return (
		<main className="min-h-screen bg-cream pt-32 pb-12 px-6 font-sans">
			<div className="container mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-16"
				>
					<h1 className="text-6xl md:text-9xl font-bold font-sans tracking-tight text-dark leading-none mb-6">
						Contact <span className="text-lime italic font-serif">Us</span>
					</h1>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
					{/* Contact Form Section */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-dark/5"
					>
						<div>
							<h2 className="text-2xl font-bold mb-8 text-dark tracking-tight">
								Send a Message
							</h2>
							<ContactForm theme="light" />
						</div>
					</motion.div>

					{/* Contact Details Section */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="flex flex-col justify-between h-full space-y-12 lg:space-y-0"
					>
						<div>
							<h2 className="text-2xl font-bold mb-8 text-dark tracking-tight">
								Contact Info
							</h2>
							<div className="grid gap-8">
								<div className="space-y-1">
									<p className="text-sm font-semibold text-dark/50 uppercase tracking-widest">
										Email
									</p>
									<a
										href="mailto:info@sanhdef.org"
										className="text-2xl md:text-3xl font-bold text-dark hover:text-lime transition-colors"
									>
										info@sanhdef.org
									</a>
								</div>
								<div className="space-y-1">
									<p className="text-sm font-semibold text-dark/50 uppercase tracking-widest">
										Phone
									</p>
									<a
										href="tel:+2349030250139"
										className="text-2xl md:text-3xl font-bold text-dark hover:text-lime transition-colors"
									>
										(+234) 903 025 0139
									</a>
								</div>
								<div className="space-y-1">
									<p className="text-sm font-semibold text-dark/50 uppercase tracking-widest">
										Address
									</p>
									<p className="text-lg text-dark/80 font-medium leading-relaxed max-w-sm">
										Plot 856 Olu Awotesu Street,
										<br />
										Jabi District Abuja
									</p>
								</div>
							</div>
						</div>

						<div className="space-y-6 pt-12 lg:pt-0">
							<div className="flex flex-col sm:flex-row gap-6 sm:items-center">
								<p className="text-sm font-bold uppercase tracking-widest text-dark/50">
									Follow Us
								</p>
								<div className="flex gap-4">
									<a
										href="https://web.facebook.com/sageandenamelfoundation"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white border border-dark/10 rounded-full text-dark hover:bg-lime hover:border-lime hover:text-dark transition-all shadow-sm"
									>
										<IconBrandFacebook size={20} />
									</a>
									<a
										href="https://twitter.com/sandef_org"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white border border-dark/10 rounded-full text-dark hover:bg-lime hover:border-lime hover:text-dark transition-all shadow-sm"
									>
										<IconBrandX size={20} />
									</a>
									<a
										href="https://instagram.com/sandef_org"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white border border-dark/10 rounded-full text-dark hover:bg-lime hover:border-lime hover:text-dark transition-all shadow-sm"
									>
										<IconBrandInstagram size={20} />
									</a>
									<a
										href="https://www.youtube.com/@sandef_org"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white border border-dark/10 rounded-full text-dark hover:bg-lime hover:border-lime hover:text-dark transition-all shadow-sm"
									>
										<IconBrandYoutube size={20} />
									</a>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-widest text-dark/40 pt-6 border-t border-dark/10">
								<p>© {new Date().getFullYear()} HSCL. All rights reserved.</p>
								<p className="text-right hover:text-lime cursor-pointer transition-colors">
									Privacy Policy
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</main>
	);
}
