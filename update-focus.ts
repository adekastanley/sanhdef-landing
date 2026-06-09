import db, { ensureDbInitialized } from "./lib/db";
import { getContent } from "./app/actions/landing";

async function main() {
    await ensureDbInitialized();
    const data = await getContent("focus_areas");
    if (data) {
        data.title = "Strategic Vision. Tangible Impact.";
        const contentStr = JSON.stringify(data);
        await db.execute({
            sql: "UPDATE site_content SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            args: [contentStr, "focus_areas"],
        });
        console.log("Updated focus areas title successfully");
    } else {
        console.log("No focus areas found");
    }
}

main().catch(console.error);
