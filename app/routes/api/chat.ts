import { createAPIFileRoute } from "@tanstack/start/api";
import { streamText } from "ai";
import { google } from "~/lib/ai/google";

export const APIRoute = createAPIFileRoute("/api/chat")({
	POST: async ({ request }) => {
		const body = await request.json();
		console.log(body.messages);
		const result = streamText({
			model: google("gemini-1.5-flash"),
			system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
			messages: body.messages,

			onError: (error) => {
				console.error(error);
			},
			maxSteps: 3,
		});
		return result.toDataStreamResponse();
	},
});
