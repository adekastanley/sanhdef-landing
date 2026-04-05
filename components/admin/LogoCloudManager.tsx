"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getPartners, addPartner, deletePartner } from "@/app/actions/partners";
import { toast } from "sonner";

export function LogoCloudManager() {
	const [partners, setPartners] = useState<any[]>([]);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({ name: "", logo_url: "" });
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		loadPartners();
	}, []);

	const loadPartners = async () => {
		const data = await getPartners();
		setPartners(data);
	};

	const resetForm = () => {
		setFormData({ name: "", logo_url: "" });
		if (inputFileRef.current) inputFileRef.current.value = "";
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			let logoUrl = formData.logo_url;

			if (inputFileRef.current?.files?.length) {
				const file = inputFileRef.current.files[0];
				const response = await fetch(
					`/api/upload?filename=${file.name}&folder=partners`,
					{
						method: "POST",
						body: file,
					},
				);
				const result = await response.json();
				if (result.error) throw new Error(result.error);
				logoUrl = result.url;
			}

			if (!logoUrl) {
				toast.error("Please upload a logo or provide a URL");
				setIsLoading(false);
				return;
			}

			const res = await addPartner(formData.name, logoUrl);
			if (res.success) {
				toast.success("Partner added successfully");
				setIsAddOpen(false);
				resetForm();
				loadPartners();
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to add partner");
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		setIsLoading(true);
		try {
			const res = await deletePartner(id);
			if (res.success) {
				toast.success("Partner deleted");
				setDeleteId(null);
				loadPartners();
			} else {
				throw new Error(res.error);
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to delete partner");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Logo Cloud</h2>
					<p className="text-muted-foreground">
						Manage the partner logos displayed on the landing page.
					</p>
				</div>
				<Button
					className="gap-2"
					onClick={() => {
						resetForm();
						setIsAddOpen(true);
					}}
				>
					<Plus className="h-4 w-4" /> Add Partner
				</Button>
			</div>

			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Logo</TableHead>
							<TableHead>Name</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{partners.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3} className="h-24 text-center">
									No partners found.
								</TableCell>
							</TableRow>
						) : (
							partners.map((partner) => (
								<TableRow key={partner.id}>
									<TableCell>
										<img
											src={partner.logo_url}
											alt={partner.name}
											className="h-10 w-auto object-contain dark:invert"
										/>
									</TableCell>
									<TableCell className="font-medium">{partner.name}</TableCell>
									<TableCell className="text-right">
										<Button
											variant="ghost"
											size="icon"
											className="text-destructive hover:bg-destructive/10"
											onClick={() => setDeleteId(partner.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Partner</DialogTitle>
						<DialogDescription>
							Upload a logo and provide a name for the partner.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={onSubmit}>
						<div className="grid gap-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="name">Partner Name</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									required
									placeholder="e.g. World Bank"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="logo">Logo Upload</Label>
								<Input
									id="logo"
									type="file"
									ref={inputFileRef}
									accept="image/*"
									required
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Adding..." : "Add Partner"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Partner</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this partner? This will remove it from the homepage logo cloud.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setDeleteId(null)}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => deleteId && handleDelete(deleteId)}
							disabled={isLoading}
						>
							{isLoading ? "Deleting..." : "Delete"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
