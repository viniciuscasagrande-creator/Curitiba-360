import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnersB2b } from "../hooks/usePartnersB2b";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BookingsPage() {
  const { bookings, addBooking, loading } = usePartnersB2b();
  const [partner, setPartner] = useState("Gran Hotel Curitiba");
  const [customer, setCustomer] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    if (!customer) return;
    addBooking({
      id: "b-" + Date.now(),
      partnerName: partner,
      customerName: customer,
      date: "2026-07-26",
      value: 350,
      status: "confirmed"
    });
    setCustomer("");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando motor de reservas...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Motor de Reservas & Disponibilidade</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie reservas ativas, bloqueios de datas e sincronização de disponibilidade.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Booking form */}
          <form onSubmit={handleBooking} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 h-fit">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
              <Calendar size={14} className="text-purple-755" /> Criar Reserva
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Parceiro</label>
              <select value={partner} onChange={(e) => setPartner(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="Gran Hotel Curitiba">Gran Hotel Curitiba</option>
                <option value="Churrascaria Curitibana">Churrascaria Curitibana</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-705">Nome do Cliente</label>
              <input type="text" placeholder="Nome Completo" value={customer} onChange={(e) => setCustomer(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>

            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
              Confirmar Reserva
            </button>
          </form>

          {/* Bookings list */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Reservas Recentes</h3>
            <div className="divide-y divide-slate-100 font-mono text-[10px]">
              {bookings.map(b => (
                <div key={b.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                  <div>
                    <strong className="text-slate-900 text-xs block">{b.customerName}</strong>
                    <span className="text-[10px] text-slate-505 block">ID: {b.id} | Parceiro: {b.partnerName} | Valor: R$ {b.value.toFixed(2)}</span>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
