import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getJobListings } from "@/app/actions/careers";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
	const jobs = await getJobListings(true);

	return (
		<div className="flex flex-col min-h-screen bg-cream">
			{/* Hero Section */}
			<section className="pt-32 pb-16 bg-cream">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
						<Badge className="px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase bg-pink text-dark border-none shadow-sm">
							We're hiring
						</Badge>
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-dark font-sans leading-tight">
							Be part of our mission
						</h1>
						<p className="text-xl md:text-2xl text-dark/70 font-medium leading-relaxed">
							We're looking for passionate people to join us on our mission. We
							value flat hierarchies, clear communication, and full ownership
							and responsibility.
						</p>
					</div>
				</div>
			</section>

			{/* Talent Pipeline / General Application */}
			<section className="py-12 bg-cream">
				<div className="container px-4 md:px-6 max-w-5xl mx-auto">
					<Card className="border border-dark/10 bg-navy rounded-[2rem] shadow-md p-6 md:p-8">
						<CardHeader>
							<CardTitle className="text-3xl font-bold text-cream mb-2">
								Don't see the right role?
							</CardTitle>
							<CardDescription className="text-lg text-cream/80 font-medium leading-relaxed">
								Register to be considered for future opportunities. We are
								always looking for talented individuals to join our talent
								pipeline.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button
								asChild
								size="lg"
								className="bg-pink hover:bg-pink/90 text-dark font-bold rounded-full h-14 px-8 mt-4 shadow-sm"
							>
								<Link href="/get-involved/careers/general">
									Register for Future Opportunities
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Job Listings */}
			<section className="py-12 md:py-20 bg-cream">
				<div className="container px-4 md:px-6 max-w-5xl mx-auto">
					<div className="flex flex-col space-y-8">
						<div className="flex flex-col space-y-4">
							<h2 className="text-4xl font-bold tracking-tight text-dark">
								Open Positions
							</h2>
							<Separator className="border-dark/10" />
						</div>

						<div className="grid gap-6">
							{jobs.length === 0 ? (
								<div className="text-center py-24 text-dark/50 bg-white rounded-[2rem] border border-dark/5 font-medium shadow-sm">
									No open positions at the moment. Please check back later.
								</div>
							) : (
								jobs.map((job) => (
									<div
										key={job.id}
										className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-[1.5rem] border border-dark/5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-dark/10"
									>
										<div className="space-y-4">
											<div className="space-y-1">
												<h3 className="text-2xl font-bold text-dark group-hover:text-pink transition-colors tracking-tight">
													{job.title}
												</h3>
												{/* <p className="text-muted-foreground">{job.department}</p> */}
											</div>
											<div className="flex flex-wrap gap-2 text-sm font-semibold text-dark/60 tracking-wide">
												<div className="flex items-center gap-1.5 bg-dark/5 px-3 py-1.5 rounded-full">
													<MapPin className="h-4 w-4 text-pink" />
													<span>{job.location}</span>
												</div>
												<div className="flex items-center gap-1.5 bg-dark/5 px-3 py-1.5 rounded-full">
													<Clock className="h-4 w-4 text-pink" />
													<span>{job.type}</span>
												</div>
											</div>
										</div>

										<div className="flex items-center">
											<Button
												asChild
												variant="ghost"
												className="gap-2 group-hover:bg-pink group-hover:text-dark font-bold rounded-full h-12 px-6 transition-all border border-dark/10 group-hover:border-pink"
											>
												<Link href={`/get-involved/careers/${job.id}`}>
													View Details
													<ArrowUpRight className="h-4 w-4" />
												</Link>
											</Button>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
