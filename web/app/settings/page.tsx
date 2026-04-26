import { redirect } from "next/navigation";
import { prisma } from "@promohub/db";
import { getCurrentUser } from "@/lib/auth";
import { SettingsForm } from "@/components/forms/settings-form";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      name: true,
      email: true,
      mobile: true,
      role: true
    }
  });

  if (!dbUser) redirect("/login");

  return (
    <main className="container-shell py-12">
      <SettingsForm user={dbUser} />
    </main>
  );
}

