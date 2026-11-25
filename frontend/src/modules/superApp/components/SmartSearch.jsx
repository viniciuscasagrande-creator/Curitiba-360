import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SmartSearch({ onSearch = () => {}, placeholder = "Buscar eventos, serviços, rotas..." }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="relative flex items-center gap-2 animate-fadeIn">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs transition"
        />
      </div>
      <button className="p-2 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition cursor-pointer">
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}
