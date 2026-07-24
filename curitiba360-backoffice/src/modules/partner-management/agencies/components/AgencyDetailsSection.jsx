import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { useState } from 'react';

export default function AgencyDetailsSection({
  title,
  description,
  icon: Icon,
  defaultOpen = true,
  children,
}) {
  const [open, setOpen] =
    useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left">
      <button
        type="button"
        onClick={() =>
          setOpen((current) => !current)
        }
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <Icon size={18} />
            </span>
          )}

          <div>
            <h3 className="text-sm font-black text-slate-900">
              {title}
            </h3>

            {description && (
              <p className="mt-1 text-xs font-medium text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>

        {open ? (
          <ChevronUp
            size={18}
            className="text-slate-400"
          />
        ) : (
          <ChevronDown
            size={18}
            className="text-slate-400"
          />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 p-5">
          {children}
        </div>
      )}
    </section>
  );
}
