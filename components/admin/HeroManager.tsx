"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";

export function HeroManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		title: "The platform powering your operations",
		description: "Sanitas Health and Development Foundation (SANHDEF) establishes dynamic collaborations to tackle public health, development, environmental, and social challenges.",
		buttonText: "Get Involved",
		buttonLink: "/get-involved",
		imageUrl: "/assets/samg.webp",
		stats: [
			{ value: "5K+", label: "Partners" },
			{ value: "2K+", label: "Projects" },
			{ value: "120+", label: "Communities" },
		],
	});

	const inputFileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		async function loadData() {
			const content = await getContent("hero");
			if (content) {
				setData(prev => ({
					...prev,
					...content,
					stats: content.stats || prev.stats,
				}));
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			let imageUrl = data.imageUrl;
			if (inputFileRef.current?.files?.length) {
				const file = inputFileRef.current.files[0];
				const response = await fetch(
					`/api/upload?filename=${file.name}&folder=landing`,
					{ method: "POST", body: file }
				);
				const result = await response.json();
				if (result.error) throw new Error(result.error);
				imageUrl = result.url;
			}

			const finalData = { ...data, imageUrl };
			const res = await updateContent("hero", finalData);
			if (res.success) {
				toast.success("Hero section updated successfully.");
				setData(finalData);
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update hero.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Hero Section</h2>
				<p className="text-sm text-muted-foreground">Manage the main hero title, description, and stats.</p>
			</div>
			
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label>Title</Label>
					<Input value={data.title} onChange={e => setData({...data, title: e.target.value})} />
				</div>
				<div className="space-y-2">
					<Label>Description</Label>
					<Textarea value={data.description} onChange={e => setData({...data, description: e.target.value})} rows={3} />
				</div>
                
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Button Text</Label>
						<Input value={data.buttonText} onChange={e => setData({...data, buttonText: e.target.value})} />
					</div>
					<div className="space-y-2">
						<Label>Button Link</Label>
						<Input value={data.buttonLink} onChange={e => setData({...data, buttonLink: e.target.value})} />
					</div>
				</div>

				<div className="space-y-2">
					<Label>Background Image (Optional to override)</Label>
					<div className="flex gap-4 items-center">
						{data.imageUrl && <img src={data.imageUrl} alt="Hero" className="h-16 w-32 object-cover rounded" />}
						<Input type="file" ref={inputFileRef} accept="image/*" />
					</div>
				</div>

				<div className="space-y-4 pt-4 border-t">
					<Label className="text-base font-semibold">Stats (Max 3)</Label>
					{data.stats.map((stat, i) => (
						<div key={i} className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<Label className="text-xs">Value {i+1}</Label>
								<Input value={stat.value} onChange={e => {
									const newStats = [...data.stats];
									newStats[i].value = e.target.value;
									setData({...data, stats: newStats});
								}} />
							</div>
							<div className="space-y-1">
								<Label className="text-xs">Label {i+1}</Label>
								<Input value={stat.label} onChange={e => {
									const newStats = [...data.stats];
									newStats[i].label = e.target.value;
									setData({...data, stats: newStats});
								}} />
							</div>
						</div>
					))}
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save Hero Section"}
				</Button>
			</div>
		</div>
	);
}
