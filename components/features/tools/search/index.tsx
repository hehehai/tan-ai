import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import type {
  MultiSearchArgs,
  MultiSearchResponse,
  QueryCompletion,
  SearchImage,
} from "~/lib/ai/types";
import { cn } from "~/lib/utils";
import { ImageGrid } from "./image-grid";
import { SearchLoadingState } from "./loading";
import { ResultCard } from "./result-card";

interface SearchToolProps {
  result: MultiSearchResponse | null;
  args: MultiSearchArgs;
  annotations?: QueryCompletion[];
}

export const SearchTool = ({ result, args, annotations = [] }: SearchToolProps) => {
  if (!result) {
    return <SearchLoadingState queries={args.queries} annotations={annotations} />;
  }

  // Collect all images from all searches
  const allImages = result.searches.reduce<SearchImage[]>((acc, search) => {
    return acc.concat(search.images);
  }, []);

  const totalResults = result.searches.reduce(
    (sum, search) => sum + search.results.length,
    0,
  );

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
                  {totalResults} Results
                </Badge>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="mt-0 pt-0 border-0">
            <div className="py-3 px-4 bg-white dark:bg-neutral-900 rounded-b-xl border-t-0 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              {/* Query badges */}
              <div className="flex overflow-x-auto gap-2 mb-3 no-scrollbar pb-1">
                {result.searches.map((search, i) => (
                  <Badge
                    key={i as React.Key}
                    variant="secondary"
                    className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex-shrink-0"
                  >
                    <span className="i-hugeicons-search-01 size-3 mr-1.5" />
                    {search.query}
                  </Badge>
                ))}
              </div>

              {/* Horizontal scrolling results */}
              <div className="flex overflow-x-auto gap-3 no-scrollbar">
                {result.searches.map((search) =>
                  search.results.map((result, resultIndex) => (
                    <motion.div
                      key={`${search.query}-${resultIndex}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: resultIndex * 0.1 }}
                    >
                      <ResultCard result={result} />
                    </motion.div>
                  )),
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Images section outside accordion */}
      {allImages.length > 0 && <ImageGrid images={allImages} />}
    </div>
  );
};
