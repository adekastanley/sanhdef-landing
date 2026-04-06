"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";

export function AboutHeroManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		topTag: "About Us",
		titleLine1: "Sanitas Health and",
		titleItalic: "Development",
		titleLine2: "Foundation",
		subtitleLine1: "Empowering Healthy,",
		subtitleHighlight: "Resilient Communities",
		subtitleLine2: "Across Nigeria and Beyond",
	});

	useEffect(() => {
		async function loadData() {
			const content = await getContent("about_hero");
			if (content) {
				setData(content);
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const res = await updateContent("about_hero", data);
			if (res.success) {
				toast.success("About Hero section updated successfully.");
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update About Hero.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">About Page Hero</h2>
				<p className="text-sm text-muted-foreground">Manage the hero text for the About page.</p>
			</div>
			
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label>Top Tag</Label>
					<Input value={data.topTag} onChange={e => setData({...data, topTag: e.target.value})} />
				</div>
                
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="space-y-2">
						<Label>Title Line 1</Label>
						<Input value={data.titleLine1} onChange={e => setData({...data, titleLine1: e.target.value})} />
					</div>
					<div className="space-y-2">
						<Label>Title Highlight (Italic)</Label>
						<Input value={data.titleItalic} onChange={e => setData({...data, titleItalic: e.target.value})} />
					</div>
					<div className="space-y-2">
						<Label>Title Line 2</Label>
						<Input value={data.titleLine2} onChange={e => setData({...data, titleLine2: e.target.value})} />
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="space-y-2">
						<Label>Subtitle Line 1</Label>
						<Input value={data.subtitleLine1} onChange={e => setData({...data, subtitleLine1: e.target.value})} />
					</div>
					<div className="space-y-2">
						<Label>Subtitle Highlight</Label>
						<Input value={data.subtitleHighlight} onChange={e => setData({...data, subtitleHighlight: e.target.value})} />
					</div>
					<div className="space-y-2">
						<Label>Subtitle Line 2</Label>
						<Input value={data.subtitleLine2} onChange={e => setData({...data, subtitleLine2: e.target.value})} />
					</div>
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save About Hero"}
				</Button>
			</div>
		</div>
	);
}
