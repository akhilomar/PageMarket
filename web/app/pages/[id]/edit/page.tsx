import { notFound } from "next/navigation";
import { prisma } from "@promohub/db";
import { PageForm } from "@/components/forms/page-form";

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const page = await prisma.promotionPage.findUnique({ where: { id: params.id } });
  if (!page) notFound();

  return (
    <main className="container-shell py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Edit Promotion Page</h1>
        <PageForm page={page} />
      </div>
    </main>
  );
}

