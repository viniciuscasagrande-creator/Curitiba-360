// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const [email, setEmail] = useState('admin@curitiba360.com');
  const [password, setPassword] = useState('123456');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#f1f5f9', 
      fontFamily: '"Inter", sans-serif', 
      boxSizing: 'border-box'
    }}>
      
      {/* Lado Esquerdo - Banner da Cidade com Overlay */}
      <div style={{ 
        flex: 1.2, 
        position: 'relative', 
        backgroundImage: 'url(/curitiba_login_banner.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        display: 'flex', 
        alignItems: 'flex-end', 
        padding: '4rem'
      }}>
        {/* Dark overlay gradient */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.8) 100%)',
          zIndex: 1
        }} />

        {/* Welcome Glass Card */}
        <div style={{ 
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '2.5rem',
          color: 'white',
          maxWidth: '500px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
            Curitiba 360
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#e2e8f0', margin: '0 0 1.5rem 0', lineHeight: '1.5' }}>
            Acesso integrado ao ecossistema turístico e cultural da capital do Paraná.
          </p>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
            <div>
              <strong style={{ display: 'block', color: 'white', fontSize: '1rem' }}>+5 Atrações</strong>
              Parques e Teatros
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div>
              <strong style={{ display: 'block', color: 'white', fontSize: '1rem' }}>Vouchers QR</strong>
              Validação Rápida
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Painel de Credenciais */}
      <div style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem'
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
              Painel Corporativo
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
              Insira seus dados administrativos para gerenciar os serviços.
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
                E-mail Administrativo
              </label>
              <Input 
                type="email" 
                required 
                placeholder="ex: admin@curitiba360.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>
                  Senha de Acesso
                </label>
                <a href="#" style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600', textDecoration: 'none' }}>
                  Esqueceu a senha?
                </a>
              </div>
              <Input 
                type="password" 
                required 
                placeholder="******" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}
            >
              Entrar no Sistema
            </Button>
          </form>

          {/* Dica de Acesso */}
          <div style={{ 
            marginTop: '2.5rem', 
            padding: '1rem', 
            borderRadius: '8px', 
            backgroundColor: '#f8fafc', 
            border: '1px dashed #cbd5e1',
            fontSize: '0.825rem',
            color: '#64748b',
            lineHeight: '1.4'
          }}>
            🔑 <strong>Acesso Administrativo Simulado:</strong><br />
            Use o e-mail <code>admin@curitiba360.com</code> e senha <code>123456</code> para logar imediatamente.
          </div>
        </div>
      </div>
      
    </div>
  );
}