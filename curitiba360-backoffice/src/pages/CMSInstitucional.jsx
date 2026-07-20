// src/pages/CMSInstitucional.jsx
import { useState } from 'react';

export default function CMSInstitucional() {
  // RF-032.02: Sub-menu com 4 seções
  const [secaoAtiva, setSecaoAtiva] = useState('Privacidade');
  
  // Estados para simular o conteúdo dos editores
  const [conteudoPrivacidade, setConteudoPrivacidade] = useState('<p>Sua política de privacidade aqui...</p>');
  const [conteudoTermos, setConteudoTermos] = useState('<p>Seus termos de uso aqui...</p>');
  
  // Status de Rascunho vs Publicado (RF-032.05)
  const [temRascunhoPrivacidade, setTemRascunhoPrivacidade] = useState(false);
  
  // Mock de dados para o FAQ (RF-032.18 e RF-032.26)
  const [faqCategorias, setFaqCategorias] = useState([
    { id: 1, nome: 'Ingressos', slug: 'ingressos', qtd: 5, status: 'Ativa' },
    { id: 2, nome: 'Cancelamento', slug: 'cancelamento', qtd: 2, status: 'Ativa' },
  ]);

  // Ações do CMS (RF-032.07 e RF-032.08)
  const handleSalvarRascunho = (e) => {
    e.preventDefault();
    setTemRascunhoPrivacidade(true);
    alert('Rascunho salvo com sucesso! O portal ainda exibe a versão anterior.');
  };

  const handlePublicar = (e) => {
    e.preventDefault();
    const confirma = window.confirm('Deseja realmente publicar estas alterações no portal agora?');
    if (confirma) {
      setTemRascunhoPrivacidade(false);
      alert('Conteúdo publicado com sucesso! O portal foi atualizado.');
      // Aqui enviaria para o backend limpar as tags maliciosas (Sanitização XSS - RN-032.06) e salvar no BD
    }
  };

  return (
    <div>
      {/* CABEÇALHO (RF-032.01 e RF-032.03) */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Conteúdo {'>'} Institucional {'>'} {secaoAtiva}</p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CMS Institucional</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie o conteúdo das páginas institucionais do Portal Público</p>
      </div>

      {/* NAVEGAÇÃO DAS SEÇÕES DO CMS (RF-032.02) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem', overflowX: 'auto' }}>
        {[
          { id: 'Privacidade', label: 'Política de Privacidade' },
          { id: 'Termos', label: 'Condições de Uso' },
          { id: 'FAQ', label: 'FAQ (Perguntas Frequentes)' },
          { id: 'Sobre', label: 'Sobre Nós' }
        ].map(secao => (
          <button 
            key={secao.id}
            onClick={() => setSecaoAtiva(secao.id)}
            style={{ 
              padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontWeight: secaoAtiva === secao.id ? 'bold' : 'normal',
              borderBottom: secaoAtiva === secao.id ? '2px solid #10b981' : '2px solid transparent',
              color: secaoAtiva === secao.id ? '#111827' : '#6b7280'
            }}
          >
            {secao.label}
          </button>
        ))}
      </div>

      {/* ================= SEÇÃO: POLÍTICA DE PRIVACIDADE E TERMOS DE USO ================= */}
      {(secaoAtiva === 'Privacidade' || secaoAtiva === 'Termos') && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          
          {/* Info de Publicação (RF-032.04 e RF-032.05) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {secaoAtiva === 'Privacidade' ? 'Política de Privacidade' : 'Condições de Uso'}
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                Última publicação: 20/07/2026 às 10:00 por Admin Silva
              </p>
            </div>
            
            {secaoAtiva === 'Privacidade' && temRascunhoPrivacidade && (
              <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 'bold' }}>
                Rascunho não publicado
              </span>
            )}
            
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.875rem' }}>
              🕒 Ver Histórico de Versões
            </button>
          </div>

          {/* Simulador de Editor WYSIWYG (RF-032.06) */}
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#f9fafb', padding: '0.5rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '0.5rem' }}>
              <button style={{ padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 'bold' }}>B</button>
              <button style={{ padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px', fontStyle: 'italic' }}>I</button>
              <button style={{ padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px', textDecoration: 'underline' }}>U</button>
              <span style={{ borderLeft: '1px solid #ccc', margin: '0 0.5rem' }}></span>
              <button style={{ padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>🔗 Link</button>
              <button style={{ padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>H1</button>
              <button style={{ padding: '0.25rem 0.5rem', background: 'white', border: '1px solid #ccc', borderRadius: '4px' }}>H2</button>
            </div>
            <textarea 
              rows="15" 
              value={secaoAtiva === 'Privacidade' ? conteudoPrivacidade : conteudoTermos}
              onChange={(e) => secaoAtiva === 'Privacidade' ? setConteudoPrivacidade(e.target.value) : setConteudoTermos(e.target.value)}
              style={{ width: '100%', padding: '1rem', border: 'none', outline: 'none', resize: 'vertical', fontFamily: 'sans-serif' }}
            />
          </div>

          {/* Botões de Ação do CMS (RF-032.09 e RF-032.09) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
              👁 Pré-visualizar
            </button>
            <button onClick={handleSalvarRascunho} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
              Salvar Rascunho
            </button>
            <button onClick={handlePublicar} style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Publicar no Portal
            </button>
          </div>
        </div>
      )}

      {/* ================= SEÇÃO: FAQ ================= */}
      {secaoAtiva === 'FAQ' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Categorias de Perguntas</h2>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Nova Categoria
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '2rem' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '60px' }}>Ordem</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome da Categoria</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Slug</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Perguntas</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {faqCategorias.map((cat, index) => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', color: '#6b7280', cursor: 'grab' }}>☰ {index + 1}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{cat.nome}</td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>/{cat.slug}</td>
                  <td style={{ padding: '0.75rem' }}>{cat.qtd}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: '#d1fae5', color: '#065f46' }}>{cat.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', marginRight: '0.5rem' }}>Editar</button>
                    <button style={{ padding: '0.25rem 0.5rem', color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>* Arraste o ícone ☰ para reordenar as categorias. A ordem salva será refletida no portal imediatamente.</p>
        </div>
      )}

      {/* ================= SEÇÃO: SOBRE NÓS ================= */}
      {secaoAtiva === 'Sobre' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Página Sobre Nós</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Configure as informações exibidas na página institucional "Sobre o Curitiba 360".</p>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nossa Missão</label>
              <textarea rows="3" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Descreva a missão da empresa..."></textarea>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nossa Visão</label>
              <textarea rows="3" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Descreva a visão..."></textarea>
            </div>
            
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Membros da Equipe</h3>
                <button style={{ padding: '0.5rem 1rem', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Adicionar Membro</button>
              </div>
              <div style={{ padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px', textAlign: 'center', color: '#6b7280' }}>
                Nenhum membro cadastrado. Clique no botão acima para adicionar.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button style={{ padding: '0.5rem 1rem', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>👁 Pré-visualizar</button>
              <button style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Publicar Alterações</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
