import { forwardRef } from "react";

import { cn } from "../../utils/cn";

const Input = forwardRef(
  (
    {
      id,
      label,
      error,
      helperText,
      icon: Icon,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-800"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex h-12 items-center rounded-xl border bg-white px-3",
            "transition focus-within:ring-2",
            error
              ? "border-red-500 focus-within:ring-red-100"
              : [
                  "border-slate-300",
                  "focus-within:border-emerald-700",
                  "focus-within:ring-emerald-100",
                ]
          )}
        >
          {Icon && (
            <Icon
              size={19}
              className="mr-3 shrink-0 text-slate-400"
              aria-hidden="true"
            />
          )}

          <input
            ref={ref}
            id={id}
            className={cn(
              "h-full min-w-0 flex-1 bg-transparent border-none",
              "text-sm text-slate-955 outline-none",
              "placeholder:text-slate-400",
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
