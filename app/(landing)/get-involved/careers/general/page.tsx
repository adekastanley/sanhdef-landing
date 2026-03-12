"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitApplication } from "@/app/actions/careers";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	first_name: z.string().min(2, "First name must be at least 2 characters"),
	last_name: z.string().min(2, "Last name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	role_interest: z.string().min(1, "Please select a role of interest"),
	// resume_url will be handled separately via file upload logic, but we can keep it in schema if we want to validte it exists
	// OR we just validate file presence manually like in JobApplicationForm. Let's keep it clean.
	message: z.string().optional(),
});

const roles = [
	"General / Unspecified",
	"Health Systems Strengthening",
	"Monitoring & Evaluation",
	"Public Health",
	"Human Resources for Health",
	"Program Management",
	"Finance & Administration",
	"Information Technology",
];

export default function GeneralApplicationPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const inputFileRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			role_interest: "",
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);
		try {
			// 1. Handle File Upload
			if (!inputFileRef.current?.files?.length) {
				toast.error("Please upload your resume (PDF)");
				setIsSubmitting(false);
				return;
			}

			const file = inputFileRef.current.files[0];
			if (file.size > 5 * 1024 * 1024) {
				// 5MB
				toast.error("File too large (max 5MB)");
				setIsSubmitting(false);
				return;
			}

			const uploadResponse = await fetch(`/api/upload?filename=${file.name}`, {
				method: "POST",
				body: file,
			});

			if (!uploadResponse.ok) {
				throw new Error("Upload failed");
			}

			const blob = await uploadResponse.json();

			// 2. Submit Application
			await submitApplication({
				job_id: "general-application", // Special ID for general applications
				applicant_name: `${values.first_name} ${values.last_name}`,
				email: values.email,
				resume_url: blob.url,
				role_interest: values.role_interest,
				message: values.message,
			});

			toast("Application Submitted", {
				description:
					"We have received your details. Thank you for your interest!",
			});

			form.reset();
			if (inputFileRef.current) {
				inputFileRef.current.value = "";
			}
			// Optionally redirect
			// router.push("/careers");
		} catch (error) {
			console.error(error);
			toast.error("Error", {
				description: "Something went wrong. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="flex flex-col min-h-screen bg-cream">
			<section className="bg-dark-green py-12 md:py-20 text-cream min-h-[40vh] relative pt-40">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
				<div className="container px-4 text-center relative z-10">
					<h1 className="text-4xl md:text-6xl font-bold font-sans tracking-tight mb-6">
						Join Our Talent Pipeline
					</h1>
					<p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-cream/80 leading-relaxed">
						Don't see a matching role? Submit your details to be considered for
						future opportunities that match your skills and interests.
					</p>
				</div>
			</section>

			<div className="container max-w-2xl px-4 py-16 -mt-16 relative z-20">
				<div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-dark/5">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-bold uppercase tracking-widest text-dark/70">
												First Name
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Jane"
													className="h-12 border-dark/10 rounded-xl focus-visible:ring-lime"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="last_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-bold uppercase tracking-widest text-dark/70">
												Last Name
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Doe"
													className="h-12 border-dark/10 rounded-xl focus-visible:ring-lime"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-bold uppercase tracking-widest text-dark/70">
											Email Address
										</FormLabel>
										<FormControl>
											<Input
												placeholder="john@example.com"
												type="email"
												className="h-12 border-dark/10 rounded-xl focus-visible:ring-lime"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="role_interest"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-bold uppercase tracking-widest text-dark/70">
											Role of Interest
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="h-12 border-dark/10 rounded-xl focus:ring-lime">
													<SelectValue placeholder="Select a role..." />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{roles.map((role) => (
													<SelectItem key={role} value={role}>
														{role}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Manual File Input */}
							<div className="space-y-3">
								<FormLabel className="text-sm font-bold uppercase tracking-widest text-dark/70">
									Resume (PDF)
								</FormLabel>
								<div className="flex items-center gap-2">
									<Input
										type="file"
										ref={inputFileRef}
										accept=".pdf"
										required
										className="cursor-pointer file:bg-dark-green file:text-cream file:border-none file:mr-4 file:px-4 file:py-2 file:rounded-full file:font-semibold hover:file:bg-dark-green/90 h-14 w-full"
									/>
								</div>
								<p className="text-xs font-semibold text-dark/50 uppercase tracking-wide">
									Max file size: 5MB. PDF only.
								</p>
							</div>

							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-bold uppercase tracking-widest text-dark/70">
											Additional Message (Optional)
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Tell us a bit about yourself and what you're looking for..."
												className="resize-none min-h-[120px] border-dark/10 rounded-xl focus-visible:ring-lime"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full bg-lime text-dark font-bold hover:bg-lime/90 h-14 rounded-full text-lg shadow-sm"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Submitting...
									</>
								) : (
									"Submit Application"
								)}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
