import React, { useState } from 'react';
import { Clock, MapPin, Sparkles, Calendar, DollarSign, ChevronRight, CheckCircle2, Info } from 'lucide-react';

const ROTEIROS = [
  {
    id: '1-dia',
    title: 'Curitiba em 1 Dia • O Essencial CWB',
    badge: '⚡ Mais Popular para Visita Rápida',
    daysCount: '1 Dia (24h)',
    costEstimate: 'A partir de R$ 50 (Linha Turismo + Gastronomia)',
    suitableFor: 'Turistas com pouco tempo ou em conexão',
    description: 'Um roteiro dinâmico usando o ônibus Linha Turismo para visitar os 4 maiores cartões-postais de Curitiba em 8 horas.',
    steps: [
      {
        time: '08:30',
        title: 'Jardim Botânico & Estufa de Vidro',
        desc: 'Comece cedo fotografando a estufa em estilo francês antes de encher, caminhe pelas alamedas floridas e visite o Jardim das Sensações.',
        price: 'Gratuito',
        icon: 'Trees'
      },
      {
        time: '11:00',
        title: 'Museu Oscar Niemeyer (MON - Museu do Olho)',
        desc: 'Embarque na Linha Turismo e vá ao Centro Cívico. Contemple a arquitetura audaciosa de Niemeyer e tire fotos no espelho d\'água.',
        price: 'R$ 21,00 (Ingresso)',
        icon: 'Compass'
      },
      {
        time: '13:00',
        title: 'Almoço no Centro Histórico & Bar do Alemão',
        desc: 'Almoce a autêntica Carne de Onça ou o famoso Chopp Submarino nos paralelepípedos do Largo da Ordem.',
        price: 'Média R$ 45,00',
        icon: 'Utensils'
      },
      {
        time: '15:30',
        title: 'Ópera de Arame & Parque das Pedreiras',
        desc: 'Desfrute do Vale da Música flutuante, atravesse a passarela suspensa sobre o lago e veja a cachoeira artificial.',
        price: 'R$ 15,00',
        icon: 'Landmark'
      },
      {
        time: '17:30',
        title: 'Pôr do Sol no Parque Tanguá',
        desc: 'Encerre o dia contemplando o pôr do sol mais espetacular da cidade no mirante do castelo sobre a pedreira.',
        price: 'Gratuito',
        icon: 'Sparkles'
      }
    ]
  },
  {
    id: '3-dias',
    title: 'Curitiba em 3 Dias • Final de Semana Perfeito',
    badge: '🏆 O Mais Recomendado',
    daysCount: '3 Dias / 2 Noites',
    costEstimate: 'A partir de R$ 320 por pessoa',
    suitableFor: 'Casais, famílias e viajantes de final de semana',
    description: 'A combinação ideal entre natureza, patrimônio cultural, passeio de trem pela Serra do Mar e a alta gastronomia paranaense.',
    steps: [
      {
        time: 'DIA 1 - Manhã',
        title: 'Circuito dos Parques & Capivaras',
        desc: 'Jardim Botânico + Parque Barigui para ver as capivaras e passear ao redor do lago.',
        price: 'Gratuito',
        icon: 'Trees'
      },
      {
        time: 'DIA 1 - Tarde & Noite',
        title: 'MON & Jantar Panorâmico no Terrazza 40',
        desc: 'Visita ao Museu do Olho à tarde e jantar inesquecível a 40 andares de altura com vista 360° da cidade.',
        price: 'Reserva prévia necessária',
        icon: 'Sparkles'
      },
      {
        time: 'DIA 2 - Dia Todo',
        title: 'Passeio de Trem Serra Verde Express para Morretes',
        desc: 'Descida histórica de trem pela Mata Atlântica até a cidade colonial de Morretes. Almoço com Barreado típico e retorno de vans turísticas.',
        price: 'A partir de R$ 169,00',
        icon: 'Ticket'
      },
      {
        time: 'DIA 3 - Manhã',
        title: 'Feira do Largo da Ordem & Paço da Liberdade',
        desc: 'Caminhe pela maior feira de artesanato do Sul do Brasil, prove o pierogi polonês e tome um café no Paço da Liberdade Art Nouveau.',
        price: 'Entrada Livre',
        icon: 'Compass'
      },
      {
        time: 'DIA 3 - Tarde',
        title: 'Polo Gastronômico de Santa Felicidade',
        desc: 'Rodízio italiano no Família Madalosso e degustação gratuita de vinhos e queijos nas adegas Durigan.',
        price: 'Média R$ 89,90',
        icon: 'Utensils'
      }
    ]
  },
  {
    id: 'familia',
    title: 'Roteiro Família & Crianças CWB',
    badge: '🎈 Divertido e Lúdico para Todas as Idades',
    daysCount: '2 a 3 Dias',
    costEstimate: 'A partir de R$ 120 por pessoa',
    suitableFor: 'Famílias com crianças e adolescentes',
    description: 'Atrações interativas, trilhas encantadas, brinquedos e parques seguros que garantem diversão total para os pequenos.',
    steps: [
      {
        time: 'Manhã 1',
        title: 'Bosque Alemão & Trilha de João e Maria',
        desc: 'Trilha encantada com azulejos de historinha e visita à Casa da Bruxa com contação de histórias gratuitas.',
        price: 'Gratuito',
        icon: 'Trees'
      },
      {
        time: 'Tarde 1',
        title: 'Passeio Público & Aquário de Curitiba',
        desc: 'Passeio de pedalinho no lago central, visita ao aquário com peixes da bacia paranaense e parquinho infantil.',
        price: 'Gratuito',
        icon: 'Smile'
      },
      {
        time: 'Manhã 2',
        title: 'Parque Barigui & Museu do Automóvel',
        desc: 'Ver o bando de capivaras, alugar bicicletas/patins e conhecer os carros antigos do Museu do Automóvel.',
        price: 'Entrada Gratuita no Parque',
        icon: 'Trees'
      },
      {
        time: 'Tarde 2',
        title: 'Mercado Sal & Espaço Kids',
        desc: 'Vila gastronômica em contêineres com brinquedão monitorado, pizzas artesanais e sorvetes gourmet.',
        price: 'Entrada Livre',
        icon: 'Utensils'
      }
    ]
  },
  {
    id: 'gratuito',
    title: 'Roteiro 100% Gratuito (CWB Sem Gastar)',
    badge: '💚 0 Reais em Ingressos',
    daysCount: '2 Dias',
    costEstimate: 'R$ 0,00 em Entradas',
    suitableFor: 'Estudantes e mochileiros buscando economia inteligente',
    description: 'Descubra por que Curitiba é a capital ecológica com atrações de nível internacional que não cobram um único centavo de entrada.',
    steps: [
      {
        time: 'Parque 1',
        title: 'Jardim Botânico & Jardim das Sensações',
        desc: 'Entrada inteiramente gratuita na estufa, no orquidário e na trilha sensorial tátil.',
        price: 'R$ 0,00',
        icon: 'Trees'
      },
      {
        time: 'Parque 2',
        title: 'Parque Tanguá & Mirante do Pôr do Sol',
        desc: 'Acesso livre ao castelo, passarela suspensa da pedreira e jardins franceses.',
        price: 'R$ 0,00',
        icon: 'Sparkles'
      },
      {
        time: 'Cultura 1',
        title: 'Memorial Ucraniano no Parque Tingui',
        desc: 'Entrada gratuita na igreja de madeira de encaixe e exposição de pêssankas.',
        price: 'R$ 0,00',
        icon: 'Compass'
      },
      {
        time: 'Cultura 2',
        title: 'Bosque Papa João Paulo II (Memorial Polonês)',
        desc: 'Visita gratuita às 7 casas históricas de troncos de madeira de 1880.',
        price: 'R$ 0,00',
        icon: 'Compass'
      },
      {
        time: 'Natureza',
        title: 'Unilivre (Universidade Livre do Meio Ambiente)',
        desc: 'Caminhada gratuita pela torre de eucalipto de 25m e lago azul da pedreira.',
        price: 'R$ 0,00',
        icon: 'Trees'
      }
    ]
  }
];

export default function RoteirosSection({ onClickDetail }) {
  const [selectedRoteiro, setSelectedRoteiro] = useState(ROTEIROS[0]);

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            fontSize: '13px',
            fontWeight: '800',
            padding: '6px 14px',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Calendar size={15} />
            <span>Guias Prontos de Viagem</span>
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginTop: '12px', marginBottom: '8px' }}>
            Roteiros Turísticos Planejados por Tópicos
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>
            Escolha o itinerário perfeito de acordo com a sua disponibilidade de dias e seu estilo de viagem.
          </p>
        </div>

        {/* Roteiro Selection Tabs (Standardized Height: 42px) */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
          {ROTEIROS.map((rot) => {
            const isActive = selectedRoteiro.id === rot.id;

            return (
              <button
                key={rot.id}
                onClick={() => setSelectedRoteiro(rot)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '42px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: isActive ? '800' : '600',
                  backgroundColor: isActive ? '#2563eb' : '#ffffff',
                  color: isActive ? '#ffffff' : '#334155',
                  border: isActive ? '2px solid #2563eb' : '1px solid #cbd5e1',
                  boxShadow: isActive ? '0 4px 14px rgba(37,99,235,0.25)' : '0 2px 4px rgba(0,0,0,0.03)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                <span>{rot.title.split('•')[0]}</span>
                {isActive && <CheckCircle2 size={16} color="#ffffff" />}
              </button>
            );
          })}
        </div>

        {/* Selected Roteiro Full Display */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          
          {/* Header of Active Roteiro */}
          <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '24px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ backgroundColor: '#ffedd5', color: '#c2410c', fontSize: '12px', fontWeight: '800', padding: '4px 10px', borderRadius: '6px', marginRight: '8px' }}>
                  {selectedRoteiro.badge}
                </span>
                <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '10px' }}>
                  {selectedRoteiro.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '15px', marginTop: '6px' }}>
                  {selectedRoteiro.description}
                </p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#00a896" />
                  <span>Duração: <strong>{selectedRoteiro.daysCount}</strong></span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={14} color="#16a34a" />
                  <span>Custo estimado: <strong>{selectedRoteiro.costEstimate}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Step Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {selectedRoteiro.steps.map((step, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  gap: '20px',
                  backgroundColor: '#f8fafc',
                  padding: '20px',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  backgroundColor: '#00a896',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '13px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 6px rgba(0,168,150,0.3)'
                }}>
                  {step.time}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                      {step.title}
                    </h4>
                    <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '9999px' }}>
                      {step.price}
                    </span>
                  </div>
                  <p style={{ color: '#475569', fontSize: '14px', marginTop: '6px', lineHeight: '1.5' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dica da Capivara Footer */}
          <div style={{
            marginTop: '28px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '14px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{ fontSize: '28px' }}>🦫</div>
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: '800', color: '#065f46' }}>
                Dica de Ouro da Capivara CWB:
              </h5>
              <p style={{ fontSize: '13px', color: '#047857', marginTop: '2px' }}>
                Utilize o cartão da <strong>Linha Turismo</strong> (com direito a 5 reembarques) para cumprir todas as paradas sem precisar gastar com táxi ou aplicativo!
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
