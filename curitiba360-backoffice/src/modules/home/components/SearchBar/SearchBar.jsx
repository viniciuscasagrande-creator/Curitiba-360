import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Buscar atrações, eventos, hotéis..." }) {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-3 select-none">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full pl-12 pr-10 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            aria-label="Limpar busca"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
