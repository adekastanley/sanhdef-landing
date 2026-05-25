"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ContactFormProps {
	theme?: "light" | "dark";
	className?: string;
}

export function ContactForm({ theme = "light", className }: ContactFormProps) {
	const isDark = theme === "dark";

	// Styles based on theme
	const labelClass = cn(
		"text-sm font-bold uppercase tracking-widest",
		isDark ? "text-cream/70" : "text-dark/50",
	);

	const inputClass = cn(
		"border-0 border-b-2 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-pink text-lg font-medium bg-transparent transition-colors",
		isDark
			? "border-cream/20 text-cream placeholder:text-cream/30 hover:border-cream/40"
			: "border-dark/10 text-dark placeholder:text-dark/30 hover:border-dark/30",
	);

	const selectTriggerClass = cn(
		"border-0 border-b-2 rounded-none px-0 py-3 focus:ring-0 focus:border-pink text-lg font-medium shadow-none bg-transparent transition-colors",
		isDark
			? "border-cream/20 text-cream placeholder:text-cream/30 hover:border-cream/40"
			: "border-dark/10 text-dark placeholder:text-dark/30 hover:border-dark/30",
	);

	return (
		<div className={className}>
			<form className="space-y-10">
				<div className="grid md:grid-cols-2 gap-10">
					<div className="space-y-3">
						<label className={labelClass}>Name (Required)</label>
						<Input placeholder="First Name" className={inputClass} />
					</div>
					<div className="space-y-3">
						<label className={cn(labelClass, "opacity-0 md:opacity-100")}>
							Last Name
						</label>
						<Input placeholder="Last Name" className={inputClass} />
					</div>
				</div>

				<div className="space-y-3">
					<label className={labelClass}>Email (Required)</label>
					<Input
						type="email"
						placeholder="you@company.com"
						className={inputClass}
					/>
				</div>

				<div className="space-y-3">
					<label className={labelClass}>Service Interest</label>
					<Select>
						<SelectTrigger className={selectTriggerClass}>
							<SelectValue placeholder="Select a service..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="health-systems">
								Health Systems Strengthening
							</SelectItem>
							<SelectItem value="monitoring">
								Monitoring & Evaluation
							</SelectItem>
							<SelectItem value="public-health">
								Public Health Policy
							</SelectItem>
							<SelectItem value="research">Research</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<label className={labelClass}>Project Description</label>
					<Textarea
						placeholder="Tell us about your project..."
						className={cn(inputClass, "resize-none min-h-[120px]")}
					/>
				</div>

				<div className="pt-6">
					<Button
						size="lg"
						className={cn(
							"rounded-full px-12 py-7 text-lg font-bold letter-spacing-wide transition-all w-full md:w-auto",
							isDark
								? "bg-pink text-dark hover:bg-pink/90"
								: "bg-dark text-cream hover:bg-navy border border-transparent",
						)}
					>
						Submit Message
					</Button>
				</div>
			</form>
		</div>
	);
}
