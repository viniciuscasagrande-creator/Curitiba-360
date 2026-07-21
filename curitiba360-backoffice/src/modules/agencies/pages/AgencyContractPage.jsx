import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { agencyService } from '../services/agencyService';
import AgencyStatusBadge from '../components/AgencyStatusBadge';
import AgencyActivationTimeline from '../components/AgencyActivationTimeline';
import ContractSummaryCard from '../components/ContractSummaryCard';
import { 
  Building2, 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  RefreshCw,
  Award,
  History,
  FileCheck2
} from 'lucide-react';

export default function AgencyContractPage() {
  const navigate = useNavigate();
  const { agencyId } = useParams();

  const [loading, setLoading] = useState(true);
  const [actionData, setActionData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const loadActivationData = async () => {
    setLoading(true);
    try {
      const res = await agencyService.getAgencyActivation(agencyId);
      if (res.success) {
        setActionData(res.data);
      }
    } catch (err) {
      showToast('Erro ao carregar dados do contrato', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivationData();
  }, [agencyId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Passo 1: Aprovar Cadastro
  const handleApprove = async () => {
    setProcessing(true);
    try {
      await agencyService.approveAgency(agencyId);
      showToast('Cadastro aprovado pelo Administrador! Liberado para geração de minuta contratual.');
      await loadActivationData();
    } catch (err) {
      showToast('Erro ao aprovar cadastro', 'error');
    } finally {
      setProcessing(false);
    }
  };

  // Passo 2: Gerar Minuta de Contrato
  const handleCreateContract = async () => {
    setProcessing(true);
    try {
      await agencyService.createAgencyContract(agencyId);
      showToast('Minuta contratual gerada com sucesso com base nas regras B2B!');
      await loadActivationData();
    } catch (err) {
      showToast('Erro ao gerar contrato', 'error');
    } finally {
      setProcessing(false);
    }
  };

  // Passo 3: Enviar para DocuSign
  const handleSendDocuSign = async () => {
    setProcessing(true);
    try {
      const res = await agencyService.sendContractToDocusign(agencyId);
      showToast(`Contrato enviado via DocuSign API! Envelope ID: ${res.envelopeId}`);
      await loadActivationData();
    } catch (err) {
      showToast('Erro ao enviar contrato para o DocuSign', 'error');
    } finally {
      setProcessing(false);
    }
  };

  // Passo 4: Simular Webhook DocuSign (Assinatura Concluída) -> muda para ativo
  const handleSimulateWebhook = async () => {
    setProcessing(true);
    try {
      await agencyService.simulateDocusignWebhook(agencyId);
      showToast('🎉 Webhook recebido! Assinatura confirmada e Agência ATIVADA para vendas B2B!');
      await loadActivationData();
    } catch (err) {
      showToast('Erro ao simular webhook do DocuSign', 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando fluxo de contrato...</p>
      </div>
    );
  }

  if (!actionData || !actionData.agency) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4 max-w-lg mx-auto">
        <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Agência não encontrada</h2>
        <button
          onClick={() => navigate('/agencias')}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  const { agency, contrato, etapaAtual, historico } = actionData;

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
            onClick={() => navigate(`/agencias/${agency.id}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Detalhes da Agência
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {agency.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Aprovação, Contrato & Ativação (Etapa 03)
            </h1>
            <AgencyStatusBadge status={agency.status} />
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Agência: <span className="font-bold text-slate-800">{agency.nomeFantasia}</span> ({agency.razaoSocial})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadActivationData}
            title="Atualizar estado"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TIMELINE VISUAL DE ATIVAÇÃO */}
      <AgencyActivationTimeline etapaAtual={etapaAtual} status={agency.status} />

      {/* BARRA DE AÇÕES DO FLUXO INTERATIVO BO-05 */}
      <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Painel de Controle de Ativação Comercial
            </h3>
            <p className="text-[11px] text-slate-400">Execute os passos sequenciais para homologação da agência.</p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-400">Etapa Atual: {etapaAtual}/5</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Passo 1: Aprovar Cadastro */}
          <button
            disabled={etapaAtual > 1 || processing}
            onClick={handleApprove}
            className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all flex flex-col justify-between space-y-2 ${
              etapaAtual === 1 
                ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-md cursor-pointer' 
                : etapaAtual > 1 
                ? 'bg-slate-800 text-emerald-400 border-emerald-500/30 opacity-80' 
                : 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold">PASSO 1</span>
            </div>
            <div>
              <div className="font-bold">1. Aprovar Cadastro</div>
              <div className="text-[10px] opacity-80">Validação inicial do Admin</div>
            </div>
          </button>

          {/* Passo 2: Gerar Minuta */}
          <button
            disabled={etapaAtual !== 2 || processing}
            onClick={handleCreateContract}
            className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all flex flex-col justify-between space-y-2 ${
              etapaAtual === 2 
                ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-md cursor-pointer' 
                : etapaAtual > 2 
                ? 'bg-slate-800 text-emerald-400 border-emerald-500/30 opacity-80' 
                : 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <FileText className="w-4 h-4" />
              <span className="text-[10px] font-bold">PASSO 2</span>
            </div>
            <div>
              <div className="font-bold">2. Gerar Minuta Contratual</div>
              <div className="text-[10px] opacity-80">Gera termos e contrato B2B</div>
            </div>
          </button>

          {/* Passo 3: Enviar DocuSign */}
          <button
            disabled={etapaAtual !== 3 || processing}
            onClick={handleSendDocuSign}
            className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all flex flex-col justify-between space-y-2 ${
              etapaAtual === 3 
                ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-md cursor-pointer' 
                : etapaAtual > 3 
                ? 'bg-slate-800 text-emerald-400 border-emerald-500/30 opacity-80' 
                : 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <Send className="w-4 h-4" />
              <span className="text-[10px] font-bold">PASSO 3</span>
            </div>
            <div>
              <div className="font-bold">3. Enviar ao DocuSign</div>
              <div className="text-[10px] opacity-80">Envia e-mail para responsável</div>
            </div>
          </button>

          {/* Passo 4: Webhook Assinatura */}
          <button
            disabled={etapaAtual !== 4 || processing}
            onClick={handleSimulateWebhook}
            className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all flex flex-col justify-between space-y-2 ${
              etapaAtual === 4 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-md cursor-pointer animate-pulse' 
                : etapaAtual >= 5 
                ? 'bg-slate-800 text-emerald-400 border-emerald-500/30 opacity-80' 
                : 'bg-slate-800/40 text-slate-500 border-slate-800 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <FileCheck2 className="w-4 h-4" />
              <span className="text-[10px] font-bold">PASSO 4</span>
            </div>
            <div>
              <div className="font-bold">4. Simular Webhook Assinatura</div>
              <div className="text-[10px] opacity-80">Ativa agência (status: ativo)</div>
            </div>
          </button>
        </div>
      </div>

      {/* RESUMO DO CONTRATO */}
      <ContractSummaryCard contrato={contrato} agency={agency} />

      {/* HISTÓRICO DE AUDITORIA DE ATIVAÇÃO */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" /> Registro de Auditoria & Trilha do Fluxo
        </h3>

        <div className="space-y-2">
          {historico.length === 0 ? (
            <p className="text-slate-400 text-xs">Nenhum evento registrado até o momento.</p>
          ) : (
            historico.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 bg-slate-50 rounded-lg">
                <div className="p-1 rounded bg-blue-100 text-blue-700 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{item.evento}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>🕒 {item.data}</span>
                    <span>•</span>
                    <span>👤 {item.usuario}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
