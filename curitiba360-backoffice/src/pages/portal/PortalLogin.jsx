// src/pages/portal/PortalLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PortalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login
    const mockUser = {
      name: 'João da Silva',
      email: email,
      phone: '(41) 99999-9999',
      cpf: '123.456.789-00',
      role: 'Turista'
    };
    localStorage.setItem('@Curitiba360Public:user', JSON.stringify(mockUser));
    alert('Login simulado com sucesso!');
    navigate('/portal');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '80vh',
      backgroundColor: '#0f172a',
      borderRadius: '24px',
      overflow: 'hidden',
      color: '#f8fafc',
      fontFamily: '"Outfit", "Inter", sans-serif',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Lado Esquerdo - Banner */}
      <div style={{
        flex: 1.2,
        backgroundImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%), url("/jardim_botanico.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem',
        position: 'relative'
      }}>
        <div style={{ zIndex: 2 }}>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            fontSize: '0.875rem',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            🌟 Portal do Visitante
          </span>
        </div>

        <div style={{ zIndex: 2, maxWidth: '480px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', color: 'white', margin: '0 0 1rem 0', letterSpacing: '-1px' }}>
            Descubra Curitiba em 360°
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#e2e8f0', margin: 0, lineHeight: '1.6' }}>
            Acesse seus pacotes, ingressos emitidos e planeje seus roteiros na capital mais ecológica do Brasil.
          </p>
        </div>

        <div style={{ zIndex: 2, display: 'flex', gap: '1.5rem', color: '#cbd5e1', fontSize: '0.875rem' }}>
          <div>
            <strong style={{ color: 'white', display: 'block', fontSize: '1.125rem' }}>100% Digital</strong>
            Sem filas
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div>
            <strong style={{ color: 'white', display: 'block', fontSize: '1.125rem' }}>Rotas Exclusivas</strong>
            Linha Turismo Integrada
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div style={{
        flex: 1,
        backgroundColor: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', margin: '0 0 0.5rem 0' }}>
              Bem-vindo!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
              Faça o login abaixo ou{' '}
              <span 
                onClick={() => navigate('/portal/criar-conta')}
                style={{ color: '#10b981', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
              >
                crie uma conta
              </span>
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                E-mail
              </label>
              <Input
                type="email"
                required
                placeholder="mattsmith@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1' }}>
                  Senha
                </label>
                <span 
                  onClick={() => navigate('/portal/recuperar-senha')}
                  style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600', cursor: 'pointer' }}
                >
                  Esqueci minha senha
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem'
                  }}
                >
                  {showPassword ? '👁️' : '🔒'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', userSelect: 'none' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#10b981', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: '0.875rem', color: '#cbd5e1', cursor: 'pointer' }}>
                Lembrar-me
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none', marginTop: '0.5rem' }}
            >
              Login
            </Button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>ou</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
          </div>

          <button
            type="button"
            onClick={() => {
              const mockUser = {
                name: 'João da Silva',
                email: 'joao.silva@gmail.com',
                phone: '(41) 99999-9999',
                cpf: '123.456.789-00',
                role: 'Turista'
              };
              localStorage.setItem('@Curitiba360Public:user', JSON.stringify(mockUser));
              alert('Simulação de Login com Google. Redirecionando para o portal...');
              navigate('/portal');
            }}
            style={{
              width: '100%', padding: '0.75rem', borderRadius: '8px',
              border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white',
              cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#ea4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.357-2.827-6.357-6.314s2.848-6.314 6.357-6.314c1.62 0 3.096.608 4.22 1.62l3.197-3.197C19.26 2.378 15.984 1 12.24 1 5.922 1 1 5.92 1 12.2s4.922 11.2 11.24 11.2c6.545 0 10.74-4.51 10.74-10.93 0-.64-.06-1.22-.16-1.785H12.24z"/>
            </svg>
            Entrar com o Google
          </button>
        </div>
      </div>
    </div>
  );
}
