// src/pages/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      // Tenta autenticar no Firebase
      await signInWithEmailAndPassword(auth, email, senha);
      
      // RF-001.04: Redireciona o usuário após login bem-sucedido
      navigate('/dashboard'); 
      
    } catch (error) {
      // RN-001.01: A mensagem de erro deve ser genérica ("E-mail ou senha inválidos")
      setErro('E-mail ou senha inválidos');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <form onSubmit={handleLogin} style={{ padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Curitiba 360 - Backoffice</h2>
        
        {erro && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{erro}</div>}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Senha</label>
          <input 
            type="password" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* RF-001.05: Opção Esqueci minha senha */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
          <a href="/recuperar-senha" style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none' }}>Esqueci minha senha</a>
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
