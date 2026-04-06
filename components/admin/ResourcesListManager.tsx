"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";
import { Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const defaultResources = [
	{
		id: 1,
		title: "Supply Chain Optimization Guide",
		description: "A comprehensive guide to optimizing your last-mile delivery network in remote areas.",
		type: "Guide",
		format: "PDF",
		isFree: true,
		price: "",
		icon: "FileText",
		url: "/resources/supply-chain-guide",
	},
	{
		id: 2,
		title: "Logistics Analytics Dashboard Template",
		description: "Ready-to-use dashboard templates for tracking key performance indicators in logistics.",
		type: "Template",
		format: "Excel",
		isFree: false,
		price: "$49",
		icon: "Download",
		url: "/resources/dashboard-template",
	},
	{
		id: 3,
		title: "Effective Warehouse Management",
		description: "Video course covering the fundamentals of modern warehouse management systems.",
		type: "Course",
		format: "Video",
		isFree: false,
		price: "$199",
		icon: "Video",
		url: "/resources/warehouse-course",
	},
];

export function ResourcesListManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [resources, setResources] = useState<any[]>(defaultResources);

	useEffect(() => {
		async function loadData() {
			const content = await getContent("resources_list");
			if (content) {
				setResources(content);
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const res = await updateContent("resources_list", resources);
			if (res.success) {
				toast.success("Resources list updated successfully.");
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update Resources list.");
		} finally {
			setIsLoading(false);
		}
	};

	const updateResource = (index: number, key: string, value: any) => {
		const newResources = [...resources];
		newResources[index] = { ...newResources[index], [key]: value };
		setResources(newResources);
	};

	const addResource = () => setResources([...resources, {
		id: Date.now(),
		title: "New Resource",
		description: "",
		type: "Guide",
		format: "PDF",
		isFree: true,
		price: "",
		icon: "FileText",
		url: "",
	}]);

	const removeResource = (index: number) => setResources(resources.filter((_, i) => i !== index));

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-xl font-semibold">Resources List</h2>
					<p className="text-sm text-muted-foreground">Manage the downloadable files, templates, and courses.</p>
				</div>
				<Button size="sm" onClick={addResource}><Plus className="w-4 h-4 mr-1"/> Add Resource</Button>
			</div>
			
			<div className="space-y-4">
				{resources.map((resource, i) => (
					<div key={resource.id} className="relative p-6 border rounded-lg bg-muted/20">
						<Button variant="ghost" size="icon" className="absolute top-4 right-4 text-destructive" onClick={() => removeResource(i)}>
							<Trash2 className="w-4 h-4" />
						</Button>
						
						<div className="grid gap-4 pr-10">
							<div className="space-y-1.5">
								<Label>Title</Label>
								<Input value={resource.title} onChange={e => updateResource(i, 'title', e.target.value)} />
							</div>
							
							<div className="space-y-1.5">
								<Label>Description</Label>
								<Textarea value={resource.description} onChange={e => updateResource(i, 'description', e.target.value)} rows={2} />
							</div>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<div className="space-y-1.5">
									<Label>Type (e.g. Guide)</Label>
									<Input value={resource.type} onChange={e => updateResource(i, 'type', e.target.value)} />
								</div>
								<div className="space-y-1.5">
									<Label>Format (e.g. PDF)</Label>
									<Input value={resource.format} onChange={e => updateResource(i, 'format', e.target.value)} />
								</div>
								<div className="space-y-1.5">
									<Label>Icon Name</Label>
									<select 
										className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
										value={resource.icon} 
										onChange={e => updateResource(i, 'icon', e.target.value)}
									>
										<option value="FileText">File Document</option>
										<option value="Download">Download</option>
										<option value="Video">Video</option>
									</select>
								</div>
								<div className="space-y-1.5">
									<Label>URL</Label>
									<Input value={resource.url} onChange={e => updateResource(i, 'url', e.target.value)} placeholder="/resources/link" />
								</div>
							</div>

							<div className="flex items-center gap-6 mt-2 pt-4 border-t">
								<div className="flex items-center gap-2">
									<Checkbox 
										id={`free-${i}`} 
										checked={resource.isFree} 
										onCheckedChange={(checked) => updateResource(i, 'isFree', !!checked)} 
									/>
									<Label htmlFor={`free-${i}`}>Is Free?</Label>
								</div>
								
								{!resource.isFree && (
									<div className="flex items-center gap-2 flex-1 max-w-[200px]">
										<Label className="shrink-0">Price:</Label>
										<Input value={resource.price || ""} onChange={e => updateResource(i, 'price', e.target.value)} placeholder="e.g. $49" />
									</div>
								)}
							</div>
						</div>
					</div>
				))}

				<Button onClick={handleSave} disabled={isLoading} className="mt-4">
					{isLoading ? "Saving..." : "Save Resources List"}
				</Button>
			</div>
		</div>
	);
}
