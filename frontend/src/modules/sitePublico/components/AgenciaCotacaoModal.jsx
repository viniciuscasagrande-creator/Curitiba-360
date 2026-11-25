import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2, User, Phone, Mail, Calendar, Users, MapPin, ShieldCheck } from 'lucide-react';

export default function AgenciaCotacaoModal({ isOpen, onClose, defaultType = 'passeio' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    tipoServico: defaultType, // passeio, transfer, grupo, agendamento
    dataViagem: '',
    numPessoas: '2',
    detalhes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        position: 'relative',
        border: '1px solid #e2e8f0'
      }}>
        
        {/* Header */}
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '24px',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: 'rgba(0,168,150,0.2)', color: '#00a896', padding: '8px', borderRadius: '10px' }}>
              <Building2 size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
                Solicitar Cotação de Agência 360°
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                Atendimento Receptivo • Curitiba & Região Metropolitana
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Solicitação Enviada com Sucesso!
              </h4>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', maxWidth: '400px', margin: '0 auto 24px' }}>
                Nossa equipe de atendimento receptivo e agências parceiras credenciadas pelo CADASTUR enviará o orçamento detalhado em seu WhatsApp e e-mail.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                style={{ backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '700', padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
              >
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Tipo de Serviço de Agência
                </label>
                <select
                  value={formData.tipoServico}
                  onChange={(e) => setFormData({ ...formData, tipoServico: e.target.value })}
                  style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', fontWeight: '600', outline: 'none' }}
                >
                  <option value="passeio">Passeios & Day Trips RMC (Caminho do Vinho, Ilha do Mel, Vila Velha, Lapa)</option>
                  <option value="transfer">Traslado Executivo (Aeroporto Afonso Pena CWB para Hotéis)</option>
                  <option value="grupo">Grupos & Excursões (Vans, Micro-ônibus e Ônibus)</option>
                  <option value="privativo">Tour Receptivo Privativo com Guia Credenciado Cadastur</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(41) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Data Pretendida
                  </label>
                  <input
                    type="date"
                    value={formData.dataViagem}
                    onChange={(e) => setFormData({ ...formData, dataViagem: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Número de Pessoas
                  </label>
                  <select
                    value={formData.numPessoas}
                    onChange={(e) => setFormData({ ...formData, numPessoas: e.target.value })}
                    style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  >
                    <option value="1">1 Pessoa</option>
                    <option value="2">2 Pessoas (Casal)</option>
                    <option value="3-5">3 a 5 Pessoas (Família)</option>
                    <option value="6-15">6 a 15 Pessoas (Grupo Pequeno)</option>
                    <option value="16+">Mais de 15 Pessoas (Excursão)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Observações & Preferências
                </label>
                <textarea
                  rows="3"
                  placeholder="Ex: Gostaria de incluir almoço típico de barreado e busca no Hotel Batel..."
                  value={formData.detalhes}
                  onChange={(e) => setFormData({ ...formData, detalhes: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} />
                <span>Cotação rápida e sem compromisso via Agências Cadastur de Curitiba.</span>
              </div>

              <button
                type="submit"
                style={{
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#00a896',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,168,150,0.3)',
                  marginTop: '8px'
                }}
              >
                <Send size={16} />
                <span>Enviar Solicitação de Cotação</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
