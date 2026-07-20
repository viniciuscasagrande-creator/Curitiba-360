// src/pages/CadastroAtracao.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroAtracao() {
  const navigate = useNavigate();
  
  // RF-013.01: Controle de etapas (1 a 3)
  const [etapaAtual, setEtapaAtual] = useState(1);

  // --- ETAPA 1: Dados da Atração (RF-013.06 a RF-013.32) ---
  const [parceiroId, setParceiroId] = useState('');
  const [nomeAtracao, setNomeAtracao] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({ logradouro: '', numero: '', cidade: '', uf: '' });
  const [classificacao, setClassificacao] = useState('Livre');
  const [capacidade, setCapacidade] = useState('');
  
  // --- ETAPA 2: Dados Bancários e Materiais (RF-013.33 a RF-013.49) ---
  const [usarDadosParceiro, setUsarDadosParceiro] = useState(false);
  const [banco, setBanco] = useState('');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [release, setRelease] = useState('');

  // --- ETAPA 3: Dados do Ingresso (RF-013.50 a RF-013.64) ---
  const [ingressos, setIngressos] = useState([
    { id: 1, categoria: '', valor: '', quantidade: '', lote: '001' }
  ]);

  // Mock de Parceiros (RF-013.11)
  const parceiros = [
    { id: 1, nome: 'Parque Jaime Lerner S/A' },
    { id: 2, nome: 'Ópera Eventos' }
  ];

  // RF-013.04: Navegação entre etapas
  const avancarEtapa = (e) => {
    e.preventDefault();
    if (etapaAtual < 3) setEtapaAtual(etapaAtual + 1);
  };

  const voltarEtapa = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  // RF-013.05 (Tabela de botões) e RN-013.01: Salvar Rascunho
  const handleSalvarRascunho = () => {
    alert(`Rascunho da atração "${nomeAtracao || 'Sem Nome'}" salvo com sucesso! Status: Rascunho.`);
    navigate('/atracoes');
  };

  // RF-013.05 e RN-013.03: Finalizar
  const handleFinalizar = (e) => {
    e.preventDefault();
    alert(`Atração "${nomeAtracao}" finalizada! Status: Pendente de Contrato.`);
    navigate('/atracoes');
  };

  // RF-013.33: Toggle para usar dados do parceiro
  const toggleDadosBancarios = (checked) => {
    setUsarDadosParceiro(checked);
    if (checked) {
      setBanco('033 - Santander');
      setAgencia('1234');
      setConta('56789-0');
    } else {
      setBanco('');
      setAgencia('');
      setConta('');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* CABEÇALHO E PROGRESSO (RF-013.02 e RF-013.03) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Nova Atração {etapaAtual}/3</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            {etapaAtual === 1 && 'Insira os dados da atração'}
            {etapaAtual === 2 && 'Insira os dados bancários'}
            {etapaAtual === 3 && 'Insira os dados do ingresso'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/atracoes')} style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
            Descartar
          </button>
          <button onClick={handleSalvarRascunho} style={{ padding: '0.5rem 1rem', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar Rascunho
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: '#6b7280', fontSize: '0.875rem' }}>
        <span style={{ fontWeight: etapaAtual === 1 ? 'bold' : 'normal', color: etapaAtual === 1 ? '#10b981' : 'inherit' }}>1. Dados da Atração</span>
        <span style={{ fontWeight: etapaAtual === 2 ? 'bold' : 'normal', color: etapaAtual === 2 ? '#10b981' : 'inherit' }}>2. Dados Bancários e Materiais</span>
        <span style={{ fontWeight: etapaAtual === 3 ? 'bold' : 'normal', color: etapaAtual === 3 ? '#10b981' : 'inherit' }}>3. Dados do Ingresso</span>
      </div>

      <form onSubmit={etapaAtual === 3 ? handleFinalizar : avancarEtapa}>
        
        {/* ================= ETAPA 1: DADOS DA ATRAÇÃO ================= */}
        {etapaAtual === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Parceiro Comercial *</label>
              <select required value={parceiroId} onChange={e => setParceiroId(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Selecione o parceiro...</option>
                {parceiros.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome da Atração *</label>
              <input type="text" required maxLength={150} value={nomeAtracao} onChange={e => setNomeAtracao(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Classificação Etária *</label>
              <select required value={classificacao} onChange={e => setClassificacao(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="Livre">Livre</option>
                <option value="10 anos">10 anos</option>
                <option value="12 anos">12 anos</option>
                <option value="14 anos">14 anos</option>
                <option value="16 anos">16 anos</option>
                <option value="18 anos">18 anos</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Capacidade de Público *</label>
              <input type="number" required value={capacidade} onChange={e => setCapacidade(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Localização</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>CEP *</label><input type="text" required value={cep} onChange={e => setCep(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Cidade *</label><input type="text" required value={endereco.cidade} onChange={e => setEndereco({...endereco, cidade: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Logradouro *</label><input type="text" required value={endereco.logradouro} onChange={e => setEndereco({...endereco, logradouro: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ETAPA 2: DADOS BANCÁRIOS E MATERIAIS ================= */}
        {etapaAtual === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dados Bancários para Depósito</h3>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: '#3b82f6', cursor: 'pointer' }}>
                  <input type="checkbox" checked={usarDadosParceiro} onChange={(e) => toggleDadosBancarios(e.target.checked)} />
                  Utilizar dados bancários do parceiro?
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Banco *</label><input type="text" required disabled={usarDadosParceiro} value={banco} onChange={e => setBanco(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: usarDadosParceiro ? '#f3f4f6' : 'white' }} /></div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Agência *</label><input type="text" required disabled={usarDadosParceiro} value={agencia} onChange={e => setAgencia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: usarDadosParceiro ? '#f3f4f6' : 'white' }} /></div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Conta Corrente *</label><input type="text" required disabled={usarDadosParceiro} value={conta} onChange={e => setConta(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: usarDadosParceiro ? '#f3f4f6' : 'white' }} /></div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Materiais de Divulgação</h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Link de Vídeo (YouTube)</label>
                <input type="url" value={linkVideo} onChange={e => setLinkVideo(e.target.value)} placeholder="https://youtube.com/..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Release da Atração</label>
                <textarea rows="4" value={release} onChange={e => setRelease(e.target.value)} placeholder="Descreva os detalhes e atrativos..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </div>
            </div>
          </div>
        )}

        {/* ================= ETAPA 3: DADOS DO INGRESSO ================= */}
        {etapaAtual === 3 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Configuração de Ingressos</h3>
              <button type="button" onClick={() => setIngressos([...ingressos, { id: Date.now(), categoria: '', valor: '', quantidade: '', lote: '001' }])} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Adicionar Categoria
              </button>
            </div>

            {ingressos.map((ing, idx) => (
              <div key={ing.id} style={{ background: '#f9fafb', padding: '1rem', borderRadius: '4px', border: '1px solid #e5e7eb', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>Categoria *</label>
                  <select required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione...</option>
                    <option value="Inteira">Inteira</option>
                    <option value="Meia">Meia-entrada</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>Valor (R$) *</label>
                  <input type="number" step="0.01" required placeholder="0.00" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>Qtd Dispo. *</label>
                  <input type="number" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>Lote</label>
                  <input type="text" defaultValue="001" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                {ingressos.length > 1 && (
                  <button type="button" onClick={() => setIngressos(ingressos.filter(i => i.id !== ing.id))} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', paddingBottom: '0.5rem' }}>Remover</button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* NAVEGAÇÃO ENTRE ETAPAS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button type="button" onClick={voltarEtapa} disabled={etapaAtual === 1} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: etapaAtual === 1 ? 'not-allowed' : 'pointer', opacity: etapaAtual === 1 ? 0.5 : 1 }}>
            Anterior
          </button>
          
          <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {etapaAtual === 3 ? 'Finalizar Atração' : 'Próximo'}
          </button>
        </div>
      </form>
    </div>
  );
}
