import { tool } from "ai";
import { env } from "~/lib/utils/env.server";
import { retrieveSchema } from "../schema/retrieve";
import type { SearchQueryResult } from "../types";

const CONTENT_CHARACTER_LIMIT = 10000;

async function fetchJinaReaderData(url: string): Promise<SearchQueryResult | null> {
  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-With-Generated-Alt": "true",
      },
    });
    const json = await response.json();
    if (!json.data || json.data.length === 0) {
      return null;
    }

    const content = json.data.content.slice(0, CONTENT_CHARACTER_LIMIT);

    return {
      results: [
        {
          title: json.data.title,
          content,
          url: json.data.url,
          raw_content: json.data.content,
        },
      ],
      query: "",
      images: [],
    };
  } catch (error) {
    console.error("Jina Reader API error:", error);
    return null;
  }
}

async function fetchTavilyExtractData(url: string): Promise<SearchQueryResult | null> {
  try {
    const apiKey = env.TAVILY_API_KEY;
    const response = await fetch("https://api.tavily.com/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ api_key: apiKey, urls: [url] }),
    });
    const json = await response.json();
    if (!json.results || json.results.length === 0) {
      return null;
    }

    const result = json.results[0];
    const content = result.raw_content.slice(0, CONTENT_CHARACTER_LIMIT);

    return {
      results: [
        {
          title: content.slice(0, 100),
          content,
          url: result.url,
          raw_content: result.raw_content,
        },
      ],
      query: "",
      images: [],
    };
  } catch (error) {
    console.error("Tavily Extract API error:", error);
    return null;
  }
}

export const retrieveTool = tool({
  description: "Retrieve content from the web",
  parameters: retrieveSchema,
  execute: async ({ url }) => {
    let results: SearchQueryResult | null;

    // Use Jina if the API key is set, otherwise use Tavily
    const useJina = process.env.JINA_API_KEY;
    if (useJina) {
      results = await fetchJinaReaderData(url);
    } else {
      results = await fetchTavilyExtractData(url);
    }

    if (!results) {
      return null;
    }

    return results;
  },
});
