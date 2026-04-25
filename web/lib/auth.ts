import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { parse } from "cookie";
import type { AuthUser, Role } from "@promohub/shared";
import { env } from "./env";

const COOKIE_NAME = "promohub_token";
const ONE_WEEK = 60 * 60 * 24 * 7;

export interface AuthTokenPayload extends AuthUser {
  iat?: number;
  exp?: number;
}

export function signToken(user: AuthUser) {
  return jwt.sign(user, env.jwtSecret, { expiresIn: ONE_WEEK });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
}

export async function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function getRequestToken(request: { headers: Headers; cookies?: { get: (name: string) => { value: string } | undefined } }) {
  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return bearer.slice(7);
  }

  const requestCookie = request.cookies?.get(COOKIE_NAME)?.value;
  if (requestCookie) {
    return requestCookie;
  }

  const rawCookie = request.headers.get("cookie");
  if (!rawCookie) {
    return null;
  }

  return parse(rawCookie)[COOKIE_NAME] ?? null;
}

export function requireRole(userRole: Role, allowed: Role[]) {
  return allowed.includes(userRole);
}

export const authCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK
  }
};
