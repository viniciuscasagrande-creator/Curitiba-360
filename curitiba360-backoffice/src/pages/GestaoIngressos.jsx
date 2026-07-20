// src/pages/GestaoIngressos.jsx
import { useState } from 'react';

export default function GestaoIngressos() {
  // RF-017.05 e RF-017.06: Abas de Status (Padrão: 'Ativos')
  const [abaAtiva, setAbaAtiva] = useState('Ativos');
  const [termoBusca, setTermoBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  
  // Controle do Modal (RF-017.27)
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Mock de Dados (RF-017.09)
  const [ingressos, setIngressos] = useState([
    { id: 301, categoria: 'Inteira - Pista', lote: 'Lote 1 - Pedreira Paulo Leminski', valor: 120.00, quantidade: 5000, msgCustomizada: 'Entrada exclusiva pelo portão principal.', expiracao: 24, status: 'Ativo' },
    { id: 302, categoria: 'Meia - Pista', lote: 'Lote 1 - Pedreira Paulo Leminski', valor: 60.00, quantidade: 2000, msgCustomizada: 'Apresentar carteirinha na fila.', expiracao: 24, status: 'Ativo' },
    { id: 303, categoria: 'Inteira - Camarote', lote: 'Lote Único - Ópera de Arame', valor: 250.00, quantidade: 300, msgCustomizada: 'Acesso liberado à área VIP.', expiracao: 12, status: 'Inativo' },
  ]);

  const filtrados = ingressos.filter(ing => {
    const matchBusca = 
      ing.categoria.toLowerCase().includes(termoBusca.toLowerCase()) || 
      ing.lote.toLowerCase().includes(termoBusca.toLowerCase()) ||
      ing.id.toString().includes(termoBusca);
    
    const matchAba = abaAtiva === 'Todos' || ing.status === (abaAtiva === 'Ativos' ? 'Ativo' : 'Inativo');
    return matchBusca && matchAba;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(filtrados.map(i => i.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  const handleSalvarIngresso = (e) => {
    e.preventDefault();
    alert(`Lote de ingresso salvo com sucesso! O controle de filas e catracas já reconhecerá a nova carga.`);
    setModalAberto(false);
    setModoEdicao(false);
  };

  return (
    <div>
      {/* CABEÇALHO (RF-017.01) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Ingressos</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie os lotes e a carga de ingressos da atração</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Buscar Categoria, Lote ou ID..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
          />
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Filtros</button>
          <button 
            onClick={() => { setModoEdicao(false); setModalAberto(true); }} 
            style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Adicionar Ingresso
          </button>
        </div>
      </div>

      {/* ABAS E AÇÕES (RF-017.05 e RF-017.17) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Ativos', 'Inativos', 'Todos'].map(aba => (
            <button 
              key={aba}
              onClick={() => { setAbaAtiva(aba); setSelecionados([]); }}
              style={{ 
                padding: '0.5rem 0', border: 'none', background: 'none', cursor: 'pointer',
                fontWeight: abaAtiva === aba ? 'bold' : 'normal',
                borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
                color: abaAtiva === aba ? '#111827' : '#6b7280'
              }}
            >
              {aba}
            </button>
          ))}
        </div>

        {selecionados.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1d4ed8' }}>Selecionados {selecionados.length}</span>
            <button disabled={selecionados.length !== 1} onClick={() => { setModoEdicao(true); setModalAberto(true); }} style={{ padding: '0.25rem 0.5rem', cursor: selecionados.length === 1 ? 'pointer' : 'not-allowed' }}>Editar</button>
            {abaAtiva === 'Ativos' && <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Inativar</button>}
            {abaAtiva === 'Inativos' && <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#10b981' }}>Ativar</button>}
            <button style={{ padding: '0.25rem 0.5rem', color: 'red', cursor: 'pointer' }}>Excluir</button>
          </div>
        )}
      </div>

      {/* TABELA DE INGRESSOS (RF-017.09) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}><input type="checkbox" onChange={handleSelecionarTodos} checked={selecionados.length === filtrados.length && filtrados.length > 0} /></th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Categorias</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Lote</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Valor</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Quantidade</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((ing) => (
              <tr key={ing.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}><input type="checkbox" checked={selecionados.includes(ing.id)} onChange={() => handleSelecionarUm(ing.id)} /></td>
                <td style={{ padding: '0.75rem', color: '#6b7280' }}>#{ing.id}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{ing.categoria}</td>
                <td style={{ padding: '0.75rem' }}>{ing.lote}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#10b981' }}>R$ {ing.valor.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>{ing.quantidade} un.</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: ing.status === 'Ativo' ? '#d1fae5' : '#f3f4f6', color: ing.status === 'Ativo' ? '#065f46' : '#374151' }}>{ing.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO/EDIÇÃO (RF-017.27 a RF-017.36) */}
      {modalAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{modoEdicao ? 'Editar Ingresso' : 'Novo Ingresso'}</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Preencha os campos obrigatórios para adicionar um ingresso (lote).</p>

            <form onSubmit={handleSalvarIngresso}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Categoria *</label>
                  <select required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione o tipo de público...</option>
                    <option value="inteira">Inteira - Pista</option>
                    <option value="meia">Meia - Pista</option>
                  </select>
                </div>
                
                <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Lote *</label><input type="text" required placeholder="Ex: Lote 1, Lote Promocional..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Valor (R$) *</label><input type="number" step="0.01" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Quantidade *</label><input type="number" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                
                <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Expiração do pedido (horas) *</label><input type="number" required defaultValue={24} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Mensagem Customizada (Aparece no voucher)</label><input type="text" placeholder="Ex: Entrada pelo portão sul..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setModalAberto(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Descartar</button>
                <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
