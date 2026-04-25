import { prisma } from "@promohub/db";
import { apiError, ok } from "@/lib/http";
import { getUserFromRequest } from "@/lib/route-auth";

export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        createdAt: true
      }
    });

    return ok({ user: dbUser });
  } catch (error) {
    return apiError(error);
  }
}
