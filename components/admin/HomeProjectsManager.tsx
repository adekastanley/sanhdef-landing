"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";
import { getItems, ContentItem } from "@/app/actions/content";
import { Checkbox } from "@/components/ui/checkbox";

export function HomeProjectsManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [projects, setProjects] = useState<ContentItem[]>([]);
	const [data, setData] = useState({
		title: "Recent Projects",
		subtext: "Explore our latest initiatives creating lasting change.",
		selectedProjectIds: [] as string[],
	});

	useEffect(() => {
		async function loadData() {
			try {
				const content = await getContent("home_projects");
				if (content) {
					setData({
						title: content.title || "Recent Projects",
						subtext: content.subtext || "Explore our latest initiatives creating lasting change.",
						selectedProjectIds: content.selectedProjectIds || [],
					});
				}
				const allProjects = await getItems("project", 50, 1, "all");
				setProjects(allProjects);
			} catch (err) {
				console.error("Failed to load home projects data", err);
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const res = await updateContent("home_projects", data);
			if (res.success) {
				toast.success("Home Projects section updated successfully.");
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to update Home Projects.");
		} finally {
			setIsLoading(false);
		}
	};

	const toggleProject = (projectId: string) => {
		const isSelected = data.selectedProjectIds.includes(projectId);
		if (isSelected) {
			setData({
				...data,
				selectedProjectIds: data.selectedProjectIds.filter(id => id !== projectId)
			});
		} else {
			if (data.selectedProjectIds.length >= 3) {
				toast.error("You can only select up to 3 projects.");
				return;
			}
			setData({
				...data,
				selectedProjectIds: [...data.selectedProjectIds, projectId]
			});
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Home Projects Section</h2>
				<p className="text-sm text-muted-foreground">
					Manage the title, subtext, and selected projects for the homepage.
					If no projects are selected, the latest 3 will be shown automatically.
				</p>
			</div>
			
			<div className="grid gap-6">
				<div className="space-y-2">
					<Label>Section Title</Label>
					<Input 
						value={data.title} 
						onChange={e => setData({...data, title: e.target.value})} 
						placeholder="e.g. Recent Projects" 
					/>
				</div>

				<div className="space-y-2">
					<Label>Section Subtext</Label>
					<Textarea 
						value={data.subtext} 
						onChange={e => setData({...data, subtext: e.target.value})} 
						rows={2} 
						placeholder="e.g. Explore our latest initiatives..." 
					/>
				</div>

				<div className="space-y-4 pt-4 border-t">
					<div className="flex justify-between items-center">
						<Label className="text-lg font-semibold">Select Specific Projects (Optional)</Label>
						<span className="text-sm text-muted-foreground">
							{data.selectedProjectIds.length} / 3 selected
						</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto p-4 border rounded-lg bg-muted/10">
						{projects.length === 0 ? (
							<div className="col-span-full text-center text-muted-foreground">
								No projects found.
							</div>
						) : (
							projects.map(project => (
								<div key={project.id} className="flex items-start space-x-3 bg-card p-3 rounded shadow-sm border">
									<Checkbox 
										id={`proj-${project.id}`}
										checked={data.selectedProjectIds.includes(project.id)}
										onCheckedChange={() => toggleProject(project.id)}
										className="mt-1"
									/>
									<div className="grid gap-1.5 leading-none">
										<label
											htmlFor={`proj-${project.id}`}
											className="text-sm font-medium leading-tight cursor-pointer"
										>
											{project.title}
										</label>
										<p className="text-xs text-muted-foreground line-clamp-1">
											{project.summary || "No summary available"}
										</p>
									</div>
								</div>
							))
						)}
					</div>
					{data.selectedProjectIds.length > 0 && (
						<Button variant="outline" size="sm" onClick={() => setData({...data, selectedProjectIds: []})}>
							Clear Selection (Default to Latest 3)
						</Button>
					)}
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="w-full mt-4">
					{isLoading ? "Saving..." : "Save Home Projects"}
				</Button>
			</div>
		</div>
	);
}
