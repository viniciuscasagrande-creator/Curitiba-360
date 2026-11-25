import React, { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg(isRegister ? 'Cadastro realizado com sucesso!' : 'Login efetuado com sucesso!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1500);
  };

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
        maxWidth: '440px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        position: 'relative',
        padding: '32px'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Logo size="md" />
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginTop: '16px' }}>
            {isRegister ? 'Criar sua conta' : 'Entrar na sua conta'}
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            Acesse seus ingressos e histórico de passeios
          </p>
        </div>

        {successMsg ? (
          <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '700', fontSize: '14px' }}>
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isRegister && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Nome Completo</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>E-mail</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Senha</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px'
              }}
            >
              <span>{isRegister ? 'Concluir Cadastro' : 'Entrar'}</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
              {isRegister ? 'Já possui conta?' : 'Não tem conta?'} {' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                style={{ color: '#2563eb', fontWeight: '700', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {isRegister ? 'Entrar' : 'Cadastre-se grátis'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
