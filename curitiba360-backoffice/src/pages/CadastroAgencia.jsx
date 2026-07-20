// src/pages/CadastroAgencia.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroAgencia() {
  const navigate = useNavigate();
  const [etapaAtual, setEtapaAtual] = useState(1);

  // --- Etapa 1: Dados Cadastrais ---
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');

  // --- Etapa 2: Responsável Legal ---
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [cpfResponsavel, setCpfResponsavel] = useState('');
  const [emailResponsavel, setEmailResponsavel] = useState('');

  // --- Etapa 3: Dados Bancários ---
  const [banco, setBanco] = useState('');
  const [tipoConta, setTipoConta] = useState('Corrente');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  const [titular, setTitular] = useState('');
  const [chavePix, setChavePix] = useState('');

  // --- Etapa 4: Gestores ---
  const [gestores, setGestores] = useState([
    { primeiroNome: '', ultimoNome: '', telefone: '', emails: [''] }
  ]);

  const handleAddGestor = () => {
    setGestores([...gestores, { primeiroNome: '', ultimoNome: '', telefone: '', emails: [''] }]);
  };

  const handleRemoveGestor = (index) => {
    setGestores(gestores.filter((_, idx) => idx !== index));
  };

  const handleGestorChange = (index, field, value) => {
    const updated = gestores.map((g, idx) => {
      if (idx === index) {
        if (field === 'email') {
          return { ...g, emails: [value] };
        }
        return { ...g, [field]: value };
      }
      return g;
    });
    setGestores(updated);
  };

  const avancarEtapa = (e) => {
    e.preventDefault();
    if (etapaAtual < 4) setEtapaAtual(etapaAtual + 1);
  };

  const voltarEtapa = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    // RN-026.15 e RN-027.11: Agências nascem no status "AGUARDANDO_CONTRATO"
    alert(`Agência ${nomeFantasia} cadastrada com sucesso! Status inicial: AGUARDANDO_CONTRATO.`);
    navigate('/agencias');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* CABEÇALHO E PROGRESSO */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Credenciar Nova Agência</h2>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: etapaAtual === 1 ? 'bold' : 'normal', color: etapaAtual === 1 ? '#10b981' : 'inherit' }}>1. Cadastro</span>
          <span style={{ fontWeight: etapaAtual === 2 ? 'bold' : 'normal', color: etapaAtual === 2 ? '#10b981' : 'inherit' }}>2. Responsável</span>
          <span style={{ fontWeight: etapaAtual === 3 ? 'bold' : 'normal', color: etapaAtual === 3 ? '#10b981' : 'inherit' }}>3. Dados Bancários</span>
          <span style={{ fontWeight: etapaAtual === 4 ? 'bold' : 'normal', color: etapaAtual === 4 ? '#10b981' : 'inherit' }}>4. Gestores</span>
        </div>
      </div>

      <form onSubmit={etapaAtual === 4 ? handleSalvar : avancarEtapa}>
        
        {/* ETAPA 1: DADOS CADASTRAIS */}
        {etapaAtual === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Razão Social *</label><input type="text" required value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome Fantasia *</label><input type="text" required value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CNPJ *</label><input type="text" required placeholder="00.000.000/0000-00" value={cnpj} onChange={e => setCnpj(e.target.value)} style={{ width: '50%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
          </div>
        )}

        {/* ETAPA 2: RESPONSÁVEL LEGAL */}
        {etapaAtual === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome Completo *</label><input type="text" required value={nomeResponsavel} onChange={e => setNomeResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CPF ou Passaporte *</label><input type="text" required value={cpfResponsavel} onChange={e => setCpfResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div style={{ gridColumn: '1 / -1' }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>E-mail de Contato *</label><input type="email" required value={emailResponsavel} onChange={e => setEmailResponsavel(e.target.value)} style={{ width: '50%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
          </div>
        )}

        {/* ETAPA 3: DADOS BANCÁRIOS */}
        {etapaAtual === 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Código do Banco *</label><input type="text" placeholder="Ex: 341" required value={banco} onChange={e => setBanco(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tipo de Conta *</label>
              <select value={tipoConta} onChange={e => setTipoConta(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="Corrente">Conta Corrente</option>
                <option value="Poupanca">Conta Poupança</option>
              </select>
            </div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Agência (sem dígito) *</label><input type="text" required value={agencia} onChange={e => setAgencia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Conta com dígito *</label><input type="text" required value={conta} onChange={e => setConta(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Titular da Conta *</label><input type="text" required value={titular} onChange={e => setTitular(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Chave Pix *</label><input type="text" required value={chavePix} onChange={e => setChavePix(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
          </div>
        )}

        {/* ETAPA 4: LISTA DE GESTORES */}
        {etapaAtual === 4 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Gestores com Acesso ao Backoffice</h3>
              <button type="button" onClick={handleAddGestor} style={{ padding: '0.4rem 0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}>
                + Adicionar Gestor
              </button>
            </div>

            {gestores.map((g, index) => (
              <div key={index} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '1rem', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Gestor #{index + 1}</h4>
                  {gestores.length > 1 && (
                    <button type="button" onClick={() => handleRemoveGestor(index)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem' }}>
                      Remover
                    </button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Primeiro nome</label><input type="text" required value={g.primeiroNome} onChange={e => handleGestorChange(index, 'primeiroNome', e.target.value)} style={{ width: '100%', padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                  <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Último nome</label><input type="text" required value={g.ultimoNome} onChange={e => handleGestorChange(index, 'ultimoNome', e.target.value)} style={{ width: '100%', padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                  <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Telefone</label><input type="text" required value={g.telefone} onChange={e => handleGestorChange(index, 'telefone', e.target.value)} style={{ width: '100%', padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                  <div><label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>E-mail</label><input type="email" required value={g.emails[0]} onChange={e => handleGestorChange(index, 'email', e.target.value)} style={{ width: '100%', padding: '0.4rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NAVEGAÇÃO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button type="button" onClick={voltarEtapa} disabled={etapaAtual === 1} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: etapaAtual === 1 ? 'not-allowed' : 'pointer', opacity: etapaAtual === 1 ? 0.5 : 1 }}>
            Anterior
          </button>
          
          <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {etapaAtual === 4 ? 'Salvar' : 'Próximo'}
          </button>
        </div>

      </form>
    </div>
  );
}
