import React from "react";
import { AlertCircle } from "lucide-react";

export default function ProfileErrorAlert({ message }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 text-left select-none">
      <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
      <span className="text-sm font-semibold">{message || "Não foi possível realizar esta ação."}</span>
    </div>
  );
}
