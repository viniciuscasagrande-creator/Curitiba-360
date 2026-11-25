import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 2500 }}>
      {/* Floating Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(37,211,102,0.4)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Atendimento WhatsApp 360"
      >
        {chatOpen ? <X size={26} /> : <MessageCircle size={28} />}
      </button>

      {/* Popover Support Chat Box */}
      {chatOpen && (
        <div style={{
          position: 'absolute',
          bottom: '76px',
          right: 0,
          width: '320px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }} className="animate-fade-in">
          {/* Header */}
          <div style={{ backgroundColor: '#075E54', color: '#ffffff', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={22} color="#ffffff" />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '800' }}>Suporte Curitiba 360</h4>
              <span style={{ fontSize: '12px', color: '#e6fffa' }}>Online • Resposta rápida</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '16px', backgroundColor: '#efeae2', minHeight: '140px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', color: '#111b21', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', maxWidth: '85%' }}>
              Olá! 👋 Como podemos ajudar no seu passeio por Curitiba?
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ padding: '12px', backgroundColor: '#f0f2f5', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Digite sua dúvida..."
              style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.open(`https://wa.me/5541999999999?text=${encodeURIComponent(e.currentTarget.value)}`, '_blank');
                  setChatOpen(false);
                }
              }}
            />
            <button
              onClick={() => {
                window.open('https://wa.me/5541999999999?text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20pacotes%20Curitiba%20360', '_blank');
                setChatOpen(false);
              }}
              style={{ backgroundColor: '#128C7E', color: '#ffffff', width: '36px', height: '36px', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
