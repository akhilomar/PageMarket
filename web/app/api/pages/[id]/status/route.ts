import { prisma } from "@promohub/db";
import { pageStatusSchema } from "@promohub/shared";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    assertRole(request, ["ADMIN"]);
    const json = await request.json();
    const data = pageStatusSchema.parse(json);

    const page = await prisma.promotionPage.update({
      where: { id: params.id },
      data: {
        status: data.status
      }
    });

    return ok({ page });
  } catch (error) {
    return apiError(error);
  }
}
