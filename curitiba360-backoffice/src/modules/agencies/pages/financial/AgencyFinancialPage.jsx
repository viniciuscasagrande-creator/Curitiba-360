import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agencyService } from '../../services/agencyService';
import { agencyFinancialService } from '../../services/agencyFinancialService';
import CommissionBalanceCard from '../../components/financial/CommissionBalanceCard';
import AgencyBankCard from '../../components/financial/AgencyBankCard';
import PayoutRequestModal from '../../components/financial/PayoutRequestModal';
import FinancialStatementTable from '../../components/financial/FinancialStatementTable';
import { 
  DollarSign, 
  ArrowLeft, 
  Wallet, 
  CheckCircle2, 
  RefreshCw,
  Building2,
  Send,
  FileText
} from 'lucide-react';

export default function AgencyFinancialPage() {
  const navigate = useNavigate();
  const { agencyId } = useParams();

  const [agency, setAgency] = useState(null);
  const [finData, setFinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      if (agencyId) {
        const agencyRes = await agencyService.getAgencyById(agencyId).catch(() => null);
        if (agencyRes && agencyRes.success) setAgency(agencyRes.data);
      }

      const finRes = await agencyFinancialService.getFinancialOverview(agencyId || 'AG-1001');
      if (finRes.success) setFinData(finRes.data);
    } catch (err) {
      showToast('Erro ao carregar módulo financeiro', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [agencyId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUpdateBank = async (bankData) => {
    try {
      await agencyFinancialService.updateBankDetails(agencyId || 'AG-1001', bankData);
      showToast('Dados bancários atualizados com sucesso!');
      loadData();
    } catch (err) {
      showToast('Erro ao atualizar dados bancários', 'error');
    }
  };

  const handleRequestPayout = async (amount, solicitante) => {
    try {
      const res = await agencyFinancialService.requestPayout(agencyId || 'AG-1001', amount, solicitante);
      showToast(`🎉 Repasse de R$ ${amount.toFixed(2)} enviado via PIX com sucesso! ID Comprovante: ${res.payout.comprovanteId}`);
      loadData();
    } catch (err) {
      showToast(err.message || 'Erro ao processar repasse PIX', 'error');
    }
  };

  const handleCopyComprovante = (id) => {
    navigator.clipboard.writeText(id);
    showToast('ID do comprovante PIX copiado!');
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando carteira e extrato financeiro...</p>
      </div>
    );
  }

  const carteira = finData?.carteira || {};
  const banco = finData?.banco || {};
  const repasses = finData?.historicoRepasses || [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold animate-bounce ${
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
            onClick={() => navigate(agencyId ? `/agencias/${agencyId}` : '/agencias')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para {agency ? agency.nomeFantasia : 'Agências'}
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
              MOD-05 • ETAPA 05
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Carteira de Comissões & Repasses PIX 💰
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Gestão de saldo bancário B2B, solicitação de repasses instantâneos e extrato de liquidação (Diagrama BO-07).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPayoutModal(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Solicitar Repasse PIX
          </button>
          <button
            onClick={loadData}
            title="Atualizar dados"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CARDS DE SALDO E COMISSÕES */}
      <CommissionBalanceCard
        carteira={carteira}
        onRequestPayout={() => setShowPayoutModal(true)}
      />

      {/* DADOS BANCÁRIOS & PIX */}
      <AgencyBankCard
        banco={banco}
        onUpdateBank={handleUpdateBank}
      />

      {/* EXTRATO DE REPASSES */}
      <FinancialStatementTable
        repasses={repasses}
        onCopyComprovante={handleCopyComprovante}
      />

      {/* MODAL DE SOLICITAÇÃO PIX */}
      <PayoutRequestModal
        isOpen={showPayoutModal}
        onClose={() => setShowPayoutModal(false)}
        saldoDisponivel={carteira.saldoDisponivel}
        chavePix={banco.chavePix}
        onRequestPayout={handleRequestPayout}
      />
    </div>
  );
}
