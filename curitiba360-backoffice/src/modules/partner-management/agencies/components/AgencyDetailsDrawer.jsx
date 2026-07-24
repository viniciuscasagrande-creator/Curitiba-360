import { useState } from 'react';
import { Ban, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';

import AgencyDrawerHeader from './AgencyDrawerHeader';
import AgencyCompanyCard from './AgencyCompanyCard';
import AgencyResponsibleCard from './AgencyResponsibleCard';
import AgencyAddressCard from './AgencyAddressCard';
import AgencyBankCard from './AgencyBankCard';
import AgencyPixCard from './AgencyPixCard';
import AgencyDocumentsCard from './AgencyDocumentsCard';
import AgencyAgentsCard from './AgencyAgentsCard';
import AgencyAttractionsCard from './AgencyAttractionsCard';
import AgencyTimeline from './AgencyTimeline';
import AgencyHistory from './AgencyHistory';

import { AGENCY_STATUS } from '../../shared/constants/partnerStatus';

export default function AgencyDetailsDrawer({
  agency,
  onClose,
  onApprove,
  onReject,
  onSuspend,
  onInactivate,
  onReactivate,
}) {
  const [activeTab, setActiveTab] = useState('empresa');

  if (!agency) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full text-left overflow-hidden border-l border-slate-200">
        <AgencyDrawerHeader agency={agency} onClose={onClose} />

        {/* Abas */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto gap-2">
          <TabButton active={activeTab === 'empresa'} onClick={() => setActiveTab('empresa')} label="Empresa & Sede" />
          <TabButton active={activeTab === 'responsavel'} onClick={() => setActiveTab('responsavel')} label="Responsável & Gestores" />
          <TabButton active={activeTab === 'banco'} onClick={() => setActiveTab('banco')} label="Dados Bancários & PIX" />
          <TabButton active={activeTab === 'operacoes'} onClick={() => setActiveTab('operacoes')} label="Agentes & Atrações" />
          <TabButton active={activeTab === 'documentos'} onClick={() => setActiveTab('documentos')} label="Documentos" />
          <TabButton active={activeTab === 'historico'} onClick={() => setActiveTab('historico')} label="Timeline & Logs" />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'empresa' && (
            <>
              <AgencyCompanyCard agency={agency} />
              <AgencyAddressCard agency={agency} />
            </>
          )}

          {activeTab === 'responsavel' && (
            <AgencyResponsibleCard agency={agency} />
          )}

          {activeTab === 'banco' && (
            <>
              <AgencyBankCard agency={agency} />
              <AgencyPixCard agency={agency} />
            </>
          )}

          {activeTab === 'operacoes' && (
            <>
              <AgencyAgentsCard agency={agency} />
              <AgencyAttractionsCard agency={agency} />
            </>
          )}

          {activeTab === 'documentos' && (
            <AgencyDocumentsCard agency={agency} />
          )}

          {activeTab === 'historico' && (
            <>
              <AgencyTimeline agency={agency} />
              <AgencyHistory agency={agency} />
            </>
          )}
        </div>

        {/* Botões de Ação no Rodapé */}
        <footer className="border-t border-slate-200 p-4 bg-slate-50 flex gap-2 justify-end">
          {agency.status === AGENCY_STATUS.PENDING_APPROVAL && (
            <>
              <button
                type="button"
                onClick={() => onReject(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-700 hover:bg-rose-50 transition"
              >
                <XCircle size={15} />
                Rejeitar
              </button>
              <button
                type="button"
                onClick={() => onApprove(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 shadow-xs transition"
              >
                <ShieldCheck size={15} />
                Aprovar Agência
              </button>
            </>
          )}

          {agency.status === AGENCY_STATUS.ACTIVE && (
            <>
              <button
                type="button"
                onClick={() => onSuspend(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-700 hover:bg-rose-50 transition"
              >
                <Ban size={15} />
                Suspender
              </button>
              <button
                type="button"
                onClick={() => onInactivate(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-black text-slate-700 hover:bg-slate-100 transition"
              >
                Inativar
              </button>
            </>
          )}

          {(agency.status === AGENCY_STATUS.INACTIVE || agency.status === AGENCY_STATUS.SUSPENDED) && (
            <button
              type="button"
              onClick={() => onReactivate(agency)}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 shadow-xs transition"
            >
              <CheckCircle2 size={15} />
              Reativar Agência
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

function TabButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-3 px-3 text-xs font-black border-b-2 transition whitespace-nowrap ${
        active
          ? 'border-emerald-600 text-emerald-700'
          : 'border-transparent text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
    </button>
  );
}
