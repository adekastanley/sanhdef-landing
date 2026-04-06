"use server";

import db, { ensureDbInitialized } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getContent(id: string) {
	await ensureDbInitialized();
	try {
		const result = await db.execute({
			sql: "SELECT content FROM site_content WHERE id = ?",
			args: [id],
		});
		if (result.rows.length > 0) {
			return JSON.parse(result.rows[0].content as string);
		}
		return null;
	} catch (error) {
		console.error(`Failed to fetch content for ${id}:`, error);
		return null;
	}
}

export async function updateContent(id: string, data: any) {
	await ensureDbInitialized();
	try {
		const contentValue = JSON.stringify(data);
		await db.execute({
			sql: "INSERT INTO site_content (id, content, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at",
			args: [id, contentValue],
		});
		revalidatePath("/");
		revalidatePath("/admin/dashboard/landing");
		return { success: true };
	} catch (error) {
		console.error(`Failed to update content for ${id}:`, error);
		return { success: false, error: "Failed to update content" };
	}
}
