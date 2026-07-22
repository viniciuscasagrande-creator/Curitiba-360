import React from "react";

export default function PreferenceSwitch({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 select-none text-left w-full">
      <div className="min-w-0">
        <p className="font-semibold text-slate-950 my-0">
          {title}
        </p>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500 my-0">
            {description}
          </p>
        )}
      </div>

      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) =>
          onChange(
            event.target.checked
          )
        }
        className="peer sr-only"
      />

      <span className="relative h-7 w-12 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-emerald-700 peer-disabled:opacity-50">
        <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
