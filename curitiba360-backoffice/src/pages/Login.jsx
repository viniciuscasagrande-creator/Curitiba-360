// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    // Chama a função de login do contexto
    await login(email, password);
    
    // Se o login for bem-sucedido, o estado do usuário muda, mas já podemos forçar o redirecionamento
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      
      {/* Lado Esquerdo - Banner/Imagem */}
      <div style={{ flex: 1, backgroundColor: '#10b981', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', padding: '3rem', backgroundImage: 'linear-gradient(to bottom right, #10b981, #047857)' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Curitiba 360</h1>
        <p style={{ fontSize: '1.25rem', textAlign: 'center', maxWidth: '400px' }}>
          Plataforma de gestão integrada para atrações, parceiros e atendimento ao turista.
        </p>
      </div>

      {/* Lado Direito - Formulário */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Bem-vindo de volta</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>Insira suas credenciais para acessar o backoffice.</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>E-mail corporativo</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@curitiba360.com"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#374151' }}>Senha</label>
                <a href="#" style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none' }}>Esqueceu a senha?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem' }}
              />
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.875rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '1rem' }}>
              Entrar no Sistema
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>
            <p>Dica: Use <strong>admin@curitiba360.com</strong> e senha <strong>123456</strong> para simular o acesso.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
