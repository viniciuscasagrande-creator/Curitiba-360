import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Monitor, Tablet, Smartphone } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useProduct } from "../hooks/useProduct";

export default function ProductPreviewPage() {
  const { id } = useParams();
  const { product, loading } = useProduct(id);
  const [device, setDevice] = useState("desktop");

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  if (!product) {
    return (
      <PartnerLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          Produto não encontrado.
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-7xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/parceiro/produtos"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
            >
              <ArrowLeft size={19} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-955 my-0">
                Visualização do Produto
              </h1>
              <p className="text-xs text-slate-500 my-0 mt-0.5">
                Revise a apresentação da página do produto antes de publicá-lo.
              </p>
            </div>
          </div>

          {/* Device toggle switches */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setDevice("desktop")}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition cursor-pointer border-none ${
                device === "desktop" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
              title="Desktop View"
            >
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition cursor-pointer border-none ${
                device === "tablet" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
              title="Tablet View"
            >
              <Tablet size={18} />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition cursor-pointer border-none ${
                device === "mobile" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
              title="Mobile View"
            >
              <Smartphone size={18} />
            </button>
          </div>
        </header>

        {/* Device simulator wrapper */}
        <div className="flex justify-center bg-slate-100 rounded-3xl p-6 border border-slate-200 overflow-hidden min-h-[500px]">
          <div
            className={`bg-white rounded-2xl shadow-md p-6 transition-all duration-300 border border-slate-200 ${
              device === "mobile"
                ? "max-w-[375px] w-full"
                : device === "tablet"
                ? "max-w-[768px] w-full"
                : "max-w-5xl w-full"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              {product.type.toUpperCase()}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-950 my-0">{product.title}</h2>
            <p className="mt-2 text-sm text-slate-655 my-0 leading-relaxed font-semibold">
              {product.shortDescription}
            </p>
            <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-505 space-y-2">
              <p className="my-0">
                <strong>Endereço:</strong> {product.location?.address}
              </p>
              <p className="my-0">
                <strong>Preço Base:</strong> R$ {product.pricing?.basePrice?.toFixed(2)}
              </p>
              <p className="my-0">
                <strong>Capacidade máxima:</strong> {product.capacity?.maxCapacity} participantes
              </p>
            </div>
            <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">Descrição Detalhada</h4>
              <p className="text-xs text-slate-600 leading-relaxed my-0">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
