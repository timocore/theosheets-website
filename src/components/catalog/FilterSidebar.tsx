"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface FilterOption {
  instruments: string[];
  difficulties: string[];
  moods: string[];
  collections: string[];
}

interface FilterSidebarProps {
  options: FilterOption;
}

export function FilterSidebar({ options }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function toggleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key);
    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`/sheet-music?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/sheet-music");
  }

  const hasFilters =
    searchParams.get("instrument") ||
    searchParams.get("difficulty") ||
    searchParams.get("mood") ||
    searchParams.get("collection");

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-sm font-medium text-charcoal">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-charcoal-light hover:text-honey transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {options.instruments.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-charcoal-light uppercase tracking-wider mb-2">
            Instrument
          </h4>
          <ul className="space-y-1">
            {options.instruments.map((v) => (
              <li key={v}>
                <button
                  onClick={() => toggleFilter("instrument", v)}
                  className={cn(
                    "text-sm w-full text-left py-1.5 px-2 rounded transition-colors",
                    searchParams.get("instrument") === v
                      ? "bg-parchment-dark text-charcoal font-medium"
                      : "text-charcoal-light hover:text-charcoal"
                  )}
                >
                  {v}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {options.difficulties.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-charcoal-light uppercase tracking-wider mb-2">
            Difficulty
          </h4>
          <ul className="space-y-1">
            {options.difficulties.map((v) => (
              <li key={v}>
                <button
                  onClick={() => toggleFilter("difficulty", v)}
                  className={cn(
                    "text-sm w-full text-left py-1.5 px-2 rounded transition-colors",
                    searchParams.get("difficulty") === v
                      ? "bg-parchment-dark text-charcoal font-medium"
                      : "text-charcoal-light hover:text-charcoal"
                  )}
                >
                  {v}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {options.moods.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-charcoal-light uppercase tracking-wider mb-2">
            Mood
          </h4>
          <ul className="space-y-1">
            {options.moods.map((v) => (
              <li key={v}>
                <button
                  onClick={() => toggleFilter("mood", v)}
                  className={cn(
                    "text-sm w-full text-left py-1.5 px-2 rounded transition-colors",
                    searchParams.get("mood") === v
                      ? "bg-parchment-dark text-charcoal font-medium"
                      : "text-charcoal-light hover:text-charcoal"
                  )}
                >
                  {v}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {options.collections.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-charcoal-light uppercase tracking-wider mb-2">
            Collection
          </h4>
          <ul className="space-y-1">
            {options.collections.map((v) => (
              <li key={v}>
                <button
                  onClick={() => toggleFilter("collection", v)}
                  className={cn(
                    "text-sm w-full text-left py-1.5 px-2 rounded transition-colors",
                    searchParams.get("collection") === v
                      ? "bg-parchment-dark text-charcoal font-medium"
                      : "text-charcoal-light hover:text-charcoal"
                  )}
                >
                  {v}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
