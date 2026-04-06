"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";

export function VisionManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		titleLine1: "WHO WE",
		titleItalic: "ARE",
		mainText: "Sanitas Health and Development Foundation (SANHDEF) is a Nigerian NGO dedicated to transforming lives through evidence-based public health programs, sustainable development initiatives, and community-centred solutions. In technical partnership with Health Systems Consult Limited (HSCL), we work collaboratively with governments, partners, and communities to address complex challenges and accelerate progress toward the Sustainable Development Goals.",
		subText: "Through dynamic collaborations and ingenious initiatives, we are unwavering in our mission to propel the achievement of Sustainable Development Goals. SANHDEF has a technical partnership with our parent company Health Systems Consult Limited (HSCL), which further enhances our capacity to deliver impactful solutions.",
		stats: [
			{ value: "10+", label: "Years of Impact" },
			{ value: "36+", label: "States Reached" },
		],
	});

	useEffect(() => {
		async function loadData() {
			const content = await getContent("about_vision");
			if (content) {
				setData(content);
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const res = await updateContent("about_vision", data);
			if (res.success) {
				toast.success("Vision section updated successfully.");
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update Vision section.");
		} finally {
			setIsLoading(false);
		}
	};

	const updateStat = (index: number, key: 'value' | 'label', val: string) => {
		const newStats = [...data.stats];
		newStats[index] = { ...newStats[index], [key]: val };
		setData({ ...data, stats: newStats });
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Vision Section</h2>
				<p className="text-sm text-muted-foreground">Manage the Who We Are section text and stats.</p>
			</div>
			
			<div className="grid gap-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Title Line 1</Label>
						<Input value={data.titleLine1} onChange={e => setData({...data, titleLine1: e.target.value})} />
					</div>
					<div className="space-y-2">
						<Label>Title Highlight (Italic)</Label>
						<Input value={data.titleItalic} onChange={e => setData({...data, titleItalic: e.target.value})} />
					</div>
				</div>

				<div className="space-y-2">
					<Label>Main Text (Large)</Label>
					<Textarea value={data.mainText} onChange={e => setData({...data, mainText: e.target.value})} rows={4} />
				</div>

				<div className="space-y-2">
					<Label>Subtext (Smaller)</Label>
					<Textarea value={data.subText} onChange={e => setData({...data, subText: e.target.value})} rows={3} />
				</div>

				<div className="space-y-4 pt-4 border-t">
					<Label className="text-base font-semibold">Stats</Label>
					{data.stats.map((stat, i) => (
						<div key={i} className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<Label className="text-xs">Value {i+1}</Label>
								<Input value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} />
							</div>
							<div className="space-y-1">
								<Label className="text-xs">Label {i+1}</Label>
								<Input value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} />
							</div>
						</div>
					))}
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save Vision Section"}
				</Button>
			</div>
		</div>
	);
}
