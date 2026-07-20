// src/pages/portal/PortalCriarSenha.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PortalCriarSenha() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getStrength = () => {
    if (!password) return { label: 'Fraca', color: '#ef4444', pct: 10 };
    if (password.length < 6) return { label: 'Fraca', color: '#ef4444', pct: 30 };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Média', color: '#f59e0b', pct: 60 };
    return { label: 'Forte', color: '#10b981', pct: 100 };
  };

  const strength = getStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Senha alterada com sucesso! Você já pode efetuar o login com a nova senha.');
    navigate('/portal/login');
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
            🔑 Nova Senha
          </span>
        </div>

        <div style={{ zIndex: 2, maxWidth: '480px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', color: 'white', margin: '0 0 1rem 0', letterSpacing: '-1px' }}>
            Defina sua nova senha.
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#e2e8f0', margin: 0, lineHeight: '1.6' }}>
            Escolha uma senha segura e de fácil memorização para garantir a privacidade de suas compras.
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
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', margin: '0 0 0.5rem 0' }}>
              Criar senha
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
              Insira a nova senha para concluir a redefinição de acesso.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Nova senha
              </label>
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

              {/* Password strength indicator */}
              {password && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                    <span>Força da senha:</span>
                    <span style={{ color: strength.color, fontWeight: 'bold' }}>{strength.label}</span>
                  </div>
                  <div style={{ height: '4px', width: '100%', backgroundColor: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${strength.pct}%`, backgroundColor: strength.color, transition: 'width 0.3s' }} />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Confirmar senha
              </label>
              <div style={{ position: 'relative' }}>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="******"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem'
                  }}
                >
                  {showConfirmPassword ? '👁️' : '🔒'}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none', marginTop: '0.5rem' }}
            >
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
