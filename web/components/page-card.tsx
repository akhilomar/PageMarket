import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { currency, getInstagramUsernameFromUrl, getThirdPartyProfileImageUrl } from "@/lib/utils";

interface PageCardProps {
  page: {
    id: string;
    pageName: string;
    platform: string;
    pageUrl: string;
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
  const username = getInstagramUsernameFromUrl(page.pageUrl);
  const previewImage = page.profileImage || getThirdPartyProfileImageUrl({
    platform: page.platform,
    profileUrl: page.pageUrl,
    pageName: page.pageName
  });

  return (
    <Link href={`/pages/${page.id}`} className="glass-card overflow-hidden transition hover:-translate-y-1">
      <div className="flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-sand via-white to-teal/10">
        {previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewImage} alt={page.pageName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-black text-ink/40 shadow-soft">
            {page.pageName.slice(0, 1)}
          </div>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{page.pageName}</h3>
            <p className="text-sm text-ink/60">
              {page.platform} . {page.niche} . {page.city}
            </p>
            {username ? <p className="mt-1 text-xs font-semibold text-teal">@{username}</p> : null}
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
