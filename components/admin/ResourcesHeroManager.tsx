"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";

export function ResourcesHeroManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		topTag: "Resources & Insights",
		titleLine1: "Tools for",
		titleItalic: "Impact",
		description: "Explore our collection of specialized guides, templates, and courses designed to empower global health and supply chain success.",
	});

	useEffect(() => {
		async function loadData() {
			const content = await getContent("resources_hero");
			if (content) {
				setData(content);
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const res = await updateContent("resources_hero", data);
			if (res.success) {
				toast.success("Resources Hero section updated successfully.");
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update Resources Hero.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Resources Page Hero</h2>
				<p className="text-sm text-muted-foreground">Manage the text at the top of the Resources page.</p>
			</div>
			
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label>Top Tag</Label>
					<Input value={data.topTag} onChange={e => setData({...data, topTag: e.target.value})} />
				</div>
                
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
					<Label>Description</Label>
					<Textarea value={data.description} onChange={e => setData({...data, description: e.target.value})} rows={3} />
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save Resources Hero"}
				</Button>
			</div>
		</div>
	);
}
