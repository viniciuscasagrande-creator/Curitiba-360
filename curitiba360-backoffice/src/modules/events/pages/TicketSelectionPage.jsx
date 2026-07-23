import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTicketSelection } from '../hooks/useTicketSelection';
import TicketLotCard from '../components/TicketLotCard';
import { Ticket, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

export function TicketSelectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    event,
    lots,
    selected,
    subtotal,
    taxes,
    total,
    loading,
    error,
    add,
    remove,
    continue: handleContinue
  } = useTicketSelection(id || 'EVT-9001');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <p>Carregando lotes do evento...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center text-rose-400 font-bold">
        {error || 'Evento não encontrado.'}
      </div>
    );
  }

  const selectedCount = Object.values(selected).reduce((acc, q) => acc + q, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-32">
      {/* Voltar */}
      <button
        onClick={() => navigate(`/events/${event.id}`)}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para os detalhes do evento
      </button>

      {/* Header da Seleção */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Etapa 1 de 3</span>
          <h1 className="text-2xl font-extrabold text-white">{event.nome}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{event.venue} • {event.dataInicio}</p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          Limite por comprador: <span className="font-bold text-amber-400">{event.limitePorComprador || 6} ingressos</span>
        </div>
      </div>

      {/* Lista de Lotes */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
          <Ticket size={20} className="text-amber-400" />
          Selecione os Lotes Desejados
        </h2>

        {lots.map((lot) => (
          <TicketLotCard
            key={lot.id}
            lot={lot}
            selectedQuantity={selected[lot.id] || 0}
            onAdd={add}
            onRemove={remove}
            serviceFeePct={event.taxaServicoPct || 10}
            limitPerBuyer={event.limitePorComprador || 6}
          />
        ))}
      </div>

      {/* Resumo Flutuante Inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-xl p-4 z-40 shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
              <ShoppingBag size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">
                {selectedCount} {selectedCount === 1 ? 'ingresso selecionado' : 'ingressos selecionados'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400">R$ {total.toFixed(2)}</span>
                {taxes > 0 && (
                  <span className="text-xs text-slate-400">(inclui R$ {taxes.toFixed(2)} em taxas)</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={selectedCount === 0}
            className="w-full sm:w-auto px-8 py-3.5 font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:bg-slate-800 disabled:text-slate-500 rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-base"
          >
            <ShieldCheck size={20} />
            Avançar para o Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
export default TicketSelectionPage;
