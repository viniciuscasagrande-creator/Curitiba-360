import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import ParkingCard from "../components/ParkingCard";
import { useParking } from "../hooks/useParking";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ShieldCheck, CheckCircle } from "lucide-react";

export default function ParkingPage() {
  const { zones, loading, activateEstaR } = useParking();
  const [activeTicket, setActiveTicket] = useState(null);

  const handleActivate = async (zoneId, plate, duration) => {
    const res = await activateEstaR(zoneId, plate, duration);
    if (res.success) {
      setActiveTicket(res.data);
    }
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Estacionamento Regulamentado</h2>
          <p className="text-[10px] text-slate-500 m-0">Ative créditos de EstaR Digital para estacionar em vias públicas.</p>
        </div>

        {activeTicket && (
          <div className="bg-emerald-600 text-white p-4 rounded-3xl border border-emerald-500 space-y-3 shadow-md animate-fadeIn">
            <div className="flex items-center justify-between border-b border-emerald-500 pb-2">
              <span className="text-[9px] font-bold font-mono">EstaR Ativado com Sucesso</span>
              <CheckCircle size={16} className="text-white" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[8px] text-emerald-100 uppercase tracking-wider block font-mono">VEÍCULO</span>
                <strong className="text-sm font-extrabold font-mono">{activeTicket.vehiclePlate}</strong>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-emerald-100 uppercase tracking-wider block font-mono">EXPIRA EM</span>
                <strong className="text-sm font-extrabold font-mono flex items-center justify-end gap-1">
                  <Clock size={14} /> {activeTicket.durationMinutes} min
                </strong>
              </div>
            </div>
            <div className="text-[8px] text-emerald-100 font-mono">
              Recibo: {activeTicket.receiptId} • Custo: R$ {activeTicket.cost.toFixed(2)}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Zonas de Estacionamento Disponíveis</h3>
          {loading ? (
            <div className="text-center py-6 text-slate-400">Consultando vagas...</div>
          ) : (
            <div className="space-y-3">
              {zones.map((z) => (
                <ParkingCard key={z.id} zone={z} onActivate={handleActivate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SuperAppLayout>
  );
}
