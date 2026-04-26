import { FilterBar } from "@/components/filter-bar";
import { PageCard } from "@/components/page-card";
import { getApprovedPages } from "@/lib/queries";

export default async function ExplorePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const normalizedSearchParams = Object.fromEntries(
    Object.entries(searchParams).flatMap(([key, value]) => {
      if (typeof value === "string" && value.length > 0) {
        return [[key, value]];
      }

      return [];
    })
  );
  const pages = await getApprovedPages(normalizedSearchParams);

  return (
    <main className="container-shell grid gap-8 py-12 lg:grid-cols-[300px_1fr]">
      <FilterBar searchParams={searchParams} />
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-coral">Explore</p>
            <h1 className="text-4xl font-black">Browse creator pages</h1>
          </div>
          <p className="text-sm text-ink/60">
            {pages.meta.total} result(s) . Page {pages.meta.page} of {pages.meta.totalPages || 1}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pages.items.map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>
    </main>
  );
}
