import React from "react";

export default function CheckoutLoading({ message = "Processando compra..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4 select-none text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent" />
      <p className="text-sm font-semibold text-slate-650 animate-pulse">
        {message}
      </p>
    </div>
  );
}
