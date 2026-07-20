// src/pages/CadastroAtracao.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroAtracao() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [parceiroId, setParceiroId] = useState('');
  const [capacidadePublico, setCapacidadePublico] = useState('');
  const [classificacaoEtaria, setClassificacaoEtaria] = useState('Livre');
  const [precoIngresso, setPrecoIngresso] = useState('0');
  const [linkYoutube, setLinkYoutube] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({ logradouro: '', numero: '', complemento: '', bairro: '', cidade: 'Curitiba', uf: 'PR' });

  // Previews de Fotos
  const [fotoCapa, setFotoCapa] = useState(null);
  const [fotosGaleria, setFotosGaleria] = useState([]);

  // Mock de Parceiros Comerciais para vinculação
  const parceiros = [
    { id: 101, nome: 'Parque Jaime Lerner S/A' },
    { id: 102, nome: 'Ópera Eventos Culturais Ltda' }
  ];

  const handleBuscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setEndereco({
            ...endereco,
            logradouro: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || 'Curitiba',
            uf: data.uf || 'PR'
          });
        } else {
          alert('CEP não encontrado.');
        }
      } catch (err) {
        alert('Erro ao buscar o CEP.');
      }
    }
  };

  const handleFotoCapaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFotoCapa(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGaleriaChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setFotosGaleria(prev => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica de URL do Youtube se preenchida
    if (linkYoutube && !linkYoutube.includes('youtube.com') && !linkYoutube.includes('youtu.be')) {
      alert('Por favor, informe um link de vídeo válido do YouTube.');
      return;
    }

    alert('Atração cadastrada com sucesso! Ela nascerá com status Rascunho até que as assinaturas de contrato sejam concluídas.');
    navigate('/atracoes');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cadastrar Nova Atração</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Cadastre uma nova atração no portal público vinculada a um parceiro comercial credenciado</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Bloco 1: Informações Gerais */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Informações Básicas</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nome da Atração *</label>
              <input type="text" required value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Tour Guiado Ópera de Arame" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Parceiro Comercial Vinculado *</label>
              <select required value={parceiroId} onChange={e => setParceiroId(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Selecione...</option>
                {parceiros.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Classificação Etária *</label>
              <select required value={classificacaoEtaria} onChange={e => setClassificacaoEtaria(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="Livre">Livre</option>
                <option value="10">10 anos</option>
                <option value="12">12 anos</option>
                <option value="14">14 anos</option>
                <option value="16">16 anos</option>
                <option value="18">18 anos</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Preço do Ingresso (R$) *</label>
              <input type="number" step="0.01" required value={precoIngresso} onChange={e => setPrecoIngresso(e.target.value)} placeholder="0.00 para gratuito" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Capacidade de Público (Por Turno) *</label>
              <input type="number" required value={capacidadePublico} onChange={e => setCapacidadePublico(e.target.value)} placeholder="Capacidade máxima" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Descrição Detalhada *</label>
            <textarea required rows="4" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição completa sobre a atração para o portal público..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Bloco 2: Localização */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Localização</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>CEP *</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" required value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000" style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                <button type="button" onClick={handleBuscarCep} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>Buscar</button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Cidade / UF</label>
              <input type="text" disabled value={`${endereco.cidade} - ${endereco.uf}`} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f3f4f6' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Logradouro / Avenida *</label>
              <input type="text" required value={endereco.logradouro} onChange={e => setEndereco({ ...endereco, logradouro: e.target.value })} placeholder="Rua, Av..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Número *</label>
              <input type="text" required value={endereco.numero} onChange={e => setEndereco({ ...endereco, numero: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bairro *</label>
              <input type="text" required value={endereco.bairro} onChange={e => setEndereco({ ...endereco, bairro: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        {/* Bloco 3: Midia e Vídeo */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Mídia & Divulgação</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Vídeo Promocional (YouTube)</label>
              <input type="url" value={linkYoutube} onChange={e => setLinkYoutube(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Foto de Capa (Proporção 16:9) *</label>
                <input type="file" accept="image/*" required onChange={handleFotoCapaChange} style={{ marginBottom: '1rem' }} />
                {fotoCapa && (
                  <div style={{ width: '100%', maxHeight: '150px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
                    <img src={fotoCapa} alt="Capa Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Galeria de Fotos (Múltiplas)</label>
                <input type="file" accept="image/*" multiple onChange={handleGaleriaChange} style={{ marginBottom: '1rem' }} />
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {fotosGaleria.map((img, idx) => (
                    <div key={idx} style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #ccc' }}>
                      <img src={img} alt="Galeria Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTOES */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={() => navigate('/atracoes')} style={{ padding: '0.75rem 2rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            Cancelar
          </button>
          <button type="submit" style={{ padding: '0.75rem 2rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar Atração
          </button>
        </div>

      </form>

    </div>
  );
}
