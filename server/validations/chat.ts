import { z } from "zod";

export const validationAiChatGenerateSchema = z.object({
	id: z.string(),
	messages: z.array(z.any()),
});

export type ValidationAiChatGenerate = z.infer<
	typeof validationAiChatGenerateSchema
>;
