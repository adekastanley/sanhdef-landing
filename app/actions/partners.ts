"use server";

import db, { ensureDbInitialized } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getPartners() {
	await ensureDbInitialized();
	try {
		const result = await db.execute("SELECT * FROM partners ORDER BY created_at DESC");
		return result.rows;
	} catch (error) {
		console.error("Failed to fetch partners:", error);
		return [];
	}
}

export async function addPartner(name: string, logoUrl: string) {
	await ensureDbInitialized();
	try {
		const id = crypto.randomUUID();
		await db.execute({
			sql: "INSERT INTO partners (id, name, logo_url) VALUES (?, ?, ?)",
			args: [id, name, logoUrl],
		});
		revalidatePath("/");
		revalidatePath("/admin/dashboard/landing");
		return { success: true };
	} catch (error) {
		console.error("Failed to add partner:", error);
		return { success: false, error: "Failed to add partner" };
	}
}

export async function deletePartner(id: string) {
	await ensureDbInitialized();
	try {
		await db.execute({
			sql: "DELETE FROM partners WHERE id = ?",
			args: [id],
		});
		revalidatePath("/");
		revalidatePath("/admin/dashboard/landing");
		return { success: true };
	} catch (error) {
		console.error("Failed to delete partner:", error);
		return { success: false, error: "Failed to delete partner" };
	}
}
