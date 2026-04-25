import { prisma } from "@promohub/db";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function GET(request: Request) {
  try {
    assertRole(request, ["ADMIN"]);
    const items = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });
    return ok({ items });
  } catch (error) {
    return apiError(error);
  }
}
