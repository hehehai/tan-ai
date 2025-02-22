import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { wrapLanguageModel } from "ai";
import { ProxyAgent, setGlobalDispatcher } from "undici";
import { env } from "../utils/env";

setGlobalDispatcher(new ProxyAgent("http://127.0.0.1:15732"));

export const google = createGoogleGenerativeAI({
	apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
	fetch: fetch,
});

export const geminiProModel = wrapLanguageModel({
	model: google("gemini-1.5-pro-002"),
	middleware: [],
});

export const geminiFlashModel = wrapLanguageModel({
	model: google("gemini-1.5-flash-002"),
	middleware: [],
});
