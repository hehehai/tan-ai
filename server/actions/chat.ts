import { createServerFn } from "@tanstack/start";
import { setResponseStatus } from "@tanstack/start/server";
import { z } from "zod";
import type { Chat } from "~/lib/db/schema";
import { authMiddleware } from "~/lib/middleware/auth-guard";
import {
	getChatById,
	getReservationById,
	updateReservation,
} from "../function/chat";

// 查询聊天信息
export const queryGetChatById = createServerFn({ method: "GET" })
	.validator(z.object({ id: z.string() }))
	.handler(async ({ data }) => {
		let res: Chat | null = null;
		try {
			res = await getChatById({ id: data.id });
		} catch {
			res = null;
		}
		return {
			id: data.id,
			chat: res,
		};
	});

// 查询预定信息
export const queryGetReservationById = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.validator(z.object({ id: z.string() }))
	.handler(async ({ data }) => {
		return getReservationById({ id: data.id });
	});

// 更新预定信息
export const actionUpdateReservation = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(z.object({ id: z.string(), magicWord: z.string() }))
	.handler(async ({ data, context }) => {
		const reservation = await getReservationById({ id: data.id });
		if (!reservation) {
			setResponseStatus(404);
			throw new Error("Reservation not found");
		}

		if (reservation.userId !== context.user.id) {
			setResponseStatus(403);
			throw new Error("Unauthorized");
		}

		await updateReservation({
			id: data.id,
			hasCompletedPayment: data.magicWord === "magic",
		});

		return null;
	});
