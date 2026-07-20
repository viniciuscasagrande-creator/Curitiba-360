// src/pages/CMSHomeCuradoria.jsx
import { useState } from 'react';

export default function CMSHomeCuradoria() {
  const [secaoAtiva, setSecaoAtiva] = useState('Banners');

  // --- Mock de Banners Rotativos ---
  const [banners, setBanners] = useState([
    { id: 1, titulo: 'Conheça a Ópera de Arame', descricao: 'Um dos cartões postais mais icônicos de Curitiba.', link: '/atracoes/opera', ordem: 1, ativo: true },
    { id: 2, titulo: 'Tour Linha Turismo', descricao: 'Explore a cidade de ponta a ponta.', link: '/atracoes/linha-turismo', ordem: 2, ativo: true },
  ]);

  // --- Mock de Atrações em Destaque (Curadoria) ---
  const [destaques, setDestaques] = useState([
    { id: 101, nome: 'Jardim Botânico', categoria: 'Parque', ordem: 1 },
    { id: 102, nome: 'Museu Oscar Niemeyer', categoria: 'Museu', ordem: 2 },
  ]);

  const handleToggleBanner = (id) => {
    setBanners(banners.map(b => b.id === id ? { ...b, ativo: !b.ativo } : b));
  };

  const handleSalvarCuradoria = (e) => {
    e.preventDefault();
    alert('Configurações de curadoria da Home salvas com sucesso! O portal público foi atualizado.');
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Conteúdo {'>'} Curadoria da Home</p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CMS Curadoria da Home</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Organize banners, atrações recomendadas e categorias em destaque no portal principal</p>
      </div>

      {/* ABAS */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem' }}>
        {['Banners', 'Atrações em Destaque', 'Configurações Gerais'].map(aba => (
          <button 
            key={aba}
            onClick={() => setSecaoAtiva(aba)}
            style={{ 
              padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: secaoAtiva === aba ? 'bold' : 'normal',
              borderBottom: secaoAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
              color: secaoAtiva === aba ? '#111827' : '#6b7280'
            }}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* SEÇÃO: BANNERS */}
      {secaoAtiva === 'Banners' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Banners Rotativos (Carousel)</h2>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Adicionar Banner
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {banners.map((b, idx) => (
              <div key={b.id} style={{ display: 'flex', gap: '1.5rem', border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '6px', backgroundColor: '#f9fafb', alignItems: 'center' }}>
                <div style={{ fontSize: '1.25rem', color: '#6b7280', cursor: 'grab' }}>☰ {idx + 1}</div>
                
                {/* Thumbnail placeholder */}
                <div style={{ width: '100px', height: '60px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#9ca3af', borderRadius: '4px' }}>
                  BANNER IMG
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>{b.titulo}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{b.descricao}</p>
                  <small style={{ color: '#3b82f6' }}>Link: {b.link}</small>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button 
                    onClick={() => handleToggleBanner(b.id)}
                    style={{ 
                      padding: '0.25rem 0.75rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                      backgroundColor: b.ativo ? '#d1fae5' : '#fee2e2',
                      color: b.ativo ? '#065f46' : '#991b1b',
                      fontWeight: 'bold', fontSize: '0.75rem'
                    }}
                  >
                    {b.ativo ? 'ATIVO' : 'INATIVO'}
                  </button>
                  <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.875rem' }}>Editar</button>
                  <button style={{ padding: '0.25rem 0.5rem', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem' }}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO: ATRAÇÕES EM DESTAQUE */}
      {secaoAtiva === 'Atrações em Destaque' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Curadoria de Atrações na Home</h2>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Vincular Atração
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '1rem', width: '80px' }}>Ordem</th>
                <th style={{ padding: '1rem' }}>Atração</th>
                <th style={{ padding: '1rem' }}>Categoria</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {destaques.map((d, index) => (
                <tr key={d.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', color: '#6b7280', cursor: 'grab' }}>☰ {index + 1}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{d.nome}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: '0.75rem' }}>{d.categoria}</span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button style={{ padding: '0.25rem 0.5rem', color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Desvincular</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SEÇÃO: CONFIGURAÇÕES GERAIS */}
      {secaoAtiva === 'Configurações Gerais' && (
        <form onSubmit={handleSalvarCuradoria} style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', margin: 0 }}>Parâmetros da Landing Page</h2>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Título de Boas-vindas (Hero Section)</label>
            <input type="text" defaultValue="Descubra o melhor de Curitiba" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Subtítulo da Hero Section</label>
            <input type="text" defaultValue="Ingressos, passeios e experiências em um só lugar." style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Salvar Alterações
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
