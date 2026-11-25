import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { pipelineService } from '../../services/pipelineService';
import { 
  ArrowLeft, 
  Target, 
  Calendar, 
  DollarSign, 
  Percent, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  PlusCircle,
  MessageSquare,
  XCircle
} from 'lucide-react';

export default function OpportunityDetailPage() {
  const navigate = useNavigate();
  const { agentId, opportunityId } = useParams();

  const [opp, setOpp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityForm, setActivityForm] = useState({ tipo: 'reuniao', descricao: '', dataHora: '' });
  const [toastMessage, setToastMessage] = useState(null);

  const loadOpp = async () => {
    setLoading(true);
    try {
      const res = await pipelineService.getOpportunityById(opportunityId);
      if (res.success) setOpp(res.data);
    } catch (err) {
      showToast('Erro ao carregar detalhes da oportunidade', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOpp();
  }, [opportunityId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      await pipelineService.addActivity(opportunityId, activityForm);
      showToast('Nova atividade agendada com sucesso!');
      setShowActivityModal(false);
      loadOpp();
    } catch (err) {
      showToast('Erro ao adicionar atividade', 'error');
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando oportunidade...</p>
      </div>
    );
  }

  if (!opp) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4 max-w-lg mx-auto">
        <Target className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Oportunidade não encontrada</h2>
        <button
          onClick={() => navigate('/agentes/oportunidades')}
          className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
        >
          Voltar para Oportunidades
        </button>
      </div>
    );
  }

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

      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate(agentId ? `/agentes/${agentId}/funil` : '/agentes/oportunidades')}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Oportunidades
          </button>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {opp.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {opp.titulo}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full font-bold text-purple-800 bg-purple-100 border border-purple-200">
              Etapa: {opp.etapa?.toUpperCase().replace('_', ' ')}
            </span>
          </div>
          <p className="mt-1 text-slate-500 font-medium">
            Cliente: <span className="font-semibold text-slate-800">{opp.clienteNome}</span> | Evento: <span className="font-semibold text-slate-800">{opp.eventoInteresse}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowActivityModal(true)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Nova Atividade / Agenda
          </button>
        </div>
      </div>

      {/* KPIS DE VALOR E CHANCE */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Valor Estimado</span>
          <div className="text-2xl font-extrabold text-emerald-700">
            R$ {opp.valorEstimado?.toFixed(2)}
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold">Valor potencial da negociação</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Probabilidade de Fechamento</span>
          <div className="text-2xl font-extrabold text-purple-700">
            {opp.probabilidade}%
          </div>
          <p className="text-[10px] text-purple-600 font-medium">Receita Ponderada: R$ {((opp.valorEstimado * opp.probabilidade) / 100).toFixed(2)}</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Previsão de Fechamento</span>
          <div className="text-xl font-extrabold text-slate-900">
            {opp.dataPrevisaoFechamento}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Previsão no modelo de Forecast</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Prioridade Comercial</span>
          <div className="text-xl font-extrabold text-amber-700 uppercase">
            {opp.prioridade}
          </div>
          <p className="text-[10px] text-amber-600 font-medium">Origem: {opp.origem}</p>
        </div>
      </div>

      {/* DETALHES & ATIVIDADES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Informações */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600" /> Detalhes do Cliente & Contrato
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-400 font-medium">Cliente / Empresa:</span>
              <p className="font-bold text-slate-900">{opp.clienteNome}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">E-mail:</span>
              <p className="font-semibold text-slate-800">{opp.clienteEmail}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Telefone:</span>
              <p className="font-semibold text-slate-800">{opp.clienteTelefone}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Responsável:</span>
              <p className="font-semibold text-slate-800">{opp.responsavel}</p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium">Observações Comerciais:</span>
              <p className="font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-1">
                "{opp.observacoes}"
              </p>
            </div>
          </div>
        </div>

        {/* Card Atividades & Agenda */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" /> Agenda de Atividades & Follow-ups
          </h3>

          <div className="space-y-2">
            {(opp.atividades || []).map((act) => (
              <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{act.descricao}</span>
                  <span className="text-[10px] text-slate-400">🕒 {act.dataHora} • Tipo: {act.tipo}</span>
                </div>
                {act.concluido ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL ADICIONAR ATIVIDADE */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-slate-800">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-purple-600" /> Agendar Atividade
              </h3>
              <button onClick={() => setShowActivityModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddActivity} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tipo de Atividade</label>
                <select
                  value={activityForm.tipo}
                  onChange={(e) => setActivityForm({ ...activityForm, tipo: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="reuniao">Reunião de Apresentação</option>
                  <option value="ligacao">Ligação / Follow-up Telefônico</option>
                  <option value="whatsapp">Disparo de Mensagem WhatsApp</option>
                  <option value="email">Envio de E-mail Proposta</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  value={activityForm.descricao}
                  onChange={(e) => setActivityForm({ ...activityForm, descricao: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Data e Hora</label>
                <input
                  type="datetime-local"
                  required
                  value={activityForm.dataHora}
                  onChange={(e) => setActivityForm({ ...activityForm, dataHora: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowActivityModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md"
                >
                  Salvar Atividade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
