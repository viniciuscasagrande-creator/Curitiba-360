import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gamificationService } from '../../services/gamificationService';
import GoalProgress from '../../components/gamification/GoalProgress';
import XPCard from '../../components/gamification/XPCard';
import AIRecommendations from '../../components/gamification/AIRecommendations';
import { Target, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AgentGoalsPage() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await gamificationService.getGamificationOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando painel de metas...</p>
      </div>
    );
  }

  const profile = data.agentProfile || {};
  const aiRecs = data.aiRecommendations || [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
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
              MOD-06 • ETAPA 04
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Gestão de Metas & Performance 🎯
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Acompanhamento de metas mensais, acumulado anual e projeções automatizadas com IA.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Metas"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* CARD DE XP E NÍVEL */}
      <XPCard profile={profile} />

      {/* PROGRESSO DA META MENSAL E ANUAL */}
      <GoalProgress profile={profile} />

      {/* COPILOTO DE IA */}
      <AIRecommendations recommendations={aiRecs} />
    </div>
  );
}
