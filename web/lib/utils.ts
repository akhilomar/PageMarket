import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currency(value?: number | null) {
  if (value === undefined || value === null) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatDate(input: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium"
  }).format(new Date(input));
}

export function getInstagramUsernameFromUrl(value?: string | null) {
  if (!value) {
    return "";
  }

  try {
    const normalized = value.startsWith("http") ? value : `https://${value}`;
    const parsedUrl = new URL(normalized);
    const firstSegment = parsedUrl.pathname.split("/").filter(Boolean)[0];
    return firstSegment || "";
  } catch {
    return value.replace(/^@/, "").split(/[/?#]/)[0];
  }
}

export function getFollowerPricingHint(followersCount?: number | null) {
  const followers = followersCount || 0;

  if (followers <= 0) {
    return null;
  }

  const storyPrice = Math.max(25, Math.round(followers / 500));
  const postPrice = Math.max(50, Math.round(followers / 250));
  const reelPrice = Math.max(80, Math.round(followers / 180));

  return {
    storyPrice,
    postPrice,
    reelPrice
  };
}

export function getGeneratedProfileImageUrl(seed?: string | null) {
  const safeSeed = encodeURIComponent(seed || "PromoHub");
  return `https://api.dicebear.com/9.x/initials/svg?seed=${safeSeed}`;
}

function getUnavatarProvider(platform?: string | null) {
  const normalizedPlatform = (platform || "").trim().toLowerCase();

  if (normalizedPlatform === "instagram") return "instagram";
  if (normalizedPlatform === "youtube") return "youtube";
  if (normalizedPlatform === "facebook") return "facebook";
  if (normalizedPlatform === "linkedin") return "domain";
  if (normalizedPlatform === "twitter") return "x";
  if (normalizedPlatform === "tiktok") return "tiktok";

  return "domain";
}

export function getThirdPartyProfileImageUrl({
  platform,
  profileUrl,
  pageName
}: {
  platform?: string | null;
  profileUrl?: string | null;
  pageName?: string | null;
}) {
  const provider = getUnavatarProvider(platform);
  const username = getInstagramUsernameFromUrl(profileUrl);

  if (provider !== "domain" && username) {
    return `https://unavatar.io/${provider}/${encodeURIComponent(username)}?fallback=${encodeURIComponent(
      getGeneratedProfileImageUrl(pageName || username)
    )}`;
  }

  try {
    const normalized = profileUrl?.startsWith("http") ? profileUrl : `https://${profileUrl}`;
    const hostname = new URL(normalized || "").hostname;
    if (hostname) {
      return `https://unavatar.io/domain/${encodeURIComponent(hostname)}?fallback=${encodeURIComponent(
        getGeneratedProfileImageUrl(pageName || hostname)
      )}`;
    }
  } catch {
    // Fallback handled below.
  }

  return getGeneratedProfileImageUrl(pageName);
}
