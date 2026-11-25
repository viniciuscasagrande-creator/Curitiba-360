import React from "react";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function InstallmentsSelector({ total = 0, selectedValue, onChange }) {
  const options = Array.from({ length: 12 }).map((_, idx) => {
    const months = idx + 1;
    const isInterestFree = months <= 3;
    const interestRate = isInterestFree ? 0 : 0.02; // 2% interest rate for >3x
    const finalAmount = total * (1 + interestRate * (months - 3 > 0 ? months - 3 : 0));
    const installmentValue = finalAmount / months;

    return {
      value: months,
      label: `${months}x de ${formatCurrency(installmentValue)} ${isInterestFree ? "sem juros" : `com juros (Total: ${formatCurrency(finalAmount)})`}`,
    };
  });

  return (
    <div className="space-y-1 select-none text-left mt-4">
      <label className="text-xs font-bold text-slate-700 block mb-1">Parcelamento</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
