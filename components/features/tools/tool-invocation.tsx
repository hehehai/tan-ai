import type { JSONValue, ToolInvocation } from "ai";
import type { QueryCompletion } from "~/lib/ai/types";
import { SearchTool } from "./search";

interface ToolInvocationProps {
  toolInvocation: ToolInvocation;
  annotations: JSONValue[] | undefined;
}

export const ToolInvocationView = ({
  toolInvocation,
  annotations = [],
}: ToolInvocationProps) => {
  switch (toolInvocation.toolName) {
    case "web_search": {
      const queryCompletions = annotations?.filter(
        (a) => a && typeof a === "object" && "type" in a && a.type === "query_completion",
      ) as QueryCompletion[];

      return (
        <SearchTool
          args={toolInvocation.args}
          result={toolInvocation.state === "result" ? toolInvocation.result : null}
          annotations={queryCompletions}
        />
      );
    }
    default:
      return null;
  }
};
