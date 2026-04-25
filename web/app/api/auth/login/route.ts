import bcrypt from "bcryptjs";
import { prisma } from "@promohub/db";
import { loginSchema } from "@promohub/shared";
import { authCookie, signToken } from "@/lib/auth";
import { apiError, ok } from "@/lib/http";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = loginSchema.parse(json);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordsMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordsMatch) {
      throw new Error("Invalid email or password");
    }

    const token = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const response = ok({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

    if (!data.mobileClient) {
      response.cookies.set(authCookie.name, token, authCookie.options);
    }

    return response;
  } catch (error) {
    return apiError(error);
  }
}

