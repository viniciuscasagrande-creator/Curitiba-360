import React from 'react';
import {
  attractionMock,
  borderoMock,
  transferHistoryMock,
} from '../data/financeReportsMock';
import {
  formatCurrency,
  formatDate,
} from '../utils/reportUtils';

export default function BorderoReportPrintPage() {
  const deductions = [
    { label: 'Receita Bruta', value: borderoMock.grossRevenue, isTotal: true },
    { label: '(-) Taxa Plataforma', value: borderoMock.platformFee, isDeduction: true },
    { label: '(-) Taxa Gateway', value: borderoMock.gatewayFee, isDeduction: true },
    { label: '(-) Antecipação', value: borderoMock.anticipationFee, isDeduction: true },
    { label: '(-) Comissões', value: borderoMock.commissions, isDeduction: true },
    { label: '(-) Impostos', value: borderoMock.taxes, isDeduction: true },
    { label: '(-) Descontos', value: borderoMock.discounts, isDeduction: true },
    { label: '(-) Estornos', value: borderoMock.refunds, isDeduction: true },
    { label: '(-) Cortesias', value: borderoMock.courtesy, isDeduction: true },
    { label: 'Receita Líquida', value: borderoMock.netRevenue, isTotal: true },
    { label: 'Valor de Repasse', value: borderoMock.transferValue, isTotal: true, isRepasse: true },
  ];

  return (
    <div className="min-h-screen bg-white p-8 text-slate-800 font-sans text-left text-xs leading-relaxed space-y-6 print:p-0">
      {/* Header Oficial de Impressão */}
      <header className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-300">
            <span className="text-center text-xs font-black text-emerald-600">
              CURITIBA
              <br />
              360
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              Borderô Financeiro Oficial
            </h1>
            <p className="text-sm font-bold text-slate-600">
              {attractionMock.name}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-black uppercase text-slate-400 block">
            Situação
          </span>
          <strong className="text-sm font-black text-emerald-700 block">
            {borderoMock.status}
          </strong>
          <span className="text-[9px] text-slate-500 font-mono">
            Emissão: {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>
      </header>

      {/* Dados do Evento e Atração */}
      <section className="grid grid-cols-2 gap-4 border border-slate-300 p-4 rounded-xl">
        <div>
          <h3 className="font-black text-slate-900 uppercase text-[10px] mb-1">
            Parceiro Comercial
          </h3>
          <p><strong>Razão Social:</strong> Instituto Curitiba de Arte & Cultura</p>
          <p><strong>CNPJ:</strong> 12.345.678/0001-99</p>
          <p><strong>Dados Bancários:</strong> Banco do Brasil (Ag: 3204-5 / CC: 10.450-8)</p>
        </div>
        <div>
          <h3 className="font-black text-slate-900 uppercase text-[10px] mb-1">
            Atração
          </h3>
          <p><strong>Nome:</strong> {attractionMock.name}</p>
          <p><strong>Localidade:</strong> Curitiba / PR</p>
          <p><strong>Período de Fechamento:</strong> 01/01/2026 a 31/01/2026</p>
        </div>
      </section>

      {/* Resumo Financeiro */}
      <section className="space-y-2">
        <h3 className="font-black text-slate-900 uppercase text-xs border-b border-slate-300 pb-1">
          Resumo Financeiro Consolidado
        </h3>
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 text-[10px] font-black text-slate-700 uppercase border-b border-slate-300">
              <th className="p-2 text-left">Item / Descrição</th>
              <th className="p-2 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {deductions.map((item, idx) => (
              <tr
                key={idx}
                className={
                  item.isRepasse
                    ? 'bg-slate-900 text-white font-black'
                    : item.isTotal
                    ? 'bg-slate-100 font-black text-slate-900'
                    : ''
                }
              >
                <td className="p-2">{item.label}</td>
                <td
                  className={`p-2 text-right ${
                    item.isDeduction ? 'text-rose-600 font-semibold' : ''
                  }`}
                >
                  {item.isDeduction
                    ? `- ${formatCurrency(item.value)}`
                    : formatCurrency(item.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Histórico de Repasses */}
      <section className="space-y-2">
        <h3 className="font-black text-slate-900 uppercase text-xs border-b border-slate-300 pb-1">
          Histórico de Repasses Efetuados
        </h3>
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 text-[10px] font-black text-slate-700 uppercase border-b border-slate-300">
              <th className="p-2 text-left">Data</th>
              <th className="p-2 text-left">Banco</th>
              <th className="p-2 text-right">Valor</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {transferHistoryMock.map((t) => (
              <tr key={t.id}>
                <td className="p-2">{formatDate(t.date)}</td>
                <td className="p-2 font-bold">{t.bank}</td>
                <td className="p-2 text-right font-bold">{formatCurrency(t.value)}</td>
                <td className="p-2 text-center font-bold">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Assinaturas de Homologação */}
      <div className="pt-10 grid grid-cols-2 gap-12 text-center">
        <div className="border-t border-slate-900 pt-2">
          <strong>Curitiba 360 SA</strong>
          <span className="block text-[9px] text-slate-500">Diretoria Financeira e Operações</span>
        </div>
        <div className="border-t border-slate-900 pt-2">
          <strong>Instituto Curitiba de Arte & Cultura</strong>
          <span className="block text-[9px] text-slate-500">Representante Legal / Parceiro</span>
        </div>
      </div>

      <footer className="mt-8 flex items-center justify-between border-t border-slate-200 pt-3 text-[10px] text-slate-500">
        <span>Emitido digitalmente via Plataforma Curitiba 360</span>
        <span>Página 1/1</span>
      </footer>
    </div>
  );
}
