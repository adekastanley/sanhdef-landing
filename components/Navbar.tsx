"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import NavHoverContent from "./ui/navHoverContent";
import { MagneticButton } from "./ui/mButton";

const pcMenu = [
	{
		title: "about",
		link: "/about",
	},
	{
		title: "Our People",
		link: "/our-people",
	},
	{
		title: "Our People",
		link: "/our-people",
	},
];

const menuVariants: Variants = {
	initial: {
		opacity: 0,
		y: -20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut",
			staggerChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.2,
			ease: "easeIn",
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

const itemVariants: Variants = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
};

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [menuState, setMenuState] = React.useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [currentSection, setCurrentSection] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<nav
			className={` max-w-4xl mx-auto fixed left-0 right-0 top-0 z-50 flex items-center transition-all duration-300 justify-between px-6 py-6 md:px-12 
			${isScrolled ? " shadow-md py-4 bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5 mx-auto" : "bg-transparent py-6"}`}
		>
			<button className="flex items-center gap-2 transition-transform hover:scale-105">
				<Logo />
			</button>

			<div className="hidden items-center gap-8 md:flex">
				{pcMenu.map((item, index) => (
					<Link
						href={item.link}
						key={index}
						className={`group relative font-sans text-sm font-medium transition-colors ${
							currentSection === index
								? "text-foreground"
								: "text-foreground/80 hover:text-foreground"
						}`}
					>
						{item.title}
						<span
							className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
								currentSection === index ? "w-full" : "w-0 group-hover:w-full"
							}`}
						/>
					</Link>
				))}
			</div>

			<div className="flex items-center gap-4">
				<MagneticButton variant="secondary">Get Started</MagneticButton>
				<button
					onClick={() => setMenuState(!menuState)}
					aria-label={menuState == true ? "Close Menu" : "Open Menu"}
					className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden "
				>
					<Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
					<X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
				</button>
			</div>
		</nav>
	);
}
