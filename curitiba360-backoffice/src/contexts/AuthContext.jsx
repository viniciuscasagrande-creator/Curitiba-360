// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega o usuário salvo no localStorage ao inicializar o app
    const storedUser = localStorage.getItem('@Curitiba360:user');
    const storedToken = localStorage.getItem('@Curitiba360:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      // Seta token padrão no axios caso já exista no storage
      api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const signIn = async ({ email, password }) => {
    setLoading(true);
    try {
      // Mock de autenticação para fins de demonstração (Substitua pela chamada real da API no futuro)
      // const response = await api.post('/sessions', { email, password });
      // const { token, user: userResponse } = response.data;
      
      // Simulação de login bem-sucedido
      if (email === 'admin@tourcwb.com' && password === '123456') {
        const mockUser = {
          id: '1',
          name: 'João da Silva',
          email: 'admin@tourcwb.com',
          role: 'ADMINISTRADOR',
          avatar: 'https://via.placeholder.com/80'
        };
        const mockToken = 'mocked-jwt-token-xyz';

        localStorage.setItem('@Curitiba360:token', mockToken);
        localStorage.setItem('@Curitiba360:user', JSON.stringify(mockUser));

        api.defaults.headers.Authorization = `Bearer ${mockToken}`;
        setUser(mockUser);
      } else {
        throw new Error('Credenciais inválidas. Use admin@tourcwb.com e senha 123456.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('@Curitiba360:token');
    localStorage.removeItem('@Curitiba360:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
