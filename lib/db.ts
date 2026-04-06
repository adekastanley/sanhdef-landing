import { createClient } from "@libsql/client";

const db = createClient({
	url: process.env.TURSO_DATABASE_URL || "file:hcsl.db",
	authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize database schema
const initDb = async () => {
	await db.execute(`
    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT NOT NULL,
      image_url TEXT,
      category TEXT DEFAULT 'team',
      linkedin TEXT,
      twitter TEXT,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	await db.execute(`
    CREATE TABLE IF NOT EXISTS job_listings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT DEFAULT 'open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	await db.execute(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        applicant_name TEXT NOT NULL,
        email TEXT NOT NULL,
        resume_url TEXT NOT NULL,
        role_interest TEXT,
        message TEXT,
        status TEXT CHECK(status IN ('pending', 'review', 'accepted', 'rejected', 'reserved')) DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES job_listings(id)
      )
    `);

	// Projects & Success Stories
	await db.execute(`
      CREATE TABLE IF NOT EXISTS content_items (
        id TEXT PRIMARY KEY,
        type TEXT CHECK(type IN ('project', 'story', 'event')) NOT NULL,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        summary TEXT,
        content TEXT,
        image_url TEXT,
        published_date TEXT,
        category TEXT,
        status TEXT DEFAULT 'open',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

	console.log("Database initialized successfully");

	await db.execute(`
      CREATE TABLE IF NOT EXISTS event_registrations (
        id TEXT PRIMARY KEY,
        event_id TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES content_items(id)
      )
    `);
	// Migrations for existing databases
	try {
		await db.execute("ALTER TABLE team_members ADD COLUMN image_url TEXT");
	} catch (e) {
		// Column likely exists
	}
	try {
		await db.execute(
			"ALTER TABLE team_members ADD COLUMN category TEXT DEFAULT 'team'",
		);
	} catch (e) {
		// Column likely exists
	}
	try {
		await db.execute("ALTER TABLE team_members ADD COLUMN linkedin TEXT");
	} catch (e) {
		// Column likely exists
	}
	try {
		await db.execute("ALTER TABLE team_members ADD COLUMN twitter TEXT");
	} catch (e) {
		// Column likely exists
	}
	try {
		await db.execute("ALTER TABLE team_members ADD COLUMN email TEXT");
	} catch (e) {
		// Column likely exists
	}

	// Migrations for content_items
	try {
		await db.execute("ALTER TABLE content_items ADD COLUMN category TEXT");
	} catch (e) {
		// Column likely exists
	}
	try {
		await db.execute(
			"ALTER TABLE content_items ADD COLUMN status TEXT DEFAULT 'open'",
		);
	} catch (e) {
		// Column likely exists
	}
	// Just in case published_date was added later in some versions
	try {
		await db.execute(
			"ALTER TABLE content_items ADD COLUMN published_date TEXT",
		);
	} catch (e) {
		// Column likely exists
	}
	// Migration for role_interest in job_applications
	try {
		await db.execute(
			"ALTER TABLE job_applications ADD COLUMN role_interest TEXT",
		);
	} catch (e) {
		// Column likely exists
	}

	// Migration for message in job_applications
	try {
		await db.execute("ALTER TABLE job_applications ADD COLUMN message TEXT");
	} catch (e) {
		// Column likely exists
	}
	// Admin Auth
	await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('super_admin', 'editor')) DEFAULT 'editor',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Seed default super admin if no users exist
	const result = await db.execute("SELECT COUNT(*) as count FROM admin_users");
	// @ts-ignore
	const count = result.rows[0].count;

	if (count === 0) {
		console.log("Seeding default super admin...");
		const { hash } = await import("bcryptjs");
		const hashedPassword = await hash("password123", 10);

		await db.execute({
			sql: "INSERT INTO admin_users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)",
			args: [
				crypto.randomUUID(),
				"Super Admin",
				"admin@sanhdef.org",
				hashedPassword,
				"super_admin",
			],
		});
		console.log("Default super admin created.");
	}

	// Partners (Logo Cloud)
	await db.execute(`
    CREATE TABLE IF NOT EXISTS partners (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo_url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Site Content (Landing Page Sections, etc.)
	await db.execute(`
    CREATE TABLE IF NOT EXISTS site_content (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

	console.log("Database initialized successfully");
};

let initPromise: Promise<void> | null = null;
export const ensureDbInitialized = () => {
	if (!initPromise) initPromise = initDb();
	return initPromise;
};

export default db;
