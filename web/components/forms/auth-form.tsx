"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const payload =
        mode === "register"
          ? {
              name: String(formData.get("name")),
              email: String(formData.get("email")),
              password: String(formData.get("password")),
              role: String(formData.get("role")),
              mobile: String(formData.get("mobile") || "")
            }
          : {
              email: String(formData.get("email")),
              password: String(formData.get("password"))
            };

      await api.post(`/auth/${mode}`, payload);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Unable to continue. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card mx-auto flex w-full max-w-lg flex-col gap-4 p-8">
      <h1 className="text-3xl font-black">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      {mode === "register" ? <Input label="Full Name" name="name" placeholder="Your name" /> : null}
      <Input label="Email" name="email" placeholder="hello@promohub.com" type="email" />
      {mode === "register" ? <Input label="Mobile" name="mobile" placeholder="+91 9999999999" /> : null}
      <Input label="Password" name="password" placeholder="******" type="password" />
      {mode === "register" ? (
        <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
          <span>Role</span>
          <select name="role" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm">
            <option value="USER">Brand/User</option>
            <option value="CREATOR">Creator</option>
          </select>
        </label>
      ) : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <Button disabled={loading} type="submit">
        {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
}
