import { type Order } from "@shared/schema";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OrderStatusProps {
  status: Order["status"];
  className?: string;
}

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
} as const;

export function OrderStatus({ status, className }: OrderStatusProps) {
  // Type assertion to ensure status is a valid key
  const statusKey = status as keyof typeof STATUS_COLORS;
  const statusLabel = ORDER_STATUS_LABELS[statusKey];

  return (
    <Badge
      variant="secondary"
      className={cn(STATUS_COLORS[statusKey], className)}
    >
      {statusLabel}
    </Badge>
  );
}