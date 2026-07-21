import React from 'react';
import { History, ShieldCheck, User, Calendar, FileText, Lock } from 'lucide-react';

export default function AuditLogTable() {
  const auditLogs = [
    {
      id: 'LOG-9001',
      dataHora: '2026-07-21 10:16',
      modulo: 'Reembolsos',
      acao: 'Aprovação Automática IA (CDC 7 dias)',
      usuario: 'AI Engine v2.4',
      papel: 'Motor IA',
      ip: '127.0.0.1 (Interno)',
      detalhes: 'Solicitação REF-7001 no valor de R$ 450,00 aprovada automaticamente'
    },
    {
      id: 'LOG-9002',
      dataHora: '2026-07-20 14:32',
      modulo: 'Repasses PIX',
      acao: 'Liquidação de Repasse PIX',
      usuario: 'Maria Oliveira',
      papel: 'Financeiro Agência',
      ip: '177.12.88.10',
      detalhes: 'Transferência REP-8001 no valor de R$ 12.500,00 enviada para a chave CNPJ 98.765.432/0001-10'
    },
    {
      id: 'LOG-9003',
      dataHora: '2026-07-20 09:15',
      modulo: 'Conciliação',
      acao: 'Tratamento de Divergência',
      usuario: 'Bruno Carvalho',
      papel: 'Operador Financeiro',
      ip: '177.12.88.14',
      detalhes: 'Venda VND-9903 conciliada manualmente após confirmação de adquirente'
    },
    {
      id: 'LOG-9004',
      dataHora: '2026-07-01 10:00',
      modulo: 'Fechamento Contábil',
      acao: 'Fechamento do Período PER-2026-06',
      usuario: 'Admin Financeiro',
      papel: 'Administrador',
      ip: '177.12.88.01',
      detalhes: 'Período Junho/2026 encerrado e travado para edições contábeis'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" /> Central Unificada de Auditoria Contábil & Fiscal
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-slate-700 text-[11px]">
          Trilha Auditada Imutável
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
              <th className="p-4">ID Log / Data</th>
              <th className="p-4">Módulo</th>
              <th className="p-4">Ação Auditada</th>
              <th className="p-4">Usuário / Papel</th>
              <th className="p-4">Endereço IP</th>
              <th className="p-4">Detalhes da Operação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-mono">
                  <div className="font-bold text-slate-900">{log.id}</div>
                  <div className="text-[10px] text-slate-400">{log.dataHora}</div>
                </td>

                <td className="p-4 font-bold text-slate-800">{log.modulo}</td>

                <td className="p-4 font-semibold text-blue-700">{log.acao}</td>

                <td className="p-4">
                  <div className="font-bold text-slate-900">{log.usuario}</div>
                  <div className="text-[10px] text-slate-500">{log.papel}</div>
                </td>

                <td className="p-4 font-mono text-[10px] text-slate-500">{log.ip}</td>

                <td className="p-4 text-slate-600 font-medium">{log.detalhes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
