// src/components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { signed, loading } = useContext(AuthContext);

  // Enquanto estiver verificando o localStorage, exibe um loading simples
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando sistema...</div>;
  }

  // Se estiver logado (signed === true), renderiza as rotas filhas (Outlet). 
  // Caso contrário, redireciona para o login.
  return signed ? <Outlet /> : <Navigate to="/login" replace />;
}
