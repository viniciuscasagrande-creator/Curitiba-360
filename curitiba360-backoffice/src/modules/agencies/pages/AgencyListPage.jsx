import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { agencyService } from '../services/agencyService';
import AgencyTabs from '../components/AgencyTabs';
import AgencyFilters from '../components/AgencyFilters';
import AgencyTable from '../components/AgencyTable';
import { 
  Building2, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp, 
  FileText, 
  X,
  AlertCircle,
  Sparkles,
  Download,
  ShieldCheck
} from 'lucide-react';

export default function AgencyListPage() {
  const navigate = useNavigate();

  // Estados principais
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [activeTab, setActiveTab] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [cidadeFilter, setCidadeFilter] = useState('todas');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modais e Feedback
  const [selectedAgencyDetail, setSelectedAgencyDetail] = useState(null);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Formulário para cadastro/edição
  const [formData, setFormData] = useState({
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    email: '',
    telefone: '',
    cidade: 'Curitiba',
    uf: 'PR',
    responsavel: '',
    comissaoPadrao: 12.0,
    limiteCredito: 50000.00
  });

  // Carregar Agências
  const loadAgencies = async () => {
    setLoading(true);
    try {
      const response = await agencyService.getAgencies({
        search: searchQuery,
        status: activeTab,
        cidade: cidadeFilter
      });
      if (response.success) {
        setAgencies(response.data);
        setCounts(response.counts);
      }
    } catch (error) {
      showToast('Erro ao carregar lista de agências', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgencies();
    setCurrentPage(1);
    setSelectedIds([]);
  }, [activeTab, searchQuery, cidadeFilter]);

  // Lista de Cidades Únicas para o Filtro
  const cidadesList = useMemo(() => {
    const list = agencies.map((a) => a.cidade).filter(Boolean);
    return Array.from(new Set(list));
  }, [agencies]);

  // Paginação Calculada
  const totalPages = Math.ceil(agencies.length / pageSize) || 1;
  const paginatedAgencies = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return agencies.slice(start, start + pageSize);
  }, [agencies, currentPage, pageSize]);

  // Exibir mensagens toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers de Seleção
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedAgencies.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Resetar Filtros
  const handleResetFilters = () => {
    setSearchQuery('');
    setCidadeFilter('todas');
    setActiveTab('todas');
  };

  // Ações em Massa
  const handleBulkStatusChange = async (ids, newStatus) => {
    try {
      await agencyService.bulkUpdateStatus(ids, newStatus);
      showToast(`${ids.length} agência(s) atualizada(s) com sucesso!`);
      setSelectedIds([]);
      loadAgencies();
    } catch (err) {
      showToast('Erro ao atualizar agências', 'error');
    }
  };

  const handleBulkDelete = async (ids) => {
    if (!window.confirm(`Tem certeza que deseja excluir ${ids.length} agência(s)?`)) return;
    try {
      await agencyService.deleteAgencies(ids);
      showToast(`${ids.length} agência(s) excluída(s) com sucesso!`);
      setSelectedIds([]);
      loadAgencies();
    } catch (err) {
      showToast('Erro ao excluir agências', 'error');
    }
  };

  const handleEmitContract = (ids) => {
    showToast(`Contrato(s) gerado(s) para ${ids.length} agência(s). Redirecionando para emissão...`);
  };

  // Salvar Agência
  const handleSaveForm = async (e) => {
    e.preventDefault();
    try {
      await agencyService.saveAgency(editingAgency ? { id: editingAgency.id, ...formData } : formData);
      showToast(editingAgency ? 'Agência atualizada com sucesso!' : 'Nova agência cadastrada!');
      setShowAddEditModal(false);
      setEditingAgency(null);
      loadAgencies();
    } catch (err) {
      showToast('Erro ao salvar agência', 'error');
    }
  };

  // Abrir Modal Edição
  const handleOpenEdit = (agency) => {
    setEditingAgency(agency);
    setFormData({
      nomeFantasia: agency.nomeFantasia || '',
      razaoSocial: agency.razaoSocial || '',
      cnpj: agency.cnpj || '',
      email: agency.email || '',
      telefone: agency.telefone || '',
      cidade: agency.cidade || 'Curitiba',
      uf: agency.uf || 'PR',
      responsavel: agency.responsavel || '',
      comissaoPadrao: agency.comissaoPadrao || 12.0,
      limiteCredito: agency.limiteCredito || 50000.00
    });
    setShowAddEditModal(true);
  };

  // Abrir Novo Cadastro (Etapa 02 Rota: /agencias/novo)
  const handleOpenNew = () => {
    navigate('/agencias/novo');
  };

  // Exportar CSV
  const handleExportCSV = () => {
    const headers = ['ID,Nome Fantasia,Razao Social,CNPJ,Email,Cidade,UF,Agentes,Status\n'];
    const rows = agencies.map(
      (a) => `${a.id},"${a.nomeFantasia}","${a.razaoSocial}",${a.cnpj},${a.email},${a.cidade},${a.uf},${a.qtdAgentes},${a.status}`
    );
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `agencias_curitiba360_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exportação concluída!');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold animate-bounce ${
            toastMessage.type === 'error'
              ? 'bg-red-900 text-white border-red-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* CABEÇALHO DO MÓDULO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
              MOD-05
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Gestão de Agências B2B 🏢
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Credenciamento de agências de turismo, gestão de contratos, agentes autorizados e limites operacionais.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenNew}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Agência</span>
          </button>
        </div>
      </div>

      {/* KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Agências</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{counts.todas || 0}</div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" />
            <span>Cadastradas no ecossistema</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Agências Ativas</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{counts.ativo || 0}</div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Habilitadas para venda B2B</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Aguardando Contrato</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{counts.pendente || 0}</div>
          <div className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
            <FileText className="w-3 h-3" />
            <span>Pendente assinat. digital</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total de Agentes</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {agencies.reduce((acc, a) => acc + (a.qtdAgentes || 0), 0)}
          </div>
          <div className="text-[11px] text-purple-600 font-medium">
            Agentes operantes vinculados
          </div>
        </div>
      </div>

      {/* ABAS DE STATUS */}
      <AgencyTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={counts}
      />

      {/* PAINEL DE BUSCA E FILTROS */}
      <AgencyFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cidadeFilter={cidadeFilter}
        onCidadeChange={setCidadeFilter}
        cidadesList={cidadesList}
        onReset={handleResetFilters}
        onRefresh={loadAgencies}
        onExport={handleExportCSV}
      />

      {/* TABELA DE AGÊNCIAS */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold animate-pulse">
            Carregando agências de turismo...
          </p>
        </div>
      ) : (
        <AgencyTable
          agencies={paginatedAgencies}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onViewDetails={(agency) => navigate(`/agencias/${agency.id}`)}
          onEdit={(agency) => navigate(`/agencias/${agency.id}/editar`)}
          onDeleteOne={(id) => handleBulkDelete([id])}
          onBulkStatusChange={handleBulkStatusChange}
          onBulkDelete={handleBulkDelete}
          onEmitContract={handleEmitContract}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      )}

      {/* MODAL DETALHES DA AGÊNCIA */}
      {selectedAgencyDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  {selectedAgencyDetail.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedAgencyDetail.nomeFantasia}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAgencyDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Razão Social:</span>
                <p className="font-semibold text-slate-800">{selectedAgencyDetail.razaoSocial}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">CNPJ:</span>
                <p className="font-mono font-semibold text-slate-800">{selectedAgencyDetail.cnpj}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Responsável Legal:</span>
                <p className="font-semibold text-slate-800">{selectedAgencyDetail.responsavel}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">E-mail Comercial:</span>
                <p className="font-semibold text-slate-800">{selectedAgencyDetail.email}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Telefone:</span>
                <p className="font-semibold text-slate-800">{selectedAgencyDetail.telefone}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Localidade:</span>
                <p className="font-semibold text-slate-800">
                  {selectedAgencyDetail.cidade} - {selectedAgencyDetail.uf}
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Comissão Padrão:</span>
                <p className="font-bold text-blue-600">{selectedAgencyDetail.comissaoPadrao}%</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Limite de Crédito:</span>
                <p className="font-bold text-emerald-600">
                  R$ {selectedAgencyDetail.limiteCredito?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  const ag = selectedAgencyDetail;
                  setSelectedAgencyDetail(null);
                  handleOpenEdit(ag);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all"
              >
                Editar Cadastro
              </button>
              <button
                onClick={() => setSelectedAgencyDetail(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADICIONAR / EDITAR AGÊNCIA */}
      {showAddEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingAgency ? `Editar Agência ${editingAgency.id}` : 'Cadastrar Nova Agência B2B'}
              </h3>
              <button
                onClick={() => setShowAddEditModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome Fantasia *</label>
                  <input
                    type="text"
                    required
                    value={formData.nomeFantasia}
                    onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Ex: Tour CWB Premium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Razão Social *</label>
                  <input
                    type="text"
                    required
                    value={formData.razaoSocial}
                    onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Ex: Turismo Curitiba Ltda"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CNPJ *</label>
                  <input
                    type="text"
                    required
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-blue-500/20"
                    placeholder="00.000.000/0001-00"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Responsável Legal *</label>
                  <input
                    type="text"
                    required
                    value={formData.responsavel}
                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Nome completo do responsável"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">E-mail Comercial *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    placeholder="contato@agencia.com.br"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                    placeholder="(41) 99999-0000"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">UF</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.uf}
                    onChange={(e) => setFormData({ ...formData, uf: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg uppercase focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Comissão Padrão (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.comissaoPadrao}
                    onChange={(e) => setFormData({ ...formData, comissaoPadrao: parseFloat(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Limite de Crédito (R$)</label>
                  <input
                    type="number"
                    step="500"
                    value={formData.limiteCredito}
                    onChange={(e) => setFormData({ ...formData, limiteCredito: parseFloat(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddEditModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                >
                  {editingAgency ? 'Salvar Alterações' : 'Cadastrar Agência'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
