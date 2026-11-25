import React from "react";
import { Search } from "lucide-react";
import { PRODUCT_TYPES } from "../constants/productTypes";
import { PRODUCT_STATUS } from "../constants/productStatus";
import { PRODUCT_CATEGORIES } from "../constants/productCategories";

export default function ProductFilters({
  filters,
  onChange,
}) {
  const handleSearchChange = (e) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleSelectChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 select-none text-left">
      <div className="grid gap-4 sm:grid-cols-4">
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Buscar produto
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={filters.search || ""}
              onChange={handleSearchChange}
              placeholder="Digite o título do atrativo ou evento..."
              className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white transition"
            />
          </div>
        </div>

        {/* Product Type Filter */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Tipo
          </label>
          <select
            value={filters.type || "all"}
            onChange={(e) =>
              handleSelectChange("type", e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white cursor-pointer"
          >
            <option value="all">Todos os tipos</option>
            {Object.entries(PRODUCT_TYPES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Status Filter */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Status
          </label>
          <select
            value={filters.status || "all"}
            onChange={(e) =>
              handleSelectChange("status", e.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white cursor-pointer"
          >
            <option value="all">Todos os status</option>
            {Object.entries(PRODUCT_STATUS).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
