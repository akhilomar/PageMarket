import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@promohub/db";
import { Button } from "@/components/ui/button";
import { currency, getInstagramUsernameFromUrl } from "@/lib/utils";

export default async function PageDetailPage({ params }: { params: { id: string } }) {
  const page = await prisma.promotionPage.findUnique({
    where: { id: params.id },
    include: { pricing: true, owner: true }
  });

  if (!page) notFound();
  const username = getInstagramUsernameFromUrl(page.pageUrl);

  return (
    <main className="container-shell grid gap-8 py-12 lg:grid-cols-[1.5fr_0.8fr]">
      <section className="glass-card space-y-6 p-8">
        <div className="overflow-hidden rounded-[2rem] bg-sand">
          {page.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={page.profileImage} alt={page.pageName} className="h-72 w-full object-cover" />
          ) : (
            <div className="flex h-72 items-center justify-center text-7xl font-black text-ink/30">
              {page.pageName.slice(0, 1)}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-coral">{page.platform}</p>
          <h1 className="text-4xl font-black">{page.pageName}</h1>
          <p className="mt-2 text-ink/65">
            {page.niche} . {page.city}, {page.state}
          </p>
          {username ? <p className="mt-2 text-sm font-semibold text-teal">@{username}</p> : null}
        </div>
        <p className="text-base leading-7 text-ink/75">{page.description || "No description added yet."}</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-sand p-4">
            <p className="text-sm text-ink/55">Followers</p>
            <p className="text-2xl font-black">{page.followersCount.toLocaleString()}</p>
          </div>
          <div className="rounded-3xl bg-sand p-4">
            <p className="text-sm text-ink/55">Average Views</p>
            <p className="text-2xl font-black">{page.averageViews?.toLocaleString() || "N/A"}</p>
          </div>
          <div className="rounded-3xl bg-sand p-4">
            <p className="text-sm text-ink/55">Engagement</p>
            <p className="text-2xl font-black">{page.engagementRate ? `${page.engagementRate}%` : "N/A"}</p>
          </div>
        </div>
      </section>
      <aside className="glass-card space-y-5 p-6">
        <h2 className="text-2xl font-black">Pricing</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Story</span>
            <span className="font-semibold">{currency(page.pricing?.storyPrice)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Post</span>
            <span className="font-semibold">{currency(page.pricing?.postPrice)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Reel</span>
            <span className="font-semibold">{currency(page.pricing?.reelPrice)}</span>
          </div>
        </div>
        <p className="text-sm text-ink/60">Creator: {page.owner.name}</p>
        <Link href={`/pages/${page.id}/book`}>
          <Button className="w-full">Book This Page</Button>
        </Link>
      </aside>
    </main>
  );
}
