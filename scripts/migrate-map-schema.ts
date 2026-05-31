import fs from "fs";
import path from "path";

// Manually load .env file to ensure we connect to remote DB if specified
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf-8");
    for (const line of envFile.split("\n")) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1];
            let value = match[2] || "";
            // Remove surrounding quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1);
            } else if (value.startsWith("'") && value.endsWith("'")) {
                value = value.substring(1, value.length - 1);
            }
            process.env[key] = value.trim();
        }
    }
}

async function main() {
    console.log("Database URL for migration:", process.env.TURSO_DATABASE_URL || "Local (hcsl.db)");
    
    // Dynamic import to avoid ES hoisting
    const { ensureDbInitialized } = await import("../lib/db");
    
    console.log("Re-initializing database schema to create map tables...");
    await ensureDbInitialized();
    console.log("Schema initialized successfully.");
    console.log("Migration complete.");
}

main().catch(console.error);
