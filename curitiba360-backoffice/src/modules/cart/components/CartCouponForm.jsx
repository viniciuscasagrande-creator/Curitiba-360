import React, { useState } from "react";
import { CheckCircle2, Tag, X } from "lucide-react";

export default function CartCouponForm({
  coupon,
  saving,
  onApply,
  onRemove,
}) {
  const [code, setCode] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!code.trim()) {
      return;
    }

    try {
      await onApply(code);
      setCode("");
    } catch (err) {
      window.alert(err.message || "Não foi possível aplicar o cupom.");
    }
  }

  if (coupon?.code) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 select-none text-left">
        <div className="flex items-center gap-3">
          <CheckCircle2
            size={20}
            className="text-emerald-700"
          />

          <div>
            <p className="text-sm font-bold text-emerald-900 my-0">
              Cupom {coupon.code}
            </p>

            <p className="text-xs text-emerald-700 my-0 mt-0.5">
              Desconto aplicado
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={onRemove}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-emerald-800 transition hover:bg-emerald-100 border-none bg-transparent cursor-pointer"
          aria-label="Remover cupom"
        >
          <X size={17} />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 select-none text-left"
    >
      <label className="text-sm font-bold text-slate-950 block">
        Cupom de desconto
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={code}
            onChange={(event) =>
              setCode(event.target.value.toUpperCase())
            }
            placeholder="Digite o cupom"
            className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm font-semibold uppercase outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <button
          type="submit"
          disabled={saving || !code.trim()}
          className="h-12 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer border-none"
        >
          Aplicar
        </button>
      </div>

      <p className="text-xs text-slate-500 my-0">
        Cupons de teste: CURITIBA10 e BEMVINDO20.
      </p>
    </form>
  );
}
