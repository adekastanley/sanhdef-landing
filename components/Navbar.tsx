"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { AnimatePresence, motion, Variants } from "motion/react";
import { MagneticButton } from "./ui/mButton";
import { usePathname } from "next/navigation";

const navLinks = [
	{ title: "About", link: "/about" },
	{ title: "Projects", link: "/projects" },
	{ title: "Resources", link: "/resources" },
	{ title: "Contact", link: "/contact" },
	{ title: "Donate", link: "/donate" },
];

/* ─── Mobile overlay variants ───────────────────────────── */
const overlayVariants: Variants = {
	initial: { opacity: 0, clipPath: "inset(0 0 100% 0 round 0px)" },
	animate: {
		opacity: 1,
		clipPath: "inset(0 0 0% 0 round 0px)",
		transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
	},
	exit: {
		opacity: 0,
		clipPath: "inset(0 0 100% 0 round 0px)",
		transition: { duration: 0.4, ease: [0.55, 0, 0.1, 1] as const },
	},
};

const linkStagger: Variants = {
	initial: {},
	animate: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
	exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkItem: Variants = {
	initial: { y: 40, opacity: 0 },
	animate: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
	},
	exit: {
		y: -20,
		opacity: 0,
		transition: { duration: 0.25, ease: [0.55, 0, 0.1, 1] as const },
	},
};

export function Navbar() {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	/* close mobile menu on route change */
	useEffect(() => setMenuOpen(false), [pathname]);

	return (
		<>
			{/* ── Desktop / top-level nav ───────────────────────── */}
			<motion.nav
				className="fixed z-50 left-0 right-0 mx-auto flex items-center justify-between border"
				animate={isScrolled ? "scrolled" : "top"}
				variants={{
					top: {
						top: 0,
						maxWidth: "100%",
						paddingLeft: "3.5rem",
						paddingRight: "3.5rem",
						paddingTop: "1.5rem",
						paddingBottom: "1.5rem",
						borderRadius: "0px",
						backgroundColor: "rgba(11, 37, 69, 0)",
						backdropFilter: "blur(0px)",
						boxShadow: "0 0px 0px rgba(0,0,0,0)",
						borderColor: "rgba(255,255,255,0)",
					},
					scrolled: {
						top: "1rem",
						maxWidth: "72rem",
						paddingLeft: "1.5rem",
						paddingRight: "1.5rem",
						paddingTop: "0.75rem",
						paddingBottom: "0.75rem",
						borderRadius: "1rem",
						backgroundColor: "rgba(11, 37, 69, 0.92)",
						backdropFilter: "blur(20px)",
						boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
						borderColor: "rgba(255,255,255,0.1)",
					},
				}}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
			>
				{/* Logo */}
				<Logo />

				{/* Desktop links */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((item) => {
						const isActive =
							pathname === item.link ||
							(item.link !== "/" && pathname.startsWith(item.link));
						return (
							<Link
								key={item.link}
								href={item.link}
								className={`group relative font-sans text-sm font-medium tracking-wide transition-colors duration-200
									${isActive ? "text-pink" : "text-white/70 hover:text-white"}`}
							>
								{item.title}
								{/* Animated underline */}
								<span
									className={`absolute -bottom-0.5 left-0 h-px bg-pink transition-all duration-300
										${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
								/>
							</Link>
						);
					})}
				</div>

				{/* CTA + burger */}
				<div className="flex items-center gap-4">
					<Link href="/get-involved" className="hidden md:block">
						<MagneticButton
							variant="primary-pink"
							className="font-semibold text-dark"
						>
							Get Involved
						</MagneticButton>
					</Link>

					{/* Burger — mobile only */}
					<button
						onClick={() => setMenuOpen((prev) => !prev)}
						aria-label="Toggle menu"
						className="relative z-50 p-2 -mr-2 md:hidden text-white"
					>
						<motion.span
							key={menuOpen ? "x" : "menu"}
							initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
							animate={{ rotate: 0, opacity: 1, scale: 1 }}
							transition={{ duration: 0.2 }}
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</motion.span>
					</button>
				</div>
			</motion.nav>

			{/* ── Mobile fullscreen overlay ─────────────────────── */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						variants={overlayVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="fixed inset-0 z-40 bg-navy flex flex-col px-8 pt-28 pb-12 md:hidden overflow-hidden"
					>
						{/* Decorative radial glow */}
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(255,77,109,0.12),transparent)] pointer-events-none" />

						{/* Nav links */}
						<motion.nav
							variants={linkStagger}
							initial="initial"
							animate="animate"
							exit="exit"
							className="flex flex-col gap-1 border-t border-white/10 pt-8 mt-4"
						>
							{navLinks.map((item) => {
								const isActive =
									pathname === item.link ||
									(item.link !== "/" && pathname.startsWith(item.link));
								return (
									<motion.div key={item.link} variants={linkItem}>
										<Link
											href={item.link}
											onClick={() => setMenuOpen(false)}
											className={`group flex items-center justify-between py-5 border-b border-white/8 transition-colors duration-200
												${isActive ? "text-pink" : "text-white/80 hover:text-white"}`}
										>
											<span className="font-serif text-3xl font-medium tracking-tight">
												{item.title}
											</span>
											<span
												className={`text-xs font-sans font-semibold uppercase tracking-[0.15em] transition-opacity duration-200
													${isActive ? "opacity-100 text-pink" : "opacity-0 group-hover:opacity-40 text-white"}`}
											>
												{isActive ? "Current" : "→"}
											</span>
										</Link>
									</motion.div>
								);
							})}
						</motion.nav>

						{/* CTA */}
						<motion.div
							variants={linkItem}
							className="mt-10"
						>
							<Link href="/get-involved" onClick={() => setMenuOpen(false)}>
								<MagneticButton
									variant="primary-pink"
									size="lg"
									className="w-full justify-center font-semibold text-dark"
								>
									Get Involved
								</MagneticButton>
							</Link>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
