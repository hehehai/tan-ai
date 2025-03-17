import { useState } from "react";
import type { SearchResult } from "~/lib/ai/types";
import { cn } from "~/lib/utils";

export const ResultCard = ({ result }: { result: SearchResult }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-[300px] flex-shrink-0 bg-background rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="relative w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted-foreground/10" />
            )}
            <img
              src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(result.url).hostname}`}
              alt=""
              className={cn("w-6 h-6 object-contain", !imageLoaded && "opacity-0")}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(true);
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='16'/%3E%3Cline x1='8' y1='12' x2='16' y2='12'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <div>
            <h3 className="font-medium text-sm line-clamp-1">{result.title}</h3>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {new URL(result.url).hostname}
              <span className="i-hugeicons-link-square-01 h-3 w-3" />
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {result.content}
        </p>

        {result.published_date && (
          <div className="pt-3 border-t border-border">
            <time className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="i-hugeicons-calendar-02 h-3 w-3" />
              {new Date(result.published_date).toLocaleDateString()}
            </time>
          </div>
        )}
      </div>
    </div>
  );
};
