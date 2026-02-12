import { hash, compare } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.AUTH_SECRET || "your-secret-key-change-in-prod";
const key = new TextEncoder().encode(SECRET_KEY);

export async function hashPassword(password: string): Promise<string> {
	return await hash(password, 10);
}

export async function verifyPassword(
	plain: string,
	hashed: string,
): Promise<boolean> {
	return await compare(plain, hashed);
}

export async function createSession(payload: any) {
	const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
	const session = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("24h")
		.sign(key);

	const cookieStore = await cookies();
	cookieStore.set("session", session, {
		expires,
		httpOnly: true,
		secure:
			process.env.NODE_ENV === "production" &&
			process.env.USE_SECURE_COOKIES === "true",
		sameSite: "lax",
		path: "/",
	});
}

export async function getSession() {
	const cookieStore = await cookies();
	const session = cookieStore.get("session")?.value;
	if (!session) return null;

	try {
		const { payload } = await jwtVerify(session, key, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		return null;
	}
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
