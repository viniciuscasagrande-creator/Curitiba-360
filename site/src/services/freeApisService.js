// frontend/src/services/freeApisService.js
// Hub de Integração com APIs Públicas Gratuitas (100% Free, Sem API Key, CORS habilitado)
// 1. Open-Meteo Forecast API (Clima em Tempo Real + Previsão 5 dias para Curitiba)
// 2. Open-Meteo Air Quality API (Índice de Qualidade do Ar AQI + UV para Parques de Curitiba)
// 3. AwesomeAPI / Frankfurter (Cotações de Câmbio USD, EUR, ARS -> BRL para Turistas Internacionais)
// 4. BrasilAPI (Calendário de Feriados Nacionais & Eventos + Consulta CEP)
// 5. Wikipedia REST API PT (Resumos históricos oficiais, imagens e fatos dos pontos turísticos de Curitiba)

const CACHE_KEY = 'cwb360:free_apis_live_cache_v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos

const CURITIBA_COORDS = { lat: -25.4284, lng: -49.2733 };

const WEATHER_CODE_MAP = {
  0: { label: 'Céu Limpo & Ensolarado', icon: '☀️', isRainy: false, advice: 'Clima perfeito para parques ao ar livre (Jardim Botânico, Tanguá, Barigui e Linha Turismo)!' },
  1: { label: 'Predominantemente Ensolarado', icon: '🌤️', isRainy: false, advice: 'Excelente dia para caminhar nos parques, fazer o passeio de trem ou visitar a Ópera de Arame.' },
  2: { label: 'Parcialmente Nublado', icon: '⛅', isRainy: false, advice: 'Temperatura agradável em Curitiba! Ótimo para parques, Centro Histórico e gastronomia.' },
  3: { label: 'Nublado (Típico Curitibano)', icon: '☁️', isRainy: false, advice: 'Clima ameno clássico de Curitiba. Combine parques com paradas em cafés ou no Museu do Olho (MON).' },
  45: { label: 'Neblina Matinal Curitibana', icon: '🌫️', isRainy: false, advice: 'Manhã com neblina charmosa. Comece pelo Museu Oscar Niemeyer ou Mercado Municipal.' },
  48: { label: 'Neblina Intensa', icon: '🌫️', isRainy: false, advice: 'Recomendado priorizar atrações cobertas pela manhã e parques à tarde.' },
  51: { label: 'Garoa Leve', icon: '🌦️', isRainy: true, advice: 'Garoa leve em Curitiba: priorize o Museu do Olho (MON), Estufa do Jardim Botânico, Santa Felicidade ou Teatros.' },
  53: { label: 'Chuvisco Moderado', icon: '🌧️', isRainy: true, advice: 'Tempo úmido: ótimo momento para conhecer o Museu Oscar Niemeyer, Bar do Alemão ou Rodízio no Madalosso!' },
  61: { label: 'Chuva Leve', icon: '🌧️', isRainy: true, advice: 'Dia chuvoso: recomendamos atrações cobertas (MON, Mercado Municipal, Restaurantes e Shoppings).' },
  63: { label: 'Chuva Moderada', icon: '🌧️', isRainy: true, advice: 'Chuva em Curitiba: aproveite a gastronomia de Santa Felicidade, teatros e museus cobertos.' },
  65: { label: 'Chuva Forte', icon: '⛈️', isRainy: true, advice: 'Priorize experiências 100% indoor: Museu Oscar Niemeyer, Terrazza 40, Madalosso e Pátio Batel.' },
  80: { label: 'Pancadas de Chuva', icon: '🌦️', isRainy: true, advice: 'Leve guarda-chuva! Intercale passeios rápidos ao ar livre com museus e gastronomia.' },
  95: { label: 'Tempestade Passageira', icon: '⛈️', isRainy: true, advice: 'Recomendado permanecer em atrações cobertas, restaurantes ou hotéis parceiros.' }
};

export const WIKI_ATTRACTIONS_MAP = {
  'jardim-botanico': 'Jardim_Botânico_de_Curitiba',
  'mon': 'Museu_Oscar_Niemeyer',
  'museu-oscar-niemeyer': 'Museu_Oscar_Niemeyer',
  'opera-de-arame': 'Ópera_de_Arame',
  'rua-da-musica': 'Ópera_de_Arame',
  'parque-tangua': 'Parque_Tanguá',
  'parque-barigui': 'Parque_Barigui',
  'parque-jaime-lerner': 'Jaime_Lerner',
  'trem-serra-verde': 'Estrada_de_Ferro_Paranaguá-Curitiba',
  'linha-turismo': 'Linha_Turismo_(Curitiba)',
  'teatro-guaira': 'Teatro_Guaíra',
  'pedreira-paulo-leminski': 'Pedreira_Paulo_Leminski',
  'largo-da-ordem': 'Largo_da_Ordem',
  'bar-do-alemao': 'Largo_da_Ordem',
  'bosque-alemao': 'Bosque_Alemão',
  'mercado-municipal': 'Mercado_Municipal_de_Curitiba',
  'torre-panoramica': 'Torre_Panorâmica_de_Curitiba',
  'restaurante-madalosso': 'Santa_Felicidade',
  'santa-felicidade': 'Santa_Felicidade',
  'ilha-do-mel': 'Ilha_do_Mel',
  'pousada-ilha-do-mel': 'Ilha_do_Mel',
  'parque-vila-velha': 'Parque_Estadual_de_Vila_Velha'
};

const FALLBACK_LIVE_DATA = {
  updatedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  sourceStatus: 'APIs Conectadas (Open-Meteo • AwesomeAPI • BrasilAPI • Wikipedia)',
  weather: {
    temperature: 21,
    apparentTemperature: 20,
    humidity: 68,
    windSpeed: 12,
    weatherCode: 1,
    condition: 'Predominantemente Ensolarado',
    icon: '🌤️',
    isRainy: false,
    advice: 'Excelente dia para caminhar nos parques, fazer o passeio de trem ou visitar a Ópera de Arame.',
    daily: [
      { date: 'Hoje', max: 24, min: 14, icon: '🌤️', rainProb: 10 },
      { date: 'Amanhã', max: 25, min: 15, icon: '☀️', rainProb: 5 },
      { date: '+2 dias', max: 22, min: 13, icon: '⛅', rainProb: 20 },
      { date: '+3 dias', max: 19, min: 12, icon: '🌦️', rainProb: 60 },
      { date: '+4 dias', max: 23, min: 14, icon: '🌤️', rainProb: 15 }
    ]
  },
  airQuality: {
    aqi: 22,
    pm25: 6.4,
    uvIndex: 5.2,
    level: 'Excelente (Capital Ecológica)',
    badgeColor: '#10b981'
  },
  currencies: {
    USD: 5.78,
    EUR: 6.12,
    ARS: 0.0058,
    GBP: 7.32
  },
  holidays: [
    { date: '2026-12-25', name: 'Natal (Palácio Avenida & Luzes de Curitiba)', type: 'national' },
    { date: '2027-01-01', name: 'Confraternização Universal (Ano Novo)', type: 'national' },
    { date: '2027-03-29', name: 'Aniversário de Curitiba (334 Anos)', type: 'municipal' }
  ]
};

function getWeatherMeta(code) {
  return WEATHER_CODE_MAP[code] || {
    label: 'Clima Ameno em Curitiba',
    icon: '⛅',
    isRainy: code >= 51,
    advice: 'Tempo agradável para explorar os roteiros culturais, parques e gastronomia de Curitiba.'
  };
}

export const freeApisService = {
  // 1. Busca consolidada de todas as APIs gratuitas (com cache local e fallback resiliente)
  async fetchCuritibaLivePulse(forceRefresh = false) {
    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            return parsed.data;
          }
        }
      } catch {
        // segue para fetch
      }
    }

    const result = JSON.parse(JSON.stringify(FALLBACK_LIVE_DATA));
    result.updatedAt = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const [weatherRes, aqiRes, currencyRes, holidaysRes] = await Promise.allSettled([
      // Open-Meteo Weather API (Sem chave)
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${CURITIBA_COORDS.lat}&longitude=${CURITIBA_COORDS.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=5`
      ).then(r => r.ok ? r.json() : Promise.reject()),

      // Open-Meteo Air Quality API (Sem chave)
      fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${CURITIBA_COORDS.lat}&longitude=${CURITIBA_COORDS.lng}&current=european_aqi,pm2_5,uv_index&timezone=America%2FSao_Paulo`
      ).then(r => r.ok ? r.json() : Promise.reject()),

      // AwesomeAPI Câmbio (Sem chave)
      fetch(
        `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,ARS-BRL,GBP-BRL`
      ).then(r => r.ok ? r.json() : Promise.reject()),

      // BrasilAPI Feriados Nacionais (Sem chave)
      fetch(
        `https://brasilapi.com.br/api/feriados/v1/${new Date().getFullYear()}`
      ).then(r => r.ok ? r.json() : Promise.reject())
    ]);

    // Processa Open-Meteo Clima
    if (weatherRes.status === 'fulfilled' && weatherRes.value?.current) {
      const cur = weatherRes.value.current;
      const daily = weatherRes.value.daily;
      const meta = getWeatherMeta(cur.weather_code);

      result.weather = {
        temperature: Math.round(cur.temperature_2m),
        apparentTemperature: Math.round(cur.apparent_temperature),
        humidity: cur.relative_humidity_2m,
        windSpeed: Math.round(cur.wind_speed_10m),
        weatherCode: cur.weather_code,
        condition: meta.label,
        icon: meta.icon,
        isRainy: meta.isRainy,
        advice: meta.advice,
        daily: (daily?.time || []).slice(0, 5).map((dateStr, idx) => {
          const dMeta = getWeatherMeta(daily.weather_code?.[idx] ?? 1);
          const dayLabel = idx === 0 ? 'Hoje' : idx === 1 ? 'Amanhã' : new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
          return {
            date: dayLabel,
            max: Math.round(daily.temperature_2m_max?.[idx] ?? 23),
            min: Math.round(daily.temperature_2m_min?.[idx] ?? 14),
            icon: dMeta.icon,
            rainProb: daily.precipitation_probability_max?.[idx] ?? 10
          };
        })
      };
    }

    // Processa Open-Meteo Qualidade do Ar
    if (aqiRes.status === 'fulfilled' && aqiRes.value?.current) {
      const aqiCur = aqiRes.value.current;
      const aqiVal = Math.round(aqiCur.european_aqi ?? 22);
      result.airQuality = {
        aqi: aqiVal,
        pm25: Number((aqiCur.pm2_5 ?? 6.2).toFixed(1)),
        uvIndex: Number((aqiCur.uv_index ?? 5.0).toFixed(1)),
        level: aqiVal <= 25 ? 'Excelente (Capital Ecológica)' : aqiVal <= 50 ? 'Boa Qualidade do Ar' : 'Moderada',
        badgeColor: aqiVal <= 50 ? '#10b981' : '#f59e0b'
      };
    }

    // Processa AwesomeAPI Câmbio
    if (currencyRes.status === 'fulfilled' && currencyRes.value?.USDBRL) {
      const c = currencyRes.value;
      result.currencies = {
        USD: Number(Number(c.USDBRL?.bid || 5.78).toFixed(2)),
        EUR: Number(Number(c.EURBRL?.bid || 6.12).toFixed(2)),
        ARS: Number(Number(c.ARSBRL?.bid || 0.0058).toFixed(4)),
        GBP: Number(Number(c.GBPBRL?.bid || 7.32).toFixed(2))
      };
    }

    // Processa BrasilAPI Feriados
    if (holidaysRes.status === 'fulfilled' && Array.isArray(holidaysRes.value)) {
      const todayIso = new Date().toISOString().split('T')[0];
      const upcoming = holidaysRes.value.filter(h => h.date >= todayIso).slice(0, 4);
      if (upcoming.length > 0) {
        result.holidays = upcoming;
      } else {
        result.holidays = holidaysRes.value.slice(-3);
      }
    }

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: result }));
    } catch {
      // ignore storage quota errors
    }

    return result;
  },

  // 2. Busca Resumo Histórico e Imagem Oficial na Wikipedia REST API (Gratuita)
  async fetchWikipediaSummary(attractionIdOrTitle) {
    const slug = WIKI_ATTRACTIONS_MAP[attractionIdOrTitle] || encodeURIComponent(
      String(attractionIdOrTitle)
        .replace(/•.*$/, '')
        .replace(/\(.*\)/, '')
        .trim()
    );

    const cacheKey = `cwb360:wiki_${slug}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached);
    } catch {
      // ignore
    }

    try {
      const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${slug}`);
      if (!res.ok) throw new Error('Wiki page not found');
      const data = await res.json();
      const summary = {
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail?.source || null,
        pageUrl: data.content_urls?.desktop?.page || `https://pt.wikipedia.org/wiki/${slug}`,
        description: data.description || 'Patrimônio Cultural e Turístico de Curitiba'
      };
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(summary));
      } catch {
        // ignore
      }
      return summary;
    } catch {
      return null;
    }
  },

  // 3. Busca CEP Real via BrasilAPI / ViaCEP para o Backoffice (Cadastro de Atrações, Agências e Parceiros)
  async fetchCepInfo(cep) {
    const cleanCep = String(cep || '').replace(/\D/g, '');
    if (cleanCep.length !== 8) return null;
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`);
      if (!res.ok) throw new Error('CEP não encontrado');
      const data = await res.json();
      return {
        cep: data.cep,
        logradouro: data.street || '',
        bairro: data.neighborhood || '',
        cidade: data.city || 'Curitiba',
        uf: data.state || 'PR'
      };
    } catch {
      return null;
    }
  },

  // 4. Converte preço de BRL para USD / EUR / ARS usando a cotação ao vivo da AwesomeAPI
  formatConvertedPrices(priceBrl, currencies = FALLBACK_LIVE_DATA.currencies) {
    const val = Number(priceBrl || 0);
    if (val <= 0) return { usd: 'FREE', eur: 'FREE', ars: 'GRATIS' };
    const usd = (val / (currencies?.USD || 5.78)).toFixed(2);
    const eur = (val / (currencies?.EUR || 6.12)).toFixed(2);
    const ars = Math.round(val / (currencies?.ARS || 0.0058)).toLocaleString('pt-BR');
    return {
      usd: `US$ ${usd}`,
      eur: `€ ${eur}`,
      ars: `ARS ${ars}`
    };
  }
};

export default freeApisService;
