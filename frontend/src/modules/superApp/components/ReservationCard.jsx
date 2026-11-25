import React from "react";
import { Calendar, Users, DollarSign, Ban } from "lucide-react";

export default function ReservationCard({ reservation = {}, onCancel = () => {} }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled": return "bg-rose-100 text-rose-800 border-rose-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const statusLabel = {
    confirmed: "Confirmada",
    cancelled: "Cancelada",
    completed: "Finalizada",
    no_show: "Não Compareceu"
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 space-y-3 font-sans animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
          {reservation.serviceType}
        </span>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getStatusColor(reservation.status)}`}>
          {statusLabel[reservation.status] || reservation.status}
        </span>
      </div>

      <div className="space-y-1 text-[10px] text-slate-655 font-mono">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-emerald-600" />
          <span>{reservation.date} às {reservation.startTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-emerald-600" />
          <span>{reservation.quantity} {reservation.quantity === 1 ? "Pessoa" : "Pessoas"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign size={12} className="text-emerald-600" />
          <span>Valor Pago: <b>R$ {reservation.paidAmount.toFixed(2)}</b></span>
        </div>
      </div>

      {reservation.voucherCode && reservation.status === "confirmed" && (
        <div className="bg-slate-50 p-2 rounded-xl text-center border border-dashed border-slate-200 font-mono text-[10px]">
          Voucher: <strong className="text-slate-900">{reservation.voucherCode}</strong>
        </div>
      )}

      {reservation.status === "confirmed" && (
        <button
          onClick={() => onCancel(reservation.id)}
          className="flex items-center justify-center gap-1 w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 font-bold text-[10px] rounded-xl border border-rose-100 transition cursor-pointer"
        >
          <Ban size={11} /> Cancelar Reserva
        </button>
      )}
    </div>
  );
}
