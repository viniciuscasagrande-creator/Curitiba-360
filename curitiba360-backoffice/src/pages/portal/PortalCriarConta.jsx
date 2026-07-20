// src/pages/portal/PortalCriarConta.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PortalCriarConta() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const nextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email || !phone || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      setStep(3); // Match wireframe "criar conta part 3" directly
    }
  };

  const prevStep = () => {
    if (step === 3) setStep(1);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // Navigate to registration success
    navigate('/portal/confirmacao-cadastro?email=' + encodeURIComponent(email) + '&name=' + encodeURIComponent(name));
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
            📝 Cadastro de Visitante
          </span>
        </div>

        <div style={{ zIndex: 2, maxWidth: '480px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', color: 'white', margin: '0 0 1rem 0', letterSpacing: '-1px' }}>
            Junte-se ao Curitiba 360.
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#e2e8f0', margin: 0, lineHeight: '1.6' }}>
            Crie sua conta para obter descontos exclusivos, ingressos digitais e recomendações personalizadas.
          </p>
        </div>

        <div style={{ zIndex: 2, color: '#cbd5e1', fontSize: '0.875rem' }}>
          Passo {step === 1 ? '1' : '2'} de 2
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
              Criar conta
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
              {step === 1 ? 'Insira seus dados pessoais para iniciar.' : 'Defina sua senha de acesso.'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={nextStep} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  Nome Completo
                </label>
                <Input
                  type="text"
                  required
                  placeholder="ex: João da Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                  E-mail
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                    Telefone
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="(41) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                    CPF
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none', marginTop: '1rem' }}
              >
                Próxima etapa →
              </Button>
              
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <span 
                  onClick={() => navigate('/portal/login')}
                  style={{ color: '#cbd5e1', fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Já tem conta? Entrar
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  Senha de Acesso
                </label>
                <Input
                  type="password"
                  required
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  Confirmar Senha
                </label>
                <Input
                  type="password"
                  required
                  placeholder="******"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button
                  type="button"
                  onClick={prevStep}
                  style={{ flex: 1, padding: '0.75rem', backgroundColor: '#334155', color: 'white', border: 'none' }}
                >
                  ← Voltar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ flex: 1.5, padding: '0.75rem', backgroundColor: '#10b981', border: 'none' }}
                >
                  Finalizar Cadastro
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
