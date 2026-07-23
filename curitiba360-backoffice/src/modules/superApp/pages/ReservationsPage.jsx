import React from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import ReservationCard from "../components/ReservationCard";
import { useReservations } from "../hooks/useReservations";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarCheck } from "lucide-react";

export default function ReservationsPage() {
  const { reservations, loading, cancelReservation } = useReservations();

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div>
          <h2 className="text-xl font-extrabold text-slate-800 m-0">Minhas Reservas</h2>
          <p className="text-[10px] text-slate-500 m-0">Gerencie agendamentos em restaurantes, hotéis e atrações parceiras.</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Carregando agendamentos...</div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <CalendarCheck size={32} className="mx-auto text-slate-300" />
            <p className="text-xs">Nenhum agendamento ativo.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((res) => (
              <ReservationCard key={res.id} reservation={res} onCancel={cancelReservation} />
            ))}
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
