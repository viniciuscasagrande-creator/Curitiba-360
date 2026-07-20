// src/pages/portal/PortalInstitucional.jsx
import { useState } from 'react';
import Input from '../../components/ui/Input';

export default function PortalInstitucional() {
  const [section, setSection] = useState('faq'); // faq, sobre, termos, privacidade
  const [faqSearch, setFaqSearch] = useState('');

  const faqs = [
    {
      q: 'Como funciona a Linha Turismo de Curitiba?',
      a: 'A Linha Turismo é um serviço de ônibus especial que passa por 26 pontos turísticos de Curitiba. O passageiro adquire o voucher digital e pode embarcar/desembarcar ilimitadamente durante o período contratado (geralmente 24 horas).'
    },
    {
      q: 'Como solicito o reembolso de um ingresso?',
      a: 'Você pode solicitar o reembolso diretamente no painel "Meus Ingressos" na Área do Turista. Cancelamentos realizados dentro das primeiras 24 horas após a compra são estornados de forma automática. Solicitações posteriores passam por análise comercial.'
    },
    {
      q: 'Posso transferir meu ingresso para outra pessoa?',
      a: 'Sim, a transferência é feita na sua Área do Turista preenchendo o nome e CPF do destinatário. Para combater a ação de cambistas, há um limite de até 2 transferências por voucher.'
    },
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: 'Aceitamos cartões de crédito (principais bandeiras com opção de salvar os dados com segurança), PIX com QR code dinâmico imediato e Google Pay.'
    },
    {
      q: 'O que é o Curitiba 360?',
      a: 'É a plataforma oficial de integração turística, conectando a Prefeitura Municipal, hotéis credenciados, bares, restaurantes e atrativos culturais para oferecer uma experiência digital integrada e descontos exclusivos aos turistas.'
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'left',
      color: '#f8fafc',
      fontFamily: '"Outfit", "Inter", sans-serif',
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>
      {/* Menu Gaveta Lateral */}
      <div style={{
        flex: 0.6,
        minWidth: '180px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        height: 'fit-content'
      }}>
        <button
          onClick={() => setSection('faq')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: section === 'faq' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          ❓ FAQ / Dúvidas
        </button>
        <button
          onClick={() => setSection('sobre')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: section === 'sobre' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          ℹ️ Sobre o Curitiba 360
        </button>
        <button
          onClick={() => setSection('termos')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: section === 'termos' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          📄 Condições de Uso
        </button>
        <button
          onClick={() => setSection('privacidade')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: section === 'privacidade' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          🛡️ Política de Privacidade
        </button>
      </div>

      {/* Área Principal de Conteúdo */}
      <div style={{
        flex: 2,
        minWidth: '320px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '2rem',
        boxSizing: 'border-box'
      }}>
        
        {/* FAQ (PP-17) */}
        {section === 'faq' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Perguntas Frequentes (FAQ) ❓
            </h3>
            
            {/* FAQ Search Bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Input
                type="text"
                placeholder="Busque por palavras-chave (ex: reembolso, pix)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10b981', margin: '0 0 0.5rem 0' }}>
                      Q: {faq.q}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
                      A: {faq.a}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
                  Nenhuma dúvida correspondente à sua busca.
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOBRE NÓS (PP-17) */}
        {section === 'sobre' && (
          <div style={{ lineHeight: '1.6', color: '#cbd5e1', fontSize: '0.925rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1.25rem' }}>
              Sobre o Projeto Curitiba 360 🌲
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              O <strong>Curitiba 360</strong> é uma iniciativa tecnológica voltada para o fomento do turismo inteligente, inovação urbana e integração cultural da cidade de Curitiba.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Nascida a partir das diretrizes de sustentabilidade e mobilidade da capital ecológica do Brasil, a plataforma unifica os canais físicos e digitais em um ecossistema integrado:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Hotéis:</strong> Cartões de estadia com QR Code para atalhos de boas-vindas.</li>
              <li><strong>Restaurantes & Bares:</strong> Acesso a cardápios e promoções locais.</li>
              <li><strong>Pontos Turísticos:</strong> Roteirização dinâmica e informações em múltiplos idiomas.</li>
              <li><strong>Prefeitura:</strong> Métricas em tempo real para planejamento urbano e de eventos.</li>
            </ul>
          </div>
        )}

        {/* TERMOS DE USO (PP-17) */}
        {section === 'termos' && (
          <div style={{ lineHeight: '1.6', color: '#cbd5e1', fontSize: '0.875rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1.25rem' }}>
              Condições de Uso do Portal 📄
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              <strong>1. Aceitação dos Termos:</strong> Ao utilizar os serviços do Curitiba 360, o usuário concorda integralmente com as presentes regras e condições comerciais.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>2. Uso do Voucher:</strong> Os ingressos adquiridos pela plataforma são digitais, intransferíveis após os limites anti-cambistas (2 transferências) e válidos mediante apresentação do QR Code nos validadores físicos.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>3. Limites Anti-Cambista:</strong> Fica expressamente vedada a revenda lucrativa de cupons e ingressos. O sistema bloqueia automaticamente transferências recorrentes para o mesmo CPF.
            </p>
          </div>
        )}

        {/* POLÍTICA DE PRIVACIDADE (PP-17) */}
        {section === 'privacidade' && (
          <div style={{ lineHeight: '1.6', color: '#cbd5e1', fontSize: '0.875rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1.25rem' }}>
              Política de Privacidade e Cookies (LGPD) 🛡️
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              <strong>1. Coleta de Dados:</strong> O Curitiba 360 coleta dados de nome, e-mail, celular, CPF e geolocalização com a finalidade exclusiva de operacionalizar a emissão de vouchers e compilar relatórios consolidados para a prefeitura e hotéis parceiros.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>2. Compartilhamento:</strong> Seus dados pessoais sensíveis não são compartilhados com terceiros não autorizados. Os relatórios analíticos disponibilizados a hotéis e restaurantes parceiros são anonimizados.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>3. Consentimento de Cookies:</strong> Em conformidade com a LGPD, o usuário detém total controle sobre a aceitação de cookies de rastreamento, podendo reconfigurar suas preferências a qualquer momento no banner.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
