import React from "react";
import { Check } from "lucide-react";

export default function PreferenceCategoryCard({
  category,
  selected,
  onToggle,
}) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={() =>
        onToggle(category.id)
      }
      aria-pressed={selected}
      className={[
        "relative flex min-h-32 flex-col items-start rounded-2xl border p-4 text-left transition w-full cursor-pointer",
        selected
          ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100"
          : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-sm",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-10 w-10 items-center justify-center rounded-xl transition",
          selected
            ? "bg-emerald-700 text-white"
            : "bg-slate-100 text-slate-600",
        ].join(" ")}
      >
        <Icon
          size={19}
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 font-bold text-slate-955 my-0">
        {category.label}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500 my-0">
        {category.description}
      </p>

      {selected && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-white">
          <Check
            size={14}
            aria-hidden="true"
          />
        </span>
      )}
    </button>
  );
}
