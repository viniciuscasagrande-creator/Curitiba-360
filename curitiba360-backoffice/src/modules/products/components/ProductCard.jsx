import React from "react";
import { Link } from "react-router-dom";
import { Edit2, Copy, Trash2, Eye, MapPin, CalendarDays, Coins } from "lucide-react";
import ProductStatusBadge from "./ProductStatusBadge";
import { PRODUCT_TYPES } from "../constants/productTypes";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function ProductCard({
  product,
  onDuplicate,
  onDelete,
}) {
  const typeLabel = PRODUCT_TYPES[product.type]?.label || product.type;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition select-none text-left flex flex-col justify-between h-[360px]">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {typeLabel}
          </span>
          <ProductStatusBadge status={product.status} />
        </div>

        <h3 className="mt-3 text-lg font-bold text-slate-950 line-clamp-2 my-0">
          {product.title}
        </h3>

        <p className="mt-2 text-xs text-slate-505 line-clamp-2 my-0">
          {product.shortDescription}
        </p>

        <div className="mt-4 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{product.location.address}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Coins size={14} className="text-slate-400 shrink-0" />
            <span>
              {product.pricing.type === "free"
                ? "Gratuito"
                : formatCurrency(product.pricing.basePrice)}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 mt-4">
        {/* Simple KPIs view */}
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-slate-500 mb-4">
          <div>
            <span className="block text-slate-800 text-xs font-bold">
              {product.analytics?.views || 0}
            </span>
            Visitas
          </div>
          <div>
            <span className="block text-slate-800 text-xs font-bold">
              {product.analytics?.conversions || 0}
            </span>
            Vendas
          </div>
          <div>
            <span className="block text-slate-800 text-xs font-bold">
              {formatCurrency(product.analytics?.revenue || 0)}
            </span>
            Receita
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link
            to={`/parceiro/produtos/${product.id}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-decoration-none transition cursor-pointer"
          >
            <Eye size={14} />
            Visualizar
          </Link>

          <div className="flex gap-1">
            <Link
              to={`/parceiro/produtos/${product.id}/editar`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
              title="Editar"
            >
              <Edit2 size={14} />
            </Link>

            <button
              type="button"
              onClick={() => onDuplicate(product.id)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
              title="Duplicar"
            >
              <Copy size={14} />
            </button>

            {product.status === "draft" && (
              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-white text-red-650 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
                title="Excluir Rascunho"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
