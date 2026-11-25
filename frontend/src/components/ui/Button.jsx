import { forwardRef } from "react";
import { LoaderCircle } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "../../utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-semibold",
    "transition",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-emerald-600",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    "disabled:opacity-60",
    "cursor-pointer border-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-700 text-white hover:bg-emerald-800",
        secondary:
          "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
        outline:
          "border border-emerald-700 bg-transparent text-emerald-700 hover:bg-emerald-50",
        ghost:
          "bg-transparent text-slate-700 hover:bg-slate-100",
        danger:
          "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-base",
        icon: "h-11 w-11",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

const Button = forwardRef(
  (
    {
      children,
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          className
        )}
        {...props}
      >
        {loading && (
          <LoaderCircle
            size={18}
            className="animate-spin"
            aria-hidden="true"
          />
        )}

        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;