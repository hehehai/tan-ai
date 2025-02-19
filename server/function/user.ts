import { eq } from "drizzle-orm";
import { db } from "../../lib/db";
import { type User, user } from "../../lib/db/schema";

export async function getUser(email: string): Promise<Array<User>> {
	try {
		return await db.select().from(user).where(eq(user.email, email));
	} catch (error) {
		console.error("Failed to get user from database");
		throw error;
	}
}
