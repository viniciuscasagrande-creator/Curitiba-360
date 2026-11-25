import { Edit3, Eye, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AgencyStatusBadge from './AgencyStatusBadge';

export default function AgencyTable({
  agencies,
  selectedAgencies = [],
  onSelectAll,
  onSelectRow,
  sortConfig,
  onSort
}) {
  const navigate = useNavigate();

  const allSelected = agencies.length > 0 && agencies.every(a => selectedAgencies.includes(a.id));

  return (
    <div style={{ width: '100%', overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
            <th style={{ padding: '0.875rem 1rem', width: '40px' }}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                style={{ cursor: 'pointer' }}
              />
            </th>
            <th 
              onClick={() => onSort('razaoSocial')}
              style={{ padding: '0.875rem 1rem', cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Razão Social / CNPJ</span>
                <ArrowUpDown size={12} className="text-slate-400" />
              </div>
            </th>
            <th style={{ padding: '0.875rem 1rem' }}>Localização</th>
            <th 
              onClick={() => onSort('quantidadeAgentes')}
              style={{ padding: '0.875rem 1rem', textAlign: 'center', cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Agentes</span>
                <ArrowUpDown size={12} className="text-slate-400" />
              </div>
            </th>
            <th style={{ padding: '0.875rem 1rem' }}>Status</th>
            <th 
              onClick={() => onSort('dataCadastro')}
              style={{ padding: '0.875rem 1rem', cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Data Cadastro</span>
                <ArrowUpDown size={12} className="text-slate-400" />
              </div>
            </th>
            <th style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agencies.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                Nenhuma agência encontrada com os filtros selecionados.
              </td>
            </tr>
          ) : (
            agencies.map((agency) => {
              const isSelected = selectedAgencies.includes(agency.id);
              return (
                <tr 
                  key={agency.id} 
                  style={{ 
                    borderBottom: '1px solid #f1f5f9', 
                    backgroundColor: isSelected ? '#f0f9ff' : 'transparent',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <td style={{ padding: '1rem' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectRow(agency.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{agency.razaoSocial}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>CNPJ: {agency.cnpj}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#334155' }}>
                    <div>{agency.cidade} - {agency.uf}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{agency.email}</div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{ 
                      fontWeight: '700', 
                      color: '#0f172a',
                      backgroundColor: '#f1f5f9',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px'
                    }}>
                      {agency.quantidadeAgentes || 0}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <AgencyStatusBadge status={agency.status} />
                  </td>
                  <td style={{ padding: '1rem', color: '#475569' }}>
                    {agency.dataCadastro}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => navigate(`/agencias/${agency.id}`)}
                        title="Ver Detalhes"
                        style={{ padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', cursor: 'pointer' }}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/agencias/${agency.id}/editar`)}
                        title="Editar Agência"
                        style={{ padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#2563eb', cursor: 'pointer' }}
                      >
                        <Edit3 size={16} />
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
  );
}
