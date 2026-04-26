import { redirect } from "next/navigation";
import { prisma } from "@promohub/db";
import { StatusBadge } from "@/components/ui/status-badge";
import { AdminPageTable } from "@/components/admin-page-table";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const [users, totalPages, pageRecords, bookings] = await Promise.all([
    prisma.user.count(),
    prisma.promotionPage.count(),
    prisma.promotionPage.findMany({
      include: { owner: true, pricing: true },
      orderBy: { createdAt: "desc" },
      take: 50
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
          <p className="mt-2 text-4xl font-black">{totalPages}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-ink/60">Bookings</p>
          <p className="mt-2 text-4xl font-black">{bookings}</p>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">Registered pages</h2>
            <p className="text-sm text-ink/60">Review every submitted page, pricing snapshot, owner details, and set active or inactive status.</p>
          </div>
          <StatusBadge status="ADMIN" />
        </div>
        <AdminPageTable pages={pageRecords} />
      </section>
    </main>
  );
}
