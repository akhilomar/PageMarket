import bcrypt from "bcryptjs";
import { prisma } from "@promohub/db";
import { registerSchema } from "@promohub/shared";
import { authCookie, signToken } from "@/lib/auth";
import { apiError, ok } from "@/lib/http";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = registerSchema.parse(json);

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    const password = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password,
        mobile: data.mobile,
        role: data.role
      }
    });

    const token = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const response = ok({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }, 201);
    response.cookies.set(authCookie.name, token, authCookie.options);
    return response;
  } catch (error) {
    return apiError(error);
  }
}

