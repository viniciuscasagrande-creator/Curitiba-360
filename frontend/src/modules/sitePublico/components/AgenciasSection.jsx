import React from 'react';
import { Building2, MapPin, Bus, ShieldCheck, PhoneCall, Award, Users, ArrowRight, DollarSign, Calendar, Clock, Sparkles } from 'lucide-react';
import AttractionCard from './AttractionCard';

export default function AgenciasSection({ attractions, onClickDetail, onOpenQuote }) {
  // Filter attractions belonging to agencias / RMC
  const agenciaAttractions = attractions.filter(a => a.category === 'agencias' || a.topic === 'agencias' || a.id === 'trem-serra-verde');

  return (
    <div style={{ backgroundColor: '#f8fafc', paddingBottom: '64px' }}>
      
      {/* Top Banner: Agências & Receptivo RMC */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        padding: '48px 20px',
        borderBottom: '1px solid #334155',
        boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          
          <div style={{ flex: 1, minWidth: '320px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,168,150,0.2)', color: '#00a896', padding: '6px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: '700', marginBottom: '16px', border: '1px solid rgba(0,168,150,0.4)' }}>
              <Building2 size={16} />
              <span>RECEPTIVO & TURISMO NA REGIÃO METROPOLITANA</span>
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '12px' }}>
              Agências de Turismo em Curitiba & RMC
            </h1>

            <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '720px', lineHeight: '1.6', marginBottom: '24px' }}>
              Pacotes de viagens receptivas, passeios em vans executivas pela Região Metropolitana, transfers do Aeroporto Afonso Pena (CWB) e guias credenciados pelo CADASTUR.
            </p>

            {/* Quick CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <button
                onClick={() => onOpenQuote('passeio')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '46px',
                  padding: '0 24px',
                  borderRadius: '12px',
                  backgroundColor: '#00a896',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,168,150,0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Solicitar Cotação de Passeio</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onOpenQuote('transfer')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '46px',
                  padding: '0 24px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Bus size={16} color="#00a896" />
                <span>Transfer Aeroporto CWB (Afonso Pena)</span>
              </button>
            </div>
          </div>

          {/* Stats Box */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '24px',
            minWidth: '280px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Award size={24} color="#f59e0b" />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>Garantia Cadastur</h4>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Ministério do Turismo</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#10b981" />
                <span>100% de Agências Credenciadas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="#3b82f6" />
                <span>Guias Regionais & Bilíngues</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={16} color="#f59e0b" />
                <span>Suporte 24h para Passageiros</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Agency Packages in Metropolitan Region */}
      <div style={{ maxWidth: '1280px', margin: '48px auto 0', padding: '0 20px' }}>
        
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
            Pacotes de Agência & Excursões na Região Metropolitana
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b' }}>
            Conheça as melhores opções de passeios bate-e-volta saindo de Curitiba para o Caminho do Vinho, Ilha do Mel, Vila Velha e Lapa Histórica.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {agenciaAttractions.map((item) => (
            <AttractionCard key={item.id} attraction={item} onClickDetail={onClickDetail} />
          ))}
        </div>

        {/* Receptivo & B2B Travel Agent Banner */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          lgGridTemplateColumns: '1fr 340px',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '12px', fontWeight: '800', padding: '4px 12px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              PORTAL DO AGENTE DE VIAGENS & CORPORATIVO
            </span>
            <h3 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', marginTop: '10px', marginBottom: '10px' }}>
              É Agente de Viagens de Outro Estado ou Empresa?
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
              Cadastre sua agência emissora no portal Curitiba 360° para ter acesso a tarifas tarifários B2B comissionadas, faturamento faturado para empresas e assistência receptiva dedicada aos seus clientes em Curitiba.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#334155', fontWeight: '600' }}>
              <div>✓ Comissionamento progressivo de 10% a 20%</div>
              <div>✓ Emissão de Vouchers Automática</div>
              <div>✓ Faturamento Corporativo via CNPJ</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '18px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
              Cadastrar Minha Agência de Viagens
            </h4>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              Atendimento exclusivo para emissoras do Brasil e exterior.
            </p>
            <button
              onClick={() => onOpenQuote('grupo')}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
              }}
            >
              Cadastrar / Agente de Vendas
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
