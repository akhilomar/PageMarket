import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        status === "APPROVED" && "bg-emerald-100 text-emerald-700",
        status === "PENDING" && "bg-amber-100 text-amber-700",
        status === "REJECTED" && "bg-rose-100 text-rose-700",
        status === "PAID" && "bg-sky-100 text-sky-700",
        status === "COMPLETED" && "bg-teal-100 text-teal-700",
        ["ACCEPTED", "USER", "CREATOR", "ADMIN"].includes(status) && "bg-indigo-100 text-indigo-700"
      )}
    >
      {status}
    </span>
  );
}

