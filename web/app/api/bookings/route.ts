import { prisma } from "@promohub/db";
import { bookingSchema } from "@promohub/shared";
import { apiError, ok } from "@/lib/http";
import { assertRole } from "@/lib/route-auth";

export async function POST(request: Request) {
  try {
    const user = assertRole(request, ["USER", "ADMIN"]);
    const json = await request.json();
    const data = bookingSchema.parse(json);

    const booking = await prisma.booking.create({
      data: {
        ...data,
        userId: user.id,
        preferredDate: new Date(data.preferredDate)
      }
    });

    return ok({ booking }, 201);
  } catch (error) {
    return apiError(error);
  }
}
