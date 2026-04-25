import { prisma } from "@promohub/db";
import { apiError, ok } from "@/lib/http";
import { getUserFromRequest } from "@/lib/route-auth";

export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { page: true },
      orderBy: { createdAt: "desc" }
    });

    return ok({ items: bookings });
  } catch (error) {
    return apiError(error);
  }
}
