import { PageForm } from "@/components/forms/page-form";

export default function NewPagePage({
  searchParams
}: {
  searchParams: { profileUrl?: string; platform?: string };
}) {
  return (
    <main className="container-shell py-12">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-coral">Creator tools</p>
          <h1 className="text-4xl font-black">Add a promotion page</h1>
        </div>
        <PageForm initialProfileUrl={searchParams.profileUrl} initialPlatform={searchParams.platform} />
      </div>
    </main>
  );
}
