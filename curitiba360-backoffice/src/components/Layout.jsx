// src/components/Layout.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Layout() {
  const navigate = useNavigate();
  const [menuExpandido, setMenuExpandido] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({ nome: '', perfil: '', foto: '' });

  // Busca os dados do usuário no Firestore após o login
  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            nome: `${data.primeiroNome} ${data.ultimoNome}`,
            perfil: data.perfil,
            foto: data.fotoPerfilUrl || 'https://via.placeholder.com/40' // Avatar padrão (RF-002.03)
          });
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // RF-002 e RF-035: Definição dos menus por perfil
  const getMenuItems = () => {
    const menus = [];
    
    // RN-002.02: Menus do Administrador
    if (userData.perfil === 'ADMINISTRADOR') {
      menus.push(
        { titulo: 'Dashboard', rota: '/dashboard' },
        { titulo: 'Gestão de Usuários', rota: '/usuarios' },
        { titulo: 'Parceiros Comerciais', rota: '/parceiros' },
        { titulo: 'Gestão de Agências', rota: '/agencias' },
        { titulo: 'Gestão de Agentes', rota: '/agentes' },
        { titulo: 'Gestão de Contratos', rota: '/contratos' },
        { titulo: 'Config. Comerciais', rota: '/configuracoes' },
        { titulo: 'Gestão de Atrações', rota: '/atracoes' },
        { titulo: 'Fila de Reembolsos', rota: '/reembolsos' },
        { titulo: 'Relatórios Financeiros', rota: '/relatorios' },
        { titulo: 'Controle Transferências', rota: '/transferencias' },
        { titulo: 'Conteúdo', rota: '/conteudo' },
        { titulo: 'Notificações', rota: '/notificacoes' }
      );
    }
    
    // Aqui adicionaremos as condições para os outros perfis (Parceiro, Agência, etc) futuramente
    return menus;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
      
      {/* MENU LATERAL (Sidebar) - RF-002.01 e RF-002.06 */}
      <aside style={{ 
        width: menuExpandido ? '250px' : '80px', 
        backgroundColor: '#1f2937', 
        color: 'white', 
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #374151' }}>
          <button onClick={() => setMenuExpandido(!menuExpandido)} style={{ background: 'none', color: 'white', border: 'none', cursor: 'pointer' }}>
            {menuExpandido ? '⬅ Recolher' : '➡'}
          </button>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {getMenuItems().map((item, index) => (
              <li key={index} style={{ padding: '0.75rem 1rem' }}>
                <Link to={item.rota} style={{ color: 'white', textDecoration: 'none', display: 'block' }}>
                  {menuExpandido ? item.titulo : item.titulo.charAt(0)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé do Menu Lateral - RF-005 */}
        <div style={{ padding: '1rem', borderTop: '1px solid #374151' }}>
           <Link to="/perfil" style={{ color: 'white', textDecoration: 'none' }}>
             {menuExpandido ? '⚙ Meu Perfil' : '⚙'}
           </Link>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL (Header + Conteúdo) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* CABEÇALHO (Header) - RF-002.02, RF-002.03, RF-002.04 */}
        <header style={{ height: '60px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ display: 'block', fontSize: '0.875rem' }}>{userData.nome || 'Carregando...'}</strong>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{userData.perfil}</span>
            </div>
            <img src={userData.foto} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            
            <button 
              onClick={() => setShowLogoutModal(true)} 
              style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '1rem' }}
            >
              Sair
            </button>
          </div>
        </header>

        {/* CONTEÚDO DINÂMICO DA PÁGINA (Onde o Dashboard, Usuários, etc., vão renderizar) */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          <Outlet />
        </div>
      </main>

      {/* MODAL DE LOGOUT (RF-002.05 e CA-002.02) */}
      {showLogoutModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '300px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Deseja realmente sair?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button onClick={() => setShowLogoutModal(false)} style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Não</button>
              <button onClick={handleLogout} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '4px', background: '#ef4444', color: 'white', cursor: 'pointer' }}>Sim</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
