import { prisma } from "@promohub/db";
import { bookingStatusSchema } from "@promohub/shared";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = assertRole(request, ["CREATOR", "ADMIN"]);
    const json = await request.json();
    const data = bookingStatusSchema.parse(json);
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { page: true }
    });

    if (!booking) throw new Error("Booking not found");
    if (user.role !== "ADMIN" && booking.page.ownerId !== user.id) {
      throw new Error("You cannot manage this booking");
    }

    const updated = await prisma.booking.update({
      where: { id: params.id },
      data: {
        status: data.status,
        paymentStatus: data.paymentStatus
      }
    });

    return ok({ booking: updated });
  } catch (error) {
    return apiError(error);
  }
}
