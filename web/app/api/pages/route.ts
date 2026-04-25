import { prisma } from "@promohub/db";
import { pageSchema } from "@promohub/shared";
import { apiError, ok } from "@/lib/http";
import { getApprovedPages } from "@/lib/queries";
import { assertRole, getUserFromRequest } from "@/lib/route-auth";

export async function POST(request: Request) {
  try {
    const user = assertRole(request, ["CREATOR", "ADMIN"]);
    const json = await request.json();
    const data = pageSchema.parse(json);

    const page = await prisma.promotionPage.create({
      data: {
        ...data,
        ownerId: user.id
      }
    });

    return ok({ page }, 201);
  } catch (error) {
    return apiError(error);
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const isOwnerView = url.searchParams.get("owner") === "me";

    if (isOwnerView) {
      const user = getUserFromRequest(request);
      const pages = await prisma.promotionPage.findMany({
        where: { ownerId: user.id },
        include: { pricing: true },
        orderBy: { createdAt: "desc" }
      });
      return ok({ items: pages });
    }

    const data = await getApprovedPages({
      niche: url.searchParams.get("niche") || undefined,
      city: url.searchParams.get("city") || undefined,
      platform: url.searchParams.get("platform") || undefined,
      minPrice: url.searchParams.get("minPrice") || undefined,
      maxPrice: url.searchParams.get("maxPrice") || undefined,
      page: url.searchParams.get("page") || undefined,
      limit: url.searchParams.get("limit") || undefined
    });

    return ok(data);
  } catch (error) {
    return apiError(error);
  }
}
