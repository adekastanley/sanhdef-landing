"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Github, Chrome, Apple } from "lucide-react";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		setIsSubmitting(true);
		setError("");

		const result = await login(formData);
		if (result?.error) {
			setError(result.error);
			setIsSubmitting(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-8", className)} {...props}>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold tracking-tight text-dark">
					Welcome back
				</h2>
				<p className="text-sm text-dark/50">Access your dashboard</p>
			</div>

			<form action={handleSubmit} className="flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<Label htmlFor="email" className="text-sm font-semibold text-dark">
						Your email
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="email@example.com"
						required
						className="h-12 border-dark/10 focus-visible:ring-dark/20"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<Label
							htmlFor="password"
							className="text-sm font-semibold text-dark"
						>
							Password
						</Label>
					</div>
					<div className="relative">
						<Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							required
							className="h-12 border-dark/10 focus-visible:ring-dark/20 pr-10"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark/60 transition-colors"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				</div>

				{error && (
					<p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100 italic">
						{error}
					</p>
				)}

				<Button
					type="submit"
					disabled={isSubmitting}
					className="h-12 bg-dark text-white hover:bg-dark/90 rounded-lg text-base font-semibold transition-all mt-2"
				>
					{isSubmitting ? "Logging in..." : "Login to account"}
				</Button>
			</form>
		</div>
	);
}
