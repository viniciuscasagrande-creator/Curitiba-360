import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  DollarSign, 
  ShieldCheck, 
  Eye, 
  Edit3, 
  Trash2, 
  Award,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export default function AgentTable({
  agents = [],
  selectedIds = [],
  onSelectAll,
  onSelectOne,
  onViewAgent,
  onEditAgent,
  onManageCommission,
  onDeleteAgent
}) {
  const isAllSelected = agents.length > 0 && selectedIds.length === agents.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < agents.length;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
              <th className="p-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              <th className="p-4">Agente comercial</th>
              <th className="p-4">Contato / Localidade</th>
              <th className="p-4">Cargo & Supervisor</th>
              <th className="p-4 text-right">Vendas (Mês)</th>
              <th className="p-4 text-center">Comissão</th>
              <th className="p-4 text-center">Permissões bo-01</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {agents.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <User className="w-10 h-10 stroke-1 text-slate-300" />
                    <p className="text-sm font-medium text-slate-600">Nenhum agente cadastrado nesta agência.</p>
                    <p className="text-xs text-slate-400">Clique em "Cadastrar Agente" para adicionar novos vendedores.</p>
                  </div>
                </td>
              </tr>
            ) : (
              agents.map((agent) => {
                const isSelected = selectedIds.includes(agent.id);
                const activePermsCount = Object.values(agent.permissoes || {}).filter(Boolean).length;

                return (
                  <tr
                    key={agent.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(agent.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Foto + Nome / CPF */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={agent.fotoUrl}
                          alt={agent.nome}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <div
                            onClick={() => onViewAgent(agent)}
                            className="font-bold text-slate-900 text-xs sm:text-sm hover:text-blue-600 cursor-pointer transition-colors"
                          >
                            {agent.nome}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            CPF: {agent.cpf}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contato / Cidade */}
                    <td className="p-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[170px]">{agent.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{agent.telefone}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        📍 {agent.cidade} - {agent.uf}
                      </div>
                    </td>

                    {/* Cargo & Supervisor */}
                    <td className="p-4">
                      <span className="font-semibold text-slate-800">{agent.cargo || 'Agente'}</span>
                      <div className="text-[10px] text-slate-500">
                        Supervisor: <span className="font-semibold text-slate-700">{agent.supervisor || 'Nenhum'}</span>
                      </div>
                    </td>

                    {/* Vendas */}
                    <td className="p-4 text-right">
                      <div className="font-extrabold text-slate-900">
                        R$ {(agent.vendasMesAtual || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        {agent.qtdVendasMes || 0} bilhetes emitidos
                      </div>
                    </td>

                    {/* Comissão */}
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-xs">
                        <DollarSign className="w-3 h-3" />
                        {agent.tipoComissao === 'fixo' 
                          ? `R$ ${agent.comissaoFixaPorVenda?.toFixed(2)}/venda` 
                          : `${agent.taxaComissao}%`}
                      </span>
                    </td>

                    {/* Permissões bo-01 */}
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        {activePermsCount}/8 ativas
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {agent.status === 'ativo' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <XCircle className="w-3.5 h-3.5" /> Inativo
                        </span>
                      )}
                    </td>

                    {/* Ações */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewAgent(agent)}
                          title="Ver Perfil completo"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onManageCommission(agent)}
                          title="Configurar Comissão"
                          className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Sliders className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditAgent(agent)}
                          title="Editar Agente"
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteAgent(agent.id)}
                          title="Remover Agente"
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
