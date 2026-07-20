// src/pages/GestaoPacotes.jsx
import { useState } from 'react';

export default function GestaoPacotes() {
  // Controle de Telas (Listagem vs Formulário)
  const [view, setView] = useState('lista'); // 'lista' ou 'formulario'

  // ==========================================
  // ESTADOS DA LISTAGEM (RF-040.06 a RF-040.28)
  // ==========================================
  const [abaAtiva, setAbaAtiva] = useState('Ativos');
  const [termoBusca, setTermoBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Mock de Pacotes (RF-040.10)
  const [pacotes, setPacotes] = useState([
    { id: 201, nome: 'Tour Curitiba Clássica', qtdAtracoes: 3, precoOriginal: 150.00, precoPacote: 120.00, desconto: 20, vigencia: '01/08/2026 até 31/12/2026', disponibilidade: 50, status: 'Ativo' },
    { id: 202, nome: 'Fim de Semana nos Parques', qtdAtracoes: 2, precoOriginal: 80.00, precoPacote: 70.00, desconto: 12.5, vigencia: '10/08/2026 até 30/08/2026', disponibilidade: 0, status: 'Inativo' },
  ]);

  const pacotesFiltrados = pacotes.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(termoBusca.toLowerCase()) || p.id.toString().includes(termoBusca);
    const matchAba = abaAtiva === 'Todos' || p.status === (abaAtiva === 'Ativos' ? 'Ativo' : 'Inativo');
    return matchBusca && matchAba;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(pacotesFiltrados.map(p => p.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  // ==========================================
  // ESTADOS DO FORMULÁRIO (RF-040.29 a RF-040.61)
  // ==========================================
  const [nomePacote, setNomePacote] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [duracao, setDuracao] = useState('');
  const [regulamento, setRegulamento] = useState('');
  
  // Composição do Pacote (RF-040.38 a RF-040.43)
  const [composicao, setComposicao] = useState([
    { id: Date.now(), atracao: 'Ópera de Arame', ingresso: 'Inteira - Lote 001', qtd: 1, unitario: 50.00, subtotal: 50.00 }
  ]);

  // Precificação (RF-040.44 a RF-040.61)
  const precoOriginalCalc = composicao.reduce((acc, item) => acc + item.subtotal, 0);
  const [precoPacote, setPrecoPacote] = useState('');
  const [inicioVigencia, setInicioVigencia] = useState('');
  const [fimVigencia, setFimVigencia] = useState('');
  const [qtdMax, setQtdMax] = useState('');
  const [parcelamento, setParcelamento] = useState('Pague em até 12x Sem Juros'); // Herdado global (RN-040.23)

  const adicionarItemComposicao = () => {
    setComposicao([...composicao, { id: Date.now(), atracao: '', ingresso: '', qtd: 1, unitario: 0, subtotal: 0 }]);
  };

  const removerItemComposicao = (id) => {
    setComposicao(composicao.filter(c => c.id !== id));
  };

  const handleSalvarPacote = (e) => {
    e.preventDefault();
    if (composicao.length < 2) {
      alert('Erro: Um pacote deve conter ingressos de, no mínimo, duas atrações distintas (RN-040.01).');
      return;
    }
    if (parseFloat(precoPacote) >= precoOriginalCalc) {
      alert('Erro: O preço do pacote deve ser inferior ao preço original (deve conter desconto).');
      return;
    }
    alert(`Pacote "${nomePacote}" salvo com sucesso!`);
    setView('lista');
  };

  // ==========================================
  // RENDERIZAÇÃO PRINCIPAL
  // ==========================================
  return (
    <div>
      {/* CABEÇALHO GERAL (RF-040.02) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Pacotes</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie os pacotes de ingressos combinados</p>
        </div>
        
        {view === 'lista' ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Buscar Pacote, ID..." 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
            />
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Filtros</button>
            <button 
              onClick={() => setView('formulario')} 
              style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Adicionar Pacote
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setView('lista')} 
            style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>
            ← Voltar para Lista
          </button>
        )}
      </div>

      {view === 'lista' && (
        <>
          {/* ABAS E AÇÕES DA LISTA (RF-040.06 e RF-040.19) */}
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
                <button disabled={selecionados.length !== 1} onClick={() => setView('formulario')} style={{ padding: '0.25rem 0.5rem', cursor: selecionados.length === 1 ? 'pointer' : 'not-allowed' }}>Editar</button>
                {abaAtiva === 'Ativos' && <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Inativar</button>}
                {abaAtiva === 'Inativos' && <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#10b981' }}>Ativar</button>}
                <button style={{ padding: '0.25rem 0.5rem', color: 'red', cursor: 'pointer' }}>Excluir</button>
              </div>
            )}
          </div>

          {/* TABELA DE PACOTES (RF-040.10) */}
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}><input type="checkbox" onChange={handleSelecionarTodos} checked={selecionados.length === pacotesFiltrados.length && pacotesFiltrados.length > 0} /></th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome do Pacote</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Atrações</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Preço Original</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Preço Pacote</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Desconto</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Vigência</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Disp.</th>
                  <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {pacotesFiltrados.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem' }}><input type="checkbox" checked={selecionados.includes(p.id)} onChange={() => handleSelecionarUm(p.id)} /></td>
                    <td style={{ padding: '0.75rem', color: '#6b7280' }}>#{p.id}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{p.nome}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>{p.qtdAtracoes}</td>
                    <td style={{ padding: '0.75rem', color: '#ef4444', textDecoration: 'line-through' }}>R$ {p.precoOriginal.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#10b981' }}>R$ {p.precoPacote.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem' }}>{p.desconto}%</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.75rem' }}>{p.vigencia}</td>
                    <td style={{ padding: '0.75rem' }}>{p.disponibilidade > 0 ? p.disponibilidade : <span style={{ color: 'red' }}>Esgotado</span>}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: p.status === 'Ativo' ? '#d1fae5' : '#f3f4f6', color: p.status === 'Ativo' ? '#065f46' : '#374151' }}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === 'formulario' && (
        <form onSubmit={handleSalvarPacote} style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Identificação do Pacote</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome do Pacote *</label><input type="text" required value={nomePacote} onChange={e => setNomePacote(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Descrição *</label><textarea required rows="3" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Categoria *</label>
              <select required value={categoria} onChange={e => setCategoria(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Selecione...</option>
                <option value="Tours Culturais">Tours Culturais</option>
                <option value="Parques">Parques</option>
                <option value="Aventura">Aventura</option>
              </select>
            </div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Duração Estimada *</label><input type="text" required placeholder="Ex: 2 dias, 4 horas..." value={duracao} onChange={e => setDuracao(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Imagem Principal (Capa) *</label><input type="file" accept="image/*" required style={{ width: '100%', padding: '0.5rem', border: '1px dashed #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Galeria de Imagens</label><input type="file" accept="image/*" multiple style={{ width: '100%', padding: '0.5rem', border: '1px dashed #ccc', borderRadius: '4px' }} /></div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Composição (Roteiro)</h2>
          <div style={{ marginBottom: '2rem' }}>
            {composicao.map((item, index) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 80px 100px auto', gap: '1rem', alignItems: 'end', background: '#f9fafb', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 'bold', color: '#6b7280', paddingBottom: '0.5rem' }}>#{index + 1}</div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Atração *</label>
                  <select required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione...</option>
                    <option value="Opera">Ópera de Arame</option>
                    <option value="Jardim">Jardim Botânico</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Ingresso (Lote) *</label>
                  <select required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione o Lote...</option>
                    <option value="Int">Inteira - Lote 001 (R$ 50,00)</option>
                    <option value="Meia">Meia - Lote 001 (R$ 25,00)</option>
                  </select>
                </div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Qtd *</label><input type="number" required min="1" defaultValue={1} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Subtotal</label><input type="text" disabled value="R$ 50,00" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: '#e5e7eb' }} /></div>
                <button type="button" onClick={() => removerItemComposicao(item.id)} style={{ padding: '0.5rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remover</button>
              </div>
            ))}
            <button type="button" onClick={adicionarItemComposicao} style={{ padding: '0.5rem 1rem', background: '#eff6ff', color: '#1d4ed8', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Adicionar Parada ao Roteiro</button>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Precificação e Vigência</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Preço Original (Somatório)</label>
              <input type="text" disabled value={`R$ ${precoOriginalCalc.toFixed(2)}`} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: '#f3f4f6', color: '#ef4444', textDecoration: 'line-through' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#10b981' }}>Preço do Pacote *</label>
              <input type="number" step="0.01" required value={precoPacote} onChange={e => setPrecoPacote(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '0.5rem', border: '2px solid #10b981', borderRadius: '4px', fontWeight: 'bold' }} />
            </div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Início da Vigência *</label><input type="date" required value={inicioVigencia} onChange={e => setInicioVigencia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Fim da Vigência *</label><input type="date" required value={fimVigencia} onChange={e => setFimVigencia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Quantidade Máxima (Opcional)</label><input type="number" value={qtdMax} onChange={e => setQtdMax(e.target.value)} placeholder="Estoque do pacote..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Condição Máxima de Parcelamento *</label>
              <input type="text" required value={parcelamento} onChange={e => setParcelamento(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              <small style={{ color: '#6b7280' }}>* Herdado da Configuração Global (RF-010).</small>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <button type="button" onClick={() => setView('lista')} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Pacote</button>
          </div>
        </form>
      )}
    </div>
  );
}
