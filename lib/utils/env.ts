import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		LOCAL_PROXY: z.string().url().optional(),
		DATABASE_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string().min(1),
		GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
		CLOUD_FLARE_R2_ACCOUNT_ID: z.string().min(1),
		CLOUD_FLARE_S3_UPLOAD_ID: z.string().min(1),
		CLOUD_FLARE_S3_UPLOAD_SECRET: z.string().min(1),
		CLOUD_FLARE_S3_UPLOAD_BUCKET: z.string().min(1),
	},

	/**
	 * The prefix that client-side variables must have. This is enforced both at
	 * a type-level and at runtime.
	 */
	clientPrefix: "VITE_",

	client: {
		VITE_BASE_URL: z.string().url(),
		VITE_CLOUD_FLARE_R2_URL: z.string().url(),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: process.env,

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN=` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
});
