import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  CircleAlert,
  Info,
} from "lucide-react";

import { cn } from "../../utils/cn";

const variants = {
  info: {
    container: "border-blue-200 bg-blue-50 text-blue-900",
    icon: Info,
    iconClass: "text-blue-600",
  },
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-900",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-900",
    icon: CircleAlert,
    iconClass: "text-amber-600",
  },
  danger: {
    container: "border-red-200 bg-red-50 text-red-900",
    icon: AlertCircle,
    iconClass: "text-red-600",
  },
};

export function Alert({
  title,
  children,
  variant = "info",
  className,
}) {
  const selectedVariant = variants[variant] ?? variants.info;
  const Icon = selectedVariant.icon;

  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-xl border p-4 text-left",
        selectedVariant.container,
        className
      )}
    >
      <Icon
        size={20}
        className={cn("mt-0.5 shrink-0", selectedVariant.iconClass)}
        aria-hidden="true"
      />

      <div className="min-w-0">
        {title && (
          <p className="text-sm font-semibold select-none">{title}</p>
        )}

        {children && (
          <div className="mt-1 text-sm leading-5 opacity-90 select-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default Alert;
