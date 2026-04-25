"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BOOKING_TYPES } from "@promohub/shared";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BookingForm({ pageId }: { pageId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      await api.post("/bookings", {
        pageId,
        promotionType: String(formData.get("promotionType")),
        campaignTitle: String(formData.get("campaignTitle")),
        campaignDescription: String(formData.get("campaignDescription")),
        contentLink: String(formData.get("contentLink") || ""),
        preferredDate: new Date(String(formData.get("preferredDate"))).toISOString(),
        budget: Number(formData.get("budget") || 0) || undefined
      });
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6">
      <Input name="campaignTitle" label="Campaign Title" />
      <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
        <span>Promotion Type</span>
        <select name="promotionType" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm">
          {BOOKING_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
        <span>Campaign Description</span>
        <textarea name="campaignDescription" rows={5} className="rounded-3xl border border-ink/10 bg-white px-4 py-3 text-sm" />
      </label>
      <Input name="contentLink" label="Content Link" />
      <Input name="preferredDate" type="datetime-local" label="Preferred Date" />
      <Input name="budget" type="number" label="Budget" />
      <Button disabled={loading} type="submit">
        {loading ? "Submitting..." : "Send Booking Request"}
      </Button>
    </form>
  );
}
