// src/pages/portal/PortalRecuperarSenha.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PortalRecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Instruções de recuperação enviadas para o e-mail: ${email}`);
      // Redirect to the mock email viewer for recovering password
      navigate('/portal/email-recuperar-senha?email=' + encodeURIComponent(email));
    }, 1000);
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
            🔐 Recuperação de Senha
          </span>
        </div>

        <div style={{ zIndex: 2, maxWidth: '480px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', color: 'white', margin: '0 0 1rem 0', letterSpacing: '-1px' }}>
            Protegendo seu acesso.
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#e2e8f0', margin: 0, lineHeight: '1.6' }}>
            Curitiba 360 utiliza padrões elevados de segurança para garantir que seus dados e ingressos estejam sempre seguros.
          </p>
        </div>

        <div style={{ zIndex: 2, color: '#cbd5e1', fontSize: '0.875rem' }}>
          Equipe Curitiba 360 • Segurança & Privacidade
        </div>
      </div>

      {/* Lado Direito - Form */}
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
              Esqueceu sua senha?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>
              Digite seu e-mail abaixo para receber as instruções de recuperação de acesso.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Email
              </label>
              <Input
                type="email"
                required
                placeholder="exemplo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none' }}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span 
                onClick={() => navigate('/portal/login')}
                style={{ color: '#cbd5e1', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Voltar para o login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
