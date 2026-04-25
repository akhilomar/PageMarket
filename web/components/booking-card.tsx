import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils";

export function BookingCard({
  booking
}: {
  booking: {
    id: string;
    campaignTitle: string;
    promotionType: string;
    preferredDate: string | Date;
    status: string;
    paymentStatus: string;
    page: { pageName: string };
  };
}) {
  return (
    <div className="glass-card space-y-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold">{booking.campaignTitle}</p>
          <p className="text-sm text-ink/60">
            {booking.page.pageName} . {booking.promotionType}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>Preferred Date</span>
        <span>{formatDate(booking.preferredDate)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>Payment</span>
        <StatusBadge status={booking.paymentStatus} />
      </div>
    </div>
  );
}

