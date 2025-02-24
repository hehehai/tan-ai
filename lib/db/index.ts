import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "../utils/env.server";
import * as schema from "./schema";

const driver = postgres(env.DATABASE_URL);
export const db = drizzle({ client: driver, schema });
