"use client";

import { useActionState, useEffect } from "react";
import {
	createAdminUser,
	deleteAdminUser,
	updatePassword,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export function ChangePasswordForm() {
	const [state, action, isPending] = useActionState(updatePassword, null);

	useEffect(() => {
		if (state?.error) toast.error(state.error);
		if (state?.success) toast.success(state.success);
	}, [state]);

	return (
		<form action={action} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="currentPassword">Current Password</Label>
				<Input
					id="currentPassword"
					name="currentPassword"
					type="password"
					required
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="newPassword">New Password</Label>
				<Input
					id="newPassword"
					name="newPassword"
					type="password"
					required
					minLength={6}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="confirmPassword">Confirm New Password</Label>
				<Input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					required
					minLength={6}
				/>
			</div>
			<div className="pt-4">
				<Button type="submit" disabled={isPending}>
					{isPending ? "Updating..." : "Update Password"}
				</Button>
			</div>
		</form>
	);
}

export function CreateUserForm() {
	const [state, action, isPending] = useActionState(createAdminUser, null);

	useEffect(() => {
		if (state?.error) toast.error(state.error);
		if (state?.success) toast.success(state.success);
	}, [state]);

	return (
		<form action={action} className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" required />
				</div>
				<div className="space-y-2">
					<Label htmlFor="role">Role</Label>
					<select
						name="role"
						id="role"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<option value="editor">Editor</option>
						<option value="super_admin">Super Admin</option>
					</select>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input id="email" name="email" type="email" required />
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Initial Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					required
					minLength={6}
				/>
			</div>
			<div className="pt-4">
				<Button type="submit" disabled={isPending}>
					{isPending ? "Creating..." : "Create Account"}
				</Button>
			</div>
		</form>
	);
}

export function DeleteUserButton({ id }: { id: string }) {
	// deleteAdminUser doesn't use prevState, so we wrap it or just use simple action
	// But wait, deleteAdminUser returns {error} or {success}.
	// To handle toast response from server action in a client component:
	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this user?")) return;

		const res = await deleteAdminUser(id);
		if (res.error) toast.error(res.error);
		else toast.success("User deleted");
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className="text-destructive hover:bg-destructive/10"
			onClick={handleDelete}
			type="button"
		>
			<Trash2 className="h-4 w-4" />
		</Button>
	);
}
