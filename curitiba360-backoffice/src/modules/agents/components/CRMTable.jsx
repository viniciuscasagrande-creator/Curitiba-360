import React from 'react';
import { Users, Phone, Mail, Tag, DollarSign, Calendar } from 'lucide-react';

export default function CRMTable({ customers = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" /> Sua Carteira de Clientes (CRM)
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">
          {customers.length} clientes vinculados
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
              <th className="p-4">Cliente</th>
              <th className="p-4">Contato</th>
              <th className="p-4">Cidade</th>
              <th className="p-4 text-right">LTV Acumulado</th>
              <th className="p-4">Última Compra</th>
              <th className="p-4 text-center">Tag CRM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {customers.map((cli) => (
              <tr key={cli.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-slate-900">
                  <div>{cli.nome}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{cli.id}</div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1 text-slate-700">
                    <Mail className="w-3 h-3 text-slate-400" /> {cli.email}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                    <Phone className="w-3 h-3 text-slate-400" /> {cli.telefone}
                  </div>
                </td>

                <td className="p-4 font-semibold text-slate-800">{cli.cidade}</td>

                <td className="p-4 text-right font-extrabold text-emerald-700 text-sm">
                  R$ {cli.ltv?.toFixed(2)}
                </td>

                <td className="p-4 text-slate-700">
                  <div>{cli.ultimaCompra}</div>
                  <div className="text-[10px] text-slate-400">{cli.totalCompras} compras totais</div>
                </td>

                <td className="p-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    cli.tag === 'VIP'
                      ? 'bg-purple-100 text-purple-800'
                      : cli.tag.includes('Inativo')
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <Tag className="w-3 h-3" /> {cli.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
