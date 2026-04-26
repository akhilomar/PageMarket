"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PAGE_NICHES, PAGE_PLATFORMS } from "@promohub/shared";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currency, getFollowerPricingHint, getGeneratedProfileImageUrl } from "@/lib/utils";

type EditablePage = {
  id?: string;
  pageName?: string | null;
  platform?: string | null;
  pageUrl?: string | null;
  niche?: string | null;
  state?: string | null;
  city?: string | null;
  region?: string | null;
  language?: string | null;
  followersCount?: number | null;
  averageViews?: number | null;
  engagementRate?: number | null;
  audienceGender?: string | null;
  audienceAgeGroup?: string | null;
  audienceLocation?: string | null;
  description?: string | null;
  profileImage?: string | null;
  analyticsImages?: string[] | null;
};

export function PageForm({
  page,
  initialInstagramProfile
}: {
  page?: EditablePage;
  initialInstagramProfile?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [instagramProfile, setInstagramProfile] = useState(initialInstagramProfile || "");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [pageName, setPageName] = useState(String(page?.pageName || ""));
  const [pageUrl, setPageUrl] = useState(String(page?.pageUrl || ""));
  const [profileImage, setProfileImage] = useState(String(page?.profileImage || ""));
  const [followersCount, setFollowersCount] = useState(String(page?.followersCount || ""));
  const followerPricingHint = getFollowerPricingHint(Number(followersCount) || 0);

  function extractInstagramUsername(value: string) {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return "";
    }

    if (trimmedValue.startsWith("@")) {
      return trimmedValue.slice(1).split(/[/?#]/)[0];
    }

    try {
      const normalizedValue = trimmedValue.startsWith("http") ? trimmedValue : `https://${trimmedValue}`;
      const parsedUrl = new URL(normalizedValue);
      const username = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return username || "";
    } catch {
      return trimmedValue.replace(/^@/, "").split(/[/?#]/)[0];
    }
  }

  function formatPageNameFromUsername(username: string) {
    if (!username) {
      return "";
    }

    return username
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  useEffect(() => {
    const username = extractInstagramUsername(instagramProfile);
    setInstagramUsername(username);

    if (!page?.id) {
      if (username) {
        setPageUrl(`https://instagram.com/${username}`);
        setProfileImage(getGeneratedProfileImageUrl(formatPageNameFromUsername(username) || username));
        setPageName((currentValue) => currentValue || formatPageNameFromUsername(username));
      } else {
        setPageUrl("");
        setProfileImage("");
      }
    }
  }, [instagramProfile, page?.id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      pageName: String(formData.get("pageName")),
      platform: String(formData.get("platform")),
      pageUrl: String(formData.get("pageUrl")),
      niche: String(formData.get("niche")),
      state: String(formData.get("state")),
      city: String(formData.get("city")),
      region: String(formData.get("region") || ""),
      language: String(formData.get("language") || ""),
      followersCount: Number(formData.get("followersCount")),
      averageViews: Number(formData.get("averageViews") || 0) || undefined,
      engagementRate: Number(formData.get("engagementRate") || 0) || undefined,
      audienceGender: String(formData.get("audienceGender") || ""),
      audienceAgeGroup: String(formData.get("audienceAgeGroup") || ""),
      audienceLocation: String(formData.get("audienceLocation") || ""),
      description: String(formData.get("description") || ""),
      profileImage: String(formData.get("profileImage") || ""),
      analyticsImages: String(formData.get("analyticsImages") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    try {
      if (page?.id) {
        await api.put(`/pages/${page.id}`, payload);
      } else {
        await api.post("/pages", payload);
      }
      router.push("/creator");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card grid gap-4 p-6 md:grid-cols-2">
      <Input
        name="instagramProfile"
        label="Instagram Profile"
        value={instagramProfile}
        onChange={(event) => setInstagramProfile(event.target.value)}
        placeholder="https://instagram.com/yourhandle or @yourhandle"
      />
      <Input
        name="instagramUsername"
        label="Instagram Username"
        value={instagramUsername ? `@${instagramUsername}` : ""}
        readOnly
        placeholder="@username"
      />
      <Input name="pageName" label="Page Name" value={pageName} onChange={(event) => setPageName(event.target.value)} />
      <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
        <span>Platform</span>
        <select name="platform" defaultValue={String(page?.platform || "Instagram")} className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm">
          {PAGE_PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>
      <Input name="pageUrl" label="Page URL" value={pageUrl} onChange={(event) => setPageUrl(event.target.value)} />
      <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
        <span>Niche</span>
        <select name="niche" defaultValue={String(page?.niche || "Tech")} className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm">
          {PAGE_NICHES.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </label>
      <Input name="state" label="State" defaultValue={String(page?.state || "")} />
      <Input name="city" label="City" defaultValue={String(page?.city || "")} />
      <Input name="region" label="Region" defaultValue={String(page?.region || "")} />
      <Input name="language" label="Language" defaultValue={String(page?.language || "")} />
      <Input
        name="followersCount"
        label="Followers Count"
        type="number"
        value={followersCount}
        onChange={(event) => setFollowersCount(event.target.value)}
      />
      <Input name="averageViews" label="Average Views" type="number" defaultValue={String(page?.averageViews || "")} />
      <Input name="engagementRate" label="Engagement Rate" type="number" step="0.1" defaultValue={String(page?.engagementRate || "")} />
      <Input name="audienceGender" label="Audience Gender" defaultValue={String(page?.audienceGender || "")} />
      <Input name="audienceAgeGroup" label="Audience Age Group" defaultValue={String(page?.audienceAgeGroup || "")} />
      <Input name="audienceLocation" label="Audience Location" defaultValue={String(page?.audienceLocation || "")} />
      <Input
        name="profileImage"
        label="Profile Image URL"
        value={profileImage}
        onChange={(event) => setProfileImage(event.target.value)}
      />
      <div className="md:col-span-2">
        <Input
          name="analyticsImages"
          label="Analytics Images"
          defaultValue={Array.isArray(page?.analyticsImages) ? page?.analyticsImages.join(", ") : ""}
          placeholder="Comma separated image URLs"
        />
      </div>
      {!page?.id ? (
        <p className="md:col-span-2 text-sm text-ink/60">
          We derive the Instagram username from the profile link and prefill the page name, profile URL, and a reliable generated avatar automatically.
        </p>
      ) : null}
      {followerPricingHint ? (
        <div className="md:col-span-2 rounded-3xl bg-sand/70 p-4 text-sm text-ink/75">
          Suggested starter pricing for this follower range:
          {" Story "}
          {currency(followerPricingHint.storyPrice)}
          {" . Post "}
          {currency(followerPricingHint.postPrice)}
          {" . Reel "}
          {currency(followerPricingHint.reelPrice)}
        </div>
      ) : null}
      <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-ink/80">
        <span>Description</span>
        <textarea
          name="description"
          rows={5}
          defaultValue={String(page?.description || "")}
          className="rounded-3xl border border-ink/10 bg-white px-4 py-3 text-sm"
        />
      </label>
      <div className="md:col-span-2">
        <Button disabled={loading} type="submit">
          {loading ? "Saving..." : page?.id ? "Update Page" : "Create Page"}
        </Button>
      </div>
    </form>
  );
}
