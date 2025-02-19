import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { ProxyAgent, setGlobalDispatcher } from "undici";

setGlobalDispatcher(new ProxyAgent("http://127.0.0.1:15732"));

export const google = createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
	fetch: fetch,
});
