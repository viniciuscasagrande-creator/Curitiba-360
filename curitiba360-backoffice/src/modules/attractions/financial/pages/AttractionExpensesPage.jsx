import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Lock,
  Plus,
  Send,
  Building,
  AlertCircle
} from 'lucide-react';
import { AttractionSidebar } from '../../components/AttractionSidebar';
import { TransferRequestModal } from '../components/TransferRequestModal';

export function AttractionExpensesPage() {
  const { attractionId = 'attraction-001' } = useParams();

  const [expandedId, setExpandedId] = useState('ATR-101');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [notification, setNotification] = useState('');

  const [attractionsData, setAttractionsData] = useState([
    {
      id: 'ATR-101',
      name: 'Parque Jaime Lerner',
      status: 'Liberado', // 'Aguardando liberação' | 'Liberado' | 'Bloqueado' | 'Repasse solicitado' | 'Pago'
      releaseDate: '2026-07-20',
      netRevenue: 221220.0,
      availableAmount: 10000.0,
      transferRequested: 0.0,
      lineItems: [
        { id: 1, name: 'Venda de Ingressos (Lote 001/002)', amount: 245800.0, type: 'Receita', status: 'Recebido', notes: '8.920 ingressos confirmados' },
        { id: 2, name: 'Comissão de Agentes e Afiliados', amount: 12290.0, type: 'Despesa', status: 'Recebido', notes: 'Comissão de 5% sobre parceiros B2B' },
        { id: 3, name: 'Encargos e Taxas Administrativas', amount: 12290.0, type: 'Despesa', status: 'Recebido', notes: 'Taxas de gateway e cartão de crédito' },
        { id: 4, name: 'Repasse Parcial Anterior (TED)', amount: 190000.0, type: 'Despesa', status: 'Recebido', notes: 'Liquidado na conta cadastrada' }
      ]
    },
    {
      id: 'ATR-102',
      name: 'Ópera de Arame',
      status: 'Aguardando liberação',
      releaseDate: '2026-07-28',
      netRevenue: 84250.0,
      availableAmount: 0.0,
      transferRequested: 0.0,
      lineItems: [
        { id: 1, name: 'Venda de Ingressos do Mês', amount: 92000.0, type: 'Receita', status: 'Pendente', notes: 'Aguardando encerramento do lote' },
        { id: 2, name: 'Taxa Administrativa Plataforma', amount: 7750.0, type: 'Despesa', status: 'Pendente', notes: 'Retenção contratual' }
      ]
    },
    {
      id: 'ATR-103',
      name: 'Jardim Botânico de Curitiba',
      status: 'Pago',
      releaseDate: '2026-07-15',
      netRevenue: 145000.0,
      availableAmount: 0.0,
      transferRequested: 145000.0,
      lineItems: [
        { id: 1, name: 'Vendas Totais Exposição de Inverno', amount: 155000.0, type: 'Receita', status: 'Recebido', notes: 'Evento finalizado' },
        { id: 2, name: 'Repasse Integral Efetuado', amount: 145000.0, type: 'Despesa', status: 'Recebido', notes: 'Comprovante bancário #994821' }
      ]
    }
  ]);

  function handleRequestSuccess(requestedAmount) {
    setAttractionsData((prev) =>
      prev.map((item) => {
        if (item.id === 'ATR-101') {
          return {
            ...item,
            status: 'Repasse solicitado',
            availableAmount: item.availableAmount - requestedAmount,
            transferRequested: item.transferRequested + requestedAmount
          };
        }
        return item;
      })
    );

    setNotification(`Solicitação de repasse no valor de R$ ${requestedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} enviada com sucesso!`);
    setTimeout(() => setNotification(''), 4000);
  }

  function getStatusBadge(status) {
    switch (status) {
      case 'Liberado':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-black text-emerald-700"><CheckCircle2 size={12} /> Liberado</span>;
      case 'Repasse solicitado':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-black text-amber-800"><Clock size={12} /> Repasse Solicitado</span>;
      case 'Pago':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[10px] font-black text-blue-700"><CheckCircle2 size={12} /> Pago</span>;
      case 'Bloqueado':
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-[10px] font-black text-rose-700"><Lock size={12} /> Bloqueado</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[10px] font-black text-slate-600"><Clock size={12} /> Aguardando Liberação</span>;
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId={attractionId} />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <DollarSign size={15} />
              Gestão Financeira &bull; Lançamentos
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Resumo das Despesas e Repasses
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Consolidado de receitas, comissões de agentes, encargos contratuais e solicitações de repasse bancário.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowTransferModal(true)}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
          >
            <Send size={16} />
            Solicitar Repasse (R$ 10.000,00)
          </button>
        </header>

        {notification && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={18} className="text-emerald-600" />
            {notification}
          </div>
        )}

        {/* Tabela Principal com Linhas Expansíveis */}
        <section className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="p-4">Nome da Atração</th>
                  <th className="p-4">Status Financeiro</th>
                  <th className="p-4">Data de Liberação</th>
                  <th className="p-4 text-right">Receita Líquida</th>
                  <th className="p-4 text-right">Saldo Liberado / Repasse</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {attractionsData.map((item) => {
                  const isExpanded = expandedId === item.id;
                  return (
                    <React.Fragment key={item.id}>
                      <tr className={`transition hover:bg-slate-50/80 ${isExpanded ? 'bg-slate-50/50' : ''}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-black">
                              <Building size={16} />
                            </span>
                            <div>
                              <strong className="font-extrabold text-slate-900 block">{item.name}</strong>
                              <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{getStatusBadge(item.status)}</td>
                        <td className="p-4 font-medium text-slate-600">
                          {new Date(item.releaseDate).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-4 text-right font-black text-slate-900">
                          R$ {item.netRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-4 text-right font-black text-emerald-600">
                          R$ {item.availableAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-4 text-center space-x-2">
                          {item.availableAmount > 0 && (
                            <button
                              type="button"
                              onClick={() => setShowTransferModal(true)}
                              className="inline-flex h-8 items-center gap-1 rounded-xl bg-emerald-50 border border-emerald-200 px-3 text-[11px] font-extrabold text-emerald-700 hover:bg-emerald-100 transition"
                            >
                              <Send size={13} />
                              Solicitar
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : item.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
                            title="Expandir Lançamentos"
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </td>
                      </tr>

                      {/* Detalhamento Expandido (Linha Expansível) */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-slate-100/60 p-5 border-y border-slate-200/80">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                                  Detalhamento de Lançamentos — {item.name}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">
                                  {item.lineItems.length} lançamentos registrados
                                </span>
                              </div>

                              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
                                <table className="w-full text-left text-xs">
                                  <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase">
                                      <th className="p-3">Descrição do Lançamento</th>
                                      <th className="p-3">Tipo</th>
                                      <th className="p-3">Status</th>
                                      <th className="p-3">Observações</th>
                                      <th className="p-3 text-right">Valor</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    {item.lineItems.map((line) => (
                                      <tr key={line.id} className="hover:bg-slate-50/50">
                                        <td className="p-3 font-bold text-slate-800">{line.name}</td>
                                        <td className="p-3">
                                          <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md ${
                                            line.type === 'Receita' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                          }`}>
                                            {line.type === 'Receita' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {line.type}
                                          </span>
                                        </td>
                                        <td className="p-3">
                                          <span className={`text-[10px] font-bold ${line.status === 'Recebido' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                            ● {line.status}
                                          </span>
                                        </td>
                                        <td className="p-3 text-slate-500 text-[11px] font-medium">{line.notes}</td>
                                        <td className={`p-3 text-right font-black ${line.type === 'Receita' ? 'text-emerald-600' : 'text-slate-700'}`}>
                                          {line.type === 'Despesa' ? '- ' : ''}R$ {line.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal de Solicitação de Repasse */}
      {showTransferModal && (
        <TransferRequestModal
          availableAmount={10000.0}
          attractionName="Parque Jaime Lerner"
          onClose={() => setShowTransferModal(false)}
          onRequestSuccess={handleRequestSuccess}
        />
      )}
    </div>
  );
}

export default AttractionExpensesPage;
