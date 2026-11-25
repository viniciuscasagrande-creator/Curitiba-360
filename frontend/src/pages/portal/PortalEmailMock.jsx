// src/pages/portal/PortalEmailMock.jsx
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function PortalEmailMock() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const email = searchParams.get('email') || 'joao@mail.com';
  const name = searchParams.get('name') || 'João da Silva';
  
  const isRecovery = location.pathname.includes('email-recuperar-senha');

  return (
    <div style={{
      maxWidth: '850px',
      margin: '2rem auto',
      fontFamily: 'sans-serif',
      backgroundColor: '#f1f5f9',
      border: '1px solid #cbd5e1',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Chrome Window Mock Header */}
      <div style={{
        backgroundColor: '#e2e8f0',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        {/* Windows dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
        </div>
        {/* Address Bar */}
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '6px',
          padding: '0.25rem 1rem',
          fontSize: '0.825rem',
          color: '#475569',
          border: '1px solid #cbd5e1',
          textAlign: 'center',
          userSelect: 'none'
        }}>
          {isRecovery ? 'https://mail.google.com/mail/u/0/#inbox/recovery' : 'https://mail.google.com/mail/u/0/#inbox/activation'}
        </div>
      </div>

      {/* Email Inbox Toolbar */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        gap: '1.5rem',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        <div style={{ cursor: 'pointer' }} onClick={() => window.history.back()}>← Voltar</div>
        <div>🗑️ Excluir</div>
        <div>📁 Mover</div>
        <div>🏷️ Marcadores</div>
        <div style={{ marginLeft: 'auto', fontWeight: 'bold', color: '#10b981' }}>
          {isRecovery ? 'Simulador de E-mail: Recuperação' : 'Simulador de E-mail: Confirmação'}
        </div>
      </div>

      {/* Email Subject / Heading */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem 2rem 0.5rem 2rem',
        textAlign: 'left'
      }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 'bold', color: '#1e293b' }}>
          {isRecovery ? 'Redefinição de senha de acesso - Curitiba 360' : 'Confirme seu cadastro no Curitiba 360'}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#475569' }}>
            C3
          </div>
          <div style={{ fontSize: '0.825rem', color: '#475569' }}>
            <strong>Curitiba 360</strong> &lt;no-reply@curitiba360.com&gt;
            <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem' }}>Para: {name} &lt;{email}&gt;</span>
          </div>
        </div>
      </div>

      {/* Email Body Template */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '3rem 2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '550px',
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          boxSizing: 'border-box'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              padding: '0.5rem 1rem', borderRadius: '12px', border: '1.5px solid #10b981',
              fontWeight: 'bold', color: '#1e293b'
            }}>
              🌲 Curitiba <span style={{ color: '#10b981' }}>360</span>
            </div>
          </div>

          <div style={{ textAlign: 'left', color: '#334155', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '1rem' }}>Olá, <strong>{name}</strong>,</p>
            
            {isRecovery ? (
              <>
                <p style={{ marginBottom: '1.5rem' }}>
                  Recebemos uma solicitação para redefinir a sua senha de acesso ao portal do <strong>Curitiba 360</strong>.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                  <Button
                    onClick={() => navigate('/portal/criar-senha')}
                    style={{
                      backgroundColor: '#1e293b', color: 'white', border: 'none', 
                      padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 'bold', 
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                  >
                    Redefinir senha 🔒
                  </Button>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Caso não tenha solicitado uma nova senha ou recebeu indevidamente esta notificação, você pode ignorar este e-mail e sua senha permanecerá inalterada.
                </p>
              </>
            ) : (
              <>
                <p style={{ marginBottom: '1.5rem' }}>
                  Obrigado por se cadastrar no <strong>Curitiba 360</strong>! Sua conta foi criada com sucesso, mas precisa ser ativada antes do primeiro acesso.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Clique no botão abaixo para confirmar seu endereço de e-mail e ativar seu perfil.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                  <Button
                    onClick={() => {
                      alert('Conta ativada com sucesso!');
                      navigate('/portal/login');
                    }}
                    style={{
                      backgroundColor: '#10b981', color: 'white', border: 'none', 
                      padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 'bold', 
                      cursor: 'pointer'
                    }}
                  >
                    Confirmar Cadastro e Ativar Conta
                  </Button>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Se o botão acima não funcionar, você também pode copiar e colar o link de ativação no seu navegador:<br />
                  <span style={{ color: '#3b82f6', textDecoration: 'underline', wordBreak: 'break-all' }}>
                    http://localhost:5173/portal/login?activate=true
                  </span>
                </p>
              </>
            )}

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2rem 0' }} />
            
            {/* Footer */}
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', lineHeight: '1.4' }}>
              Em caso de dúvidas, entre em contato: <a href="mailto:contato@curitiba360.com" style={{ color: '#3b82f6' }}>contato@curitiba360.com</a> ou SAC (41) 3333-3333.<br />
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Política de Privacidade</span>
                <span>•</span>
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Termos de Uso</span>
                <span>•</span>
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cancelar inscrição</span>
              </div>
              <div style={{ marginTop: '0.75rem', fontWeight: 'bold' }}>Equipe Curitiba 360</div>
              <div style={{ marginTop: '0.25rem' }}>© Copyright 2026. Todos os direitos reservados. CURITIBA 360 - CNPJ: 07.258.737/0001-58</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
