import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productivityService } from '../../services/productivityService';
import CalendarAgendaView from '../../components/productivity/CalendarAgendaView';
import { Calendar, ArrowLeft, RefreshCw, CheckCircle2, X } from 'lucide-react';

export default function AgentAgendaPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({ titulo: '', cliente: '', tipo: 'reuniao', data: '2026-07-21', horaInicio: '14:00', horaFim: '15:00', local: 'Meet / Online' });
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await productivityService.getProductivityOverview(agentId || 'AGT-2001');
      if (res.success) setData(res.data);
    } catch (err) {
      showToast('Erro ao carregar agenda', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [agentId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await productivityService.addAgendaEvent(eventForm);
      showToast('📅 Compromisso agendado com sucesso!');
      setShowEventModal(false);
      loadData();
    } catch (err) {
      showToast('Erro ao agendar compromisso', 'error');
    }
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando agenda comercial...</p>
      </div>
    );
  }

  const events = data?.agendaEvents || [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 font-semibold animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate('/agentes/dashboard')}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Dashboard do Agente
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-06 • ETAPA 07
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Agenda & Reuniões Comerciais 📅
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Gestão de compromissos com clientes, chamadas telefônicas e visitas técnicas.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Agenda"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* VISUALIZAÇÃO DE AGENDA */}
      <CalendarAgendaView events={events} onNewEvent={() => setShowEventModal(true)} />

      {/* MODAL NOVO COMPROMISSO */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-slate-800">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" /> Agendar Novo Compromisso
              </h3>
              <button onClick={() => setShowEventModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título do Compromisso</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Reunião de Proposta VIP"
                  value={eventForm.titulo}
                  onChange={(e) => setEventForm({ ...eventForm, titulo: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Alberto"
                  value={eventForm.cliente}
                  onChange={(e) => setEventForm({ ...eventForm, cliente: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hora Início</label>
                  <input
                    type="text"
                    value={eventForm.horaInicio}
                    onChange={(e) => setEventForm({ ...eventForm, horaInicio: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hora Fim</label>
                  <input
                    type="text"
                    value={eventForm.horaFim}
                    onChange={(e) => setEventForm({ ...eventForm, horaFim: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md"
                >
                  Salvar Compromisso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
