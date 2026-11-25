import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function ProfileSuccessAlert({ message }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 text-left select-none">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
      <span className="text-sm font-semibold">{message || "Ação realizada com sucesso."}</span>
    </div>
  );
}
