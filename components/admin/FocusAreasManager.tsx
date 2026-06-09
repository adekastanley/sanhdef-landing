"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getContent, updateContent } from "@/app/actions/landing";
import { Trash2, Plus, GripVertical } from "lucide-react";

export interface FocusArea {
	id: string;
	tag: string;
	title: string;
	shortDesc: string;
	fullText: string;
	imageUrl: string;
}

export function FocusAreasManager() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState({
		title: "Create Lasting Change",
		items: [] as FocusArea[],
	});

	// For file uploads
	const fileRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

	useEffect(() => {
		async function loadData() {
			const content = await getContent("focus_areas");
			if (content && content.items) {
				setData(content);
			} else if (content) {
				// Migration from old to new if needed
				setData({
					title: content.title || "Create Lasting Change",
					items: content.items || [],
				});
			}
		}
		loadData();
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		try {
			// Process image uploads
			const newItems = [...data.items];
			for (let i = 0; i < newItems.length; i++) {
				const input = fileRefs.current[newItems[i].id];
				if (input && input.files && input.files.length > 0) {
					const file = input.files[0];
					const formData = new FormData();
					formData.append("file", file);
					
					const response = await fetch(`/api/upload?filename=${file.name}&folder=landing`, { 
						method: "POST", 
						body: file 
					});
					const result = await response.json();
					if (result.error) throw new Error(result.error);
					newItems[i].imageUrl = result.url;
				}
			}

			const finalData = { ...data, items: newItems };
			const res = await updateContent("focus_areas", finalData);
			if (res.success) {
				toast.success("Focus Areas updated successfully.");
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

	const addItem = () => {
		const newItem: FocusArea = {
			id: Math.random().toString(36).substr(2, 9),
			tag: "URGENT",
			title: "New Focus Area",
			shortDesc: "",
			fullText: "",
			imageUrl: "",
		};
		setData({ ...data, items: [...data.items, newItem] });
	};

	const removeItem = (index: number) => {
		setData({ ...data, items: data.items.filter((_, i) => i !== index) });
	};

	const updateItem = (index: number, key: keyof FocusArea, value: string) => {
		const newItems = [...data.items];
		newItems[index] = { ...newItems[index], [key]: value };
		setData({ ...data, items: newItems });
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold">Focus Areas</h2>
				<p className="text-sm text-muted-foreground">Manage the alternating Focus Areas list. The first 4 items appear on the homepage.</p>
			</div>
			
			<div className="grid gap-6">
				<div className="space-y-2">
					<Label>Section Title</Label>
					<Input value={data.title} onChange={e => setData({...data, title: e.target.value})} placeholder="e.g. Create Lasting Change" />
				</div>

				<div className="space-y-4 pt-4 border-t">
					<div className="flex justify-between items-center">
						<Label className="text-lg font-semibold">Focus Area Items</Label>
						<Button variant="outline" size="sm" onClick={addItem}><Plus className="w-4 h-4 mr-1"/> Add Item</Button>
					</div>

					<div className="space-y-6">
						{data.items.map((item, i) => (
							<div key={i} className="relative p-6 border rounded-lg bg-muted/10 space-y-4">
								<Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeItem(i)}>
									<Trash2 className="w-5 h-5" />
								</Button>
								<h3 className="font-semibold text-lg border-b pb-2">Item {i + 1}</h3>
								
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Tag (Optional)</Label>
										<Input value={item.tag} onChange={e => updateItem(i, 'tag', e.target.value)} placeholder="e.g. URGENT—NIGERIA" />
									</div>
									<div className="space-y-2">
										<Label>Title</Label>
										<Input value={item.title} onChange={e => updateItem(i, 'title', e.target.value)} placeholder="e.g. Health Programmes" />
									</div>
								</div>

								<div className="space-y-2">
									<Label>Short Description</Label>
									<Textarea value={item.shortDesc} onChange={e => updateItem(i, 'shortDesc', e.target.value)} rows={2} placeholder="Appears on the homepage block." />
								</div>

								<div className="space-y-2">
									<Label>Full Text</Label>
									<Textarea value={item.fullText} onChange={e => updateItem(i, 'fullText', e.target.value)} rows={5} placeholder="Appears on the dedicated 'Read More' page." />
								</div>

								<div className="space-y-2">
									<Label>Image</Label>
									<div className="flex gap-4 items-center">
										{item.imageUrl && <img src={item.imageUrl} alt="Preview" className="h-20 w-32 object-cover rounded" />}
										<Input type="file" accept="image/*" onChange={(e) => {
											// Let it be picked up on save
										}} ref={el => {
                                            fileRefs.current[item.id] = el;
                                        }} />
									</div>
								</div>
							</div>
						))}
						{data.items.length === 0 && (
							<div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
								No focus areas defined. Click "Add Item" to start.
							</div>
						)}
					</div>
				</div>

				<Button onClick={handleSave} disabled={isLoading} className="w-full mt-4">
					{isLoading ? "Saving..." : "Save Focus Areas"}
				</Button>
			</div>
		</div>
	);
}
