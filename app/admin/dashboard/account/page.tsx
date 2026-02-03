import { getSession } from "@/lib/auth";
import { getAdminUsers } from "@/app/actions/auth";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import {
	ChangePasswordForm,
	CreateUserForm,
	DeleteUserButton,
} from "@/components/admin/account-forms";

export default async function AccountPage() {
	const session = await getSession();
	if (!session) {
		redirect("/admin/login");
	}

	const isSuperAdmin = session.role === "super_admin";
	const users = isSuperAdmin ? await getAdminUsers() : [];

	return (
		<div className="space-y-8 p-8">
			<h1 className="text-3xl font-bold">Manage Account</h1>

			<div className="grid gap-8 md:grid-cols-2">
				{/* Change Password Section */}
				<Card>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<CardDescription>
							Update your password. Make sure it's secure.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChangePasswordForm />
					</CardContent>
				</Card>

				{/* User Management Section (Super Admin Only) */}
				{isSuperAdmin && (
					<Card>
						<CardHeader>
							<CardTitle>Add New Admin</CardTitle>
							<CardDescription>Create a new sub-account.</CardDescription>
						</CardHeader>
						<CardContent>
							<CreateUserForm />
						</CardContent>
					</Card>
				)}
			</div>

			{/* Users List (Super Admin Only) */}
			{isSuperAdmin && (
				<Card>
					<CardHeader>
						<CardTitle>Admin Users</CardTitle>
						<CardDescription>
							List of all users with access to the dashboard.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Created At</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user: any) => (
									<TableRow key={user.id}>
										<TableCell className="font-medium">{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>
											<Badge
												variant={
													user.role === "super_admin" ? "default" : "secondary"
												}
											>
												{user.role}
											</Badge>
										</TableCell>
										<TableCell>
											{new Date(user.created_at).toLocaleDateString()}
										</TableCell>
										<TableCell className="text-right">
											{user.id !== session.id && (
												<DeleteUserButton id={user.id} />
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
