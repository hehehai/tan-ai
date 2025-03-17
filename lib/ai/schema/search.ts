import type { DeepPartial } from "ai";
import { z } from "zod";

export const searchSchema = z.object({
  queries: z.array(z.string().describe("Array of search queries to look up on the web.")),
  maxResults: z.array(
    z
      .number()
      .describe("Array of maximum number of results to return per query.")
      .default(10),
  ),
  topics: z.array(
    z
      .enum(["general", "news"])
      .describe("Array of topic types to search for.")
      .default("general"),
  ),
  searchDepth: z.array(
    z
      .enum(["basic", "advanced"])
      .describe("Array of search depths to use.")
      .default("basic"),
  ),
  exclude_domains: z
    .array(z.string())
    .describe("A list of domains to exclude from all search results.")
    .default([]),
});

export type PartialInquiry = DeepPartial<typeof searchSchema>;
