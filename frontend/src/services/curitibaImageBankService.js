// frontend/src/services/curitibaImageBankService.js
// Banco de Imagens Gratuito Oficial de Curitiba (Fotos Reais HD + Integração Ao Vivo com Wikimedia Commons Free API - CC BY-SA / Public Domain)

export const CURITIBA_LOCAL_PHOTOS = {
  'jardim-botanico': '/images/jardim-botanico.jpg',
  'mon': '/images/mon-olho.jpg',
  'museu-oscar-niemeyer': '/images/mon-olho.jpg',
  'opera-de-arame': '/images/opera-de-arame.jpg',
  'rua-da-musica': '/images/rua-da-musica.jpg',
  'parque-tangua': '/images/parque-tangua.jpg',
  'tangua': '/images/parque-tangua.jpg',
  'parque-barigui': '/images/parque-barigui.jpg',
  'barigui': '/images/parque-barigui.jpg',
  'parque-jaime-lerner': '/parque_jaime_lerner.jpg',
  'largo-da-ordem': '/images/largo-da-ordem.jpg',
  'feira-largo-ordem': '/images/largo-da-ordem.jpg',
  'centro-historico': '/centro_historico.jpg',
  'trem-serra-verde': '/images/trem-serra-verde.jpg',
  'torre-panoramica': '/images/torre-panoramica.jpg',
  'bosque-alemao': '/images/bosque-alemao.jpg',
  'bosque-papa': '/images/bosque-papa.jpg',
  'praca-do-japao': '/images/praca-do-japao.jpg',
  'santa-felicidade': '/images/santa-felicidade.jpg',
  'restaurante-madalosso': '/images/santa-felicidade.jpg',
  'mercado-municipal': '/images/mercado-municipal.jpg',
  'pedreira-paulo-leminski': '/images/pedreira-paulo-leminski.jpg',
  'pedreira-shows': '/images/pedreira-paulo-leminski.jpg',
  'teatro-guaira': '/images/teatro-guaira.jpg',
  'praca-santos-andrade': '/images/praca-santos-andrade.jpg',
  'passeio-publico': '/images/passeio-publico.jpg',
  'linha-turismo': '/images/linha-turismo.jpg',
  'caminho-do-vinho': '/images/caminho-do-vinho.jpg',
  'pousada-caminho-do-vinho': '/images/caminho-do-vinho.jpg',
  'bar-do-alemao': '/images/bar-do-alemao.jpg',
  'porks-porco-chope': '/images/bar-do-alemao.jpg',
  'restaurante-terrazza40': '/images/torre-panoramica.jpg',
  'tour-vila-velha': '/images/vila-velha.jpg',
  'vila-velha': '/images/vila-velha.jpg',
  'excursao-ilha-do-mel': '/images/trem-serra-verde.jpg',
  'pousada-ilha-do-mel': '/images/trem-serra-verde.jpg',
  'tour-lapa-historica': '/images/largo-da-ordem.jpg',
  'festival-teatro-cwb': '/images/teatro-guaira.jpg',
  'transfer-aeroporto-afonso-pena': '/images/linha-turismo.jpg',
  'radisson-hotel-curitiba': '/images/praca-do-japao.jpg',
  'nomaa-hotel-boutique': '/images/jardim-botanico.jpg',
  'bourbon-curitiba-hotel': '/images/largo-da-ordem.jpg',
  'rayon-hotel-curitiba': '/images/praca-santos-andrade.jpg'
};

export const CURITIBA_FREE_IMAGE_BANK = [
  {
    id: 'cwb-photo-01',
    title: 'Estufa do Jardim Botânico de Curitiba',
    subtitle: 'Palácio de Cristal & Jardins Franceses',
    category: 'Parques & Natureza',
    neighborhood: 'Jardim Botânico',
    image: '/images/jardim-botanico.jpg',
    license: 'Wikimedia Commons / Domínio Público CWB',
    wikiSearch: 'Jardim Botânico de Curitiba'
  },
  {
    id: 'cwb-photo-02',
    title: 'Museu Oscar Niemeyer (Museu do Olho)',
    subtitle: 'Ícone da Arquitetura Modernista no Centro Cívico',
    category: 'Cultura & Arquitetura',
    neighborhood: 'Centro Cívico',
    image: '/images/mon-olho.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Museu Oscar Niemeyer'
  },
  {
    id: 'cwb-photo-03',
    title: 'Ópera de Arame & Lago da Pedreira',
    subtitle: 'Teatro Tubular Transparente em Meio à Mata Atlântica',
    category: 'Teatros & Cultura',
    neighborhood: 'Abranches / Pilarzinho',
    image: '/images/opera-de-arame.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Ópera de Arame Curitiba'
  },
  {
    id: 'cwb-photo-04',
    title: 'Parque Tanguá & Mirante do Pôr do Sol',
    subtitle: 'Espelho d’Água, Castelo Mirante e Cascata de 65m',
    category: 'Parques & Natureza',
    neighborhood: 'Taboão / Pilarzinho',
    image: '/images/parque-tangua.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Parque Tanguá Curitiba'
  },
  {
    id: 'cwb-photo-05',
    title: 'Parque Barigui & Recanto das Capivaras',
    subtitle: 'Lago Central, Capivaras e Skyline do Bigorrilho',
    category: 'Parques & Natureza',
    neighborhood: 'Bigorrilho',
    image: '/images/parque-barigui.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Parque Barigui Curitiba'
  },
  {
    id: 'cwb-photo-06',
    title: 'Rua da Música & Vale da Música Flutuante',
    subtitle: 'Palco Flutuante de Jazz e MPB no Parque Jaime Lerner',
    category: 'Shows & Música',
    neighborhood: 'Parque das Pedreiras',
    image: '/images/rua-da-musica.jpg',
    license: 'Acervo Livre Curitiba 360°',
    wikiSearch: 'Parque das Pedreiras Curitiba'
  },
  {
    id: 'cwb-photo-07',
    title: 'Centro Histórico & Largo da Ordem',
    subtitle: 'Casarões Coloniais do Século XVIII e Relógio das Flores',
    category: 'História & Patrimônio',
    neighborhood: 'São Francisco / Centro Histórico',
    image: '/images/largo-da-ordem.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Largo da Ordem Curitiba'
  },
  {
    id: 'cwb-photo-08',
    title: 'Trem Serra Verde Express na Serra do Mar',
    subtitle: 'Ponte São João e Viaduto do Carvalho rumo a Morretes',
    category: 'Tours & Ferrovia',
    neighborhood: 'Serra do Mar Paranaense',
    image: '/images/trem-serra-verde.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Estrada de Ferro Paranaguá Curitiba'
  },
  {
    id: 'cwb-photo-09',
    title: 'Torre Panorâmica de Curitiba (109m)',
    subtitle: 'Mirante 360° para todo o Skyline Planejado da Capital',
    category: 'Skyline & Mirantes',
    neighborhood: 'Mercês',
    image: '/images/torre-panoramica.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Torre Panorâmica de Curitiba'
  },
  {
    id: 'cwb-photo-10',
    title: 'Bosque Alemão & Oratório de Bach',
    subtitle: 'Torre dos Filósofos e Trilha de João e Maria',
    category: 'Parques & Cultura',
    neighborhood: 'Vista Alegre',
    image: '/images/bosque-alemao.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Bosque Alemão Curitiba'
  },
  {
    id: 'cwb-photo-11',
    title: 'Bosque Papa João Paulo II (Memorial Polonês)',
    subtitle: 'Casas Históricas de Troncos de Pinheiro dos Imigrantes',
    category: 'Parques & Cultura',
    neighborhood: 'Centro Cívico',
    image: '/images/bosque-papa.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Bosque do Papa Curitiba'
  },
  {
    id: 'cwb-photo-12',
    title: 'Praça do Japão & Cerejeiras em Flor',
    subtitle: 'Templo Oriental, Lagos de Carpas e 300 Cerejeiras',
    category: 'Praças & Jardins',
    neighborhood: 'Batel / Água Verde',
    image: '/images/praca-do-japao.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Praça do Japão Curitiba'
  },
  {
    id: 'cwb-photo-13',
    title: 'Portal Italiano de Santa Felicidade',
    subtitle: 'Polo Gastronômico Italiano & Vinícolas Artesanais',
    category: 'Gastronomia',
    neighborhood: 'Santa Felicidade',
    image: '/images/santa-felicidade.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Santa Felicidade Curitiba'
  },
  {
    id: 'cwb-photo-14',
    title: 'Mercado Municipal de Curitiba (1958)',
    subtitle: 'Setor de Orgânicos, Especiarias e Praça Gastronômica',
    category: 'Gastronomia',
    neighborhood: 'Centro',
    image: '/images/mercado-municipal.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Mercado Municipal de Curitiba'
  },
  {
    id: 'cwb-photo-15',
    title: 'Pedreira Paulo Leminski',
    subtitle: 'Maior Arena de Shows ao Ar Livre da América Latina',
    category: 'Shows & Eventos',
    neighborhood: 'Abranches',
    image: '/images/pedreira-paulo-leminski.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Pedreira Paulo Leminski'
  },
  {
    id: 'cwb-photo-16',
    title: 'Teatro Guaíra & Praça Santos Andrade',
    subtitle: 'Complexo Sinfônico e Prédio Histórico da UFPR',
    category: 'Teatros & Cultura',
    neighborhood: 'Centro',
    image: '/images/teatro-guaira.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Teatro Guaíra Curitiba'
  },
  {
    id: 'cwb-photo-17',
    title: 'Prédio Histórico da UFPR — Praça Santos Andrade',
    subtitle: 'Colunas Neoclássicas da Primeira Universidade do Brasil',
    category: 'História & Patrimônio',
    neighborhood: 'Centro',
    image: '/images/praca-santos-andrade.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Praça Santos Andrade Curitiba'
  },
  {
    id: 'cwb-photo-18',
    title: 'Passeio Público de Curitiba (1886)',
    subtitle: 'Primeiro Parque Urbano e Portal Histórico do Século XIX',
    category: 'Parques & História',
    neighborhood: 'Centro',
    image: '/images/passeio-publico.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Passeio Público Curitiba'
  },
  {
    id: 'cwb-photo-19',
    title: 'Ônibus Double-Decker Linha Turismo Curitiba',
    subtitle: 'Circuito Panorâmico pelos 26 Cartões-Postais',
    category: 'Tours & Mobilidade',
    neighborhood: 'Praça Tiradentes / Circuito 360°',
    image: '/images/linha-turismo.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Linha Turismo Curitiba'
  },
  {
    id: 'cwb-photo-20',
    title: 'Bar do Alemão no Largo da Ordem',
    subtitle: 'Tradição Boêmia, Chopp Submarino e Carne de Onça',
    category: 'Bares & Gastronomia',
    neighborhood: 'Largo da Ordem',
    image: '/images/bar-do-alemao.jpg',
    license: 'Acervo Livre Curitiba 360°',
    wikiSearch: 'Largo da Ordem Curitiba'
  },
  {
    id: 'cwb-photo-21',
    title: 'Caminho do Vinho — São José dos Pinhais (RMC)',
    subtitle: 'Vinícolas Coloniais e Casarões Rurais da Região Metropolitana',
    category: 'Região Metropolitana',
    neighborhood: 'São José dos Pinhais',
    image: '/images/caminho-do-vinho.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Caminho do Vinho São José dos Pinhais'
  },
  {
    id: 'cwb-photo-22',
    title: 'Arenitos do Parque Estadual de Vila Velha',
    subtitle: 'Esculturas Naturais Milenares e Furnas nos Campos Gerais',
    category: 'Região Metropolitana',
    neighborhood: 'Ponta Grossa / Campos Gerais',
    image: '/images/vila-velha.jpg',
    license: 'Wikimedia Commons CC BY-SA',
    wikiSearch: 'Parque Estadual de Vila Velha'
  }
];

export const curitibaImageBankService = {
  getPhotoForAttraction(idOrTitle) {
    if (!idOrTitle) return '/images/jardim-botanico.jpg';
    const key = String(idOrTitle).toLowerCase().trim();
    if (CURITIBA_LOCAL_PHOTOS[key]) return CURITIBA_LOCAL_PHOTOS[key];

    if (key.includes('botânico') || key.includes('botanico')) return '/images/jardim-botanico.jpg';
    if (key.includes('niemeyer') || key.includes('mon') || key.includes('olho')) return '/images/mon-olho.jpg';
    if (key.includes('ópera') || key.includes('opera')) return '/images/opera-de-arame.jpg';
    if (key.includes('música') || key.includes('musica') || key.includes('jaime lerner')) return '/images/rua-da-musica.jpg';
    if (key.includes('tanguá') || key.includes('tangua')) return '/images/parque-tangua.jpg';
    if (key.includes('barigui') || key.includes('capivara')) return '/images/parque-barigui.jpg';
    if (key.includes('largo') || key.includes('ordem') || key.includes('histórico')) return '/images/largo-da-ordem.jpg';
    if (key.includes('trem') || key.includes('serra verde') || key.includes('morretes')) return '/images/trem-serra-verde.jpg';
    if (key.includes('torre') || key.includes('terrazza')) return '/images/torre-panoramica.jpg';
    if (key.includes('alemão') && key.includes('bosque')) return '/images/bosque-alemao.jpg';
    if (key.includes('alemão') || key.includes('porks') || key.includes('chopp')) return '/images/bar-do-alemao.jpg';
    if (key.includes('japão') || key.includes('japao') || key.includes('radisson')) return '/images/praca-do-japao.jpg';
    if (key.includes('santa felicidade') || key.includes('madalosso')) return '/images/santa-felicidade.jpg';
    if (key.includes('mercado')) return '/images/mercado-municipal.jpg';
    if (key.includes('pedreira') || key.includes('leminski')) return '/images/pedreira-paulo-leminski.jpg';
    if (key.includes('guaíra') || key.includes('guaira') || key.includes('teatro')) return '/images/teatro-guaira.jpg';
    if (key.includes('passeio público') || key.includes('passeio publico')) return '/images/passeio-publico.jpg';
    if (key.includes('linha turismo') || key.includes('ônibus') || key.includes('transfer')) return '/images/linha-turismo.jpg';
    if (key.includes('vinho')) return '/images/caminho-do-vinho.jpg';
    if (key.includes('vila velha')) return '/images/vila-velha.jpg';
    return '/images/jardim-botanico.jpg';
  },

  // Busca fotos reais adicionais de Curitiba ao vivo na API gratuita do Wikimedia Commons (100% Free, sem chave, CORS liberado)
  async searchWikimediaCuritibaPhotos(searchTerm = 'Curitiba') {
    const query = searchTerm.toLowerCase().includes('curitiba') || searchTerm.toLowerCase().includes('morretes') || searchTerm.toLowerCase().includes('vila velha')
      ? searchTerm
      : `${searchTerm} Curitiba`;

    const cacheKey = `cwb360:wikimedia_photos_${encodeURIComponent(query)}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached);
    } catch {
      // ignore
    }

    try {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap%20${encodeURIComponent(query)}&gsrlimit=12&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900&format=json&origin=*`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Wikimedia API error');
      const data = await res.json();
      const pages = Object.values(data?.query?.pages || {});

      const photos = pages
        .filter((p) => p.imageinfo && p.imageinfo[0]?.thumburl)
        .map((p, idx) => {
          const info = p.imageinfo[0];
          const cleanTitle = String(p.title || '')
            .replace(/^File:/i, '')
            .replace(/\.(jpg|jpeg|png|webp)$/i, '')
            .replace(/_/g, ' ');
          return {
            id: `wiki-${p.pageid || idx}`,
            title: cleanTitle,
            subtitle: info.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, '') || 'Acervo Wikimedia Commons Curitiba',
            category: 'Wikimedia Commons Live',
            neighborhood: 'Curitiba & Região',
            image: info.thumburl || info.url,
            fullUrl: info.descriptionurl || info.url,
            license: info.extmetadata?.LicenseShortName?.value || 'Creative Commons'
          };
        });

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(photos));
      } catch {
        // ignore
      }
      return photos;
    } catch {
      return [];
    }
  }
};

export default curitibaImageBankService;
