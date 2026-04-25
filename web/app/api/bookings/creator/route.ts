import { prisma } from "@promohub/db";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function GET(request: Request) {
  try {
    const user = assertRole(request, ["CREATOR", "ADMIN"]);
    const bookings = await prisma.booking.findMany({
      where: {
        page: {
          ownerId: user.id
        }
      },
      include: { page: true, user: true },
      orderBy: { createdAt: "desc" }
    });

    return ok({ items: bookings });
  } catch (error) {
    return apiError(error);
  }
}
