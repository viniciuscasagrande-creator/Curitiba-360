// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // Executa login do contexto (admin@curitiba360.com / 123456)
      await login(email, password);
      
      // Verifica se o login deu certo checando localStorage
      const userSalvo = localStorage.getItem('@Curitiba360:user');
      if (userSalvo) {
        navigate('/dashboard');
      } else {
        setErro('Credenciais inválidas!');
      }
    } catch (err) {
      setErro('Ocorreu um erro ao processar o login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      fontFamily: 'sans-serif',
      padding: '1rem'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2.5rem', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        
        {/* LOGO SIMULADA */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', backgroundColor: '#3b82f6', borderRadius: '12px', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            C360
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Backoffice</h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Entre com as suas credenciais administrativas</p>
        </div>

        {/* FEEDBACK DE ERRO */}
        {erro && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '1.5rem', fontWeight: 'bold', border: '1px solid #fca5a5' }}>
            ⚠️ {erro}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.5rem' }}>E-mail</label>
            <input 
              type="email" 
              required 
              placeholder="admin@curitiba360.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#4b5563', marginBottom: '0.5rem' }}>Senha</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={carregando}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: 'bold', 
              cursor: carregando ? 'not-allowed' : 'pointer', 
              opacity: carregando ? 0.7 : 1,
              marginTop: '0.5rem',
              transition: 'background-color 0.2s'
            }}
          >
            {carregando ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>
          <span>Credenciais Padrão: admin@curitiba360.com / 123456</span>
        </div>

      </div>
    </div>
  );
}
