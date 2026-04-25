import type { Role } from "@promohub/shared";
import { getRequestToken, requireRole, verifyToken } from "./auth";

export function getUserFromRequest(request: { headers: Headers; cookies?: { get: (name: string) => { value: string } | undefined } }) {
  const token = getRequestToken(request);
  if (!token) {
    throw new Error("Authentication required");
  }

  return verifyToken(token);
}

export function assertRole(request: { headers: Headers; cookies?: { get: (name: string) => { value: string } | undefined } }, roles: Role[]) {
  const user = getUserFromRequest(request);
  if (!requireRole(user.role, roles)) {
    throw new Error("You do not have access to this resource");
  }

  return user;
}
