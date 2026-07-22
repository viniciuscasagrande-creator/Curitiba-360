import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Coins } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useProduct } from "../hooks/useProduct";
import { updateProduct } from "../services/productService";

export default function ProductLotsPage() {
  const { id } = useParams();
  const { product, loading, reload } = useProduct(id);

  const [lotName, setLotName] = useState("");
  const [lotPrice, setLotPrice] = useState(0);
  const [lotQty, setLotQty] = useState(100);

  const handleAddLot = async (e) => {
    e.preventDefault();
    if (!lotName) return;

    const newLot = {
      id: `lot-${Date.now()}`,
      name: lotName,
      price: Number(lotPrice),
      fee: Number(lotPrice * 0.1),
      quantity: Number(lotQty),
      sold: 0,
      remaining: Number(lotQty),
      status: "active"
    };

    const currentLots = product.lots || [];
    await updateProduct(id, {
      lots: [...currentLots, newLot]
    });
    await reload();

    setLotName("");
    setLotPrice(0);
    window.alert("Lote adicionado com sucesso!");
  };

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/produtos"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Configurações
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Lotes de Ingressos
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Crie e configure lotes de ingressos com valores e quantidades customizadas.
            </p>
          </div>
        </header>

        <form onSubmit={handleAddLot} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid gap-4 sm:grid-cols-4 items-end">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome do Lote</label>
            <input
              value={lotName}
              onChange={(e) => setLotName(e.target.value)}
              placeholder="Ex: 1º Lote Meia Entrada"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Preço (R$)</label>
            <input
              type="number"
              value={lotPrice}
              onChange={(e) => setLotPrice(e.target.value)}
              placeholder="Ex: 45.00"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Quantidade</label>
            <input
              type="number"
              value={lotQty}
              onChange={(e) => setLotQty(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div className="sm:col-span-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer px-5 transition"
            >
              <Plus size={18} />
              Criar Lote
            </button>
          </div>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-slate-955 my-0 mb-4 font-bold text-slate-800">Lotes Ativos</h3>
          <div className="divide-y divide-slate-100">
            {(product.lots || []).map((lot) => (
              <div key={lot.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-955 my-0">{lot.name}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-0.5">
                    Preço: R$ {lot.price.toFixed(2)} • Qtd: {lot.quantity} (Vendidos: {lot.sold})
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                  {lot.status.toUpperCase()}
                </span>
              </div>
            ))}
            {(product.lots || []).length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6 my-0">Nenhum lote criado para este produto.</p>
            )}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
