// src/pages/GestaoIngressos.jsx
import { useState } from 'react';

export default function GestaoIngressos() {
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Mock de ingressos emitidos/vendidos
  const [ingressos, setIngressos] = useState([
    { id: 'ING8001', turista: 'Beatriz Ramos', cpf: '123.456.789-10', atracao: 'Ópera de Arame', categoria: 'Inteira', lote: '001', valor: 50.00, status: 'Pendente', dataCompra: '19/07/2026' },
    { id: 'ING8002', turista: 'Carlos Souza', cpf: '444.555.666-00', atracao: 'Jardim Botânico', categoria: 'Meia-entrada', lote: '001', valor: 0.00, status: 'Validado', dataCompra: '20/07/2026' },
    { id: 'ING8003', turista: 'Ana Maria', cpf: '777.888.999-55', atracao: 'Ópera de Arame', categoria: 'Inteira', lote: '002', valor: 60.00, status: 'Cancelado', dataCompra: '15/07/2026' },
  ]);

  const filtrados = ingressos.filter(i => {
    const matchBusca = 
      i.turista.toLowerCase().includes(termoBusca.toLowerCase()) || 
      i.id.toLowerCase().includes(termoBusca.toLowerCase()) || 
      i.cpf.includes(termoBusca) || 
      i.atracao.toLowerCase().includes(termoBusca.toLowerCase());
    const matchStatus = filtroStatus === 'Todos' || i.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const handleValidarManual = (id) => {
    if (confirm(`Deseja validar manualmente o ingresso #${id}?`)) {
      setIngressos(ingressos.map(i => i.id === id ? { ...i, status: 'Validado' } : i));
      alert('Ingresso validado com sucesso!');
    }
  };

  const handleCancelarIngresso = (id) => {
    if (confirm(`Deseja cancelar o ingresso #${id}?`)) {
      setIngressos(ingressos.map(i => i.id === id ? { ...i, status: 'Cancelado' } : i));
      alert('Ingresso cancelado.');
    }
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Ingressos</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Pesquise, audite e gerencie o status de ingressos vendidos ou emitidos individualmente</p>
        </div>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar por código, turista, CPF ou atração..." 
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1, minWidth: '250px' }}
        />

        <select 
          value={filtroStatus} 
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Pendente">Pendentes de Uso</option>
          <option value="Validado">Validados</option>
          <option value="Cancelado">Cancelados</option>
        </select>
      </div>

      {/* TABELA DE INGRESSOS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Código</th>
              <th style={{ padding: '1rem' }}>Turista (Nome/CPF)</th>
              <th style={{ padding: '1rem' }}>Atração</th>
              <th style={{ padding: '1rem' }}>Categoria / Lote</th>
              <th style={{ padding: '1rem' }}>Valor Pago</th>
              <th style={{ padding: '1rem' }}>Data Compra</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum ingresso localizado.</td>
              </tr>
            ) : (
              filtrados.map((i) => (
                <tr key={i.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>#{i.id}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{i.turista}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>CPF: {i.cpf}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#3b82f6' }}>{i.atracao}</td>
                  <td style={{ padding: '1rem' }}>
                    <div>{i.categoria}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Lote {i.lote}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>R$ {i.valor.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{i.dataCompra}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: i.status === 'Validado' ? '#d1fae5' : i.status === 'Cancelado' ? '#fee2e2' : '#fef3c7',
                      color: i.status === 'Validado' ? '#065f46' : i.status === 'Cancelado' ? '#991b1b' : '#92400e'
                    }}>
                      {i.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    {i.status === 'Pendente' && (
                      <>
                        <button 
                          onClick={() => handleValidarManual(i.id)}
                          style={{ padding: '0.25rem 0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          Validar
                        </button>
                        <button 
                          onClick={() => handleCancelarIngresso(i.id)}
                          style={{ padding: '0.25rem 0.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {i.status !== 'Pendente' && (
                      <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Sem ações</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
