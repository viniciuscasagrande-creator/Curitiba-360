import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function EventPublicationChecklist({ checklist = {}, onPublish }) {
  const items = [
    { key: 'dadosBasicosOk', label: 'Dados básicos completos (Nome, Categoria e Código)' },
    { key: 'localConfiguradoOk', label: 'Localização e Endereço da Venue validados' },
    { key: 'dataValidaOk', label: 'Data de início e horários de abertura válidos' },
    { key: 'capacidadeDefinidaOk', label: 'Capacidade máxima de público configurada' },
    { key: 'responsaveisVinculadosOk', label: 'Gestor e Produtor responsável vinculados' },
    { key: 'politicasPreenchidasOk', label: 'Políticas de cancelamento e meia-entrada preenchidas' },
    { key: 'imagemCapaOk', label: 'Imagem de capa selecionada' },
    { key: 'loteDisponivelOk', label: 'Pelo menos 1 lote de ingresso ativo' },
    { key: 'dadosFinanceirosOk', label: 'Moeda, taxa e conta bancária configuradas' }
  ];

  const pendencias = items.filter((item) => !checklist[item.key]);
  const isPodePublicar = pendencias.length === 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" /> Checklist de Validação Pré-Publicação
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Verificação de requisitos técnicos e comerciais antes de abrir vendas público.</p>
        </div>

        <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${
          isPodePublicar ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {isPodePublicar ? 'Pronto para Publicação 🎉' : `${pendencias.length} Pendências Restantes`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map((item) => {
          const isOk = checklist[item.key];

          return (
            <div key={item.key} className={`p-2.5 rounded-lg border flex items-center gap-2 font-medium ${
              isOk ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-amber-50/60 border-amber-200 text-amber-900'
            }`}>
              {isOk ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              )}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <p className="text-[10px] text-slate-400 font-mono">
          {isPodePublicar ? 'Todas as regras de auditoria foram satisfeitas.' : 'Bloqueio ativo: Resolva as pendências acima.'}
        </p>

        <button
          onClick={onPublish}
          disabled={!isPodePublicar}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
            isPodePublicar
              ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Publicar Evento no Portal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
