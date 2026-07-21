import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Send, 
  FileCheck2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function AgencyActivationTimeline({ etapaAtual = 1, status = 'pending_approval' }) {
  const steps = [
    {
      id: 1,
      title: '1. Cadastro Submetido',
      description: 'Análise de documentos pendente',
      icon: Building2
    },
    {
      id: 2,
      title: '2. Aprovação do Admin',
      description: 'Validação jurídica & comercial',
      icon: ShieldCheck
    },
    {
      id: 3,
      title: '3. Minuta do Contrato',
      description: 'Geração dos termos B2B',
      icon: FileText
    },
    {
      id: 4,
      title: '4. Envio ao DocuSign',
      description: 'Notificação do responsável legal',
      icon: Send
    },
    {
      id: 5,
      title: '5. Ativação Comercial',
      description: 'Agência liberada para vendas',
      icon: FileCheck2
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" /> Timeline de Credenciamento & Ativação (Diagrama BO-05)
          </h3>
          <p className="text-[11px] text-slate-500">Progresso em tempo real da contratação e liberação da agência.</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          Etapa {etapaAtual} de 5
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = step.id < etapaAtual || status === 'ativo';
          const isCurrent = step.id === etapaAtual && status !== 'ativo';

          return (
            <div
              key={step.id}
              className={`
                relative p-3 rounded-xl border transition-all text-xs space-y-1.5 flex flex-col justify-between
                ${isCompleted 
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
                  : isCurrent 
                  ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs font-medium ring-2 ring-blue-500/20' 
                  : 'bg-slate-50/50 border-slate-200/70 text-slate-400 opacity-60'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className={`
                  p-1.5 rounded-lg flex items-center justify-center
                  ${isCompleted ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}
                `}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-bold font-mono">
                  0{step.id}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 leading-tight">{step.title}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{step.description}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
