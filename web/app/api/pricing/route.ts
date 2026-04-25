import { prisma } from "@promohub/db";
import { pricingSchema } from "@promohub/shared";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function POST(request: Request) {
  try {
    const user = assertRole(request, ["CREATOR", "ADMIN"]);
    const json = await request.json();
    const data = pricingSchema.parse(json);

    const page = await prisma.promotionPage.findUnique({ where: { id: data.pageId } });
    if (!page) throw new Error("Page not found");
    if (user.role !== "ADMIN" && page.ownerId !== user.id) {
      throw new Error("You do not own this page");
    }

    const pricing = await prisma.pricing.create({
      data
    });

    return ok({ pricing }, 201);
  } catch (error) {
    return apiError(error);
  }
}
