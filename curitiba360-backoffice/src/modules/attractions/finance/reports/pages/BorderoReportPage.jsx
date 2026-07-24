import React, { useState } from 'react';
import { FileText, Printer, Download, Building, ShieldCheck, DollarSign, CheckCircle2, Signature } from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export function BorderoReportPage() {
  function handlePrint() {
    window.open('/admin/atracoes/attraction-001/relatorios/bordero/print', '_blank');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <FileText size={15} />
              Relatórios da Atração &bull; Fechamento Financeiro
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Borderô Resumido Oficial
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Documento contratual consolidado de conciliação financeira, receitas, encargos e repasse líquido.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 hover:bg-slate-100 transition shadow-2xs"
          >
            <Printer size={15} />
            Imprimir / Gerar Borderô PDF
          </button>
        </header>

        {/* 1. Dados do Parceiro & 2. Dados da Atração */}
        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building size={16} className="text-emerald-600" />
              1. Dados do Parceiro Comercial
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Razão Social</span>
                <strong className="text-slate-800">Instituto Curitiba de Arte & Cultura</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">CNPJ</span>
                <strong className="text-slate-800">12.345.678/0001-99</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Banco / Agência</span>
                <strong className="text-slate-800">Banco do Brasil / Ag: 3204-5</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Conta Corrente</span>
                <strong className="text-slate-800">10.450-8 (PIX Ativo)</strong>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              2. Dados da Atração
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Nome da Atração</span>
                <strong className="text-slate-800">Parque Jaime Lerner</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Código Interno</span>
                <strong className="text-slate-800">ATR-0001</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Cidade / UF</span>
                <strong className="text-slate-800">Curitiba / PR</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Período de Fechamento</span>
                <strong className="text-emerald-700 font-black">01/07/2026 a 31/07/2026</strong>
              </div>
            </div>
          </section>
        </div>

        {/* 3. Vendas & 4. Ingresso Detalhado */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            3. Vendas e Ingresso Detalhado
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                <th className="p-3">Categoria</th>
                <th className="p-3 text-right">Qtd Vendida</th>
                <th className="p-3 text-right">Preço Praticado</th>
                <th className="p-3 text-right">Subtotal Bruto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="p-3 font-bold">Inteira - Parque Jaime Lerner</td>
                <td className="p-3 text-right font-bold">1.250</td>
                <td className="p-3 text-right">R$ 50,00</td>
                <td className="p-3 text-right font-bold text-slate-900">R$ 62.500,00</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Meia-Entrada (Estudante/Idoso)</td>
                <td className="p-3 text-right font-bold">840</td>
                <td className="p-3 text-right">R$ 25,00</td>
                <td className="p-3 text-right font-bold text-slate-900">R$ 21.000,00</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 5. Cortesias & 6. Resumo de Preços & 7. Resumo de Pagamentos */}
        <div className="grid gap-5 md:grid-cols-3">
          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              5. Cortesias Emitidas
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between"><span>Imprensa / Protocolo:</span><strong>80 ingressos</strong></div>
              <div className="flex justify-between font-black text-slate-900"><span>Total Cortesias:</span><span className="text-amber-600">R$ 0,00</span></div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              6. Resumo de Preços
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between"><span>Ticket Médio:</span><strong>R$ 40,00</strong></div>
              <div className="flex justify-between"><span>Total Bruto:</span><strong>R$ 83.500,00</strong></div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              7. Resumo de Pagamentos
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between"><span>Cartão de Crédito:</span><strong>R$ 50.000,00</strong></div>
              <div className="flex justify-between"><span>PIX Instantâneo:</span><strong>R$ 33.500,00</strong></div>
            </div>
          </section>
        </div>

        {/* 8. Despesas & 9. Resumo de Fechamento & 10. Resumo Geral */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4 bg-emerald-50/40 border-emerald-200/80">
          <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wider border-b border-emerald-200 pb-2">
            8, 9 & 10. Despesas, Fechamento e Repasse Geral
          </h3>
          <div className="grid gap-4 sm:grid-cols-4 text-xs font-bold">
            <div className="p-3 rounded-2xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">Receita Bruta Total</span>
              <strong className="text-base font-black text-slate-900">R$ 83.500,00</strong>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">(-) Taxa Intermediação (10%)</span>
              <strong className="text-base font-black text-rose-600">- R$ 8.350,00</strong>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block uppercase">(-) Comissões / Encargos</span>
              <strong className="text-base font-black text-rose-600">- R$ 1.250,00</strong>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-600 text-white border border-emerald-700">
              <span className="text-[10px] text-emerald-200 block uppercase font-bold">(=) REPASSE LÍQUIDO FINAL</span>
              <strong className="text-lg font-black text-white">R$ 73.900,00</strong>
            </div>
          </div>
        </section>

        {/* 11 & 12. Assinaturas Curitiba 360 e Parceiro */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            11 & 12. Assinaturas de Homologação do Borderô
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 pt-6">
            <div className="text-center space-y-2">
              <div className="border-b border-slate-400 w-3/4 mx-auto" />
              <strong className="block text-xs text-slate-900">Assinatura — Curitiba 360 (Diretoria Financeira)</strong>
              <span className="text-[10px] text-slate-400 font-mono">Assinado digitalmente por Curitiba 360 SA</span>
            </div>

            <div className="text-center space-y-2">
              <div className="border-b border-slate-400 w-3/4 mx-auto" />
              <strong className="block text-xs text-slate-900">Assinatura — Parceiro Comercial / Representante</strong>
              <span className="text-[10px] text-slate-400 font-mono">Instituto Curitiba de Arte & Cultura</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BorderoReportPage;
