import { createAPIFileRoute } from "@tanstack/react-start/api";
import { readBody, setResponseStatus } from "@tanstack/react-start/server";
import { z } from "zod";
import { createToolCallingStreamResponse } from "~/lib/ai/streaming/create-tool-calling-stream";
import { generateTitleFromUserMessage } from "~/lib/ai/tools/helper";
import { auth } from "~/lib/auth";
import { getMostRecentUserMessage } from "~/lib/utils";
import {
  createChat,
  deleteChatById,
  getChatById,
  saveMessages,
} from "~/server/function/chat";
import { validationAiChatGenerateSchema } from "~/server/validations/chat";

export const APIRoute = createAPIFileRoute("/api/chat")({
  POST: async ({ request }) => {
    try {
      const headers = request.headers;

      const session = await auth.api.getSession({
        headers: headers,
      });

      if (!session) {
        setResponseStatus(401);
        throw new Error("Unauthorized");
      }

      const body = await readBody();

      const validation = validationAiChatGenerateSchema.safeParse(body);
      if (!validation.success) {
        setResponseStatus(400);
        throw new Error("Invalid request");
      }

      const { id, messages } = validation.data;

      const userMessage = getMostRecentUserMessage(messages);

      if (!userMessage) {
        return new Response("No user message found", { status: 400 });
      }

      const chat = await getChatById({ id });

      if (!chat) {
        const title = await generateTitleFromUserMessage({
          message: messages[0],
        });
        await createChat({ id, userId: session.user.id, title });
      }

      await saveMessages({
        messages: [{ ...userMessage, createdAt: new Date(), chatId: id }],
      });

      return createToolCallingStreamResponse(
        {
          messages,
          chatId: id,
        },
        session.user.id,
      );
    } catch (error) {
      console.error(error, "Failed to save chat");
      setResponseStatus(500);
      throw new Error("Failed to save chat");
    }
  },
  DELETE: async ({ request, params }) => {
    const headers = request.headers;

    const session = await auth.api.getSession({
      headers,
    });

    if (!session) {
      setResponseStatus(401);
      throw new Error("Unauthorized");
    }

    const validation = z.object({ id: z.string() }).safeParse(params);
    if (!validation.success) {
      setResponseStatus(400);
      throw new Error("Invalid request");
    }

    const { id } = validation.data;

    const chat = await getChatById({ id });

    if (!chat) {
      setResponseStatus(404);
      throw new Error("Chat not found");
    }

    if (chat.userId !== session.user.id) {
      setResponseStatus(403);
      throw new Error("Forbidden");
    }

    await deleteChatById({ id });

    return Response.json({
      message: "Chat deleted successfully",
    });
  },
});
