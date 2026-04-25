import { redirect } from "next/navigation";
import { prisma } from "@promohub/db";
import { BookingCard } from "@/components/booking-card";
import { getCurrentUser } from "@/lib/auth";

export default async function UserDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: { page: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="container-shell space-y-8 py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-coral">Dashboard</p>
        <h1 className="text-4xl font-black">Your bookings</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </main>
  );
}

