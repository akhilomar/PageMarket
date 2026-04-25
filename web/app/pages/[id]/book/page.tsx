import { BookingForm } from "@/components/forms/booking-form";

export default function BookPage({ params }: { params: { id: string } }) {
  return (
    <main className="container-shell py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-black">Create Booking Request</h1>
        <BookingForm pageId={params.id} />
      </div>
    </main>
  );
}

