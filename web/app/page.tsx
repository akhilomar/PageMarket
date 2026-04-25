import Link from "next/link";
import { prisma } from "@promohub/db";
import { Button } from "@/components/ui/button";
import { PageCard } from "@/components/page-card";

export default async function HomePage() {
  const featuredPages = await prisma.promotionPage.findMany({
    where: { status: "APPROVED" },
    include: { pricing: true },
    take: 3,
    orderBy: { followersCount: "desc" }
  });

  return (
    <main className="container-shell space-y-16 py-12">
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
            Promotion marketplace for creators and brands
          </span>
          <h1 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl">
            Launch campaigns faster with verified creator pages across every major platform.
          </h1>
          <p className="max-w-2xl text-lg text-ink/70">
            PromoHub helps brands discover audience-fit creators, compare pricing, and book promotional slots from one shared web and mobile system.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/explore">
              <Button>Explore Pages</Button>
            </Link>
            <Link href="/register">
              <Button variant="ghost">Create Account</Button>
            </Link>
          </div>
        </div>
        <div className="glass-card p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-sand p-5">
              <p className="text-sm text-ink/55">Verified creators</p>
              <p className="mt-3 text-4xl font-black">500+</p>
            </div>
            <div className="rounded-3xl bg-white p-5">
              <p className="text-sm text-ink/55">Avg booking time</p>
              <p className="mt-3 text-4xl font-black">24h</p>
            </div>
            <div className="rounded-3xl bg-white p-5">
              <p className="text-sm text-ink/55">Cities covered</p>
              <p className="mt-3 text-4xl font-black">80+</p>
            </div>
            <div className="rounded-3xl bg-teal p-5 text-white">
              <p className="text-sm text-white/70">Supported apps</p>
              <p className="mt-3 text-4xl font-black">Web + Mobile</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-coral">Featured</p>
            <h2 className="text-3xl font-black">High-performing promotion pages</h2>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-teal">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredPages.map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      </section>
    </main>
  );
}

