import { Building2, Mail, Phone, Shield, User, X } from 'lucide-react';
import AgentStatusBadge from './AgentStatusBadge';

export default function AgentDetailsDrawer({ agent, onClose, onApprove, onReject }) {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col h-full text-left overflow-hidden border-l border-slate-200">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5 bg-slate-50">
          <div className="flex items-center gap-3">
            {agent.avatar ? (
              <img src={agent.avatar} alt={agent.name} className="h-10 w-10 rounded-full object-cover border border-slate-200" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 font-black text-sm">
                {agent.name[0]}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900">{agent.name}</h2>
                <AgentStatusBadge status={agent.status} />
              </div>
              <p className="text-xs text-slate-500 font-semibold">{agent.agencyName}</p>
            </div>
          </div>

          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h4 className="font-black text-slate-800 flex items-center gap-2">
              <User size={15} className="text-emerald-600" />
              Informações Pessoais
            </h4>
            <p><strong>CPF:</strong> {agent.cpf}</p>
            <p className="flex items-center gap-1.5">
              <Mail size={13} className="text-slate-400" />
              <strong>E-mail:</strong> {agent.email}
            </p>
            <p className="flex items-center gap-1.5">
              <Phone size={13} className="text-slate-400" />
              <strong>Telefone:</strong> {agent.phone}
            </p>
            <p><strong>Idioma:</strong> {agent.language}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h4 className="font-black text-slate-800 flex items-center gap-2">
              <Building2 size={15} className="text-emerald-600" />
              Vínculo B2B
            </h4>
            <p><strong>Agência:</strong> {agent.agencyName}</p>
            <p><strong>Atrações Disponíveis:</strong> {agent.attractionsCount} atrações</p>
            <p><strong>Cadastrado em:</strong> {new Date(agent.createdAt).toLocaleDateString('pt-BR')}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-600" />
              Permissões do Agente
            </h4>
            <div className="flex flex-wrap gap-2">
              {agent.permissions?.map((p) => (
                <span key={p} className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-black text-emerald-800">
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {agent.status === 'Pendente' && (
          <footer className="border-t border-slate-200 p-4 bg-slate-50 flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => onReject(agent.id)}
              className="rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-black text-rose-700 hover:bg-rose-50"
            >
              Rejeitar
            </button>
            <button
              type="button"
              onClick={() => onApprove(agent.id)}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-black text-white hover:bg-emerald-700"
            >
              Aprovar Agente
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
