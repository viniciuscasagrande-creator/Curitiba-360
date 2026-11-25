import React from 'react';
import AgencyStatusBadge from './AgencyStatusBadge';
import { 
  Building2, 
  Users, 
  FileText, 
  Edit3, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Mail,
  Phone,
  DollarSign,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AgencyTable({
  agencies = [],
  selectedIds = [],
  onSelectAll,
  onSelectOne,
  onViewDetails,
  onEdit,
  onDeleteOne,
  onBulkStatusChange,
  onBulkDelete,
  onEmitContract,
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange
}) {
  const isAllSelected = agencies.length > 0 && selectedIds.length === agencies.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < agencies.length;

  return (
    <div className="space-y-3">
      {/* Barra de Ações em Massa (Quando houver itens selecionados) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-blue-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-fade-in text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-blue-700 px-2.5 py-1 rounded-md font-bold">
              {selectedIds.length} selecionada(s)
            </span>
            <span className="text-blue-200 hidden sm:inline">Ações em lote disponíveis:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onBulkStatusChange(selectedIds, 'ativo')}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-lg transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Aprovar / Ativar
            </button>
            <button
              onClick={() => onEmitContract && onEmitContract(selectedIds)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Emitir Contrato
            </button>
            <button
              onClick={() => onBulkDelete(selectedIds)}
              className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 font-semibold rounded-lg transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Excluir
            </button>
          </div>
        </div>
      )}

      {/* Tabela Responsiva */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
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
                <th className="p-4">ID</th>
                <th className="p-4">Agência / CNPJ</th>
                <th className="p-4">Contato / Localidade</th>
                <th className="p-4">Responsável Legal</th>
                <th className="p-4 text-center">Agentes</th>
                <th className="p-4">Comissão & Limite</th>
                <th className="p-4">Status Credenciamento</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {agencies.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Building2 className="w-10 h-10 stroke-1 text-slate-300" />
                      <p className="text-sm font-medium text-slate-600">Nenhuma agência encontrada.</p>
                      <p className="text-xs text-slate-400">Tente ajustar seus termos de pesquisa ou filtros.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                agencies.map((agency) => {
                  const isSelected = selectedIds.includes(agency.id);
                  return (
                    <tr
                      key={agency.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectOne(agency.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* ID */}
                      <td className="p-4 font-mono font-bold text-slate-500">
                        {agency.id}
                      </td>

                      {/* Agência / CNPJ */}
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {agency.nomeFantasia}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate max-w-[200px]">
                          {agency.razaoSocial}
                        </div>
                        <div className="font-mono text-[11px] text-slate-600 mt-0.5">
                          CNPJ: {agency.cnpj}
                        </div>
                      </td>

                      {/* Contato */}
                      <td className="p-4 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-700 text-xs">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[180px]">{agency.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{agency.telefone}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-semibold">
                          📍 {agency.cidade} - {agency.uf}
                        </div>
                      </td>

                      {/* Responsável Legal */}
                      <td className="p-4">
                        <span className="font-semibold text-slate-800">{agency.responsavel}</span>
                        <div className="text-[10px] text-slate-400">
                          Cadastrada em {agency.dataCadastro}
                        </div>
                      </td>

                      {/* Qtd Agentes */}
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-xs">
                          <Users className="w-3 h-3 text-slate-500" />
                          {agency.qtdAgentes}
                        </span>
                      </td>

                      {/* Comissão e Limite */}
                      <td className="p-4 space-y-0.5">
                        <div className="font-semibold text-slate-800">
                          {agency.comissaoPadrao}% comissão
                        </div>
                        <div className="text-[11px] text-emerald-700 font-mono font-medium">
                          R$ {agency.limiteCredito ? agency.limiteCredito.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'} limite
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <AgencyStatusBadge status={agency.status} />
                      </td>

                      {/* Ações */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onViewDetails(agency)}
                            title="Ver detalhes"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEdit(agency)}
                            title="Editar agência"
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteOne(agency.id)}
                            title="Excluir agência"
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

        {/* Rodapé da Tabela: Paginação e Contadores */}
        <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Exibir</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="py-1 px-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
              <option value={50}>50 por página</option>
            </select>
            <span>de {agencies.length} registros nesta visualização</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-500">
              Página {currentPage} de {totalPages || 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
