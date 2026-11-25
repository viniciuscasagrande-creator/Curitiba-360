import { useState } from 'react';
import AgencyTabs from './components/AgencyTabs';
import AgencyFilters from './components/AgencyFilters';
import AgencyTable from './components/AgencyTable';

export default function AgenciesList() {
  const [activeTab, setActiveTab] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [sortField, setSortField] = useState('razaoSocial');
  const [sortOrder, setSortOrder] = useState('asc');

  // Dados reais mockados das Agências de Curitiba e Região
  const mockAgencies = [
    { id: '1', razaoSocial: 'Serra Verde Express Viagens Ltda', cnpj: '02.435.890/0001-44', cidade: 'Curitiba', uf: 'PR', email: 'contato@serraverdeexpress.com.br', quantidadeAgentes: 14, status: 'Ativa', dataCadastro: '12/01/2026' },
    { id: '2', razaoSocial: 'BWT Operadora de Turismo', cnpj: '08.122.409/0001-92', cidade: 'Curitiba', uf: 'PR', email: 'operacional@bwtoperadora.com.br', quantidadeAgentes: 22, status: 'Ativa', dataCadastro: '15/01/2026' },
    { id: '3', razaoSocial: 'Curitiba Tur Receptivo & Eventos', cnpj: '14.908.112/0001-05', cidade: 'Curitiba', uf: 'PR', email: 'vendas@curitibatur.com.br', quantidadeAgentes: 8, status: 'Ativa', dataCadastro: '20/01/2026' },
    { id: '4', razaoSocial: 'Nacional Transportes & Agência de Viagens', cnpj: '21.567.890/0001-11', cidade: 'São José dos Pinhais', uf: 'PR', email: 'agencia@nacional.com.br', quantidadeAgentes: 5, status: 'Pendente', dataCadastro: '02/02/2026' },
    { id: '5', razaoSocial: 'Paraná Turismo e Passagens Eireli', cnpj: '33.444.555/0001-77', cidade: 'Campo Largo', uf: 'PR', email: 'atendimento@paranatur.com.br', quantidadeAgentes: 3, status: 'Pendente', dataCadastro: '10/02/2026' },
    { id: '6', razaoSocial: 'Viaje Curitiba Agência de Viagens', cnpj: '45.123.789/0001-33', cidade: 'Curitiba', uf: 'PR', email: 'contato@viajecuritiba.com.br', quantidadeAgentes: 0, status: 'Inativa', dataCadastro: '18/02/2026' },
  ];

  const cities = Array.from(new Set(mockAgencies.map(a => a.cidade)));

  const counts = {
    todas: mockAgencies.length,
    ativas: mockAgencies.filter(a => a.status === 'Ativa').length,
    pendentes: mockAgencies.filter(a => a.status === 'Pendente').length,
    inativas: mockAgencies.filter(a => a.status === 'Inativa').length,
  };

  // Filtragem por Tab, Busca e Cidade
  const filteredAgencies = mockAgencies.filter(agency => {
    if (activeTab === 'ativas' && agency.status !== 'Ativa') return false;
    if (activeTab === 'pendentes' && agency.status !== 'Pendente') return false;
    if (activeTab === 'inativas' && agency.status !== 'Inativa') return false;

    if (cityFilter && agency.cidade !== cityFilter) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = agency.razaoSocial.toLowerCase().includes(term);
      const matchCnpj = agency.cnpj.includes(term);
      const matchEmail = agency.email.toLowerCase().includes(term);
      return matchName || matchCnpj || matchEmail;
    }

    return true;
  });

  // Ordenação
  const sortedAgencies = [...filteredAgencies].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === 'string') {
      return sortOrder === 'asc' 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    }

    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAgencies(sortedAgencies.map(a => a.id));
    } else {
      setSelectedAgencies([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedAgencies.includes(id)) {
      setSelectedAgencies(selectedAgencies.filter(item => item !== id));
    } else {
      setSelectedAgencies([...selectedAgencies, id]);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCityFilter('');
    setActiveTab('todas');
  };

  const handleBulkAction = (action) => {
    alert(`Ação em lote "${action}" executada para ${selectedAgencies.length} agência(s).`);
    setSelectedAgencies([]);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Cabeçalho do Módulo */}
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 0.35rem 0' }}>
          Gestão de Agências
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
          Gerencie o cadastro, comissionamento e agentes vinculados às agências parceiras.
        </p>
      </header>

      {/* Tabs por Status */}
      <AgencyTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={counts} 
      />

      {/* Filtros e Busca */}
      <AgencyFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        cities={cities}
        onResetFilters={handleResetFilters}
        selectedCount={selectedAgencies.length}
        onBulkAction={handleBulkAction}
      />

      {/* Tabela de Agências */}
      <AgencyTable 
        agencies={sortedAgencies}
        selectedAgencies={selectedAgencies}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        sortConfig={{ field: sortField, order: sortOrder }}
        onSort={handleSort}
      />

    </div>
  );
}
