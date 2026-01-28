
const { createClient } = require("@libsql/client");
// require("dotenv").config({ path: ".env.local" }); // Load env if available

const db = createClient({
    url: "file:hcsl.db", // Force local file for this migration since we are local
    // authToken: process.env.TURSO_AUTH_TOKEN,
});

async function migrate() {
    console.log("Starting migration: 'team' -> 'board'...");
    try {
        await db.execute("UPDATE team_members SET category = 'board' WHERE category = 'team'");
        console.log("Migration successful: Updated records.");
    } catch (e) {
        console.error("Migration failed:", e);
    }
}

migrate();
