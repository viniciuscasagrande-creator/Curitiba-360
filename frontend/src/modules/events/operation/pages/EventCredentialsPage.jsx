import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventOperationService } from '../services/eventOperationService';
import CredentialBadgeCards from '../components/CredentialBadgeCards';
import { ArrowLeft, QrCode } from 'lucide-react';

export default function EventCredentialsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventOperationService.getOperationOverview(eventId);
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [eventId]);

  const handleIssueCredential = async (credData) => {
    try {
      await eventOperationService.issueCredential(eventId, credData);
      loadData();
    } catch (err) {
      alert('Erro ao emitir credencial.');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando módulo de credenciamento...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}/operacao`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Centro de Comando
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Credenciamento & Badges de Acesso 🎴
        </h1>
        <p className="text-xs text-slate-500 font-medium">Emissão de credenciais com QR Code para controle de portaria e bastidores.</p>
      </div>

      <CredentialBadgeCards badges={data.credenciamentoBadges || []} onIssueCredential={handleIssueCredential} />
    </div>
  );
}
