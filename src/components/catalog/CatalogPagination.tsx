"use client";

import Link from "next/link";

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

export function CatalogPagination({
  currentPage,
  totalPages,
  searchParams,
}: CatalogPaginationProps) {
  function buildUrl(page: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== "page") params.set(k, v);
    });
    params.set("page", String(page));
    return `/sheet-music?${params.toString()}`;
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {prevPage ? (
        <Link
          href={buildUrl(prevPage)}
          className="px-4 py-2 border border-border-warm rounded text-sm text-charcoal hover:bg-parchment-dark transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border-warm rounded text-sm text-charcoal-light cursor-not-allowed">
          Previous
        </span>
      )}
      <span className="px-4 py-2 text-sm text-charcoal-light">
        Page {currentPage} of {totalPages}
      </span>
      {nextPage ? (
        <Link
          href={buildUrl(nextPage)}
          className="px-4 py-2 border border-border-warm rounded text-sm text-charcoal hover:bg-parchment-dark transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border-warm rounded text-sm text-charcoal-light cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  );
}
