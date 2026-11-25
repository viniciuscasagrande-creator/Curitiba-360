import React from "react";
import { cn } from "../../utils/cn";

export function Card({
  children,
  className,
  padding = "default",
  shadow = "sm",
  ...props
}) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white",
        paddingClasses[padding],
        shadowClasses[shadow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn("mb-6", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h2
      className={cn(
        "text-xl font-bold tracking-tight text-slate-955",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn("mt-2 text-sm leading-6 text-slate-600", className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn("mt-6", className)}>
      {children}
    </div>
  );
}

export default Card;
