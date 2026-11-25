import React from "react";
import { Minus, Plus } from "lucide-react";

export default function CartItemQuantity({
  value,
  minimum = 1,
  maximum = 10,
  disabled,
  onChange,
}) {
  const canDecrease = value > minimum;
  const canIncrease = value < maximum;

  return (
    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1">
      <button
        type="button"
        disabled={disabled || !canDecrease}
        onClick={() => onChange(value - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 border-none bg-transparent cursor-pointer"
        aria-label="Diminuir quantidade"
      >
        <Minus size={16} />
      </button>

      <span className="min-w-10 text-center text-sm font-bold text-slate-950">
        {value}
      </span>

      <button
        type="button"
        disabled={disabled || !canIncrease}
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 border-none bg-transparent cursor-pointer"
        aria-label="Aumentar quantidade"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
