import bcrypt from "bcryptjs";
import { prisma } from "@promohub/db";
import { profileUpdateSchema } from "@promohub/shared";
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

export async function PUT(request: Request) {
  try {
    const authUser = getUserFromRequest(request);
    const json = await request.json();
    const data = profileUpdateSchema.parse(json);

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser && existingUser.id !== authUser.id) {
      throw new Error("Another account is already using this email.");
    }

    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        ...(data.password ? { password: await bcrypt.hash(data.password, 10) } : {})
      },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true
      }
    });

    return ok({ user: updatedUser });
  } catch (error) {
    return apiError(error);
  }
}
