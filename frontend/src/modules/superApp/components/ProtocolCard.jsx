import React from "react";
import { ClipboardList, Calendar, User, GitCommit } from "lucide-react";

export default function ProtocolCard({ protocol = {} }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "submitted": return "text-blue-700 bg-blue-50 border-blue-100";
      case "under_review": return "text-amber-700 bg-amber-50 border-amber-100";
      case "approved":
      case "completed": return "text-emerald-700 bg-emerald-50 border-emerald-100";
      default: return "text-slate-655 bg-slate-50 border-slate-100";
    }
  };

  const statusLabel = {
    draft: "Rascunho",
    submitted: "Enviado",
    under_review: "Em Análise",
    approved: "Aprovado",
    rejected: "Recusado",
    completed: "Concluído"
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 space-y-3 font-sans animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <ClipboardList size={14} className="text-emerald-600" />
          <strong className="text-xs font-bold text-slate-800 font-mono">{protocol.protocolNumber}</strong>
        </div>
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${getStatusColor(protocol.status)}`}>
          {statusLabel[protocol.status] || protocol.status}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-bold text-slate-900 m-0 leading-tight">{protocol.subject}</h4>
        <p className="text-[10px] text-slate-500 m-0">{protocol.description}</p>
      </div>

      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[8px] text-slate-400 font-mono">
        <div className="flex items-center gap-1">
          <Calendar size={10} />
          <span>Criado: {new Date(protocol.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitCommit size={10} />
          <span className="truncate">Etapa: {protocol.currentStep}</span>
        </div>
      </div>
    </div>
  );
}
