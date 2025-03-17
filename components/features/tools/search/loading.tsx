import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import type { QueryCompletion } from "~/lib/ai/types";
import { cn } from "~/lib/utils";

export const SearchLoadingState = ({
  queries,
  annotations,
}: {
  queries: string[];
  annotations: QueryCompletion[];
}) => {
  const totalResults = annotations.reduce((sum, a) => sum + a.data.resultsCount, 0);

  return (
    <div className="w-full space-y-4">
      <Accordion type="single" collapsible defaultValue="search" className="w-full">
        <AccordionItem value="search" className="border-none">
          <AccordionTrigger
            className={cn(
              "p-4 bg-white dark:bg-neutral-900 rounded-xl hover:no-underline border border-neutral-200 dark:border-neutral-800 shadow-sm",
              "[&[data-state=open]]:rounded-b-none",
            )}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <span className="i-hugeicons-globe-02 h-4 w-4 text-neutral-500" />
                </div>
                <h2 className="font-medium text-left">Sources Found</h2>
              </div>
              <div className="flex items-center gap-2 mr-2">
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 bg-neutral-100 dark:bg-neutral-800"
                >
                  <span className="i-hugeicons-search-01 size-3 mr-1.5" />
                  {totalResults || "0"} Results
                </Badge>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="mt-0 pt-0 border-0">
            <div className="py-3 px-4 bg-white dark:bg-neutral-900 rounded-b-xl border-t-0 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              {/* Query badges */}
              <div className="flex overflow-x-auto gap-2 mb-3 no-scrollbar pb-1">
                {queries.map((query, i) => {
                  const annotation = annotations.find((a) => a.data.query === query);
                  return (
                    <Badge
                      key={i as React.Key}
                      variant="secondary"
                      className={cn(
                        "px-3 py-1.5 rounded-full flex-shrink-0 flex items-center gap-1.5",
                        annotation
                          ? "bg-neutral-100 dark:bg-neutral-800"
                          : "bg-neutral-50 dark:bg-neutral-900 text-neutral-400",
                      )}
                    >
                      {annotation ? (
                        <span className="i-hugeicons-search-area h-3 w-3" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      )}
                      {query}
                    </Badge>
                  );
                })}
              </div>

              {/* Horizontal scrolling results skeleton */}
              <div className="flex overflow-x-auto gap-3 no-scrollbar pb-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i as React.Key}
                    className="w-[300px] flex-shrink-0 bg-background rounded-xl border border-border shadow-sm"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-3/4" />
                          <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-1/2" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-full" />
                        <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-5/6" />
                        <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-4/6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Images section skeleton */}
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i as React.Key}
            className={cn(
              "aspect-[4/3] rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse",
              i === 0 && "sm:row-span-2 sm:col-span-2",
            )}
          />
        ))}
      </div>
    </div>
  );
};
