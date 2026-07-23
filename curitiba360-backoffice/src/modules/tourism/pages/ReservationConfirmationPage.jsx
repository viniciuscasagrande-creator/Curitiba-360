import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reservationService } from '../services/ReservationService';
import { CheckCircle2, Ticket, Calendar, Clock, MapPin, Download, ArrowRight, User } from 'lucide-react';

export function ReservationConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const list = await reservationService.getUserReservations();
        const found = list.find((r) => r.id === id);
        setReservation(found || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <p>Carregando dados da sua reserva...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center text-rose-400 font-bold">
        Reserva não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
      {/* Confirmation Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Reserva Confirmada! 🎉
        </h1>
        <p className="text-xs text-slate-400">
          Código da Reserva: <span className="font-mono text-amber-400 font-bold">{reservation.id}</span>
        </p>
      </div>

      {/* Voucher Digital */}
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
              <Ticket size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Voucher Turístico Oficial</span>
              <h2 className="text-lg font-black text-white">{reservation.attractionName}</h2>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {reservation.status}
          </span>
        </div>

        {/* QR Code */}
        <div className="text-center space-y-3">
          <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto border-4 border-slate-800 shadow-xl">
            <img src={reservation.qrCodeUrl} alt="QR Code Voucher" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-mono text-slate-400 block">Código do Voucher: {reservation.voucherCode}</span>
        </div>

        {/* Detalhes da Visita */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-500 block mb-0.5">Data Agendada</span>
              <span className="font-bold text-slate-200 flex items-center gap-1">
                <Calendar size={14} className="text-amber-400" />
                {reservation.visitDate}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Horário</span>
              <span className="font-bold text-slate-200 flex items-center gap-1">
                <Clock size={14} className="text-amber-400" />
                {reservation.visitTime}
              </span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5">Participantes ({reservation.quantity})</span>
            <div className="space-y-1">
              {reservation.participants && reservation.participants.map((p, idx) => (
                <span key={idx} className="font-semibold text-slate-300 block flex items-center gap-1">
                  <User size={13} className="text-amber-400" />
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => alert('Voucher baixado com sucesso!')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            <Download size={15} />
            Baixar Voucher PDF
          </button>

          <button
            onClick={() => navigate('/reservas')}
            className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold shadow-md transition-colors"
          >
            Minhas Reservas
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ReservationConfirmationPage;
