// src/pages/CadastroParceiro.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroParceiro() {
  const navigate = useNavigate();
  const [etapaAtual, setEtapaAtual] = useState(1);

  // --- Estados da Etapa 1: Dados da Empresa (RF-037.09 a RF-037.18) ---
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [isentoIE, setIsentoIE] = useState(false);
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [segmento, setSegmento] = useState('');
  const [emailComercial, setEmailComercial] = useState('');
  const [telefoneComercial, setTelefoneComercial] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({ logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '', pais: 'Brasil' });
  const [site, setSite] = useState('');

  // --- Estados da Etapa 2: Dados do Responsável (RF-037.19 a RF-037.23) ---
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [cpfResponsavel, setCpfResponsavel] = useState('');
  const [cargoResponsavel, setCargoResponsavel] = useState('');
  const [emailResponsavel, setEmailResponsavel] = useState('');
  const [celularResponsavel, setCelularResponsavel] = useState('');

  // --- Estados da Etapa 3: Documentos e Info (RF-037.24 a RF-037.33) ---
  const [documento, setDocumento] = useState(null);
  const [descricaoAtracao, setDescricaoAtracao] = useState('');
  const [analyticsConectado, setAnalyticsConectado] = useState(false);

  // Funções de Navegação e Salvamento
  const avancarEtapa = (e) => {
    e.preventDefault(); // Impede o envio do form ao avançar
    if (etapaAtual < 3) setEtapaAtual(etapaAtual + 1);
  };

  const voltarEtapa = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    // RN-037.03: O parceiro cadastrado pelo Admin já nasce com status "Ativa"
    alert(`Parceiro ${nomeFantasia} cadastrado com sucesso! Status: Ativa.`);
    navigate('/parceiros');
  };

  const buscarCep = () => {
    // Integração real com API de CEP (ex: ViaCEP) entraria aqui (RF-037.16)
    alert(`Buscando CEP ${cep}...`);
    setEndereco({ ...endereco, logradouro: 'Rua Exemplo', bairro: 'Centro', cidade: 'Curitiba', uf: 'PR', pais: 'Brasil' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {/* CABEÇALHO E PROGRESSO (RF-037.02) */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Novo Parceiro Comercial</h2>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          <span style={{ fontWeight: etapaAtual === 1 ? 'bold' : 'normal', color: etapaAtual === 1 ? '#10b981' : 'inherit' }}>1. Dados da Empresa</span>
          <span style={{ fontWeight: etapaAtual === 2 ? 'bold' : 'normal', color: etapaAtual === 2 ? '#10b981' : 'inherit' }}>2. Dados do Responsável</span>
          <span style={{ fontWeight: etapaAtual === 3 ? 'bold' : 'normal', color: etapaAtual === 3 ? '#10b981' : 'inherit' }}>3. Documentos e Info</span>
        </div>
      </div>

      <form onSubmit={etapaAtual === 3 ? handleSalvar : avancarEtapa}>
        
        {/* ETAPA 1: DADOS DA EMPRESA */}
        {etapaAtual === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Razão Social *</label><input type="text" required value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CNPJ *</label><input type="text" required value={cnpj} onChange={e => setCnpj(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome Fantasia *</label><input type="text" required value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Inscrição Estadual</label>
                <label style={{ fontSize: '0.875rem' }}><input type="checkbox" checked={isentoIE} onChange={e => setIsentoIE(e.target.checked)} /> Isento</label>
              </div>
              <input type="text" required={!isentoIE} disabled={isentoIE} value={isentoIE ? '' : inscricaoEstadual} onChange={e => setInscricaoEstadual(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: isentoIE ? '#f3f4f6' : 'white' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Segmento *</label>
              <select required value={segmento} onChange={e => setSegmento(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Selecione...</option>
                <option value="Museu">Museu</option>
                <option value="Parque">Parque</option>
                <option value="Restaurante">Restaurante</option>
                <option value="Hotel">Hotel</option>
              </select>
            </div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>E-mail Comercial *</label><input type="email" required value={emailComercial} onChange={e => setEmailComercial(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Endereço</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'end' }}>
                  <div style={{ flex: 1 }}><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CEP *</label><input type="text" required value={cep} onChange={e => setCep(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                  <button type="button" onClick={buscarCep} style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Buscar</button>
                </div>
                <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Logradouro *</label><input type="text" required value={endereco.logradouro} onChange={e => setEndereco({...endereco, logradouro: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 2: DADOS DO RESPONSÁVEL */}
        {etapaAtual === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nome Completo *</label><input type="text" required value={nomeResponsavel} onChange={e => setNomeResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CPF *</label><input type="text" required value={cpfResponsavel} onChange={e => setCpfResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Cargo *</label><input type="text" required value={cargoResponsavel} onChange={e => setCargoResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>E-mail *</label><input type="email" required value={emailResponsavel} onChange={e => setEmailResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
            <div><label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Telefone Celular *</label><input type="text" required value={celularResponsavel} onChange={e => setCelularResponsavel(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
          </div>
        )}

        {/* ETAPA 3: DOCUMENTOS E INFO */}
        {etapaAtual === 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Documento de Constituição (Opcional)</label>
              <input type="file" accept=".pdf,.jpg,.png" onChange={e => setDocumento(e.target.files[0])} style={{ width: '100%', padding: '0.5rem', border: '1px dashed #ccc', borderRadius: '4px' }} />
              <small style={{ color: '#6b7280' }}>PDF, JPG ou PNG de até 5MB.</small>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Descrição da Atração *</label>
              <textarea 
                required 
                minLength={50} 
                maxLength={1000} 
                value={descricaoAtracao} 
                onChange={e => setDescricaoAtracao(e.target.value)} 
                rows={5} 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="Descreva a atração..."
              />
              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#6b7280' }}>{descricaoAtracao.length}/1000 caracteres</div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', margin: 0 }}>Integração Google Analytics</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Permite exibir métricas de acesso para o parceiro.</p>
              </div>
              <button type="button" onClick={() => setAnalyticsConectado(!analyticsConectado)} style={{ padding: '0.5rem 1rem', background: analyticsConectado ? '#ef4444' : '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {analyticsConectado ? 'Desconectar' : 'Conectar Conta'}
              </button>
            </div>
          </div>
        )}

        {/* NAVEGAÇÃO / BOTÕES (RF-037.03) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button type="button" onClick={voltarEtapa} disabled={etapaAtual === 1} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: etapaAtual === 1 ? 'not-allowed' : 'pointer', opacity: etapaAtual === 1 ? 0.5 : 1 }}>
            Anterior
          </button>
          
          <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {etapaAtual === 3 ? 'Salvar' : 'Próximo'}
          </button>
        </div>
      </form>
    </div>
  );
}
