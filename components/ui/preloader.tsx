"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader() {
	const [complete, setComplete] = useState(false);

	useEffect(() => {
		// Total animation time roughly 3-4s before revealing
		const timer = setTimeout(() => {
			setComplete(true);
		}, 3500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence mode="wait">
			{!complete && (
				<>
					<motion.div
						key="preloader"
						className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark text-cream overflow-hidden"
						exit={{
							x: "100%",
							transition: {
								duration: 0.8,
								ease: [0.76, 0, 0.24, 1],
								delay: 0.2,
							},
						}}
					>
						{/* Breathing Text Container */}
						<motion.div
							className="relative"
							exit={{ opacity: 0, transition: { duration: 0.1 } }}
						>
							{/* Background Faded Text */}
							<h1 className="text-6xl md:text-9xl font-bold font-sans tracking-tight text-white/10">
								SANHDEF
							</h1>

							{/* Foreground Fill Text */}
							<h1 className="absolute top-0 left-0 text-6xl md:text-9xl font-bold font-sans tracking-tight text-cream overflow-hidden">
								<motion.span
									initial={{ width: "0%" }}
									animate={{ width: "100%" }}
									transition={{ duration: 3, ease: "easeInOut" }}
									className="block overflow-hidden whitespace-nowrap"
								>
									SANHDEF
								</motion.span>
							</h1>
						</motion.div>
					</motion.div>

					{/* Trailing Swipes */}
					<motion.div
						initial={{ x: "0%" }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
						className="fixed inset-0 z-[9998] bg-navy"
					/>
					<motion.div
						initial={{ x: "0%" }}
						exit={{ x: "100%" }}
						transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
						className="fixed inset-0 z-[9997] bg-pink"
					/>
				</>
			)}
		</AnimatePresence>
	);
}
