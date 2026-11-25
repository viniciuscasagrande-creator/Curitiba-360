import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventOperationService } from '../services/eventOperationService';
import OperationsKpiGrid from '../components/OperationsKpiGrid';
import StaffTeamTable from '../components/StaffTeamTable';
import VendorListPanel from '../components/VendorListPanel';
import CredentialBadgeCards from '../components/CredentialBadgeCards';
import ProductionTimeline from '../components/ProductionTimeline';
import OperationalChecklistPanel from '../components/OperationalChecklistPanel';
import { Activity, ArrowLeft, RefreshCw, Users, ShieldCheck, Clock } from 'lucide-react';

export default function EventOperationsCenterPage() {
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

  const handleAddStaff = async (staffData) => {
    try {
      await eventOperationService.addStaffMember(eventId, staffData);
      loadData();
    } catch (err) {
      alert('Erro ao adicionar staff.');
    }
  };

  const handleIssueCredential = async (credData) => {
    try {
      await eventOperationService.issueCredential(eventId, credData);
      loadData();
    } catch (err) {
      alert('Erro ao emitir credencial.');
    }
  };

  const handleToggleCheck = async (checkId) => {
    try {
      await eventOperationService.toggleChecklistItem(eventId, checkId);
      loadData();
    } catch (err) {
      alert('Erro ao atualizar checklist.');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando Centro de Comando da Operação...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate(`/eventos/${eventId}`)}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Detalhes do Evento
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-07 • ETAPA 04
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Centro de Comando da Operação 360° 🛡️
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Gestão operacional em tempo real: equipes, fornecedores, credenciamento e vistoria de segurança.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Operação"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* KPIS OPERACIONAIS */}
      <OperationsKpiGrid data={data} />

      {/* CREDENCIAMENTO & BADGES */}
      <CredentialBadgeCards badges={data.credenciamentoBadges || []} onIssueCredential={handleIssueCredential} />

      {/* EQUIPE STAFF E FORNECEDORES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StaffTeamTable equipe={data.equipeStaff || []} onAddStaff={handleAddStaff} />
        <VendorListPanel fornecedores={data.fornecedores || []} />
      </div>

      {/* CRONOGRAMA & CHECKLIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionTimeline timeline={data.cronogramaTimeline || []} />
        <OperationalChecklistPanel checklist={data.checklistVistoria || []} onToggleCheck={handleToggleCheck} />
      </div>
    </div>
  );
}
