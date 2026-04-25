import { prisma } from "@promohub/db";
import { pageSchema } from "@promohub/shared";
import { apiError, ok } from "@/lib/http";
import { assertRole, getUserFromRequest } from "@/lib/route-auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const page = await prisma.promotionPage.findUnique({
      where: { id: params.id },
      include: { pricing: true, owner: true }
    });

    if (!page) {
      throw new Error("Page not found");
    }

    return ok({ page });
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = assertRole(request, ["CREATOR", "ADMIN"]);
    const json = await request.json();
    const data = pageSchema.parse(json);

    const existing = await prisma.promotionPage.findUnique({ where: { id: params.id } });
    if (!existing) {
      throw new Error("Page not found");
    }

    if (user.role !== "ADMIN" && existing.ownerId !== user.id) {
      throw new Error("You do not own this page");
    }

    const page = await prisma.promotionPage.update({
      where: { id: params.id },
      data
    });

    return ok({ page });
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = getUserFromRequest(request);
    const page = await prisma.promotionPage.findUnique({ where: { id: params.id } });
    if (!page) throw new Error("Page not found");
    if (user.role !== "ADMIN" && page.ownerId !== user.id) {
      throw new Error("You do not own this page");
    }

    await prisma.promotionPage.delete({ where: { id: params.id } });
    return ok({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
