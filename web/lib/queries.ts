import { prisma } from "@promohub/db";
import type { PageFilters } from "@promohub/shared";

export async function getApprovedPages(filters: PageFilters) {
  const page = Number(filters.page || 1);
  const limit = Math.min(Number(filters.limit || 9), 30);
  const skip = (page - 1) * limit;
  const minPrice = filters.minPrice ? Number(filters.minPrice) : undefined;
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : undefined;

  const where = {
    status: "APPROVED" as const,
    niche: filters.niche ? { contains: filters.niche, mode: "insensitive" as const } : undefined,
    city: filters.city ? { contains: filters.city, mode: "insensitive" as const } : undefined,
    platform: filters.platform ? { contains: filters.platform, mode: "insensitive" as const } : undefined,
    pricing: minPrice || maxPrice
      ? {
          postPrice: {
            gte: minPrice,
            lte: maxPrice
          }
        }
      : undefined
  };

  const [items, total] = await Promise.all([
    prisma.promotionPage.findMany({
      where,
      include: {
        owner: {
          select: { id: true, name: true, email: true }
        },
        pricing: true
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.promotionPage.count({ where })
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

