"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";

export function StatsManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		title: "Metrics that matter\nclient-focused",
		buttonText: "View Impact Reports",
		buttonLink: "/projects",
		stats: [
			{
				title: "+1023",
				subtitle: "Total Projects",
				desc: "Impact across various regions.",
			},
			{
				title: "70%",
				subtitle: "Community Participation",
				desc: "High engagement.",
			},
			{
				title: "+234",
				subtitle: "Active Partners",
				desc: "Strong global network.",
			},
		],
	});

	useEffect(() => {
		async function loadData() {
			const content = await getContent("stats");
			if (content) {
				setData(content);
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const res = await updateContent("stats", data);
			if (res.success) {
				toast.success("Stats section updated successfully.");
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update Stats.");
		} finally {
			setIsLoading(false);
		}
	};

	const updateStat = (index: number, key: keyof typeof data.stats[0], value: string) => {
		const newStats = [...data.stats];
		newStats[index] = { ...newStats[index], [key]: value };
		setData({ ...data, stats: newStats });
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Stats Section</h2>
				<p className="text-sm text-muted-foreground">Manage the 3 major metrics shown on the homepage.</p>
			</div>
			
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label>Section Title</Label>
					<Textarea 
                        value={data.title} 
                        onChange={e => setData({...data, title: e.target.value})} 
                        rows={2} 
                        placeholder="Metrics that matter\nclient-focused"
                    />
				</div>
                
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>CTA Button Text</Label>
						<Input value={data.buttonText} onChange={e => setData({...data, buttonText: e.target.value})} />
					</div>
					<div className="space-y-2">
						<Label>CTA Link</Label>
						<Input value={data.buttonLink} onChange={e => setData({...data, buttonLink: e.target.value})} />
					</div>
				</div>

				<div className="space-y-4 pt-4 border-t">
					<Label className="text-base font-semibold">The 3 Stat Cards</Label>
					{data.stats.map((stat, i) => (
						<div key={i} className="p-4 border rounded-md bg-muted/20 space-y-3">
							<div className="font-medium text-sm">Stat Card {i+1}</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<Label className="text-xs">Value (e.g. +1023)</Label>
									<Input value={stat.title} onChange={e => updateStat(i, 'title', e.target.value)} />
								</div>
								<div className="space-y-1">
									<Label className="text-xs">Subtitle (e.g. Total Projects)</Label>
									<Input value={stat.subtitle} onChange={e => updateStat(i, 'subtitle', e.target.value)} />
								</div>
							</div>
							<div className="space-y-1">
								<Label className="text-xs">Description</Label>
								<Input value={stat.desc} onChange={e => updateStat(i, 'desc', e.target.value)} />
							</div>
						</div>
					))}
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save Stats Section"}
				</Button>
			</div>
		</div>
	);
}
