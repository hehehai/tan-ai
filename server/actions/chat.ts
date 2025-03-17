import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Chat } from "~/lib/db/schema";
import { authMiddleware } from "~/lib/middleware/auth-guard";
import {
  createChat,
  getChatById,
  getChatsByUserId,
  getMessagesByChatId,
} from "../function/chat";

// 查询聊天
export const queryGetChatById = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    let res: Chat | null = null;
    try {
      res = await getChatById({ id: data.id });
    } catch {
      res = null;
    }
    return res;
  });

// 创建聊天
export const actionCreateChat = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ title: z.string(), id: z.string() }))
  .handler(async ({ data, context }) => {
    return await createChat({
      id: data.id,
      userId: context.user.id,
      title: data.title,
    });
  });

// 查询聊天消息
export const queryGetChatMessagesById = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    try {
      const messages = await getMessagesByChatId({ id: data.id });
      return messages.map((msg) => ({
        ...msg,
        content: msg.content || "",
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  });

export const actionGetUserChats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    try {
      return getChatsByUserId({ id: context.user.id });
    } catch (error) {
      console.error(error);
      return [];
    }
  });
