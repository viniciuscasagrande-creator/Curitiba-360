import React from "react";
import {
  ORDER_STATUS_CONFIG,
} from "../constants/orderStatus";

export default function OrderStatusBadge({
  status,
}) {
  const config =
    ORDER_STATUS_CONFIG[status] ||
    ORDER_STATUS_CONFIG.pending;

  const Icon = config.icon;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold select-none",
        config.className,
      ].join(" ")}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}
