import type { Message } from "ai";
import { desc, eq } from "drizzle-orm";
import { db } from "../../lib/db";
import { chat, reservation } from "../../lib/db/schema";

export async function saveChat({
	id,
	messages,
	userId,
}: {
	id: string;
	messages: Message[];
	userId: string;
}) {
	try {
		const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

		if (selectedChats.length > 0) {
			return await db
				.update(chat)
				.set({
					messages: messages,
				})
				.where(eq(chat.id, id));
		}

		return await db.insert(chat).values({
			id,
			createdAt: new Date(),
			messages: messages,
			userId,
		});
	} catch (error) {
		console.error("Failed to save chat in database");
		throw error;
	}
}

export async function deleteChatById({ id }: { id: string }) {
	try {
		return await db.delete(chat).where(eq(chat.id, id));
	} catch (error) {
		console.error("Failed to delete chat by id from database");
		throw error;
	}
}

export async function getChatsByUserId({ id }: { id: string }) {
	try {
		return await db
			.select()
			.from(chat)
			.where(eq(chat.userId, id))
			.orderBy(desc(chat.createdAt));
	} catch (error) {
		console.error("Failed to get chats by user from database");
		throw error;
	}
}

export async function getChatById({ id }: { id: string }) {
	try {
		const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
		return selectedChat;
	} catch (error) {
		console.error("Failed to get chat by id from database");
		throw error;
	}
}

export async function createReservation({
	id,
	userId,
	details,
}: {
	id: string;
	userId: string;
	details: Record<string, unknown>;
}) {
	return await db.insert(reservation).values({
		id,
		createdAt: new Date(),
		userId,
		hasCompletedPayment: false,
		details: details,
	});
}

export async function getReservationById({ id }: { id: string }) {
	const [selectedReservation] = await db
		.select()
		.from(reservation)
		.where(eq(reservation.id, id));

	return selectedReservation;
}

export async function updateReservation({
	id,
	hasCompletedPayment,
}: {
	id: string;
	hasCompletedPayment: boolean;
}) {
	return await db
		.update(reservation)
		.set({
			hasCompletedPayment,
		})
		.where(eq(reservation.id, id));
}
