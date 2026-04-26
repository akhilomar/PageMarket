"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SettingsUser = {
  name: string;
  email: string;
  mobile?: string | null;
  role: string;
};

export function SettingsForm({ user }: { user: SettingsUser }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload = {
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        mobile: String(formData.get("mobile") || "").trim() || undefined,
        password: String(formData.get("password") || "").trim() || undefined
      };

      const response = await api.put("/auth/me", payload);
      setMessage(`Saved successfully for ${response.data.user.email}.`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError((err.response?.data as { message?: string } | undefined)?.message || "Unable to save settings.");
      } else {
        setError("Unable to save settings.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card mx-auto flex max-w-2xl flex-col gap-4 p-8">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-coral">Account Settings</p>
        <h1 className="text-3xl font-black">Update your profile</h1>
      </div>
      <Input name="name" label="Full Name" defaultValue={user.name} />
      <Input name="email" label="Email" type="email" defaultValue={user.email} />
      <Input name="mobile" label="Mobile" defaultValue={user.mobile || ""} />
      <Input name="password" label="New Password" type="password" placeholder="Leave blank to keep current password" />
      <Input name="role" label="Role" value={user.role} readOnly />
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <Button disabled={loading} type="submit">
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
