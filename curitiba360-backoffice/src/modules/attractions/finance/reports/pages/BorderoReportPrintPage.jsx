import React from 'react';

export function BorderoReportPrintPage() {
  return (
    <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-left text-xs leading-relaxed space-y-6">
      {/* Header Oficial */}
      <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">Curitiba 360</h1>
          <p className="text-[10px] font-bold text-slate-500">BORDERÔ OFICIAL DE FECHAMENTO FINANCEIRO</p>
        </div>
        <div className="text-right">
          <h2 className="text-base font-black text-slate-900 uppercase">DOCUMENTO AUDITADO #BDR-2026-07</h2>
          <span className="text-[10px] font-bold text-slate-600 block">Emissão: 31/07/2026</span>
        </div>
      </header>

      {/* 1. Parceiro & 2. Atração */}
      <div className="grid grid-cols-2 gap-4 border border-slate-300 p-4 rounded-xl">
        <div>
          <h3 className="font-black text-slate-900 uppercase text-[10px] mb-1">1. Parceiro Comercial</h3>
          <p><strong>Razão Social:</strong> Instituto Curitiba de Arte & Cultura</p>
          <p><strong>CNPJ:</strong> 12.345.678/0001-99</p>
          <p><strong>Dados Bancários:</strong> Banco do Brasil (Ag: 3204-5 / CC: 10.450-8)</p>
        </div>
        <div>
          <h3 className="font-black text-slate-900 uppercase text-[10px] mb-1">2. Atração</h3>
          <p><strong>Atração:</strong> Parque Jaime Lerner (ATR-0001)</p>
          <p><strong>Cidade/UF:</strong> Curitiba / PR</p>
          <p><strong>Período:</strong> 01/07/2026 a 31/07/2026</p>
        </div>
      </div>

      {/* 3. Vendas & 4. Ingresso Detalhado */}
      <div>
        <h3 className="font-black text-slate-900 uppercase text-[10px] mb-2">3 & 4. Detalhamento de Vendas de Ingressos</h3>
        <table className="w-full border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 font-black text-[10px] text-slate-700 uppercase border-b border-slate-300">
              <th className="p-2 text-left">Categoria</th>
              <th className="p-2 text-right">Qtd</th>
              <th className="p-2 text-right">Preço</th>
              <th className="p-2 text-right">Total Bruto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-2 font-bold">Inteira - Parque Jaime Lerner</td>
              <td className="p-2 text-right font-bold">1.250</td>
              <td className="p-2 text-right">R$ 50,00</td>
              <td className="p-2 text-right font-bold">R$ 62.500,00</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Meia-Entrada (Estudante/Idoso)</td>
              <td className="p-2 text-right font-bold">840</td>
              <td className="p-2 text-right">R$ 25,00</td>
              <td className="p-2 text-right font-bold">R$ 21.000,00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 5, 6, 7. Cortesias, Preços, Pagamentos */}
      <div className="grid grid-cols-3 gap-4 text-[11px]">
        <div className="p-3 border border-slate-300 rounded-xl">
          <strong className="block uppercase text-[9px] text-slate-500 mb-1">5. Cortesias</strong>
          <p>Total Emitidas: <strong>80 unidades</strong></p>
          <p>Valor Total: <strong>R$ 0,00</strong></p>
        </div>
        <div className="p-3 border border-slate-300 rounded-xl">
          <strong className="block uppercase text-[9px] text-slate-500 mb-1">6. Resumo Preços</strong>
          <p>Ticket Médio: <strong>R$ 40,00</strong></p>
          <p>Receita Bruta: <strong>R$ 83.500,00</strong></p>
        </div>
        <div className="p-3 border border-slate-300 rounded-xl">
          <strong className="block uppercase text-[9px] text-slate-500 mb-1">7. Pagamentos</strong>
          <p>Cartão Crédito: <strong>R$ 50.000,00</strong></p>
          <p>PIX: <strong>R$ 33.500,00</strong></p>
        </div>
      </div>

      {/* 8, 9, 10. Fechamento e Repasse Geral */}
      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
        <h3 className="font-black uppercase text-[10px] text-emerald-400">8, 9 & 10. Resumo de Fechamento Financeiro</h3>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div><span className="text-[9px] text-slate-400 block uppercase">Bruto</span><strong>R$ 83.500,00</strong></div>
          <div><span className="text-[9px] text-slate-400 block uppercase">Taxa Intermediação</span><strong className="text-rose-400">- R$ 8.350,00</strong></div>
          <div><span className="text-[9px] text-slate-400 block uppercase">Encargos/Comissões</span><strong className="text-rose-400">- R$ 1.250,00</strong></div>
          <div><span className="text-[9px] text-emerald-300 block uppercase">LÍQUIDO A REPASSAR</span><strong className="text-emerald-400 text-sm">R$ 73.900,00</strong></div>
        </div>
      </div>

      {/* 11 & 12. Assinaturas */}
      <div className="pt-12 grid grid-cols-2 gap-12 text-center">
        <div className="border-t border-slate-900 pt-2">
          <strong>Curitiba 360 SA</strong>
          <span className="block text-[9px] text-slate-500">Diretoria Financeira e Operações</span>
        </div>
        <div className="border-t border-slate-900 pt-2">
          <strong>Instituto Curitiba de Arte & Cultura</strong>
          <span className="block text-[9px] text-slate-500">Representante Comercial Autorizado</span>
        </div>
      </div>
    </div>
  );
}

export default BorderoReportPrintPage;
