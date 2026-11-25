import React, { forwardRef } from "react";

import { cn } from "../../utils/cn";

const Textarea = forwardRef(
  (
    {
      id,
      label,
      error,
      helperText,
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

        <textarea
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          className={cn(
            "min-h-32 w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition",
            "placeholder:text-slate-400",
            "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100",
            error
              ? "border-red-400"
              : "border-slate-300"
          )}
          {...props}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            {error && (
              <p className="text-xs font-medium text-red-600 text-left my-0">
                {error}
              </p>
            )}

            {!error && helperText && (
              <p className="text-xs text-slate-500 text-left my-0">
                {helperText}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
