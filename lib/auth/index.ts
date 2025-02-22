import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db";
import { env } from "../utils/env";

export const auth = betterAuth({
	baseURL: env.VITE_BASE_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
	}),

	// https://www.better-auth.com/docs/concepts/session-management#session-caching
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},

	// https://www.better-auth.com/docs/authentication/email-password
	emailAndPassword: {
		requireEmailVerification: false,
		enabled: true,
	},
});
