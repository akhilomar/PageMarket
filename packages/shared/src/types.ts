export type Role = "USER" | "CREATOR" | "ADMIN";
export type PageStatus = "PENDING" | "APPROVED" | "REJECTED";
export type BookingStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface PageFilters {
  niche?: string;
  city?: string;
  platform?: string;
  minPrice?: string;
  maxPrice?: string;
  minFollowers?: string;
  maxFollowers?: string;
  page?: string;
  limit?: string;
}
