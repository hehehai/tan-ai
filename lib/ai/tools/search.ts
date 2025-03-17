import { tavily } from "@tavily/core";
import { type DataStreamWriter, tool } from "ai";
import { deduplicateByDomainAndUrl, isValidImageUrl, sanitizeUrl } from "~/lib/utils";
import { env } from "~/lib/utils/env.server";
import { searchSchema } from "../schema/search";

// 新增的图片处理函数
async function processImages(
  images: Array<{ url: string; description?: string }>,
  includeImageDescriptions: boolean,
) {
  const deduplicatedImages = deduplicateByDomainAndUrl(images);

  if (includeImageDescriptions) {
    return Promise.all(
      deduplicatedImages.map(async ({ url, description }) => {
        const sanitizedUrl = sanitizeUrl(url);
        const isValid = await isValidImageUrl(sanitizedUrl);
        return isValid
          ? {
              url: sanitizedUrl,
              description: description ?? "",
            }
          : null;
      }),
    ).then((results) =>
      results.filter(
        (image): image is { url: string; description: string } =>
          image !== null &&
          typeof image === "object" &&
          typeof image.description === "string" &&
          image.description !== "",
      ),
    );
  }

  return Promise.all(
    deduplicatedImages.map(async ({ url }) => {
      const sanitizedUrl = sanitizeUrl(url);
      return (await isValidImageUrl(sanitizedUrl)) ? sanitizedUrl : null;
    }),
  ).then((results) => results.filter((url) => url !== null) as string[]);
}

export const searchTool = (dataStream: DataStreamWriter) =>
  tool({
    description:
      "Search the web for information with multiple queries, max results and search depth.",
    parameters: searchSchema,
    execute: async ({
      queries,
      maxResults,
      topics,
      searchDepth,
      exclude_domains,
    }: {
      queries: string[];
      maxResults: number[];
      topics: ("general" | "news")[];
      searchDepth: ("basic" | "advanced")[];
      exclude_domains?: string[];
    }) => {
      console.log("Queries:", queries);
      console.log("Max Results:", maxResults);
      console.log("Topics:", topics);
      console.log("Search Depths:", searchDepth);
      console.log("Exclude Domains:", exclude_domains);

      const apiKey = env.TAVILY_API_KEY;
      const tvly = tavily({ apiKey });
      const includeImageDescriptions = true;

      // Execute searches in parallel
      const searchPromises = queries.map(async (query, index) => {
        const data = await tvly.search(query, {
          topic: topics[index] || topics[0] || "general",
          days: topics[index] === "news" ? 7 : undefined,
          maxResults: maxResults[index] || maxResults[0] || 10,
          searchDepth: searchDepth[index] || searchDepth[0] || "basic",
          includeAnswer: true,
          includeImages: true,
          includeImageDescriptions: includeImageDescriptions,
          excludeDomains: exclude_domains,
        });

        // Add annotation for query completion
        dataStream.writeMessageAnnotation({
          type: "query_completion",
          data: {
            query,
            index,
            total: queries.length,
            status: "completed",
            resultsCount: data.results.length,
            imagesCount: data.images.length,
          },
        });

        return {
          query,
          results: deduplicateByDomainAndUrl(data.results).map((obj) => ({
            url: obj.url,
            title: obj.title,
            content: obj.content,
            rawContent: obj.rawContent,
            publishedDate: topics[index] === "news" ? obj.publishedDate : undefined,
          })),
          images: await processImages(data.images, includeImageDescriptions),
        };
      });

      const searchResults = await Promise.all(searchPromises);

      return {
        searches: searchResults,
      };
    },
  });
