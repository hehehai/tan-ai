import type { Message } from "ai";
import type { InferSelectModel } from "drizzle-orm";
import {
	boolean,
	json,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const chat = pgTable("chat", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("created_at").notNull(),
	messages: json("messages").notNull().$type<any[]>(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
});

export type Chat = InferSelectModel<typeof chat>;

export const reservation = pgTable("reservation", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	createdAt: timestamp("created_at").notNull(),
	details: json("details").notNull().$type<Record<string, any>>(),
	hasCompletedPayment: boolean("has_completed_payment")
		.notNull()
		.default(false),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
});

export type Reservation = InferSelectModel<typeof reservation>;
