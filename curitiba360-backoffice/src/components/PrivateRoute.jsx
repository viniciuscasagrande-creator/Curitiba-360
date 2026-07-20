// src/components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ border: '4px solid #f3f4f6', borderTop: '4px solid #3b82f6', borderRadius: '50%', width: '40px', height: '40px', margin: '0 auto 1rem auto', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Verificando autenticação...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Se estiver autenticado, renderiza a sub-rota (Outlet), senão redireciona para login
  return signed ? <Outlet /> : <Navigate to="/login" replace />;
}
