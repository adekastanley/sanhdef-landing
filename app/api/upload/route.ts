import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const filename = searchParams.get("filename") || "file.bin";
		const folder = searchParams.get("folder") || "uploads"; // Default folder if none provided

		if (!request.body) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// Convert stream to buffer
		const reader = request.body.getReader();
		const chunks = [];
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			chunks.push(value);
		}
		const buffer = Buffer.concat(chunks);

		// Define upload directory: public/siteimages/[folder]
		// Using process.cwd() assumes the server process runs at project root
		const uploadDir = path.join(process.cwd(), "public", "siteimages", folder);

		// Ensure directory exists
		await mkdir(uploadDir, { recursive: true });

		// Unique filename to avoid collisions (optional but recommended)
		// Keeping original filename for simplicity as per user request context,
		// but typically we'd strictly sanitize or prepend timestamp.
		// Let's prepend a timestamp to be safe.
		const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
		const filePath = path.join(uploadDir, uniqueFilename);

		// Write file
		await writeFile(filePath, buffer);

		// Return public URL
		const uniqueUrl = `/siteimages/${folder}/${uniqueFilename}`;

		return NextResponse.json({
			url: uniqueUrl,
			pathname: uniqueUrl,
			contentType: "image/jpeg", // approximate or derived
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: `Upload failed: ${(error as Error).message}` },
			{ status: 500 },
		);
	}
}
