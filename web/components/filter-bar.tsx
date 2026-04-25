import Link from "next/link";
import { PAGE_NICHES, PAGE_PLATFORMS } from "@promohub/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterBar({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <form className="glass-card space-y-4 p-5">
      <h3 className="text-lg font-bold">Filter Pages</h3>
      <Input name="city" defaultValue={String(searchParams.city || "")} label="City" placeholder="Bengaluru" />
      <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
        <span>Platform</span>
        <select
          name="platform"
          defaultValue={String(searchParams.platform || "")}
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
        >
          <option value="">All platforms</option>
          {PAGE_PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
        <span>Niche</span>
        <select
          name="niche"
          defaultValue={String(searchParams.niche || "")}
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
        >
          <option value="">All niches</option>
          {PAGE_NICHES.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <Input name="minPrice" type="number" label="Min Price" defaultValue={String(searchParams.minPrice || "")} />
        <Input name="maxPrice" type="number" label="Max Price" defaultValue={String(searchParams.maxPrice || "")} />
      </div>
      <div className="flex gap-3">
        <Button className="flex-1" type="submit">
          Apply
        </Button>
        <Link href="/explore" className="flex-1">
          <Button className="w-full" type="button" variant="ghost">
            Reset
          </Button>
        </Link>
      </div>
    </form>
  );
}

