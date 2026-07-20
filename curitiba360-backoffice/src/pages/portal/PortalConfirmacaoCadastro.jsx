// src/pages/portal/PortalConfirmacaoCadastro.jsx
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function PortalConfirmacaoCadastro() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'usuario@mail.com';
  const name = searchParams.get('name') || 'Visitante';

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
      {/* Lado Esquerdo */}
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
            🎉 Sucesso!
          </span>
        </div>

        <div style={{ zIndex: 2, maxWidth: '480px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', color: 'white', margin: '0 0 1rem 0', letterSpacing: '-1px' }}>
            Quase lá!
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#e2e8f0', margin: 0, lineHeight: '1.6' }}>
            Verifique sua caixa de entrada para ativar sua conta e liberar o acesso completo ao ecossistema do Curitiba 360.
          </p>
        </div>

        <div style={{ zIndex: 2, color: '#cbd5e1', fontSize: '0.875rem' }}>
          Equipe Curitiba 360
        </div>
      </div>

      {/* Lado Direito */}
      <div style={{
        flex: 1,
        backgroundColor: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem'
      }}>
        <div style={{ width: '100%', maxWidth: '380px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📧</div>
          
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', margin: '0 0 1rem 0' }}>
            Confirmação de Cadastro
          </h2>
          
          <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: '0 0 2rem 0', lineHeight: '1.6' }}>
            Olá, <strong>{name}</strong>!<br />
            Enviamos um e-mail de ativação para <strong>{email}</strong>. Por favor, acesse o link de confirmação contido no e-mail para ativar sua conta.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button
              onClick={() => navigate(`/portal/email-confirmacao?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`)}
              variant="primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none' }}
            >
              📥 Simular Recebimento de E-mail
            </Button>

            <span 
              onClick={() => navigate('/portal/login')}
              style={{ color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'underline', marginTop: '0.5rem' }}
            >
              Voltar para a página de Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
