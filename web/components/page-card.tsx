import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { currency } from "@/lib/utils";

interface PageCardProps {
  page: {
    id: string;
    pageName: string;
    platform: string;
    niche: string;
    city: string;
    followersCount: number;
    averageViews?: number | null;
    profileImage?: string | null;
    status: string;
    pricing?: {
      postPrice: number;
      reelPrice: number;
      storyPrice: number;
    } | null;
  };
}

export function PageCard({ page }: PageCardProps) {
  return (
    <Link href={`/pages/${page.id}`} className="glass-card overflow-hidden transition hover:-translate-y-1">
      <div className="h-44 bg-gradient-to-br from-sand via-white to-teal/10" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{page.pageName}</h3>
            <p className="text-sm text-ink/60">
              {page.platform} . {page.niche} . {page.city}
            </p>
          </div>
          <StatusBadge status={page.status} />
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-sand/60 p-3">
            <p className="text-ink/55">Followers</p>
            <p className="font-bold">{page.followersCount.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-sand/60 p-3">
            <p className="text-ink/55">Average Views</p>
            <p className="font-bold">{page.averageViews?.toLocaleString() || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink/60">Post package</span>
          <span className="font-semibold">{currency(page.pricing?.postPrice)}</span>
        </div>
      </div>
    </Link>
  );
}

