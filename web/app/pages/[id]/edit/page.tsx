import { notFound, redirect } from "next/navigation";
import { prisma } from "@promohub/db";
import { PageForm } from "@/components/forms/page-form";
import { getCurrentUser } from "@/lib/auth";

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const page = await prisma.promotionPage.findUnique({ where: { id: params.id } });
  if (!page) notFound();
  if (user.role !== "ADMIN" && page.ownerId !== user.id) {
    redirect("/dashboard");
  }

  return (
    <main className="container-shell py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Edit Promotion Page</h1>
        <PageForm page={page} redirectTo={user.role === "ADMIN" ? "/admin" : "/creator"} />
      </div>
    </main>
  );
}
