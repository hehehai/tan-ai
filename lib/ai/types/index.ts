import type {
  ReasoningUIPart,
  SourceUIPart,
  TextUIPart,
  ToolInvocationUIPart,
} from "@ai-sdk/ui-utils";
import type { Message } from "ai";

export type SearchImage = {
  url: string;
  description: string;
};

export type SearchResult = {
  url: string;
  title: string;
  content: string;
  raw_content: string;
  published_date?: string;
};

export type SearchQueryResult = {
  query: string;
  results: SearchResult[];
  images: SearchImage[];
};

export type MultiSearchResponse = {
  searches: SearchQueryResult[];
};

export type MultiSearchArgs = {
  queries: string[];
  maxResults: number[];
  topics: ("general" | "news")[];
  searchDepth: ("basic" | "advanced")[];
};

export type QueryCompletion = {
  type: "query_completion";
  data: {
    query: string;
    index: number;
    total: number;
    status: "completed";
    resultsCount: number;
    imagesCount: number;
  };
};

export interface BaseStreamConfig {
  messages: Message[];
  chatId: string;
}

// Add this type at the top with other interfaces
export type MessagePart =
  | TextUIPart
  | ReasoningUIPart
  | ToolInvocationUIPart
  | SourceUIPart;
