// src/pages/CadastroUsuario.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroUsuario() {
  const navigate = useNavigate();

  // Estados dos campos comuns (RF-007.01 a RF-007.10)
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idioma, setIdioma] = useState('PT_BR');
  const [perfil, setPerfil] = useState('');
  const [ativo, setAtivo] = useState(true);

  // Estados dos campos dinâmicos por perfil
  const [parceiroSelecionado, setParceiroSelecionado] = useState('');
  const [atracaoSelecionada, setAtracaoSelecionada] = useState([]);
  const [visibilidadeAgencia, setVisibilidadeAgencia] = useState('Pública');
  const [agenciaVinculada, setAgenciaVinculada] = useState('');
  const [isEstrangeiro, setIsEstrangeiro] = useState(false);

  // Mock de dados para os selects (Contexto do seu projeto)
  const mockParceiros = ['Parque Jaime Lerner S/A', 'Ópera Eventos', 'Tour CWB'];
  const mockAtracoes = ['Parque Jaime Lerner', 'Ópera de Arame', 'Pedreira Paulo Leminski'];
  const mockAgencias = ['Agência Turismo PR', 'Viagens Sul'];

  const handleSalvar = (e) => {
    e.preventDefault();
    // RN-007.03: A senha provisória é gerada no backend e enviada por email
    alert(`Salvando usuário ${primeiroNome} com perfil ${perfil}. Senha provisória será enviada para ${email}.`);
    navigate('/usuarios');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* Cabeçalho do Modal/Página (RF-007.01 e RF-007.02) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Novo Usuário</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Preencha os campos obrigatórios para adicionar um usuário</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/usuarios')} style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
            Descartar
          </button>
          <button onClick={handleSalvar} style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar
          </button>
        </div>
      </div>

      <form onSubmit={handleSalvar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* CAMPOS COMUNS A TODOS OS PERFIS */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#9ca3af' }}>
            Foto
          </div>
          <button type="button" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Carregar nova foto</button>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Primeiro nome *</label>
          <input type="text" required value={primeiroNome} onChange={e => setPrimeiroNome(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Último nome *</label>
          <input type="text" required value={ultimoNome} onChange={e => setUltimoNome(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email de contato *</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Telefone *</label>
          <input type="text" required placeholder="(XX) XXXXX-XXXX" value={telefone} onChange={e => setTelefone(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Idioma padrão *</label>
          <select value={idioma} onChange={e => setIdioma(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="PT_BR">Português Brasil</option>
            <option value="EN">Inglês</option>
            <option value="ES">Espanhol</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Perfil *</label>
          <select required value={perfil} onChange={e => setPerfil(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">Selecione um perfil...</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="EDITOR">Editor</option>
            <option value="LEITOR">Leitor</option>
            <option value="AGENCIA">Agência</option>
            <option value="AGENTE">Agente</option>
            <option value="TURISTA">Turista</option>
          </select>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* LÓGICA DE RENDERIZAÇÃO CONDICIONAL BASEADA NO PERFIL (RF-007)     */}
        {/* ----------------------------------------------------------------- */}

        {/* Perfil: Editor ou Leitor (RN-007.11) */}
        {(perfil === 'EDITOR' || perfil === 'LEITOR') && (
          <>
            <div style={{ gridColumn: '1 / -1', padding: '1rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Vínculos da Atração</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Parceiro Comercial</label>
                  <select value={parceiroSelecionado} onChange={e => setParceiroSelecionado(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione o parceiro...</option>
                    {mockParceiros.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Atração</label>
                  <select multiple value={atracaoSelecionada} onChange={e => setAtracaoSelecionada([...e.target.selectedOptions].map(o => o.value))} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {mockAtracoes.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>Segure Ctrl/Cmd para selecionar múltiplas</small>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Perfil: Agência (RN-007.12 e RN-007.13) */}
        {perfil === 'AGENCIA' && (
          <div style={{ gridColumn: '1 / -1', padding: '1rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Visibilidade</label>
              <select value={visibilidadeAgencia} onChange={e => setVisibilidadeAgencia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="Pública">Pública</option>
                <option value="Reservada">Reservada</option>
              </select>
            </div>
            
            {visibilidadeAgencia === 'Reservada' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Parceiro Comercial</label>
                <select multiple style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                  {mockParceiros.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            )}
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Atrações Permitidas</label>
              <select multiple style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                {mockAtracoes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Perfil: Agente (RN-007.14) */}
        {perfil === 'AGENTE' && (
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Agência Vinculada</label>
            <select value={agenciaVinculada} onChange={e => setAgenciaVinculada(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="">Independente (Sem vínculo)</option>
              {mockAgencias.map(ag => <option key={ag} value={ag}>{ag}</option>)}
            </select>
          </div>
        )}

        {/* Perfil: Turista */}
        {perfil === 'TURISTA' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            <input type="checkbox" id="estrangeiro" checked={isEstrangeiro} onChange={e => setIsEstrangeiro(e.target.checked)} />
            <label htmlFor="estrangeiro" style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Turista Estrangeiro?</label>
          </div>
        )}

        {/* Toggle de Status */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Status da Conta:</label>
          <button type="button" onClick={() => setAtivo(!ativo)} style={{ padding: '0.25rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', backgroundColor: ativo ? '#10b981' : '#ef4444', color: 'white', fontWeight: 'bold' }}>
            {ativo ? 'ATIVO' : 'INATIVO'}
          </button>
        </div>

      </form>
    </div>
  );
}
