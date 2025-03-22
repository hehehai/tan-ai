import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const envSchema = {
  server: {
    LOCAL_PROXY: z.string().url().optional(),
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
    DEEPSEEK_API_KEY: z.string().min(1),
    CLOUD_FLARE_R2_ACCOUNT_ID: z.string().min(1),
    CLOUD_FLARE_S3_UPLOAD_ID: z.string().min(1),
    CLOUD_FLARE_S3_UPLOAD_SECRET: z.string().min(1),
    CLOUD_FLARE_S3_UPLOAD_BUCKET: z.string().min(1),
    BETTER_AUTH_GITHUB_CLIENT_ID: z.string().min(1),
    BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
    BETTER_AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
    TAVILY_API_KEY: z.string().min(1),
  },

  // NOTE: only use env validation! can't use client (please use import.meta.env for client)
  clientPrefix: "VITE_",

  client: {},

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
} as const;

export const env = createEnv(envSchema);

export type ClientEnv = typeof envSchema.client;
