"use client";

import React, { useState } from "react";
import { CreditCard, Heart, Calendar, Lock } from "lucide-react";
import { MagneticButton } from "@/components/ui/mButton";

export function DonateForm() {
	const [frequency, setFrequency] = useState<"once" | "monthly">("once");
	const [amount, setAmount] = useState<number | "custom">(50);
	const [customAmount, setCustomAmount] = useState("");

	const amounts = frequency === "once" ? [25, 50, 100, 250, 500] : [10, 25, 50, 100, 250];

	return (
		<div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
			{/* Decorative elements */}
			<div className="absolute top-0 right-0 w-32 h-32 bg-pink/10 rounded-full blur-3xl -mr-10 -mt-10" />
			<div className="absolute bottom-0 left-0 w-32 h-32 bg-blue/10 rounded-full blur-3xl -ml-10 -mb-10" />

			<div className="relative z-10">
				{/* Frequency Toggle */}
				<div className="flex bg-gray-100/80 p-1 rounded-full mb-8 relative">
					<div
						className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out ${
							frequency === "monthly" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"
						}`}
					/>
					<button
						onClick={() => setFrequency("once")}
						className={`flex-1 py-3 text-sm font-semibold rounded-full z-10 transition-colors ${
							frequency === "once" ? "text-navy" : "text-gray-500 hover:text-navy"
						}`}
					>
						Give Once
					</button>
					<button
						onClick={() => setFrequency("monthly")}
						className={`flex-1 py-3 text-sm font-semibold rounded-full z-10 transition-colors flex items-center justify-center gap-2 ${
							frequency === "monthly" ? "text-navy" : "text-gray-500 hover:text-navy"
						}`}
					>
						<Heart className="w-4 h-4" />
						Monthly
					</button>
				</div>

				{/* Amount Selection */}
				<div className="grid grid-cols-3 gap-3 mb-6">
					{amounts.map((amt) => (
						<button
							key={amt}
							onClick={() => setAmount(amt)}
							className={`py-4 rounded-2xl font-bold text-lg transition-all duration-200 border-2 ${
								amount === amt
									? "border-pink bg-pink/5 text-pink scale-[1.02] shadow-sm"
									: "border-transparent bg-white shadow-sm text-navy hover:border-pink/30 hover:bg-pink/5"
							}`}
						>
							${amt}
						</button>
					))}
					<button
						onClick={() => setAmount("custom")}
						className={`py-4 rounded-2xl font-bold text-lg transition-all duration-200 border-2 ${
							amount === "custom"
								? "border-pink bg-pink/5 text-pink scale-[1.02] shadow-sm"
								: "border-transparent bg-white shadow-sm text-navy hover:border-pink/30 hover:bg-pink/5"
						}`}
					>
						Custom
					</button>
				</div>

				{/* Custom Amount Input */}
				<div
					className={`overflow-hidden transition-all duration-300 ease-in-out ${
						amount === "custom" ? "max-h-24 opacity-100 mb-6" : "max-h-0 opacity-0 mb-0"
					}`}
				>
					<div className="relative">
						<span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">
							$
						</span>
						<input
							type="number"
							value={customAmount}
							onChange={(e) => setCustomAmount(e.target.value)}
							placeholder="Enter amount"
							className="w-full bg-white border-2 border-transparent focus:border-pink outline-none rounded-2xl py-4 pl-12 pr-6 text-xl font-bold text-navy shadow-sm transition-colors"
						/>
					</div>
				</div>

				{/* Form Fields */}
				<div className="space-y-4 mb-8">
					<input
						type="text"
						placeholder="Full Name"
						className="w-full bg-white/60 border border-gray-200 focus:border-pink focus:bg-white outline-none rounded-2xl py-4 px-6 text-base font-medium text-navy transition-all"
					/>
					<input
						type="email"
						placeholder="Email Address"
						className="w-full bg-white/60 border border-gray-200 focus:border-pink focus:bg-white outline-none rounded-2xl py-4 px-6 text-base font-medium text-navy transition-all"
					/>
				</div>

				{/* Donate Button */}
				<MagneticButton
					variant="primary-pink"
					className="w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-pink/30 hover:shadow-pink/50 transition-shadow"
				>
					<CreditCard className="w-5 h-5" />
					Donate {amount !== "custom" ? `$${amount}` : customAmount ? `$${customAmount}` : ""}
					{frequency === "monthly" && <span className="text-sm font-medium opacity-80">/mo</span>}
				</MagneticButton>

				{/* Secure Badge */}
				<div className="flex items-center justify-center gap-2 mt-6 text-gray-500 text-xs font-medium">
					<Lock className="w-3 h-3" />
					<span>Secure, encrypted transaction</span>
				</div>
			</div>
		</div>
	);
}
