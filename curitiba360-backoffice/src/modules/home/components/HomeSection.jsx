import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeSection({
  title,
  description,
  href,
  children,
}) {
  return (
    <section className="space-y-5 text-left">
      <div className="flex items-end justify-between gap-4 select-none">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl my-0">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-slate-600 my-0">
              {description}
            </p>
          )}
        </div>

        {href && (
          <Link
            to={href}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
          >
            Ver todos

            <ChevronRight
              size={17}
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}
