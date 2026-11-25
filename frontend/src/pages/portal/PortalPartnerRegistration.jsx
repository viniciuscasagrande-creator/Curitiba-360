// src/pages/portal/PortalPartnerRegistration.jsx
import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PortalPartnerRegistration({ isAgency }) {
  const [step, setStep] = useState(1); // 1: Empresa, 2: Responsável, 3: Financeiro
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  
  const [repName, setRepName] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [repPhone, setRepPhone] = useState('');
  
  const [pixKey, setPixKey] = useState('');
  const [bank, setBank] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const key = isAgency ? '@Curitiba360Public:agency_registry' : '@Curitiba360Public:partner_registry';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const newReg = {
      id: 'reg-' + Date.now(),
      cnpj,
      razaoSocial,
      nomeFantasia,
      repName,
      repEmail,
      repPhone,
      pixKey,
      bank,
      bankAccount,
      date: new Date().toLocaleDateString(),
      status: 'Pendente'
    };
    
    localStorage.setItem(key, JSON.stringify([newReg, ...existing]));
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{
        maxWidth: '600px',
        margin: '3rem auto',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '24px',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏢</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Solicitação Enviada!</h2>
        <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          O pré-cadastro da sua {isAgency ? 'Agência de Vendas' : 'Empresa / Parceiro Comercial'} foi realizado com sucesso. 
          Nossa equipe financeira e jurídica analisará seus dados em até 48 horas úteis. 
          Você receberá as instruções de login no e-mail <strong>{repEmail}</strong>.
        </p>
        <Button onClick={() => window.location.reload()} style={{ backgroundColor: '#10b981', border: 'none', color: 'white', padding: '0.75rem 2rem', fontWeight: 'bold' }}>
          Voltar à Home do Portal
        </Button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '650px',
      margin: '0 auto',
      textAlign: 'left',
      color: '#f8fafc',
      fontFamily: '"Outfit", "Inter", sans-serif'
    }}>
      
      {/* Title block */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', margin: '0 0 0.5rem 0' }}>
          {isAgency ? 'Credenciamento de Agência de Vendas 🎒' : 'Seja um Parceiro Curitiba 360 🤝'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
          {isAgency 
            ? 'Venda ingressos e pacotes para seus clientes e receba comissão direta em todas as validações.' 
            : 'Cadastre sua atração, restaurante ou comércio local no ecossistema e aumente seu alcance.'}
        </p>
      </div>

      {/* Stepper Progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '50px',
        padding: '0.5rem 1.5rem',
        border: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 1 ? '#10b981' : '#64748b', fontWeight: 'bold', fontSize: '0.825rem' }}>
          <span style={{ display: 'inline-flex', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step >= 1 ? '#10b981' : '#334155', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>1</span>
          Dados da Empresa
        </div>
        <div style={{ flex: 1, height: '2px', backgroundColor: step >= 2 ? '#10b981' : '#334155', margin: '0 0.5rem' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 2 ? '#10b981' : '#64748b', fontWeight: 'bold', fontSize: '0.825rem' }}>
          <span style={{ display: 'inline-flex', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step >= 2 ? '#10b981' : '#334155', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>2</span>
          Responsável
        </div>
        <div style={{ flex: 1, height: '2px', backgroundColor: step >= 3 ? '#10b981' : '#334155', margin: '0 0.5rem' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 3 ? '#10b981' : '#64748b', fontWeight: 'bold', fontSize: '0.825rem' }}>
          <span style={{ display: 'inline-flex', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: step >= 3 ? '#10b981' : '#334155', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>3</span>
          Integração Financeira
        </div>
      </div>

      {/* STEP 1: DADOS DA EMPRESA */}
      {step === 1 && (
        <form onSubmit={handleNext} style={{
          backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
          padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>CNPJ da Empresa</label>
            <Input
              type="text"
              required
              placeholder="00.000.000/0001-00"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>Razão Social</label>
            <Input
              type="text"
              required
              placeholder="ex: Curitiba Turismo LTDA"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>Nome Fantasia</label>
            <Input
              type="text"
              required
              placeholder="ex: Agência Curitiba 360"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          </div>

          <Button
            type="submit"
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none', fontWeight: 'bold', marginTop: '1rem' }}
          >
            Próxima Etapa →
          </Button>
        </form>
      )}

      {/* STEP 2: DADOS DO RESPONSÁVEL */}
      {step === 2 && (
        <form onSubmit={handleNext} style={{
          backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
          padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>Nome do Responsável Legal</label>
            <Input
              type="text"
              required
              placeholder="ex: João da Silva"
              value={repName}
              onChange={(e) => setRepName(e.target.value)}
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>E-mail de Contato Comercial</label>
            <Input
              type="email"
              required
              placeholder="contato@empresa.com"
              value={repEmail}
              onChange={(e) => setRepEmail(e.target.value)}
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>Telefone / Celular</label>
            <Input
              type="tel"
              required
              placeholder="(41) 99999-9999"
              value={repPhone}
              onChange={(e) => setRepPhone(e.target.value)}
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button type="button" onClick={handleBack} style={{ flex: 1, backgroundColor: '#334155', border: 'none', color: 'white' }}>
              Voltar
            </Button>
            <Button type="submit" style={{ flex: 1.5, backgroundColor: '#10b981', border: 'none', color: 'white', fontWeight: 'bold' }}>
              Próxima Etapa →
            </Button>
          </div>
        </form>
      )}

      {/* STEP 3: INTEGRACAO FINANCEIRA */}
      {step === 3 && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
          padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>Chave PIX Recebedora (para repasses/comissões)</label>
            <Input
              type="text"
              required
              placeholder="CNPJ, E-mail, Celular ou Chave Aleatória"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>Banco</label>
              <Input
                type="text"
                required
                placeholder="ex: Banco do Brasil"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>Agência & Conta</label>
              <Input
                type="text"
                required
                placeholder="ex: 0001 / 12345-6"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button type="button" onClick={handleBack} style={{ flex: 1, backgroundColor: '#334155', border: 'none', color: 'white' }}>
              Voltar
            </Button>
            <Button type="submit" style={{ flex: 1.5, backgroundColor: '#10b981', border: 'none', color: 'white', fontWeight: 'bold' }}>
              Finalizar Credenciamento
            </Button>
          </div>
        </form>
      )}

    </div>
  );
}
