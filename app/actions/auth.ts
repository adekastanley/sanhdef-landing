"use server";

import db from "@/lib/db";
import {
	hashPassword,
	verifyPassword,
	createSession,
	deleteSession,
	getSession,
} from "@/lib/auth";
import { ensureDbInitialized } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
	await ensureDbInitialized();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Email and password are required" };
	}

	try {
		const result = await db.execute({
			sql: "SELECT * FROM admin_users WHERE email = ? LIMIT 1",
			args: [email],
		});

		const user = result.rows[0];

		if (!user) {
			return { error: "Invalid credentials" };
		}

		const isValid = await verifyPassword(password, user.password as string);

		if (!isValid) {
			return { error: "Invalid credentials" };
		}

		await createSession({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.error("Login error:", error);
		return { error: "Authentication failed" };
	}

	redirect("/admin/dashboard");
}

export async function logout() {
	await deleteSession();
	redirect("/admin/login");
}

// User Management Actions

export async function getAdminUsers() {
	const session = await getSession();
	if (!session || session.role !== "super_admin") {
		return []; // Or throw error
	}

	const result = await db.execute(
		"SELECT id, name, email, role, created_at FROM admin_users ORDER BY created_at DESC",
	);
	return result.rows;
}

export async function createAdminUser(prevState: any, formData: FormData) {
	const session = await getSession();
	if (!session || session.role !== "super_admin") {
		return { error: "Unauthorized" };
	}

	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const role = formData.get("role") as string;

	if (!name || !email || !password || !role) {
		return { error: "All fields are required" };
	}

	try {
		const hashedPassword = await hashPassword(password);
		await db.execute({
			sql: "INSERT INTO admin_users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)",
			args: [crypto.randomUUID(), name, email, hashedPassword, role],
		});

		revalidatePath("/admin/dashboard/account");
		return { success: "User created successfully" };
	} catch (error: any) {
		if (error.message.includes("UNIQUE constraint failed")) {
			return { error: "Email already exists" };
		}
		return { error: "Failed to create user" };
	}
}

export async function deleteAdminUser(id: string) {
	const session = await getSession();
	if (!session || session.role !== "super_admin") {
		return { error: "Unauthorized" };
	}

	// Prevent deleting self
	if (id === session.id) {
		return { error: "Cannot delete your own account" };
	}

	try {
		await db.execute({
			sql: "DELETE FROM admin_users WHERE id = ?",
			args: [id],
		});
		revalidatePath("/admin/dashboard/account");
		return { success: true };
	} catch (error) {
		return { error: "Failed to delete user" };
	}
}

export async function updatePassword(prevState: any, formData: FormData) {
	const session = await getSession();
	if (!session) {
		return { error: "Unauthorized" };
	}

	const currentPassword = formData.get("currentPassword") as string;
	const newPassword = formData.get("newPassword") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!currentPassword || !newPassword || !confirmPassword) {
		return { error: "All fields are required" };
	}

	if (newPassword !== confirmPassword) {
		return { error: "New passwords do not match" };
	}

	if (newPassword.length < 6) {
		return { error: "Password must be at least 6 characters" };
	}

	try {
		// Verify current password
		const result = await db.execute({
			sql: "SELECT password FROM admin_users WHERE id = ? LIMIT 1",
			args: [session.id as string],
		});

		const user = result.rows[0];
		if (!user) return { error: "User not found" };

		const isValid = await verifyPassword(
			currentPassword,
			user.password as string,
		);
		if (!isValid) {
			return { error: "Incorrect current password" };
		}

		// Update password
		const hashedPassword = await hashPassword(newPassword);
		await db.execute({
			sql: "UPDATE admin_users SET password = ? WHERE id = ?",
			args: [hashedPassword, session.id as string],
		});

		return { success: "Password updated successfully" };
	} catch (error) {
		return { error: "Failed to update password" };
	}
}
