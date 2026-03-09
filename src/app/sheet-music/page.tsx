import { Suspense } from "react";
import { getProducts, getFilterOptions } from "@/lib/products";
import { SerifHeading } from "@/components/shared/SerifHeading";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { SearchBar } from "@/components/catalog/SearchBar";
import { SortDropdown } from "@/components/catalog/SortDropdown";
import { CatalogPagination } from "@/components/catalog/CatalogPagination";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    instrument?: string;
    difficulty?: string;
    mood?: string;
    collection?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    q: params.q,
    instrument: params.instrument,
    difficulty: params.difficulty,
    mood: params.mood,
    collection: params.collection,
    sort: (params.sort as "newest" | "popular" | "price-asc" | "price-desc") ?? "newest",
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: 12,
  };

  const [result, filterOptions] = await Promise.all([
    getProducts(filters),
    getFilterOptions(),
  ]);

  const { products, pagination } = result;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Small hero */}
      <div className="mb-8">
        <SerifHeading as="h1" className="mb-2">
          Sheet Music
        </SerifHeading>
        <p className="text-charcoal-light">
          Browse our collection of piano scores, accompaniments, and multitracks.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - filters */}
        <aside className="lg:w-56 shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 lg:hidden">
              <Suspense fallback={<div className="h-10 bg-parchment-dark rounded animate-pulse" />}>
                <SearchBar />
              </Suspense>
            </div>
            <FilterSidebar options={filterOptions} />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="hidden lg:block w-64">
              <Suspense fallback={<div className="h-10 bg-parchment-dark rounded animate-pulse" />}>
                <SearchBar />
              </Suspense>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <p className="text-sm text-charcoal-light">
                {pagination.total} {pagination.total === 1 ? "result" : "results"}
              </p>
              <SortDropdown />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-charcoal-light mb-4">No sheet music found.</p>
              <p className="text-sm text-charcoal-light">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              {pagination.totalPages > 1 && (
                <CatalogPagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  searchParams={params}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
