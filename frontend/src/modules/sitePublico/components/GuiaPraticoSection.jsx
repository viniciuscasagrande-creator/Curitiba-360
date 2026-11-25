import React from 'react';
import { Bus, CloudRain, Utensils, Smile, ShoppingBag, MapPin, ShieldCheck, HelpCircle, CheckCircle } from 'lucide-react';

export default function GuiaPraticoSection() {
  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Title & Introduction */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
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
            <HelpCircle size={15} />
            <span>Tudo Sobre a Cidade</span>
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginTop: '12px', marginBottom: '8px' }}>
            Guia Prático do Turista em Curitiba 360°
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '750px', margin: '0 auto' }}>
            Informações indispensáveis sobre transporte nos ônibus tubo, o clima das 4 estações no mesmo dia, gastronomia típica e dicas locais.
          </p>
        </div>

        {/* 4 Essential Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          {/* Card 1: Linha Turismo */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Bus size={26} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              Linha Turismo (Double-Decker)
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '14px' }}>
              O ônibus panorâmico de dois andares percorre 26 pontos turísticos de Curitiba. O bilhete custa R$ 50,00 e dá direito a 5 reembarques livres durante 24 horas.
            </p>
            <div style={{ fontSize: '12px', color: '#00a896', fontWeight: '700' }}>
              ✓ Saídas a cada 30 min da Praça Tiradentes
            </div>
          </div>

          {/* Card 2: Clima */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <CloudRain size={26} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              O Clima em Curitiba
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '14px' }}>
              Famosa por ter "4 estações no mesmo dia"! Manhãs frescas, tardes ensolaradas e noites frias. Tenha sempre um casaco e um guarda-chuva pequeno na mochila.
            </p>
            <div style={{ fontSize: '12px', color: '#d97706', fontWeight: '700' }}>
              ✓ Dica: Vista-se em camadas ("cebola")
            </div>
          </div>

          {/* Card 3: Gastronomia Típica */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#ffedd5',
              color: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Utensils size={26} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              Pratos Típicos Que Você Deve Provar
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '14px' }}>
              <strong>Barreado</strong> (carne cozida desfiada servida com farinha e banana), <strong>Carne de Onça</strong> (patrimônio imaterial), <strong>Pinhão</strong> cozido e <strong>Pierogi polonês</strong>.
            </p>
            <div style={{ fontSize: '12px', color: '#ea580c', fontWeight: '700' }}>
              ✓ Sabores únicos da cultura paranaense
            </div>
          </div>

          {/* Card 4: Capivara Mascote */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '24px'
            }}>
              🦫
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              A Mascote Capivara & Souvenirs
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '14px' }}>
              As capivaras dos parques (especialmente Barigui e Tingui) são o maior símbolo afetuoso da cidade! Garanta pelúcias, camisetas e chaveiros nas lojas dos parques.
            </p>
            <div style={{ fontSize: '12px', color: '#059669', fontWeight: '700' }}>
              ✓ Respeite a fauna mantendo distância segura
            </div>
          </div>

        </div>

        {/* Detailed Breakdown: As 26 Paradas da Linha Turismo */}
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#00a896', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={24} />
            <span>Circuito Oficial das 26 Paradas da Linha Turismo</span>
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px' }}>
            O trajeto completo dura cerca de 3 horas sem desembarcar, passando pelos seguintes pontos estratégicos:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '12px',
            fontSize: '13px'
          }}>
            {[
              "1. Praça Tiradentes (Inicial)",
              "2. Rua das Flores / Bonde",
              "3. Rua 24 Horas",
              "4. Museu Ferroviário",
              "5. Teatro Paiol",
              "6. Jardim Botânico",
              "7. Mercado Municipal",
              "8. Teatro Guaíra / UFPR",
              "9. Paço da Liberdade",
              "10. Passeio Público",
              "11. Centro Cívico",
              "12. Museu Oscar Niemeyer (MON)",
              "13. Bosque Papa João Paulo II",
              "14. Bosque Alemão",
              "15. Universidade Livre (Unilivre)",
              "16. Parque São Lourenço",
              "17. Ópera de Arame",
              "18. Parque Tanguá",
              "19. Parque Tingui",
              "20. Memorial Ucraniano",
              "21. Memorial Italiano",
              "22. Santa Felicidade",
              "23. Parque Barigui",
              "24. Torre Panorâmica",
              "25. Praça da Espanha",
              "26. Praça do Japão"
            ].map((stop, i) => (
              <div key={i} style={{ backgroundColor: '#1e293b', padding: '10px 14px', borderRadius: '8px', border: '1px solid #334155', color: '#cbd5e1' }}>
                {stop}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
