import { redirect } from "next/navigation";
import { prisma } from "@promohub/db";
import { PricingForm } from "@/components/forms/pricing-form";
import { getCurrentUser } from "@/lib/auth";

export default async function PricingManagementPage({
  searchParams
}: {
  searchParams: { pageId?: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!searchParams.pageId) redirect("/creator");

  const page = await prisma.promotionPage.findFirst({
    where: { id: searchParams.pageId, ownerId: user.id },
    include: { pricing: true }
  });

  if (!page) redirect("/creator");

  return (
    <main className="container-shell space-y-6 py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-coral">Pricing</p>
        <h1 className="text-4xl font-black">Manage pricing for {page.pageName}</h1>
      </div>
      <PricingForm pageId={page.id} pricing={page.pricing || undefined} pricingId={page.pricing?.id} />
    </main>
  );
}

