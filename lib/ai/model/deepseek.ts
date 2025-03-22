import { createOpenAI } from "@ai-sdk/openai";
import { env } from "~/lib/utils/env.server";

export const deepseek = createOpenAI({
  apiKey: env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://ark.cn-beijing.volces.com/api/v3",
});
