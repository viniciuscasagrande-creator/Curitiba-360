import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../hooks/useReservation';
import { Calendar, Clock, MapPin, Ticket, Navigation, XCircle, ArrowLeft } from 'lucide-react';

export function MyReservationsPage() {
  const navigate = useNavigate();
  const { reservations, loading, cancelReservation } = useReservation();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'completed', 'cancelled'

  const filteredReservations = reservations.filter((r) => {
    if (activeTab === 'upcoming') return r.status === 'confirmed' || r.status === 'pending';
    if (activeTab === 'completed') return r.status === 'used';
    if (activeTab === 'cancelled') return r.status === 'cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/turismo')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para Turismo
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Gestão Turística</span>
          <h1 className="text-3xl font-extrabold text-white">Minhas Reservas</h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeTab === 'upcoming' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Próximas
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeTab === 'completed' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Concluídas
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-xl transition-colors ${activeTab === 'cancelled' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Canceladas
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400">Carregando suas reservas...</div>
      ) : filteredReservations.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-amber-400 mx-auto flex items-center justify-center">
            <Ticket size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-200">Nenhuma reserva nesta categoria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Você ainda não possui agendamentos nesta aba. Explore os atrativos de Curitiba e planeje seu roteiro!
          </p>
          <button
            onClick={() => navigate('/turismo')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Explorar Atrativos
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((res) => (
            <div
              key={res.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">Reserva: {res.id}</span>
                  <h3 className="text-lg font-bold text-white">{res.attractionName}</h3>
                </div>
                <span className={`px-3 py-1 text-xs font-extrabold uppercase rounded-full self-start sm:self-auto ${
                  res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {res.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-amber-400 shrink-0" />
                  <span>Data: <strong>{res.visitDate}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <span>Horário: <strong>{res.visitTime}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-amber-400 shrink-0" />
                  <span className="truncate">{res.attractionAddress}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/reservas/${res.id}/confirmacao`)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Ver Voucher Digital
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.attractionName)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                  >
                    <Navigation size={14} className="text-amber-400" />
                    Solicitar Rota
                  </a>
                </div>

                {res.status === 'confirmed' && (
                  <button
                    onClick={() => cancelReservation(res.id)}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                  >
                    <XCircle size={14} />
                    Cancelar Reserva
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default MyReservationsPage;
