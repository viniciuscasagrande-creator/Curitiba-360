import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

const Checkbox = forwardRef(
  (
    {
      id,
      label,
      checked,
      onChange,
      error,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", className)}>
        <label
          htmlFor={id}
          className={cn(
            "flex cursor-pointer items-start gap-3",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              ref={ref}
              id={id}
              type="checkbox"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className="peer absolute h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition checked:border-emerald-700 checked:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
              {...props}
            />
            <Check
              size={14}
              strokeWidth={3}
              className="pointer-events-none relative text-white opacity-0 transition peer-checked:opacity-100"
              aria-hidden="true"
            />
          </span>
          {label && (
            <span className="text-sm leading-5 text-slate-700 select-none">
              {label}
            </span>
          )}
        </label>
        {error && <p className="pl-8 text-xs text-red-600 select-none">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export default Checkbox;
