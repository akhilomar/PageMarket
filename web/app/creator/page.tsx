import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@promohub/db";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCurrentUser } from "@/lib/auth";
import { currency } from "@/lib/utils";

export default async function CreatorDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [pages, bookings] = await Promise.all([
    prisma.promotionPage.findMany({
      where: { ownerId: user.id },
      include: { pricing: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.booking.findMany({
      where: { page: { ownerId: user.id } },
      include: { page: true, user: true },
      orderBy: { createdAt: "desc" }
    })
  ]);

  return (
    <main className="container-shell space-y-10 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-coral">Creator</p>
          <h1 className="text-4xl font-black">Manage your pages</h1>
        </div>
        <Link href="/pages/new">
          <Button>Add Page</Button>
        </Link>
      </div>
      <section className="grid gap-6 lg:grid-cols-2">
        {pages.map((page) => (
          <div key={page.id} className="glass-card space-y-4 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{page.pageName}</h2>
                <p className="text-sm text-ink/60">
                  {page.platform} . {page.city}
                </p>
              </div>
              <StatusBadge status={page.status} />
            </div>
            <div className="text-sm text-ink/75">
              Post: {currency(page.pricing?.postPrice)} . Reel: {currency(page.pricing?.reelPrice)}
            </div>
            <div className="flex gap-3">
              <Link href={`/pages/${page.id}/edit`}>
                <Button variant="ghost">Edit</Button>
              </Link>
              <Link href={`/creator/pricing?pageId=${page.id}`}>
                <Button variant="secondary">Pricing</Button>
              </Link>
            </div>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-black">Incoming bookings</h2>
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="glass-card flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{booking.campaignTitle}</p>
                <p className="text-sm text-ink/60">
                  {booking.page.pageName} . {booking.user.name}
                </p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

