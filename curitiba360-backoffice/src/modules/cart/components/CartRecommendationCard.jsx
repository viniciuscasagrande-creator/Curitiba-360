import React from "react";
import { Sparkles, Plus } from "lucide-react";

export default function CartRecommendationCard({ onAddRecommended }) {
  const recommendedItem = {
    productId: "museu-oscar-niemeyer",
    slug: "museu-oscar-niemeyer",
    type: "experience",
    title: "Museu Oscar Niemeyer (MON)",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&auto=format&fit=crop&q=80",
    location: "Centro Cívico, Curitiba",
    date: "2026-08-19",
    time: "10:00",
    ticketType: "Ingresso Inteira",
    lotId: null,
    lotName: null,
    sector: null,
    quantity: 1,
    unitPrice: 30.0,
    serviceFeeRate: 0.1,
    stock: 50,
    minimumQuantity: 1,
    maximumQuantity: 10,
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm select-none text-left flex gap-4 items-center">
      <img
        src={recommendedItem.image}
        alt={recommendedItem.title}
        className="h-20 w-20 rounded-2xl object-cover bg-slate-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
          <Sparkles size={12} className="fill-emerald-100" />
          Recomendado para você
        </div>
        <h4 className="mt-1 text-sm font-bold text-slate-900 truncate my-0">
          {recommendedItem.title}
        </h4>
        <p className="mt-0.5 text-xs text-slate-500 my-0">
          R$ 30,00 • Ingresso Inteira
        </p>
      </div>
      <button
        onClick={() => onAddRecommended(recommendedItem)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-700 hover:text-white transition cursor-pointer border-none"
        title="Adicionar ao carrinho"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
