import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Send, 
  DollarSign, 
  Building2, 
  ExternalLink,
  Award
} from 'lucide-react';

export default function ContractSummaryCard({ contrato = {}, agency = {} }) {
  const isAssinado = contrato.statusContrato === 'assinado' || contrato.docusignStatus === 'completed';
  const isEnviado = contrato.docusignStatus === 'sent' || contrato.docusignStatus === 'completed';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-sm">
                {contrato.numeroContrato || 'CTR-NOVO/2026'}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                isAssinado 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : isEnviado 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {isAssinado ? 'Assinado Digitalmente' : isEnviado ? 'Enviado ao DocuSign' : 'Minuta em Elaboração'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Convenção B2B de Distribuição de Ingressos & Experiências Curitiba 360
            </p>
          </div>
        </div>

        {contrato.docusignEnvelopeId && (
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-right font-mono text-[11px]">
            <span className="text-slate-400 font-sans block text-[9px] uppercase font-bold">DocuSign Envelope ID</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Send className="w-3 h-3 text-blue-500" /> {contrato.docusignEnvelopeId}
            </span>
          </div>
        )}
      </div>

      {/* Partes Envolvidas & Termos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-slate-50 rounded-lg space-y-2">
          <span className="font-bold text-slate-700 block border-b pb-1 border-slate-200/60">
            🏢 Partes Contratantes
          </span>
          <div className="space-y-1">
            <div>
              <span className="text-slate-400 font-medium">Contratante:</span>
              <p className="font-bold text-slate-900">Curitiba 360 Pass & Platform S/A</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Contratada (Agência B2B):</span>
              <p className="font-bold text-slate-900">{agency.razaoSocial || agency.nomeFantasia}</p>
              <p className="text-[10px] text-slate-500 font-mono">CNPJ: {agency.cnpj}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Signatário Autorizado:</span>
              <p className="font-semibold text-slate-800">{agency.responsavelComercial?.nome || agency.responsavel}</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg space-y-2">
          <span className="font-bold text-slate-700 block border-b pb-1 border-slate-200/60">
            📊 Condições Comerciais Aprovadas
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-slate-400 font-medium">Comissão Acordada:</span>
              <p className="font-bold text-blue-600 text-sm">{contrato.comissaoAcordada || agency.comissaoPadrao || 12}%</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Limite de Crédito B2B:</span>
              <p className="font-bold text-emerald-600 text-sm">
                R$ {(contrato.limiteCreditoAprovado || agency.limiteCredito || 30000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium">Ciclo de Repasse Financeiro:</span>
              <p className="font-semibold text-slate-800">{contrato.cicloRepasse || 'Semanal (Segundas-feiras)'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
