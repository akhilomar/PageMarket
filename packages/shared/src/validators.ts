import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  mobile: z.string().min(8).max(20).optional(),
  role: z.enum(["USER", "CREATOR"]).default("USER")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  mobileClient: z.boolean().optional().default(false)
});

export const pricingSchema = z.object({
  pageId: z.string().uuid(),
  storyPrice: z.number().nonnegative(),
  postPrice: z.number().nonnegative(),
  reelPrice: z.number().nonnegative(),
  videoMentionPrice: z.number().nonnegative().optional(),
  customPackagePrice: z.number().nonnegative().optional()
});

export const pageSchema = z.object({
  pageName: z.string().min(2).max(120),
  platform: z.string().min(2).max(50),
  pageUrl: z.string().url(),
  niche: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  city: z.string().min(2).max(80),
  region: z.string().max(80).optional(),
  language: z.string().max(80).optional(),
  followersCount: z.number().int().nonnegative(),
  averageViews: z.number().int().nonnegative().optional(),
  engagementRate: z.number().nonnegative().optional(),
  audienceGender: z.string().max(50).optional(),
  audienceAgeGroup: z.string().max(50).optional(),
  audienceLocation: z.string().max(120).optional(),
  description: z.string().max(500).optional(),
  profileImage: z.string().url().optional(),
  analyticsImages: z.array(z.string().url()).default([])
});

export const pageStatusSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"])
});

export const bookingSchema = z.object({
  pageId: z.string().uuid(),
  promotionType: z.string().min(2).max(50),
  campaignTitle: z.string().min(3).max(120),
  campaignDescription: z.string().min(10).max(2000),
  contentLink: z.string().url().optional(),
  preferredDate: z.string().datetime(),
  budget: z.number().nonnegative().optional()
});

export const bookingStatusSchema = z.object({
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED", "COMPLETED", "CANCELLED"]),
  paymentStatus: z.enum(["UNPAID", "PAID", "REFUNDED"]).optional()
});
