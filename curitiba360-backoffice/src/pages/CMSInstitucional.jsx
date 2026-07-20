// src/pages/CMSInstitucional.jsx
import { useState } from 'react';

export default function CMSInstitucional() {
  const [paginaSelecionada, setPaginaSelecionada] = useState(null);
  const [idioma, setIdioma] = useState('PT_BR');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [status, setStatus] = useState('Rascunho');
  const [mensagem, setMensagem] = useState('');

  // Mock de páginas institucionais editáveis
  const paginasInstitucionais = [
    { id: 'termos', nome: 'Termos de Uso', ultimaAtualizacao: '10/07/2026' },
    { id: 'privacidade', nome: 'Política de Privacidade', ultimaAtualizacao: '12/07/2026' },
    { id: 'sobre', nome: 'Sobre o Curitiba 360', ultimaAtualizacao: '15/07/2026' },
    { id: 'ajuda', nome: 'Como Funciona / Ajuda', ultimaAtualizacao: '01/07/2026' },
  ];

  const handleEditarPagina = (pag) => {
    setPaginaSelecionada(pag);
    // Simula carregamento de conteúdo baseado no idioma
    setTitulo(pag.nome);
    setConteudo(`Este é o conteúdo institucional fictício da página de ${pag.nome} no idioma ${idioma}. Altere este texto para atualizar.`);
    setStatus('Publicado');
    setMensagem('');
  };

  const handleSalvarConteudo = (e) => {
    e.preventDefault();
    setMensagem(`Página "${titulo}" salva com sucesso no status: ${status} (${idioma})!`);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
      
      {/* Barra Lateral: Lista de Páginas */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: 'fit-content' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Páginas Institucionais</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {paginasInstitucionais.map(pag => (
            <li key={pag.id}>
              <button 
                onClick={() => handleEditarPagina(pag)}
                style={{ 
                  width: '100%', textAlign: 'left', padding: '0.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer',
                  backgroundColor: paginaSelecionada?.id === pag.id ? '#10b981' : 'transparent',
                  color: paginaSelecionada?.id === pag.id ? 'white' : '#374151',
                  fontWeight: paginaSelecionada?.id === pag.id ? 'bold' : 'normal'
                }}
              >
                {pag.nome}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Área do Editor */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {paginaSelecionada ? (
          <form onSubmit={handleSalvarConteudo}>
            
            {/* Cabeçalho do Editor */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Editando: {paginaSelecionada.nome}</h2>
                <small style={{ color: '#6b7280' }}>Última edição em: {paginaSelecionada.ultimaAtualizacao}</small>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <select value={idioma} onChange={(e) => setIdioma(e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="PT_BR">Português (BR)</option>
                  <option value="EN_US">Inglês (US)</option>
                  <option value="ES_ES">Espanhol (ES)</option>
                </select>

                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="Rascunho">Rascunho</option>
                  <option value="Publicado">Publicado</option>
                </select>
              </div>
            </div>

            {mensagem && (
              <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px', fontWeight: 'bold' }}>
                {mensagem}
              </div>
            )}

            {/* Formulário */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Título da Página (SEO / Menu)</label>
                <input 
                  type="text" 
                  required 
                  value={titulo} 
                  onChange={e => setTitulo(e.target.value)} 
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Conteúdo em HTML / Rich Text</label>
                <textarea 
                  required 
                  rows="15" 
                  value={conteudo} 
                  onChange={e => setConteudo(e.target.value)} 
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setPaginaSelecionada(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Fechar Editor</button>
                <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Alterações</button>
              </div>
            </div>

          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', color: '#6b7280' }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</span>
            <p style={{ margin: 0 }}>Selecione uma página institucional na barra lateral para começar a editar.</p>
          </div>
        )}
      </div>

    </div>
  );
}
