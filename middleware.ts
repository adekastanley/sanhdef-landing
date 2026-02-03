import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.AUTH_SECRET || "your-secret-key-change-in-prod";
const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request: NextRequest) {
	// 1. Check if route is protected
	if (request.nextUrl.pathname.startsWith("/admin")) {
		// Allow access to login page
		if (request.nextUrl.pathname === "/admin/login") {
			return NextResponse.next();
		}

		// 2. Verify Session
		const session = request.cookies.get("session")?.value;

		if (!session) {
			return NextResponse.redirect(new URL("/admin/login", request.url));
		}

		try {
			await jwtVerify(session, key, { algorithms: ["HS256"] });
			return NextResponse.next();
		} catch (error) {
			// Invalid session
			const response = NextResponse.redirect(
				new URL("/admin/login", request.url),
			);
			response.cookies.delete("session");
			return response;
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
