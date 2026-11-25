import React from "react";
import { PRODUCT_STATUS } from "../constants/productStatus";

export default function ProductStatusBadge({ status }) {
  const config = PRODUCT_STATUS[status] || PRODUCT_STATUS.draft;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold select-none",
        config.className,
      ].join(" ")}
    >
      {config.label}
    </span>
  );
}
