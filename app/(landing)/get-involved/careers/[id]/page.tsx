import { getJobById } from "@/app/actions/careers";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function JobPage({ params }: PageProps) {
	const { id } = await params;
	const job = await getJobById(id);

	if (!job) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-cream pt-32 pb-12">
			<div className="container px-4 md:px-6 max-w-4xl mx-auto space-y-8">
				{/* Back Link */}
				<Link
					href="/careers"
					className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-dark/50 hover:text-lime transition-colors"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Careers
				</Link>

				{/* Header */}
				<div className="space-y-4">
					<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-dark leading-tight">
							{job.title}
						</h1>
						{job.status === "closed" && (
							<Badge className="bg-dark/10 text-dark font-bold border-none uppercase tracking-widest px-3 py-1">
								Closed
							</Badge>
						)}
					</div>

					<div className="flex flex-wrap gap-4 text-dark/70 font-medium">
						<div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-dark/5 shadow-sm">
							<MapPin className="h-4 w-4 text-lime" />
							<span>{job.location}</span>
						</div>
						<div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-dark/5 shadow-sm">
							<Clock className="h-4 w-4 text-lime" />
							<span>{job.type}</span>
						</div>
						<div className="flex items-center text-sm ml-2">
							<span className="opacity-70">Posted</span>&nbsp;
							<span className="font-semibold">
								{new Date(job.created_at).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>

				<Separator className="border-dark/10" />

				{/* Description */}
				<div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-dark prose-p:text-dark/80 prose-li:text-dark/80">
					<h3 className="text-2xl font-bold mb-4">About the Role</h3>
					<div className="whitespace-pre-wrap leading-relaxed text-dark/80 font-medium">
						{job.description}
					</div>
				</div>

				<Separator className="border-dark/10" />

				{/* Action */}
				<div className="flex flex-col items-center justify-center space-y-6 py-12 px-6 bg-white border border-dark/5 shadow-sm rounded-[2rem]">
					<h3 className="text-3xl font-sans font-bold text-dark tracking-tight">
						Interested in this role?
					</h3>
					{job.status === "open" ? (
						<JobApplicationForm jobId={job.id} jobTitle={job.title} />
					) : (
						<Button
							disabled
							variant="outline"
							className="rounded-full font-bold h-12 px-8 bg-dark/5 text-dark/50 border-transparent"
						>
							Positions Closed
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
