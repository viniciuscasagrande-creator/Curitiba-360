import React from "react";
import { AlertCircle } from "lucide-react";

export default function CheckoutError({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 select-none text-left animate-shake">
      <AlertCircle size={20} className="text-red-700 shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-bold text-red-900 my-0">
          Ops, ocorreu um erro
        </h4>
        <p className="mt-0.5 text-xs text-red-700 my-0 leading-5">
          {message}
        </p>
      </div>
    </div>
  );
}
