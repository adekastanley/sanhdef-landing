import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { getTeamMembers, type TeamMember } from "@/app/actions/team";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LeadershipSection() {
	const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchLeadership() {
			try {
				const members = await getTeamMembers("leadership");
				setLeadershipTeam(members);
			} catch (error) {
				console.error("Failed to fetch leadership members", error);
			} finally {
				setLoading(false);
			}
		}
		fetchLeadership();
	}, []);

	if (loading) {
		return (
			<section id="leadership" className="scroll-mt-32">
				<div className="text-center mb-12">
					<Skeleton className="h-10 w-64 mx-auto mb-4" />
					<Skeleton className="h-1 w-20 mx-auto mb-6" />
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} className="h-[250px] w-full rounded-2xl" />
					))}
				</div>
			</section>
		);
	}

	if (leadershipTeam.length === 0) return null;

	return (
		<section id="leadership" className="scroll-mt-32">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-12"
			>
				<h2 className="text-3xl font-bold text-dark mb-4 tracking-tight">
					Our Leadership
				</h2>
				<div className="w-20 h-1 bg-pink mx-auto mb-6" />
				<p className="text-dark/70 max-w-2xl mx-auto font-medium">
					Guided by a Board of Directors and Management Team with extensive
					experience in international development and public health.
				</p>
			</motion.div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{leadershipTeam.map((leader, idx) => (
					<motion.div
						key={leader.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: idx * 0.05 }}
					>
						<Link href={`/team/${leader.id}`} className="block h-full">
							<Card className="h-full overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-dark/5 bg-white rounded-3xl">
								<div className="aspect-[4/3] bg-dark/5 relative overflow-hidden">
									<Avatar className="h-full w-full rounded-none">
										<AvatarImage
											src={leader.image_url}
											alt={leader.name}
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<AvatarFallback className="rounded-none text-4xl bg-dark/5 text-dark/30">
											{leader.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
								</div>
								<CardHeader className="pt-6">
									<CardTitle className="text-xl font-bold text-dark group-hover:text-pink transition-colors">
										{leader.name}
									</CardTitle>
									<CardDescription className="font-semibold text-dark/60">
										{leader.role}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-dark/70 line-clamp-3 leading-relaxed">
										{leader.bio}
									</p>
								</CardContent>
							</Card>
						</Link>
					</motion.div>
				))}
			</div>
		</section>
	);
}
