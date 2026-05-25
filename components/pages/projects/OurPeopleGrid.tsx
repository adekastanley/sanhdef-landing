"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamMember } from "@/app/actions/team";

interface OurPeopleGridProps {
	team: TeamMember[];
}

export default function OurPeopleGrid({ team }: OurPeopleGridProps) {
	if (team.length === 0) {
		return (
			<div className="text-center py-20 text-dark/50 font-medium">
				No team members found.
			</div>
		);
	}

	return (
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
						<Card className="h-full rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all duration-300 border border-dark/5 bg-white shadow-sm">
							<div className="aspect-4/3 bg-dark/5 relative overflow-hidden">
								<Avatar className="h-full w-full rounded-none">
									<AvatarImage
										src={member.image_url}
										alt={member.name}
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<AvatarFallback className="rounded-none text-4xl bg-dark/5 text-dark/30 font-bold font-sans">
										{member.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
							</div>
							<CardHeader>
								<CardTitle className="text-xl font-bold font-sans text-dark group-hover:text-pink transition-colors tracking-tight">
									{member.name}
								</CardTitle>
								<CardDescription className="text-base font-semibold text-pink">
									{member.role}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-base font-medium text-dark/70 line-clamp-4 leading-relaxed">
									{member.bio}
								</p>
							</CardContent>
						</Card>
					</Link>
				</motion.div>
			))}
		</div>
	);
}
