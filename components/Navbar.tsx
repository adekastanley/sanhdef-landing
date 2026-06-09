"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { AnimatePresence, motion, Variants } from "motion/react";
import { MagneticButton } from "./ui/mButton";
import { usePathname } from "next/navigation";

const navLinks = [
	{ 
		title: "Home", 
		link: "/",
		subLinks: [
			{ title: "Focus Areas", link: "/#focus-areas" },
			{ title: "Stats", link: "/#stats" },
			{ title: "FAQ", link: "/#faq" }
		]
	},
	{ 
		title: "About", 
		link: "/about",
		subLinks: [
			{ title: "Who We Are", link: "/about#who-we-are" },
			{ title: "Our Leadership", link: "/about#leadership" },
			{ title: "Board Members", link: "/about#board" }
		]
	},
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
	const [isMobile, setIsMobile] = useState(false);

	const useBlackText = pathname !== "/" && !isScrolled;

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check, { passive: true });
		return () => window.removeEventListener("resize", check);
	}, []);

	/* close mobile menu on route change */
	useEffect(() => setMenuOpen(false), [pathname]);

	/* Pick the right animate key */
	const animateKey =
		isMobile && menuOpen
			? "mobileMenuOpen"
			: isMobile && isScrolled
				? "mobileScrolled"
				: isScrolled
					? "scrolled"
					: "top";

	return (
		<>
			{/* ── Nav bar ───────────────────────────────────────── */}
			<motion.nav
				className="fixed z-50 left-0 right-0 mx-auto flex items-center justify-between border"
				animate={animateKey}
				variants={{
					/* transparent at top (all screens) */
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
					/* desktop pill (md+, scrolled) */
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
					/* mobile scrolled — flush, no pill, no border */
					mobileScrolled: {
						top: 0,
						maxWidth: "100%",
						paddingLeft: "1.5rem",
						paddingRight: "1.5rem",
						paddingTop: "1rem",
						paddingBottom: "1rem",
						borderRadius: "0px",
						backgroundColor: "rgba(11, 37, 69, 0.92)",
						backdropFilter: "blur(20px)",
						boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
						borderColor: "rgba(255,255,255,0)",
					},
					/* mobile menu open — solid navy, flush, merges with overlay */
					mobileMenuOpen: {
						top: 0,
						maxWidth: "100%",
						paddingLeft: "1.5rem",
						paddingRight: "1.5rem",
						paddingTop: "1rem",
						paddingBottom: "1rem",
						borderRadius: "0px",
						backgroundColor: "rgba(11, 37, 69, 1)",
						backdropFilter: "blur(0px)",
						boxShadow: "0 0px 0px rgba(0,0,0,0)",
						borderColor: "rgba(255,255,255,0)",
					},
				}}
				transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
			>
				{/* Logo */}
				<Logo className={useBlackText ? "brightness-0" : ""} />

				{/* Desktop links */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((item) => {
						const isActive =
							pathname === item.link ||
							(item.link !== "/" && pathname.startsWith(item.link));
						return (
							<div key={item.link} className="group/nav relative">
								<Link
									href={item.link}
									className={`relative flex items-center gap-1 font-sans text-sm font-medium tracking-wide transition-colors duration-200
										${isActive ? "text-pink" : useBlackText ? "text-dark/70 hover:text-dark" : "text-white/70 hover:text-white"}`}
								>
									{item.title}
									{item.subLinks && <ChevronDown size={14} className="opacity-70 group-hover/nav:opacity-100 transition-opacity" />}
									{/* Animated underline */}
									<span
										className={`absolute -bottom-0.5 left-0 h-px bg-pink transition-all duration-300
											${isActive ? "w-full" : "w-0 group-hover/nav:w-full"}`}
									/>
								</Link>
								{item.subLinks && (
									<div className="absolute left-0 top-full pt-4 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/nav:translate-y-0">
										<div className="bg-navy/95 backdrop-blur-md border border-white/10 rounded-xl p-2 min-w-[160px] shadow-xl flex flex-col gap-1">
											{item.subLinks.map((sub) => (
												<Link
													key={sub.link}
													href={sub.link}
													className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap"
												>
													{sub.title}
												</Link>
											))}
										</div>
									</div>
								)}
							</div>
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
						className={`relative z-50 p-2 -mr-2 md:hidden ${useBlackText ? "text-dark" : "text-white"}`}
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
						className="fixed inset-0 z-40 bg-navy flex flex-col px-6 pt-24 pb-12 md:hidden overflow-hidden"
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
									<motion.div key={item.link} variants={linkItem} className="flex flex-col">
										<Link
											href={item.link}
											onClick={() => setMenuOpen(false)}
											className={`group flex items-center justify-between py-5 border-b border-white/8 transition-colors duration-200
												${isActive ? "text-pink" : "text-white/80 hover:text-white"}`}
										>
											<span className="font-serif text-3xl flex items-center gap-2 font-medium tracking-tight">
												{item.title}
												{item.subLinks && <ChevronDown size={24} className="opacity-50" />}
											</span>
											<span
												className={`text-xs font-sans font-semibold uppercase tracking-[0.15em] transition-opacity duration-200
													${isActive ? "opacity-100 text-pink" : "opacity-0 group-hover:opacity-40 text-white"}`}
											>
												{isActive ? "Current" : "→"}
											</span>
										</Link>
										{item.subLinks && (
											<div className="flex flex-col pl-4 mt-2 border-l-2 border-white/10 space-y-2 pb-4">
												{item.subLinks.map((sub) => (
													<Link
														key={sub.link}
														href={sub.link}
														onClick={() => setMenuOpen(false)}
														className="text-lg text-white/60 hover:text-white transition-colors py-2"
													>
														{sub.title}
													</Link>
												))}
											</div>
										)}
									</motion.div>
								);
							})}
						</motion.nav>

						{/* CTA */}
						<motion.div variants={linkItem} className="mt-10">
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
