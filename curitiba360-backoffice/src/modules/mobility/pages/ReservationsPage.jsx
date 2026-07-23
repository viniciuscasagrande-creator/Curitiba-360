import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobilityDashboard } from "../hooks/useMobilityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Ticket } from "lucide-react";

export default function ReservationsPage() {
  const { reservations, loading } = useMobilityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando reservas de transporte...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/mobility" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Reservas & Bilhetes de Embarque</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore a aquisição de passagens integradas, opt-ins e validações via QR Code nos acessos dos micro-ônibus e vans.
          </p>
        </div>

        {/* Reservations list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Ticket size={18} className="text-purple-755" /> Registro de Reservas
          </h3>

          <div className="divide-y divide-slate-100">
            {reservations.map(res => (
              <div key={res.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 font-sans">
                  <strong className="text-slate-900 text-xs">ID Reserva: {res.id} (Cliente: {res.customerId})</strong>
                  <div className="flex gap-4 text-slate-455 text-[9px] font-mono">
                    <span>Quantidade: {res.passengerCount} passageiros</span>
                    <span>•</span>
                    <span>Origem: {res.pickupStopId}</span>
                    <span>•</span>
                    <span>Destino: {res.dropoffStopId}</span>
                  </div>
                  {res.qrCode && <span className="text-[9px] font-mono text-purple-700 block">QR-Code Hash: {res.qrCode}</span>}
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans font-bold">
                  <strong className="text-sm font-bold text-slate-700 font-mono">R$ {res.totalAmount.toLocaleString()}</strong>
                  <span className={`text-[8px] px-2 py-0.5 rounded border uppercase ${res.status === "confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}>
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
