// frontend/src/modules/sitePublico/components/CuritibaFreeImageBankSection.jsx
// Seção Oficial do Banco de Imagens Gratuito da Cidade de Curitiba (22 Fotos Reais Locais + Busca Ao Vivo na API Gratuita do Wikimedia Commons)
import React, { useState, useEffect } from 'react';
import { Camera, Search, ExternalLink, Sparkles, MapPin, Download, Eye, X, RefreshCw } from 'lucide-react';
import { CURITIBA_FREE_IMAGE_BANK, curitibaImageBankService } from '../../../services/curitibaImageBankService';

const QUICK_TOPICS = [
  { label: 'Todos (22 Fotos HD)', query: 'ALL' },
  { label: 'Jardim Botânico', query: 'Jardim Botânico de Curitiba' },
  { label: 'Museu Oscar Niemeyer', query: 'Museu Oscar Niemeyer' },
  { label: 'Ópera de Arame', query: 'Ópera de Arame Curitiba' },
  { label: 'Parque Tanguá & Barigui', query: 'Parque Tanguá Curitiba' },
  { label: 'Centro Histórico & Largo', query: 'Largo da Ordem Curitiba' },
  { label: 'Trem Serra do Mar', query: 'Estrada de Ferro Paranaguá Curitiba' },
  { label: 'Skyline & BRT Curitiba', query: 'Curitiba skyline' }
];

export default function CuritibaFreeImageBankSection() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchInput, setSearchInput] = useState('');
  const [liveWikiPhotos, setLiveWikiPhotos] = useState([]);
  const [loadingWiki, setLoadingWiki] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState(null);

  const categories = ['Todos', 'Parques & Natureza', 'Cultura & Arquitetura', 'Teatros & Cultura', 'História & Patrimônio', 'Gastronomia', 'Shows & Eventos', 'Tours & Ferrovia', 'Região Metropolitana', 'Wikimedia Commons Live'];

  const handleFetchWikimedia = async (term) => {
    setLoadingWiki(true);
    const results = await curitibaImageBankService.searchWikimediaCuritibaPhotos(term);
    setLiveWikiPhotos(results);
    setLoadingWiki(false);
  };

  useEffect(() => {
    handleFetchWikimedia('Curitiba');
  }, []);

  const combinedPhotos = [...CURITIBA_FREE_IMAGE_BANK, ...liveWikiPhotos];

  const filteredPhotos = combinedPhotos.filter((p) => {
    const matchCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const q = searchInput.trim().toLowerCase();
    const matchQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.neighborhood.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <section style={{ maxWidth: '1280px', margin: '48px auto', padding: '0 20px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)',
          borderRadius: '24px',
          padding: '32px',
          color: '#ffffff',
          boxShadow: '0 16px 40px rgba(15,23,42,0.18)',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '720px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(52, 211, 153, 0.4)',
                color: '#6ee7b7',
                padding: '5px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '800',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              <Camera size={15} />
              <span>Banco de Imagens Gratuito Oficial • Curitiba 360° & Wikimedia Commons API</span>
            </div>

            <h2 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: 1.2 }}>
              Galeria Fotográfica Real da Cidade de Curitiba (Full HD)
            </h2>
            <p style={{ fontSize: '14.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
              Explore o acervo fotográfico gratuito com imagens reais dos parques, bosques, monumentos históricos, teatros, gastronomia e arquitetura de Curitiba, integrado em tempo real à API pública do Wikimedia Commons.
            </p>
          </div>

          {/* Busca ao vivo na API Wikimedia Commons */}
          <div style={{ minWidth: '300px', flex: '1', maxWidth: '420px' }}>
            <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#6ee7b7', marginBottom: '6px', textTransform: 'uppercase' }}>
              🔍 Pesquisar Mais Fotos Reais de Curitiba (Wikimedia Free API):
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ex: Jardim Botânico, Ópera de Arame, Capivara..."
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backgroundColor: 'rgba(15,23,42,0.75)',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => handleFetchWikimedia(searchInput || 'Curitiba')}
                style={{
                  padding: '0 16px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#10b981',
                  color: '#022c22',
                  fontWeight: '900',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {loadingWiki ? <RefreshCw size={15} /> : <Search size={15} />}
                <span>Buscar API</span>
              </button>
            </div>
          </div>
        </div>

        {/* Botões Rápidos de Pontos Turísticos */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
          {QUICK_TOPICS.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (t.query === 'ALL') {
                  setSearchInput('');
                  setSelectedCategory('Todos');
                  handleFetchWikimedia('Curitiba');
                } else {
                  setSearchInput(t.label.split(' ')[0]);
                  handleFetchWikimedia(t.query);
                }
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#f8fafc',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              📷 {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro de Categorias */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: active ? '1.5px solid #00a896' : '1px solid #cbd5e1',
                backgroundColor: active ? '#00a896' : '#ffffff',
                color: active ? '#ffffff' : '#334155',
                fontWeight: '800',
                fontSize: '12.5px',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grade de Fotos Reais de Curitiba */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActiveLightbox(photo)}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{ position: 'relative', height: '195px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#34d399',
                  fontSize: '10.5px',
                  fontWeight: '800',
                  padding: '3px 9px',
                  borderRadius: '6px'
                }}
              >
                {photo.category}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Eye size={12} /> Ampliar HD
              </span>
            </div>

            <div style={{ padding: '14px 16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                {photo.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                {photo.subtitle}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '700', color: '#00a896' }}>
                  <MapPin size={12} /> {photo.neighborhood}
                </span>
                <span style={{ color: '#94a3b8', fontWeight: '600' }}>{photo.license}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox em Alta Resolução */}
      {activeLightbox && (
        <div
          onClick={() => setActiveLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '20px',
              maxWidth: '960px',
              width: '100%',
              overflow: 'hidden',
              border: '1px solid #334155',
              color: '#ffffff'
            }}
          >
            <div style={{ position: 'relative', maxHeight: '72vh', backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain' }}
              />
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(15,23,42,0.85)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>{activeLightbox.title}</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                  {activeLightbox.subtitle} • {activeLightbox.neighborhood} ({activeLightbox.license})
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={activeLightbox.fullUrl || activeLightbox.image}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '9px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#00a896',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '12.5px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={14} /> Abrir Imagem Original
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
