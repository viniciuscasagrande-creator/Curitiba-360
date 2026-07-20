// src/pages/GestaoCupons.jsx
import { useState } from 'react';

export default function GestaoCupons() {
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Mock de cupons de desconto
  const [cupons, setCupons] = useState([
    { id: 1, codigo: 'BENVINDO10', tipo: 'Porcentagem', valor: 10, valorMinimo: 0.00, expiracao: '31/12/2026', totalUsado: 154, status: 'Ativo' },
    { id: 2, codigo: 'WINTER20', tipo: 'Porcentagem', valor: 20, valorMinimo: 100.00, expiracao: '31/08/2026', totalUsado: 45, status: 'Ativo' },
    { id: 3, codigo: 'DESCONTO15', tipo: 'Valor Fixo', valor: 15, valorMinimo: 50.00, expiracao: '01/06/2026', totalUsado: 23, status: 'Inativo' },
  ]);

  const filtrados = cupons.filter(c => {
    const matchBusca = c.codigo.toLowerCase().includes(termoBusca.toLowerCase());
    const matchStatus = filtroStatus === 'Todos' || c.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const handleToggleStatus = (id) => {
    setCupons(cupons.map(c => c.id === id ? { ...c, status: c.status === 'Ativo' ? 'Inativo' : 'Ativo' } : c));
  };

  const handleSalvarCupom = (e) => {
    e.preventDefault();
    alert('Cupom salvo com sucesso! O portal público já aceitará este código de desconto.');
    setModalAberto(false);
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Cupons</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Configure e monitore os códigos de desconto aplicados nas compras do Portal Público</p>
        </div>

        <button 
          onClick={() => { setModoEdicao(false); setModalAberto(true); }} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Criar Novo Cupom
        </button>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar por código do cupom (Ex: WINTER20)..." 
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
          <option value="Ativo">Ativos</option>
          <option value="Inativo">Inativos</option>
        </select>
      </div>

      {/* TABELA DE CUPONS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Código do Cupom</th>
              <th style={{ padding: '1rem' }}>Tipo Desconto</th>
              <th style={{ padding: '1rem' }}>Valor de Desconto</th>
              <th style={{ padding: '1rem' }}>Valor Mínimo Compra</th>
              <th style={{ padding: '1rem' }}>Expiração</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Vezes Utilizado</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum cupom localizado.</td>
              </tr>
            ) : (
              filtrados.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#3b82f6', letterSpacing: '0.5px' }}>{c.codigo}</td>
                  <td style={{ padding: '1rem' }}>{c.tipo}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                    {c.tipo === 'Porcentagem' ? `${c.valor}%` : `R$ ${c.valor.toFixed(2)}`}
                  </td>
                  <td style={{ padding: '1rem' }}>R$ {c.valorMinimo.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{c.expiracao}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{c.totalUsado} times</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: c.status === 'Ativo' ? '#d1fae5' : '#fee2e2',
                      color: c.status === 'Ativo' ? '#065f46' : '#991b1b'
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Editar</button>
                    <button 
                      onClick={() => handleToggleStatus(c.id)}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: c.status === 'Ativo' ? '#f59e0b' : '#10b981', 
                        color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' 
                      }}
                    >
                      {c.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{modoEdicao ? 'Editar Cupom' : 'Novo Cupom'}</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Cadastre um código promocional de desconto.</p>

            <form onSubmit={handleSalvarCupom}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Código do Cupom *</label>
                  <input type="text" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', textTransform: 'uppercase' }} placeholder="Ex: PROMO2026" />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Tipo Desconto *</label>
                  <select required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="Porcentagem">Porcentagem (%)</option>
                    <option value="Valor Fixo">Valor Fixo (R$)</option>
                  </select>
                </div>
                
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Valor Desconto *</label><input type="number" required min="0" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Min Compra (R$)</label><input type="number" step="0.01" defaultValue={0.00} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Data Expiração *</label><input type="date" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setModalAberto(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Descartar</button>
                <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Cupom</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
