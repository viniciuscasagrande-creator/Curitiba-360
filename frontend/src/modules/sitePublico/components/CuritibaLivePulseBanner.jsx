import React, { useState } from 'react';
import { CloudSun, Wind, Droplets, DollarSign, Calendar, RefreshCw, Sparkles, Trees, Umbrella, Globe, BookOpen, ExternalLink } from 'lucide-react';
import { freeApisService } from '../../../services/freeApisService';

const WIKI_QUICK_TOPICS = [
  { id: 'jardim-botanico', label: 'Jardim Botânico', slug: 'Jardim_Botânico_de_Curitiba' },
  { id: 'mon', label: 'Museu Oscar Niemeyer', slug: 'Museu_Oscar_Niemeyer' },
  { id: 'opera-de-arame', label: 'Ópera de Arame', slug: 'Ópera_de_Arame' },
  { id: 'parque-tangua', label: 'Parque Tanguá', slug: 'Parque_Tanguá' },
  { id: 'trem-serra-verde', label: 'Ferrovia Serra do Mar', slug: 'Estrada_de_Ferro_Paranaguá-Curitiba' },
  { id: 'teatro-guaira', label: 'Teatro Guaíra', slug: 'Teatro_Guaíra' },
  { id: 'largo-da-ordem', label: 'Largo da Ordem', slug: 'Largo_da_Ordem' },
  { id: 'ilha-do-mel', label: 'Ilha do Mel', slug: 'Ilha_do_Mel' }
];

export default function CuritibaLivePulseBanner({ liveData, onRefresh, onFilterClimate, selectedCurrency, onSelectCurrency }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [wikiData, setWikiData] = useState(null);
  const [activeWikiTopic, setActiveWikiTopic] = useState(null);
  const [loadingWiki, setLoadingWiki] = useState(false);

  if (!liveData) return null;

  const { weather, airQuality, currencies, holidays, updatedAt } = liveData;

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleLoadWiki = async (topic) => {
    if (activeWikiTopic === topic.id && wikiData) {
      setActiveWikiTopic(null);
      setWikiData(null);
      return;
    }
    setActiveWikiTopic(topic.id);
    setLoadingWiki(true);
    const data = await freeApisService.fetchWikipediaSummary(topic.id);
    setWikiData(data);
    setLoadingWiki(false);
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #064e3b 100%)',
      color: '#ffffff',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '20px 20px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Top Row: Live API Status Header & Currency Converter Selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981',
              color: '#34d399', padding: '4px 12px', borderRadius: '999px',
              fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              DADOS AO VIVO DE CURITIBA (APIs PÚBLICAS GRATUITAS)
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Open-Meteo • Qualidade do Ar • AwesomeAPI Câmbio • BrasilAPI • Wikipedia REST ({updatedAt})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Currency Switcher for International Tourists */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Globe size={14} color="#38bdf8" />
              <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '700' }}>Moeda na Vitrine:</span>
              {['BRL', 'USD', 'EUR'].map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => onSelectCurrency && onSelectCurrency(curr)}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    backgroundColor: selectedCurrency === curr ? '#00a896' : 'transparent',
                    color: selectedCurrency === curr ? '#ffffff' : '#94a3b8'
                  }}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleManualRefresh}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
                padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Atualizar APIs</span>
            </button>
          </div>
        </div>

        {/* Main 4-Card Live Data Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))', gap: '14px' }}>
          
          {/* Card 1: Open-Meteo Real-Time Weather & 5-Day Forecast */}
          <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.75)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Open-Meteo API • Clima Agora
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '900' }}>{weather.icon} {weather.temperature}°C</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Sensação {weather.apparentTemperature}°C</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#e2e8f0' }}>{weather.condition}</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '11px', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                  <Droplets size={12} color="#38bdf8" /> <span>{weather.humidity}% Umid.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '3px' }}>
                  <Wind size={12} color="#94a3b8" /> <span>{weather.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            {/* 5-day mini strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', textAlign: 'center', fontSize: '11px' }}>
              {(weather.daily || []).map((d, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(15,23,42,0.5)', padding: '5px 2px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700', color: '#cbd5e1', fontSize: '10px' }}>{d.date}</div>
                  <div style={{ fontSize: '15px', margin: '2px 0' }}>{d.icon}</div>
                  <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '10px' }}>{d.max}° <span style={{ color: '#64748b' }}>{d.min}°</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Smart Ecological & Air Quality Index + Smart Climate Filter */}
          <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.75)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Air Quality API • Capital Ecológica
                </span>
                <span style={{ backgroundColor: airQuality.badgeColor, color: '#022c22', fontSize: '10px', fontWeight: '900', padding: '2px 8px', borderRadius: '999px' }}>
                  AQI {airQuality.aqi} • UV {airQuality.uvIndex}
                </span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', marginBottom: '6px' }}>
                🌿 {airQuality.level} (PM2.5: {airQuality.pm25} µg/m³)
              </div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.4', margin: 0 }}>
                💡 <strong>Recomendação Climática:</strong> {weather.advice}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => onFilterClimate && onFilterClimate('parques')}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  backgroundColor: !weather.isRainy ? '#10b981' : 'rgba(255,255,255,0.1)',
                  color: !weather.isRainy ? '#022c22' : '#ffffff',
                  border: 'none', borderRadius: '8px', padding: '7px 10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer'
                }}
              >
                <Trees size={13} />
                <span>Ver Parques Ao Ar Livre</span>
              </button>
              <button
                type="button"
                onClick={() => onFilterClimate && onFilterClimate('cultura')}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  backgroundColor: weather.isRainy ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: 'none', borderRadius: '8px', padding: '7px 10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer'
                }}
              >
                <Umbrella size={13} />
                <span>Roteiro Coberto / Museus</span>
              </button>
            </div>
          </div>

          {/* Card 3: AwesomeAPI Live Exchange Rates & BrasilAPI Holidays */}
          <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.75)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                AwesomeAPI • Câmbio Turista Internacional
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '8px', marginBottom: '12px' }}>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '6px 8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>🇺🇸 Dólar (USD)</div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#34d399' }}>R$ {currencies.USD}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '6px 8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>🇪🇺 Euro (EUR)</div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#38bdf8' }}>R$ {currencies.EUR}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(15,23,42,0.6)', padding: '6px 8px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>🇬🇧 Libra (GBP)</div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#fbbf24' }}>R$ {currencies.GBP}</div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#a78bfa', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={11} /> BrasilAPI • Próximos Feriados & Alta Temporada:
              </span>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginTop: '6px' }}>
                {(holidays || []).slice(0, 2).map((h, idx) => (
                  <div key={idx} style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', whiteSpace: 'nowrap' }}>
                    <strong style={{ color: '#c4b5fd' }}>{h.date.split('-').reverse().slice(0, 2).join('/')}:</strong> {h.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Wikipedia Live Cultural Knowledge Bar */}
        <div style={{ marginTop: '14px', backgroundColor: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={15} color="#38bdf8" />
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#e2e8f0' }}>
                Wikipedia REST API • Enciclopédia Cultural de Curitiba Ao Vivo:
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {WIKI_QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleLoadWiki(topic)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    border: activeWikiTopic === topic.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: activeWikiTopic === topic.id ? '#0284c7' : 'rgba(255,255,255,0.06)',
                    color: '#ffffff'
                  }}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {loadingWiki && (
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#38bdf8' }}>
              Consultando Wikipedia API em tempo real...
            </div>
          )}

          {wikiData && !loadingWiki && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {wikiData.thumbnail && (
                <img src={wikiData.thumbnail} alt={wikiData.title} style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }} />
              )}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '14px', color: '#38bdf8' }}>{wikiData.title}</strong>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>({wikiData.description})</span>
                </div>
                <p style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: '1.5', margin: '0 0 6px 0' }}>
                  {wikiData.extract}
                </p>
                <a href={wikiData.pageUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#34d399', fontWeight: '700', textDecoration: 'none' }}>
                  <span>Ler artigo oficial completo na Wikipédia</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
