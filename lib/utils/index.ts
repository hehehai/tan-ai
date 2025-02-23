import {
	type CoreMessage,
	type CoreToolMessage,
	type Message,
	type ToolInvocation,
	generateId,
} from "ai";
import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
import type { Chat } from "../db/schema";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export function generateUUID(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function addToolMessageToChat({
	toolMessage,
	messages,
}: {
	toolMessage: CoreToolMessage;
	messages: Array<Message>;
}): Array<Message> {
	return messages.map((message) => {
		if (message.toolInvocations) {
			return {
				...message,
				toolInvocations: message.toolInvocations.map((toolInvocation) => {
					const toolResult = toolMessage.content.find(
						(tool) => tool.toolCallId === toolInvocation.toolCallId,
					);

					if (toolResult) {
						return {
							...toolInvocation,
							state: "result",
							result: toolResult.result,
						};
					}

					return toolInvocation;
				}),
			};
		}

		return message;
	});
}

export function convertToUIMessages(
	messages: Array<CoreMessage>,
): Array<Message> {
	return messages.reduce((chatMessages: Array<Message>, message) => {
		if (message.role === "tool") {
			return addToolMessageToChat({
				toolMessage: message as CoreToolMessage,
				messages: chatMessages,
			});
		}

		let textContent = "";
		const toolInvocations: Array<ToolInvocation> = [];

		if (typeof message.content === "string") {
			textContent = message.content;
		} else if (Array.isArray(message.content)) {
			for (const content of message.content) {
				if (content.type === "text") {
					textContent += content.text;
				} else if (content.type === "tool-call") {
					toolInvocations.push({
						state: "call",
						toolCallId: content.toolCallId,
						toolName: content.toolName,
						args: content.args,
					});
				}
			}
		}

		chatMessages.push({
			id: generateId(),
			role: message.role,
			content: textContent,
			toolInvocations,
		});

		return chatMessages;
	}, []);
}

export function getTitleFromChat(chat: Chat) {
	const messages = convertToUIMessages(chat.messages as Array<CoreMessage>);
	const firstMessage = messages[0];

	if (!firstMessage) {
		return "Untitled";
	}

	return firstMessage.content;
}
