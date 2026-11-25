import { Search, Filter, RefreshCw, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AgencyFilters({
  searchTerm,
  onSearchChange,
  cityFilter,
  onCityChange,
  cities = [],
  onResetFilters,
  selectedCount = 0,
  onBulkAction
}) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
        {/* Input de Busca */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar por razão social, CNPJ ou e-mail..."
            style={{
              width: '100%',
              padding: '0.625rem 2.25rem 0.625rem 1rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          <Search size={16} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>

        {/* Filtro por Cidade */}
        <div style={{ position: 'relative', minWidth: '180px' }}>
          <select
            value={cityFilter}
            onChange={(e) => onCityChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.625rem 2rem 0.625rem 1rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <option value="">Todas as Cidades</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <Filter size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
        </div>

        {/* Reset de Filtros */}
        <button
          onClick={onResetFilters}
          title="Limpar Filtros"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.625rem 0.875rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#475569',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={14} />
          <span>Limpar</span>
        </button>
      </div>

      {/* Ações e Botão Adicionar */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {selectedCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#eff6ff', padding: '0.5rem 0.875rem', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#1d4ed8' }}>{selectedCount} selecionada(s)</span>
            <button
              onClick={() => onBulkAction('suspender')}
              style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
            >
              Suspender
            </button>
            <button
              onClick={() => onBulkAction('aprovar')}
              style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
            >
              Aprovar
            </button>
          </div>
        )}

        <button
          onClick={() => navigate('/agencias/novo')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            borderRadius: '8px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
          }}
        >
          <Plus size={18} />
          <span>Adicionar Agência</span>
        </button>
      </div>
    </div>
  );
}
