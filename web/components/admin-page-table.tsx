"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { currency, getThirdPartyProfileImageUrl } from "@/lib/utils";

type AdminPageRecord = {
  id: string;
  pageName: string;
  platform: string;
  pageUrl: string;
  niche: string;
  city: string;
  state: string;
  followersCount: number;
  averageViews: number | null;
  profileImage: string | null;
  description: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  owner: {
    name: string;
    email: string;
  };
  pricing: {
    postPrice: number;
    reelPrice: number;
    storyPrice: number;
  } | null;
};

export function AdminPageTable({ pages }: { pages: AdminPageRecord[] }) {
  const router = useRouter();
  const [updatingPageId, setUpdatingPageId] = useState<string | null>(null);

  async function updateStatus(pageId: string, status: AdminPageRecord["status"]) {
    setUpdatingPageId(pageId);

    try {
      await api.patch(`/pages/${pageId}/status`, { status });
      router.refresh();
    } finally {
      setUpdatingPageId(null);
    }
  }

  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <div key={page.id} className="glass-card grid gap-5 p-5 lg:grid-cols-[100px_1fr_260px]">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-sand">
            {(page.profileImage || page.pageUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={page.profileImage || getThirdPartyProfileImageUrl({ platform: page.platform, profileUrl: page.pageUrl, pageName: page.pageName })}
                alt={page.pageName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-black text-ink/50">{page.pageName.slice(0, 1)}</span>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-black">{page.pageName}</h3>
              <StatusBadge status={page.status} />
            </div>
            <p className="text-sm text-ink/65">
              {page.owner.name} ({page.owner.email}) . {page.platform} . {page.niche} . {page.city}, {page.state}
            </p>
            <p className="text-sm text-ink/75">{page.description || "No description provided."}</p>
            <div className="flex flex-wrap gap-4 text-sm text-ink/70">
              <span>{page.followersCount.toLocaleString()} followers</span>
              <span>{page.averageViews?.toLocaleString() || "N/A"} avg views</span>
              <span>Story {currency(page.pricing?.storyPrice)}</span>
              <span>Post {currency(page.pricing?.postPrice)}</span>
              <span>Reel {currency(page.pricing?.reelPrice)}</span>
            </div>
            <a href={page.pageUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-teal">
              Open profile
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              disabled={updatingPageId === page.id}
              onClick={() => void updateStatus(page.id, "APPROVED")}
            >
              Mark Active
            </Button>
            <Link href={`/pages/${page.id}/edit`}>
              <Button className="w-full" type="button" variant="ghost">
                Edit Info
              </Button>
            </Link>
            <Button
              disabled={updatingPageId === page.id}
              variant="ghost"
              onClick={() => void updateStatus(page.id, "PENDING")}
            >
              Mark Pending
            </Button>
            <Button
              disabled={updatingPageId === page.id}
              variant="secondary"
              onClick={() => void updateStatus(page.id, "REJECTED")}
            >
              Mark Inactive
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
