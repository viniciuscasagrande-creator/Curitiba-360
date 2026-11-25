// src/pages/CadastroAgencia.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroAgencia() {
  const navigate = useNavigate();
  const [etapaAtual, setEtapaAtual] = useState(1);

  // --- Etapa 1: Dados da Empresa (RF-027.09 a RF-027.23) ---
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [isentoIE, setIsentoIE] = useState(false);
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({ logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '', pais: 'Brasil' });
  const [site, setSite] = useState('');
  const [telefoneComercial, setTelefoneComercial] = useState('');

  // --- Etapa 2: Dados do Responsável (RF-027.24 a RF-027.32) ---
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [isEstrangeiro, setIsEstrangeiro] = useState(false);
  const [documentoResponsavel, setDocumentoResponsavel] = useState(''); // Guarda CPF ou Passaporte
  const [emailResponsavel, setEmailResponsavel] = useState('');
  const [celularResponsavel, setCelularResponsavel] = useState('');
  const [idiomaPadrao, setIdiomaPadrao] = useState('PT_BR');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // --- Etapa 2 (Subseção): Gestor(es) da Conta (RF-027.33 a RF-027.36) ---
  const [gestores, setGestores] = useState([
    { id: Date.now(), primeiroNome: '', ultimoNome: '', telefone: '', emails: [''] }
  ]);

  // --- Etapa 3: Dados Bancários (RF-027.37 a RF-027.42) ---
  const [banco, setBanco] = useState('');
  const [tipoConta, setTipoConta] = useState('Corrente');
  const [agencia, setAgencia] = useState('');
  const [contaCorrente, setContaCorrente] = useState('');
  const [tipoChavePix, setTipoChavePix] = useState('');
  const [chavePix, setChavePix] = useState('');
  const [titularConta, setTitularConta] = useState('');

  // Navegação
  const avancarEtapa = (e) => {
    e.preventDefault();
    if (etapaAtual === 2 && senha !== confirmarSenha) {
      alert('As senhas não coincidem!'); // CA-027.12
      return;
    }
    if (etapaAtual < 3) setEtapaAtual(etapaAtual + 1);
  };

  const voltarEtapa = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    // RN-027.03 e RF-027.43: Status "Aguardando Contrato" e geração de Rascunho
    alert(`Agência ${nomeFantasia} cadastrada! Status: Aguardando Contrato. O contrato foi gerado no módulo de Gestão de Contratos.`);
    navigate('/agencias');
  };

  // Funções para Gestores
  const adicionarGestor = () => {
    setGestores([...gestores, { id: Date.now(), primeiroNome: '', ultimoNome: '', telefone: '', emails: [''] }]);
  };

  const removerGestor = (id) => {
    if (gestores.length > 1) { // CA-027.26
      setGestores(gestores.filter(g => g.id !== id));
    } else {
      alert("A agência deve ter no mínimo 1 gestor cadastrado.");
    }
  };

  const adicionarEmailGestor = (gestorId) => {
    setGestores(gestores.map(g => g.id === gestorId ? { ...g, emails: [...g.emails, ''] } : g));
  };

  const atualizarGestor = (gestorId, campo, valor, emailIndex = null) => {
    setGestores(gestores.map(g => {
      if (g.id !== gestorId) return g;
      if (campo === 'email') {
        const novosEmails = [...g.emails];
        novosEmails[emailIndex] = valor;
        return { ...g, emails: novosEmails };
      }
      return { ...g, [campo]: valor };
    }));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* CABEÇALHO E INDICADOR DE PROGRESSO */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Nova Agência</h2>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          <span style={{ fontWeight: etapaAtual === 1 ? 'bold' : 'normal', color: etapaAtual === 1 ? '#10b981' : 'inherit' }}>1. Dados da Empresa</span>
          <span style={{ fontWeight: etapaAtual === 2 ? 'bold' : 'normal', color: etapaAtual === 2 ? '#10b981' : 'inherit' }}>2. Responsável e Gestores</span>
          <span style={{ fontWeight: etapaAtual === 3 ? 'bold' : 'normal', color: etapaAtual === 3 ? '#10b981' : 'inherit' }}>3. Dados Bancários</span>
        </div>
      </div>

      <form onSubmit={etapaAtual === 3 ? handleSalvar : avancarEtapa}>
        
        {/* ================= ETAPA 1 ================= */}
        {etapaAtual === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Razão Social *</label><input type="text" required value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome Fantasia *</label><input type="text" required value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CNPJ *</label><input type="text" required placeholder="XX.XXX.XXX/XXXX-XX ou Alfanumérico" value={cnpj} onChange={e => setCnpj(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            
            {/* IE e Toggle Isento */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Inscrição Estadual</label>
                <label style={{ fontSize: '0.875rem' }}><input type="checkbox" checked={isentoIE} onChange={e => setIsentoIE(e.target.checked)} /> Isento</label>
              </div>
              <input type="text" required={!isentoIE} disabled={isentoIE} value={isentoIE ? '' : inscricaoEstadual} onChange={e => setInscricaoEstadual(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: isentoIE ? '#f3f4f6' : 'white' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tipo de Empresa *</label>
              <select required value={tipoEmpresa} onChange={e => setTipoEmpresa(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Selecione...</option>
                <option value="MEI">MEI</option>
                <option value="Microempresa">Microempresa</option>
                <option value="EPP">Empresa de Pequeno Porte</option>
              </select>
            </div>

            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Telefone Comercial *</label><input type="text" required value={telefoneComercial} onChange={e => setTelefoneComercial(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Site/URL</label><input type="url" value={site} onChange={e => setSite(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>

            {/* Endereço */}
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Endereço</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CEP *</label><input type="text" required value={cep} onChange={e => setCep(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <button type="button" style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Buscar</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Logradouro *</label><input type="text" required value={endereco.logradouro} onChange={e => setEndereco({...endereco, logradouro: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Número *</label><input type="text" required value={endereco.numero} onChange={e => setEndereco({...endereco, numero: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ETAPA 2 ================= */}
        {etapaAtual === 2 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Dados do Responsável</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome Completo *</label><input type="text" required value={nomeResponsavel} onChange={e => setNomeResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              
              {/* Toggle Estrangeiro e Troca de Campo */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{isEstrangeiro ? 'Número do Passaporte *' : 'CPF do Responsável *'}</label>
                  <label style={{ fontSize: '0.875rem', color: '#6b7280' }}><input type="checkbox" checked={isEstrangeiro} onChange={e => setIsEstrangeiro(e.target.checked)} /> Estrangeiro?</label>
                </div>
                <input type="text" required value={documentoResponsavel} onChange={e => setDocumentoResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>E-mail de Acesso *</label><input type="email" required value={emailResponsavel} onChange={e => setEmailResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Telefone Celular *</label><input type="text" required value={celularResponsavel} onChange={e => setCelularResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Senha Inicial *</label>
                <input type="password" required minLength={8} value={senha} onChange={e => setSenha(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Confirmar Senha *</label>
                <input type="password" required minLength={8} value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', borderColor: senha && confirmarSenha && senha !== confirmarSenha ? 'red' : '#ccc' }} />
              </div>
            </div>

            {/* Subseção: Gestores da Conta */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Gestor(es) da Conta</h3>
              {gestores.map((gestor, index) => (
                <div key={gestor.id} style={{ background: '#f9fafb', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <strong>Gestor {index + 1}</strong>
                    {gestores.length > 1 && <button type="button" onClick={() => removerGestor(gestor.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Remover</button>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div><label style={{ display: 'block', fontSize: '0.875rem' }}>Primeiro Nome *</label><input type="text" required value={gestor.primeiroNome} onChange={(e) => atualizarGestor(gestor.id, 'primeiroNome', e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                    <div><label style={{ display: 'block', fontSize: '0.875rem' }}>Último Nome *</label><input type="text" required value={gestor.ultimoNome} onChange={(e) => atualizarGestor(gestor.id, 'ultimoNome', e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                    <div><label style={{ display: 'block', fontSize: '0.875rem' }}>Telefone *</label><input type="text" required value={gestor.telefone} onChange={(e) => atualizarGestor(gestor.id, 'telefone', e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                  </div>
                  
                  {/* Dinâmica de E-mails do Gestor */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>E-mail(s) do Gestor *</label>
                    {gestor.emails.map((em, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input type="email" required value={em} onChange={(e) => atualizarGestor(gestor.id, 'email', e.target.value, i)} style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        {i === gestor.emails.length - 1 && <button type="button" onClick={() => adicionarEmailGestor(gestor.id)} style={{ padding: '0.5rem', border: '1px solid #ccc', background: 'white', borderRadius: '4px', cursor: 'pointer' }}>+ Email</button>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button type="button" onClick={adicionarGestor} style={{ padding: '0.5rem 1rem', background: '#eff6ff', color: '#1d4ed8', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Adicionar outro Gestor</button>
            </div>
          </div>
        )}

        {/* ================= ETAPA 3 ================= */}
        {etapaAtual === 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Banco *</label>
              <select required value={banco} onChange={e => setBanco(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Selecione...</option>
                <option value="001">001 - Banco do Brasil</option>
                <option value="033">033 - Santander</option>
                <option value="104">104 - Caixa Econômica</option>
                <option value="237">237 - Bradesco</option>
                <option value="341">341 - Itaú</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tipo de Conta *</label>
              <select required value={tipoConta} onChange={e => setTipoConta(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="Corrente">Corrente</option>
                <option value="Poupanca">Poupança</option>
              </select>
            </div>

            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Agência *</label><input type="text" required value={agencia} onChange={e => setAgencia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Conta Corrente *</label><input type="text" required value={contaCorrente} onChange={e => setContaCorrente(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            
            <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Titular da Conta *</label><input type="text" required placeholder="Deve corresponder à Razão Social" value={titularConta} onChange={e => setTitularConta(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>

            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tipo Chave Pix (Opcional)</label>
                  <select value={tipoChavePix} onChange={e => setTipoChavePix(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="">Selecione...</option>
                    <option value="CNPJ">CNPJ</option>
                    <option value="Email">E-mail</option>
                    <option value="Telefone">Telefone</option>
                    <option value="Aleatoria">Chave Aleatória</option>
                  </select>
                </div>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Chave Pix</label>
                  <input type="text" disabled={!tipoChavePix} value={chavePix} onChange={e => setChavePix(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: !tipoChavePix ? '#f3f4f6' : 'white' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= NAVEGAÇÃO ================= */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button type="button" onClick={voltarEtapa} disabled={etapaAtual === 1} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: etapaAtual === 1 ? 'not-allowed' : 'pointer', opacity: etapaAtual === 1 ? 0.5 : 1 }}>
            Anterior
          </button>
          
          <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {etapaAtual === 3 ? 'Salvar Agência' : 'Próximo'}
          </button>
        </div>
      </form>
    </div>
  );
}
