import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "../../utils/cn";

const Select = forwardRef(
  (
    {
      id,
      label,
      error,
      options = [],
      placeholder = "Selecione",
      className,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-slate-800 text-left"
          >
            {label}

            {required && (
              <span className="ml-1 text-red-600">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-invalid={Boolean(error)}
            className={cn(
              "h-12 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm text-slate-900 outline-none transition",
              "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100",
              error
                ? "border-red-400"
                : "border-slate-300"
            )}
            {...props}
          >
            <option value="">
              {placeholder}
            </option>

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
        </div>

        {error && (
          <p className="text-xs font-medium text-red-600 text-left my-0">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export default Select;
