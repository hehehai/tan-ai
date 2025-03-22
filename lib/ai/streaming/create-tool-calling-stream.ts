import {
  type DataStreamWriter,
  convertToCoreMessages,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from "ai";
import { generateUUID, sanitizeResponseMessages } from "~/lib/utils";
import { getMaxAllowedTokens, truncateMessages } from "~/lib/utils/context-window";
import { saveMessages } from "~/server/function/chat";
import { SYSTEM_PROMPT, TOOLS_PROMPT } from "../constants/prompt";
import { deepseek } from "../model/deepseek";
import { retrieveTool } from "../tools/retrieve";
import { searchTool } from "../tools/search";
import type { BaseStreamConfig } from "../types";

export function createToolCallingStreamResponse(
  config: BaseStreamConfig,
  userId: string,
) {
  return createDataStreamResponse({
    execute: async (dataStream: DataStreamWriter) => {
      const { messages, chatId } = config;

      try {
        const coreMessages = convertToCoreMessages(messages);
        const truncatedMessages = truncateMessages(coreMessages, getMaxAllowedTokens());

        const result = streamText({
          model: deepseek("ep-20250216204606-mwbhg"),
          system: `${SYSTEM_PROMPT}\n\n${TOOLS_PROMPT}`,
          messages: truncatedMessages,
          maxSteps: 5,
          tools: {
            web_search: searchTool(dataStream),
            retrieve: retrieveTool,
          },
          experimental_activeTools: ["web_search", "retrieve"],
          experimental_generateMessageId: generateUUID,
          experimental_transform: smoothStream({
            chunking: "word",
            delayInMs: 15,
          }),
          onFinish: async (result) => {
            if (!userId) return;
            try {
              const sanitizeMessages = sanitizeResponseMessages(result.response.messages);
              await saveMessages({
                messages: sanitizeMessages.map((message) => ({
                  id: message.id,
                  chatId: chatId,
                  role: message.role,
                  content: message.content,
                  createdAt: new Date(),
                })),
              });
            } catch (error) {
              console.error("Failed to save chat", error);
            }
          },
        });

        result.mergeIntoDataStream(dataStream);
      } catch (error) {
        console.error("Stream execution error:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Stream error:", error);
      return error instanceof Error ? error.message : String(error);
    },
  });
}
