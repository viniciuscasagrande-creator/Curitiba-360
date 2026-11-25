import React from 'react';
import Logo from './Logo';
import { Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAboutBrand }) {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '64px', paddingBottom: '32px', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Main Footer Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'inline-block', marginBottom: '16px' }}>
              <Logo size="md" />
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#94a3b8', maxWidth: '320px' }}>
              Conectando turistas e moradores locais às melhores atrações, eventos culturais e experiências gastronômicas de Curitiba e região metropolitana.
            </p>
          </div>

          {/* Column 2: Suporte e Info */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#ffffff', marginBottom: '16px' }}>
              SUPORTE E INFO
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); alert("FAQ - Perguntas Frequentes: Respostas em breve!"); }} style={{ textDecoration: 'none', color: '#cbd5e1' }}>Perguntas Frequentes (FAQ)</a></li>
              <li><a href="#sobre" onClick={(e) => { e.preventDefault(); onOpenAboutBrand(); }} style={{ textDecoration: 'none', color: '#cbd5e1' }}>Sobre Nós</a></li>
              <li><a href="#privacidade" onClick={(e) => { e.preventDefault(); alert("Política de Privacidade conforme LGPD."); }} style={{ textDecoration: 'none', color: '#cbd5e1' }}>Política de Privacidade</a></li>
              <li><a href="#termos" onClick={(e) => { e.preventDefault(); alert("Termos de Uso do site."); }} style={{ textDecoration: 'none', color: '#cbd5e1' }}>Termos de Uso</a></li>
            </ul>
          </div>

          {/* Column 3: Trabalhe Conosco */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#ffffff', marginBottom: '16px' }}>
              TRABALHE CONOSCO
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#parceiro" onClick={(e) => { e.preventDefault(); alert("Auto-cadastro de Parceiro Comercial aberto."); }} style={{ textDecoration: 'none', color: '#cbd5e1' }}>Seja Parceiro Comercial</a></li>
              <li><a href="#agencia" onClick={(e) => { e.preventDefault(); alert("Auto-cadastro de Agência de Viagens aberto."); }} style={{ textDecoration: 'none', color: '#cbd5e1' }}>Agente de Vendas / Agências</a></li>
            </ul>
          </div>

          {/* Column 4: Redes Sociais e CNPJ */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#ffffff', marginBottom: '16px' }}>
              REDES SOCIAIS
            </h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}><Instagram size={18} /></a>
              <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}><Facebook size={18} /></a>
              <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}><Youtube size={18} /></a>
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>
              CNPJ: 07.258.737/0001-58
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
          <div>
            © 2026 Curitiba360. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00a896', fontWeight: '600' }}>
            <ShieldCheck size={16} />
            <span>Desenvolvido para Curitiba ecológica e inteligente</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
