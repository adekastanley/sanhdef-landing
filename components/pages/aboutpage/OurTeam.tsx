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

export default function TeamSection() {
	const [team, setTeam] = useState<TeamMember[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchTeam() {
			try {
				const members = await getTeamMembers("team");
				setTeam(members);
			} catch (error) {
				console.error("Failed to fetch team members", error);
			} finally {
				setLoading(false);
			}
		}
		fetchTeam();
	}, []);

	if (loading) {
		return (
			<section id="team" className="scroll-mt-32">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-dark mb-4 tracking-tight">
						Our Team
					</h2>
					<div className="w-20 h-1 bg-lime mx-auto mb-6" />
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[1, 2, 3].map((i) => (
						<div key={i} className="h-full space-y-3">
							<Skeleton className="h-[250px] w-full rounded-2xl" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	if (team.length === 0) {
		return null;
	}

	return (
		<section id="team" className="scroll-mt-32">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-12"
			>
				<h2 className="text-3xl font-bold text-dark mb-4 tracking-tight">
					Our Team
				</h2>
				<div className="w-20 h-1 bg-lime mx-auto mb-6" />
				<p className="text-dark/70 max-w-2xl mx-auto font-medium">
					Meet the talented individuals driving our mission forward.
				</p>
			</motion.div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{team.map((member, idx) => (
					<motion.div
						key={member.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: idx * 0.05 }}
					>
						<Link href={`/team/${member.id}`} className="block h-full">
							<Card className="h-full overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-dark/5 bg-white rounded-3xl">
								<div className="aspect-[4/3] bg-dark/5 relative overflow-hidden">
									<Avatar className="h-full w-full rounded-none">
										<AvatarImage
											src={member.image_url}
											alt={member.name}
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<AvatarFallback className="rounded-none text-4xl bg-dark/5 text-dark/30">
											{member.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
								</div>
								<CardHeader className="pt-6">
									<CardTitle className="text-xl font-bold text-dark group-hover:text-lime transition-colors">
										{member.name}
									</CardTitle>
									<CardDescription className="font-semibold text-dark/60">
										{member.role}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-dark/70 line-clamp-4 leading-relaxed">
										{member.bio}
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
