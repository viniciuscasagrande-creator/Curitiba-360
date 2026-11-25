import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnersB2b } from "../hooks/usePartnersB2b";
import { Link } from "react-router-dom";
import { ArrowLeft, Utensils } from "lucide-react";

export default function RestaurantsPage() {
  const { partners, loading } = usePartnersB2b();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando restaurantes...
        </div>
      </AdminLayout>
    );
  }

  const restaurants = partners.filter(p => p.type === "restaurant");

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Restaurantes & Gastronomia</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o cardápio, reservas de mesas ativas e combos gastronômicos cadastrados pelos parceiros.
          </p>
        </div>

        {/* Restaurants list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Utensils size={18} className="text-purple-755 font-bold" /> Restaurantes Credenciados
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {restaurants.map(r => (
              <div key={r.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{r.name}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {r.id} | Nota: {r.rating} ★ | Reservas Hoje: {r.activeBookings}</span>
                </div>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                  Ativo
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
