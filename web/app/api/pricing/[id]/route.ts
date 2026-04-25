import { prisma } from "@promohub/db";
import { pricingSchema } from "@promohub/shared";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const pricing = await prisma.pricing.findUnique({
      where: { pageId: params.id }
    });

    return ok({ pricing });
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = assertRole(request, ["CREATOR", "ADMIN"]);
    const json = await request.json();
    const data = pricingSchema.parse(json);
    const pricing = await prisma.pricing.findUnique({
      where: { id: params.id },
      include: { page: true }
    });

    if (!pricing) throw new Error("Pricing not found");
    if (user.role !== "ADMIN" && pricing.page.ownerId !== user.id) {
      throw new Error("You do not own this pricing record");
    }

    const updated = await prisma.pricing.update({
      where: { id: params.id },
      data
    });

    return ok({ pricing: updated });
  } catch (error) {
    return apiError(error);
  }
}
