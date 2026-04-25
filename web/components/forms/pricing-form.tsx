"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PricingForm({
  pageId,
  pricing,
  pricingId
}: {
  pageId: string;
  pricing?: Record<string, string | number | null | undefined>;
  pricingId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      pageId,
      storyPrice: Number(formData.get("storyPrice")),
      postPrice: Number(formData.get("postPrice")),
      reelPrice: Number(formData.get("reelPrice")),
      videoMentionPrice: Number(formData.get("videoMentionPrice") || 0) || undefined,
      customPackagePrice: Number(formData.get("customPackagePrice") || 0) || undefined
    };

    try {
      if (pricingId) {
        await api.put(`/pricing/${pricingId}`, payload);
      } else {
        await api.post("/pricing", payload);
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card grid gap-4 p-6 md:grid-cols-2">
      <Input name="storyPrice" label="Story Price" type="number" defaultValue={String(pricing?.storyPrice || "")} />
      <Input name="postPrice" label="Post Price" type="number" defaultValue={String(pricing?.postPrice || "")} />
      <Input name="reelPrice" label="Reel Price" type="number" defaultValue={String(pricing?.reelPrice || "")} />
      <Input name="videoMentionPrice" label="Video Mention Price" type="number" defaultValue={String(pricing?.videoMentionPrice || "")} />
      <Input name="customPackagePrice" label="Custom Package Price" type="number" defaultValue={String(pricing?.customPackagePrice || "")} />
      <div className="md:col-span-2">
        <Button disabled={loading} type="submit">
          {loading ? "Saving..." : "Save Pricing"}
        </Button>
      </div>
    </form>
  );
}
