import { redirect } from "next/navigation";
import { prisma } from "@promohub/db";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const [users, pages, bookings] = await Promise.all([
    prisma.user.count(),
    prisma.promotionPage.findMany({
      include: { owner: true },
      orderBy: { createdAt: "desc" },
      take: 8
    }),
    prisma.booking.count()
  ]);

  return (
    <main className="container-shell space-y-8 py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-coral">Admin</p>
        <h1 className="text-4xl font-black">Platform overview</h1>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="glass-card p-6">
          <p className="text-sm text-ink/60">Users</p>
          <p className="mt-2 text-4xl font-black">{users}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-ink/60">Pages</p>
          <p className="mt-2 text-4xl font-black">{pages.length}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-ink/60">Bookings</p>
          <p className="mt-2 text-4xl font-black">{bookings}</p>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-black">Recent page approvals</h2>
        <div className="grid gap-4">
          {pages.map((page) => (
            <div key={page.id} className="glass-card flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-semibold">{page.pageName}</p>
                <p className="text-sm text-ink/60">
                  {page.owner.name} . {page.platform}
                </p>
              </div>
              <StatusBadge status={page.status} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
