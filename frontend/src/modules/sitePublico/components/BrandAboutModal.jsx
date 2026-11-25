import React from 'react';
import { X, Sparkles, Trees, ShieldCheck, HeartHandshake } from 'lucide-react';
import Logo from './Logo';

export default function BrandAboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '640px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        position: 'relative',
        padding: '32px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Logo size="lg" />
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '16px' }}>
            Sobre a Marca Curitiba 360°
          </h2>
          <p style={{ fontSize: '14px', color: '#00a896', fontWeight: '700', marginTop: '4px' }}>
            A capital ecológica em sua plenitude
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#475569', fontSize: '15px', lineHeight: '1.6' }}>
          <p>
            O portal <strong>Curitiba 360</strong> nasceu inspirado no legado urbanístico e ambiental revolucionado pelo ex-prefeito e arquiteto <strong>Jaime Lerner</strong>. A marca conecta os munícipes e visitantes a todas as dimensões da capital paranaense.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <Trees size={24} color="#00a896" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Identidade Ecológica</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Símbolos do Jardim Botânico, Araucárias e Capivaras em nosso design visual.</p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <ShieldCheck size={24} color="#2563eb" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Vouchers Digitais</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Garantia de segurança, QR Code instantâneo e agilidade sem filas.</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '14px', border: '1px solid #bfdbfe', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={18} color="#2563eb" />
              <strong style={{ color: '#1e3a8a', fontSize: '14px' }}>Conceito 360 Graos</strong>
            </div>
            <p style={{ fontSize: '13px', color: '#1e40af' }}>
              Abrangência total: Parques, museus de arquitetura futurista (MON), gastronomia de Santa Felicidade, passeios de trem e teatro sob as estrelas na Ópera de Arame.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '24px'
          }}
        >
          Entendi e Fechar
        </button>
      </div>
    </div>
  );
}
