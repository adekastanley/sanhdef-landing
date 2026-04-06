"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";
import { Trash2, Plus } from "lucide-react";

export function FocusAreasManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		title: "Smarter service with SANHDEF intelligence",
		description: "At SANHDEF, our strength lies in how we combine expertise, collaboration, and community insight to deliver sustainable impact.",
		buttonText: "More About Us",
		buttonLink: "/about",
		imageUrl: "/assets/samg.webp",
		benefits: [
			"Community-Centred Solutions",
			"Strong Technical Capacity",
			"Integrated Development Approach",
			"Trusted & Accountable",
		],
		features: [
			{
				title: "Community Centred",
				desc: "Our programs ensure relevance, ownership, and long-term impact.",
			},
			{
				title: "Data Insights",
				desc: "Evidence-based, data-driven interventions for all our focus areas.",
			},
			{
				title: "Integrated Approach",
				desc: "Holistic approaches tackling health and environmental sustainability.",
			},
		],
	});

	const inputFileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		async function loadData() {
			const content = await getContent("focus_areas");
			if (content) {
				setData(content);
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
			const res = await updateContent("focus_areas", finalData);
			if (res.success) {
				toast.success("Focus Areas section updated successfully.");
				setData(finalData);
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update Focus Areas.");
		} finally {
			setIsLoading(false);
		}
	};

	const updateBenefit = (index: number, value: string) => {
		const newBenefits = [...data.benefits];
		newBenefits[index] = value;
		setData({ ...data, benefits: newBenefits });
	};

	const addBenefit = () => setData({ ...data, benefits: [...data.benefits, ""] });
	const removeBenefit = (index: number) => setData({ ...data, benefits: data.benefits.filter((_, i) => i !== index) });

	const updateFeature = (index: number, key: string, value: string) => {
		const newFeatures = [...data.features];
		newFeatures[index] = { ...newFeatures[index], [key]: value };
		setData({ ...data, features: newFeatures });
	};

	const addFeature = () => setData({ ...data, features: [...data.features, { title: "", desc: "" }] });
	const removeFeature = (index: number) => setData({ ...data, features: data.features.filter((_, i) => i !== index) });

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Focus Areas</h2>
				<p className="text-sm text-muted-foreground">Manage the content for the Intelligence / Focus Areas section.</p>
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
					<Label>Background Image</Label>
					<div className="flex gap-4 items-center">
						{data.imageUrl && <img src={data.imageUrl} alt="Focus Area" className="h-16 w-32 object-cover rounded" />}
						<Input type="file" ref={inputFileRef} accept="image/*" />
					</div>
				</div>

				<div className="space-y-4 pt-4 border-t">
					<div className="flex justify-between items-center">
						<Label className="text-base font-semibold">Benefits</Label>
						<Button variant="outline" size="sm" onClick={addBenefit}><Plus className="w-4 h-4 mr-1"/> Add Item</Button>
					</div>
					<div className="space-y-2">
						{data.benefits.map((benefit, i) => (
							<div key={i} className="flex gap-2">
								<Input value={benefit} onChange={e => updateBenefit(i, e.target.value)} />
								<Button variant="ghost" size="icon" onClick={() => removeBenefit(i)} className="text-destructive"><Trash2 className="w-4 h-4"/></Button>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-4 pt-4 border-t">
					<div className="flex justify-between items-center">
						<Label className="text-base font-semibold">3 Circular Features</Label>
						<Button variant="outline" size="sm" disabled={data.features.length >= 3} onClick={addFeature}><Plus className="w-4 h-4 mr-1"/> Add Feature</Button>
					</div>
					<div className="space-y-4">
						{data.features.map((feature, i) => (
							<div key={i} className="relative p-4 border rounded-md bg-muted/20">
								<Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeFeature(i)}>
									<Trash2 className="w-4 h-4" />
								</Button>
								<div className="grid gap-3 pr-8">
									<div className="space-y-1">
										<Label className="text-xs">Feature {i+1} Title</Label>
										<Input value={feature.title} onChange={e => updateFeature(i, 'title', e.target.value)} />
									</div>
									<div className="space-y-1">
										<Label className="text-xs">Feature {i+1} Description</Label>
										<Textarea value={feature.desc} onChange={e => updateFeature(i, 'desc', e.target.value)} rows={2} />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save Focus Areas"}
				</Button>
			</div>
		</div>
	);
}
