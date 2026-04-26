"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { PAGE_PLATFORMS } from "@promohub/shared";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ApiErrorPayload = {
  message?: string;
  errors?: {
    fieldErrors?: Record<string, string[] | undefined>;
    formErrors?: string[];
  };
};

function getApiErrorMessage(error: unknown) {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) {
    return "Unable to continue. Please check your details and try again.";
  }

  const data = error.response?.data;
  const fieldErrors = data?.errors?.fieldErrors;
  const formErrors = data?.errors?.formErrors;

  if (fieldErrors) {
    const firstFieldError = Object.values(fieldErrors).find(
      (messages): messages is string[] => Array.isArray(messages) && messages.length > 0
    );

    if (firstFieldError?.length) {
      return firstFieldError[0];
    }
  }

  if (formErrors?.length) {
    return formErrors[0];
  }

  if (data?.message) {
    return data.message;
  }

  return "Unable to continue. Please check your details and try again.";
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<"USER" | "CREATOR">("USER");
  const [selectedPagePlatform, setSelectedPagePlatform] = useState("Instagram");

  function getPostAuthPath(
    user: { role?: string },
    profileUrl?: string,
    pagePlatform?: string
  ) {
    if (user.role === "ADMIN") {
      return "/admin";
    }

    if (user.role === "CREATOR") {
      return profileUrl
        ? `/pages/new?profileUrl=${encodeURIComponent(profileUrl)}&platform=${encodeURIComponent(pagePlatform || "Instagram")}`
        : "/creator";
    }

    return "/dashboard";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const mobileValue = String(formData.get("mobile") || "").trim();
      const pageProfileValue = String(formData.get("pageProfileUrl") || "").trim();
      const payload =
        mode === "register"
          ? {
              name: String(formData.get("name")),
              email: String(formData.get("email")),
              password: String(formData.get("password")),
              role: String(formData.get("role")),
              ...(mobileValue ? { mobile: mobileValue } : {})
            }
          : {
              email: String(formData.get("email")),
              password: String(formData.get("password"))
            };

      const response = await api.post(`/auth/${mode}`, payload);
      const nextPath = getPostAuthPath(
        response.data?.user ?? {},
        mode === "register" && selectedRole === "CREATOR" ? pageProfileValue : undefined,
        mode === "register" && selectedRole === "CREATOR" ? selectedPagePlatform : undefined
      );

      window.location.assign(nextPath);
    } catch (err) {
      setError(getApiErrorMessage(err));
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
          <select
            name="role"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as "USER" | "CREATOR")}
            className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
          >
            <option value="USER">Brand/User</option>
            <option value="CREATOR">Creator</option>
          </select>
        </label>
      ) : null}
      {mode === "register" && selectedRole === "CREATOR" ? (
        <>
          <label className="flex flex-col gap-2 text-sm font-medium text-ink/80">
            <span>Page Platform</span>
            <select
              value={selectedPagePlatform}
              onChange={(event) => setSelectedPagePlatform(event.target.value)}
              className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
            >
              {PAGE_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Page Profile URL"
            name="pageProfileUrl"
            placeholder="https://instagram.com/yourhandle or other page link"
          />
        </>
      ) : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
      <Button disabled={loading} type="submit">
        {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
}
