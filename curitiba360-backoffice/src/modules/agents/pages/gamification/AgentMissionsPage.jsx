import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gamificationService } from '../../services/gamificationService';
import MissionCard from '../../components/gamification/MissionCard';
import BadgeGrid from '../../components/gamification/BadgeGrid';
import { Target, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AgentMissionsPage() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

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

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleClaimReward = async (missionId) => {
    try {
      await gamificationService.claimMissionReward(missionId);
      showToast('🎉 Recompensa resgatada e XP adicionado com sucesso!');
      loadData();
    } catch (err) {
      showToast('Erro ao resgatar recompensa', 'error');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando missões e conquistas...</p>
      </div>
    );
  }

  const missoes = data.missoes || [];
  const medalhas = data.medalhas || [];

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
              MOD-06 • ETAPA 04
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Missões, Desafios & Medalhas 🏅
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Desafios semanais com premiação em XP, moedas bônus e galeria de conquistas.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Missões"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* MISSÕES E DESAFIOS */}
      <MissionCard missoes={missoes} onClaim={handleClaimReward} />

      {/* GALERIA DE MEDALHAS / BADGES */}
      <BadgeGrid medalhas={medalhas} />
    </div>
  );
}
