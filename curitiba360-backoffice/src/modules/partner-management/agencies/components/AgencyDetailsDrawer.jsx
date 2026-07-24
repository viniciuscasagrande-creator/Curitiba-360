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
  Mail,
} from 'lucide-react';
import AgencyStatusBadge from './AgencyStatusBadge';
import { AGENCY_STATUS } from '../../shared/constants/partnerStatus';

export default function AgencyDetailsDrawer({ agency, onClose, onApprove, onReject, onSuspend, onInactivate, onReactivate }) {
  const [activeTab, setActiveTab] = useState('dados');

  if (!agency) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full text-left overflow-hidden border-l border-slate-200">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5 bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 font-black text-white text-base">
              {agency.tradeName ? agency.tradeName[0] : 'A'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-black text-slate-900">{agency.tradeName}</h2>
                <AgencyStatusBadge status={agency.status} />
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {agency.corporateName || agency.companyName} &bull; CNPJ: {agency.cnpj || agency.document}
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
          <TabButton active={activeTab === 'responsavel'} onClick={() => setActiveTab('responsavel')} label="Responsável & Gestores" />
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
                <InfoBox label="Telefone Comercial" value={agency.commercialPhone || agency.phone} icon={Phone} />
                <InfoBox label="Website" value={agency.site || agency.website} icon={Globe} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <MapPin size={15} className="text-emerald-600" />
                  Endereço Principal
                </h4>
                <p className="font-semibold text-slate-700">
                  {agency.street || agency.address}, {agency.number} {agency.complement && `(${agency.complement})`}
                </p>
                <p className="text-slate-500">
                  {agency.district && `${agency.district} - `}{agency.city} - {agency.state}, CEP: {agency.zipCode} &bull; {agency.country}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoBox label="Agentes Vinculados" value={`${agency.agentsCount || 0} agentes`} />
                <InfoBox label="Atrações Habilitadas" value={`${agency.attractions?.length || 0} atrações`} />
              </div>

              {agency.statusReason && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 space-y-1">
                  <span className="text-[10px] font-black uppercase text-rose-800">Observação / Motivo de Status</span>
                  <p className="text-rose-950 font-bold">{agency.statusReason}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'responsavel' && (
            <div className="space-y-4 text-xs">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  <User size={15} className="text-emerald-600" />
                  Gestor Principal / Responsável Legal
                </h4>
                <p><strong>Nome:</strong> {agency.responsibleName}</p>
                <p><strong>CPF:</strong> {agency.responsibleCpf}</p>
                <p className="flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" />
                  <strong>E-mail:</strong> {agency.email || agency.responsibleEmail}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone size={13} className="text-slate-400" />
                  <strong>Telefone Celular:</strong> {agency.responsiblePhone}
                </p>
              </div>

              {agency.managers?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider">
                    Gestores Adicionais ({agency.managers.length})
                  </h4>
                  {agency.managers.map((m) => (
                    <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
                      <strong className="block text-slate-900">{m.name}</strong>
                      <p className="text-slate-500">{m.email} &bull; {m.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'banco' && (
            <div className="space-y-4 text-xs">
              {agency.bankAccount?.bankName || agency.bank ? (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <h4 className="font-black text-slate-800 flex items-center gap-2">
                      <Landmark size={15} className="text-emerald-600" />
                      Conta Bancária Oficial
                    </h4>
                    <p><strong>Banco:</strong> {agency.bankAccount?.bankName || agency.bank} ({agency.bankAccount?.bankCode || agency.bankCode})</p>
                    <p><strong>Tipo de Conta:</strong> {agency.bankAccount?.accountType || agency.accountType}</p>
                    <p><strong>Agência:</strong> {agency.bankAccount?.agency || agency.agency} &bull; <strong>Conta:</strong> {agency.bankAccount?.account || agency.account}</p>
                    <p><strong>Titular da Conta:</strong> {agency.bankAccount?.holder || agency.bankHolder || agency.corporateName}</p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-1">
                    <h4 className="font-black text-emerald-900 flex items-center gap-2">
                      <CreditCard size={15} className="text-emerald-600" />
                      Chave PIX ({agency.bankAccount?.pixKeyType || agency.pixType || 'Chave'})
                    </h4>
                    <strong className="font-mono text-sm block font-black text-emerald-950">
                      {agency.bankAccount?.pixKey || agency.pixKey}
                    </strong>
                  </div>
                </>
              ) : (
                <p className="text-slate-400 font-medium italic">Dados bancários ainda não cadastrados.</p>
              )}
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider">
                Documentos e Anexos Digitais
              </h4>
              {agency.documents?.length ? (
                agency.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 bg-slate-50">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-emerald-600" />
                      <div>
                        <strong className="block text-slate-800 font-bold">{doc.name}</strong>
                        <span className="text-[10px] text-slate-400">Tipo: {doc.type}</span>
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
          {agency.status === AGENCY_STATUS.PENDING_APPROVAL && (
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

          {agency.status === AGENCY_STATUS.ACTIVE && (
            <>
              <button
                type="button"
                onClick={() => onSuspend(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-700 hover:bg-rose-50"
              >
                <Ban size={15} />
                Suspender
              </button>
              <button
                type="button"
                onClick={() => onInactivate(agency)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-black text-slate-700 hover:bg-slate-100"
              >
                Inativar
              </button>
            </>
          )}

          {agency.status === AGENCY_STATUS.INACTIVE && (
            <button
              type="button"
              onClick={() => onReactivate(agency)}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
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
