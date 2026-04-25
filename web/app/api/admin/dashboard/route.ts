import { prisma } from "@promohub/db";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function GET(request: Request) {
  try {
    assertRole(request, ["ADMIN"]);
    const [users, creators, pages, pendingPages, bookings, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "CREATOR" } }),
      prisma.promotionPage.count(),
      prisma.promotionPage.count({ where: { status: "PENDING" } }),
      prisma.booking.count(),
      prisma.booking.aggregate({
        _sum: {
          budget: true
        },
        where: { paymentStatus: "PAID" }
      })
    ]);

    return ok({
      metrics: {
        users,
        creators,
        pages,
        pendingPages,
        bookings,
        paidRevenue: revenue._sum.budget || 0
      }
    });
  } catch (error) {
    return apiError(error);
  }
}
