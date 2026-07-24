import { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Globe,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
  XCircle,
  Ban,
} from 'lucide-react';
import AgencyStatusBadge from './AgencyStatusBadge';

export default function AgencyDetailsDrawer({ agency, onClose, onApprove, onReject, onSuspend }) {
  const [activeTab, setActiveTab] = useState('dados');

  if (!agency) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full text-left overflow-hidden border-l border-slate-200">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5 bg-slate-50">
          <div className="flex items-center gap-4">
            {agency.logo && (
              <img
                src={agency.logo}
                alt={agency.tradeName}
                className="h-12 w-12 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
            )}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-black text-slate-900">{agency.tradeName}</h2>
                <AgencyStatusBadge status={agency.status} />
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {agency.companyName} &bull; CNPJ: {agency.document}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </header>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto gap-2">
          <TabButton active={activeTab === 'dados'} onClick={() => setActiveTab('dados')} label="Empresa & Endereço" />
          <TabButton active={activeTab === 'responsavel'} onClick={() => setActiveTab('responsavel')} label="Responsável" />
          <TabButton active={activeTab === 'banco'} onClick={() => setActiveTab('banco')} label="Dados Bancários" />
          <TabButton active={activeTab === 'documentos'} onClick={() => setActiveTab('documentos')} label="Documentos & Anexos" />
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dados' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <InfoBox label="Tipo de Empresa" value={agency.companyType} />
                <InfoBox label="Inscrição Estadual" value={agency.stateRegistration || 'Isento'} />
                <InfoBox label="Telefone" value={agency.phone} icon={Phone} />
                <InfoBox label="Website" value={agency.website} icon={Globe} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <MapPin size={15} className="text-emerald-600" />
                  Endereço Principal
                </h4>
                <p className="font-semibold text-slate-700">
                  {agency.address}, {agency.number} {agency.complement && `(${agency.complement})`}
                </p>
                <p className="text-slate-500">
                  {agency.city} - {agency.state}, CEP: {agency.zipCode} &bull; {agency.country}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoBox label="Agentes Cadastrados" value={`${agency.agentsCount} agentes`} />
                <InfoBox label="Atrações Liberadas" value={`${agency.attractionsCount} atrações`} />
              </div>
            </div>
          )}

          {activeTab === 'responsavel' && (
            <div className="space-y-4 text-xs">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <User size={15} className="text-emerald-600" />
                  Dados do Gestor Principal
                </h4>
                <p><strong>Nome:</strong> {agency.responsibleName}</p>
                <p><strong>CPF:</strong> {agency.responsibleCpf}</p>
                <p><strong>Data de Nascimento:</strong> {agency.responsibleBirthDate}</p>
                <p><strong>E-mail:</strong> {agency.responsibleEmail}</p>
                <p><strong>Telefone Celular:</strong> {agency.responsiblePhone}</p>
                <p><strong>Idioma de Preferência:</strong> {agency.language}</p>
              </div>
            </div>
          )}

          {activeTab === 'banco' && (
            <div className="space-y-4 text-xs">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <Landmark size={15} className="text-emerald-600" />
                  Conta Bancária
                </h4>
                <p><strong>Banco:</strong> {agency.bank} ({agency.bankCode})</p>
                <p><strong>Tipo de Conta:</strong> {agency.accountType}</p>
                <p><strong>Agência:</strong> {agency.agency} &bull; <strong>Conta:</strong> {agency.account}</p>
                <p><strong>Titular da Conta:</strong> {agency.bankHolder}</p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
                <h4 className="font-black text-emerald-900 flex items-center gap-2">
                  <CreditCard size={15} className="text-emerald-600" />
                  Chave PIX ({agency.pixType})
                </h4>
                <strong className="font-mono text-sm block font-black text-emerald-950">
                  {agency.pixKey}
                </strong>
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider">
                Documentos Anexados no Cadastro
              </h4>
              {agency.documents?.length ? (
                agency.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 bg-slate-50">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-emerald-600" />
                      <div>
                        <strong className="block text-slate-800 font-bold">{doc.name}</strong>
                        <span className="text-[10px] text-slate-400">Enviado em {doc.uploadedAt}</span>
                      </div>
                    </div>
                    <button type="button" className="text-xs font-black text-emerald-600 hover:underline">
                      Visualizar
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 font-medium italic">Nenhum documento anexado.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <footer className="border-t border-slate-200 p-4 bg-slate-50 flex gap-2 justify-end">
          {agency.status === 'Pendente Aprovação' && (
            <>
              <button
                type="button"
                onClick={() => onReject(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-700 hover:bg-rose-50"
              >
                <XCircle size={15} />
                Rejeitar
              </button>
              <button
                type="button"
                onClick={() => onApprove(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
              >
                <ShieldCheck size={15} />
                Aprovar Agência
              </button>
            </>
          )}

          {agency.status === 'Ativa' && (
            <button
              type="button"
              onClick={() => onSuspend(agency)}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-700 hover:bg-rose-50"
            >
              <Ban size={15} />
              Suspender Agência
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

function InfoBox({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <span className="block text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
        {Icon && <Icon size={12} />}
        {label}
      </span>
      <strong className="mt-1 block text-slate-800 font-bold truncate">{value || '—'}</strong>
    </div>
  );
}
