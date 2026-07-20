// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula a verificação de um usuário salvo no LocalStorage ao carregar a página
    const storagedUser = localStorage.getItem('@Curitiba360:user');
    const storagedToken = localStorage.getItem('@Curitiba360:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    // Mock de uma chamada à API de Login
    if (email === 'admin@curitiba360.com' && password === '123456') {
      const loggedUser = { id: 1, name: 'João da Silva', role: 'Administrador' };
      const token = 'mock-jwt-token-12345';

      setUser(loggedUser);
      localStorage.setItem('@Curitiba360:user', JSON.stringify(loggedUser));
      localStorage.setItem('@Curitiba360:token', token);
    } else {
      alert('Credenciais inválidas!');
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('@Curitiba360:user');
    localStorage.removeItem('@Curitiba360:token');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
