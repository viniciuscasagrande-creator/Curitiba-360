import React from 'react';
import { Trees, Compass, Ticket, Utensils, Sparkles, Music, Drama, Calendar, Beer, Hotel, MapPin, CheckCircle2 } from 'lucide-react';

const TOPIC_DETAILS = {
  parques: {
    title: "Parques, Bosques & Recanto das Capivaras",
    subtitle: "Curitiba é a Capital Ecológica do Brasil com mais de 50 m² de área verde por habitante!",
    bgGradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    icon: Trees,
    stats: [
      { label: "Área Verde Total", val: "+30 Parques & Bosques" },
      { label: "Fauna Ícone", val: "Capivaras & Araucárias" },
      { label: "Entrada Média", val: "100% Gratuita na Maioria" }
    ]
  },
  cultura: {
    title: "Cultura, Museus & Patrimônio Histórico",
    subtitle: "Arquitetura arrojada de Oscar Niemeyer, Ópera de Arame e memórias dos imigrantes étnicos.",
    bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
    icon: Compass,
    stats: [
      { label: "Museus & Teatros", val: "+20 Espaços Culturais" },
      { label: "Monumento IPHAN", val: "Paço da Liberdade" },
      { label: "Maior Feira ao Ar Livre", val: "Feira do Largo da Ordem" }
    ]
  },
  shows: {
    title: "Shows & Concertos ao Vivo",
    subtitle: "Do palco da Pedreira Paulo Leminski ao Vale da Música e Hard Rock Cafe.",
    bgGradient: "linear-gradient(135deg, #831843 0%, #be185d 100%)",
    icon: Music,
    stats: [
      { label: "Maior Palco a Céu Aberto", val: "Pedreira Paulo Leminski" },
      { label: "Palco Flutuante", val: "Vale da Música na Ópera" },
      { label: "Shows Diários", val: "Hard Rock Cafe Batel" }
    ]
  },
  teatros: {
    title: "Teatros & Espetáculos das Artes Cênicas",
    subtitle: "Guaíra, Paiol, Ópera de Arame e salas históricas da capital paranaense.",
    bgGradient: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
    icon: Drama,
    stats: [
      { label: "Maior Auditório", val: "Guairão (2.173 lugares)" },
      { label: "Teatro Arena Histórico", val: "Teatro Paiol de 1906" },
      { label: "Estrutura Tubular", val: "Ópera de Arame" }
    ]
  },
  eventos: {
    title: "Eventos, Festivais & Grandes Espetáculos",
    subtitle: "Festival de Teatro de Curitiba, Natal no Palácio Avenida e feiras sazonais.",
    bgGradient: "linear-gradient(135deg, #065f46 0%, #059669 100%)",
    icon: Calendar,
    stats: [
      { label: "Maior Festival", val: "Festival de Teatro de CWB" },
      { label: "Espetáculo de Natal", val: "Palácio Avenida (Rua XV)" },
      { label: "Feiras Especiais", val: "Praça Osório & Largo" }
    ]
  },
  bares: {
    title: "Bares, Choperias & Pubs de Curitiba e RMC",
    subtitle: "Do lendário Chopp Submarino do Bar do Alemão ao torresmo de rolo do Porks e os pubs do Água Verde.",
    bgGradient: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
    icon: Beer,
    stats: [
      { label: "Botequim Histórico", val: "Bar do Alemão de 1979" },
      { label: "Patrimônio Gastronômico", val: "Carne de Onça na Mesa" },
      { label: "Torneiras de Chopp", val: "+30 no We Are Bastards" }
    ]
  },
  hoteis: {
    title: "Hotéis, Pousadas & Hospedagens em Curitiba e RMC",
    subtitle: "Hospede-se nos hotéis 5 estrelas do Batel, pousadas pé na areia na Ilha do Mel ou refúgios no Caminho do Vinho.",
    bgGradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    icon: Hotel,
    stats: [
      { label: "Localização Nobre", val: "Praça da Espanha & Batel" },
      { label: "Praia & Natureza", val: "Pousadas Ilha do Mel" },
      { label: "Polo Enoturístico", val: "Chalés no Caminho do Vinho" }
    ]
  },
  tours: {
    title: "Tours, Serra Verde Express & Linha Turismo",
    subtitle: "As melhores maneiras de explorar a capital e a espetacular travessia da Serra do Mar Paranaense.",
    bgGradient: "linear-gradient(135deg, #0f172a 0%, #0284c7 100%)",
    icon: Ticket,
    stats: [
      { label: "Pontes & Viadutos", val: "Ferrovia Centenária" },
      { label: "Circuito Urbano", val: "26 Paradas Linha Turismo" },
      { label: "Reembarques Libres", val: "5 Embarques no Bilhete" }
    ]
  },
  gastronomia: {
    title: "Polo Italiano, Sabores Típicos & Cerveja Artesanal",
    subtitle: "Do rodízio no maior restaurante das Américas ao tradicional Barreado na panela de barro.",
    bgGradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    icon: Utensils,
    stats: [
      { label: "Polo Gastronômico", val: "Santa Felicidade" },
      { label: "Prato Tombado", val: "Carne de Onça & Barreado" },
      { label: "Mercado Icônico", val: "Mercado Municipal de 1958" }
    ]
  }
};

export default function TopicBanner({ topicId }) {
  const details = TOPIC_DETAILS[topicId];
  if (!details) return null;

  const IconComp = details.icon || Sparkles;

  return (
    <div style={{
      background: details.bgGradient,
      color: '#ffffff',
      padding: '36px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '9999px', width: 'fit-content', marginBottom: '12px', fontSize: '13px', fontWeight: '700' }}>
            <IconComp size={16} />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tópico Turístico Especial</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', lineHeight: '1.2', marginBottom: '8px' }}>
            {details.title}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', maxWidth: '700px' }}>
            {details.subtitle}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {details.stats.map((st, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '12px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
                {st.label}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', marginTop: '2px', color: '#ffffff' }}>
                {st.val}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
