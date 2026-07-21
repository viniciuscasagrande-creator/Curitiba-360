import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import BottomNavigation from '../../components/layout/BottomNavigation';
import { requestPushPermission } from '../../services/pushNotificationService';
import { User, Ticket, Award, Bell, Shield, Fingerprint, LogOut, ChevronRight } from 'lucide-react';

export default function UserProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);

  const handleTogglePush = async () => {
    if (!pushEnabled) {
      const granted = await requestPushPermission();
      setPushEnabled(granted);
    } else {
      setPushEnabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Header Profile Card */}
      <div className="bg-slate-900 border-b border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 font-bold text-2xl text-white shadow-lg">
            {user?.name?.[0] || 'J'}
          </div>
          <div>
            <h1 className="text-xl font-bold">{user?.name || 'João Silva'}</h1>
            <p className="text-xs text-slate-400">{user?.email || 'joao.silva@email.com'}</p>
            <span className="mt-1.5 inline-block rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-400">
              Nível OURO ⭐
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-2xl bg-slate-950 p-3 text-center border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Pontos</span>
            <span className="text-lg font-black text-purple-400">2.450 pts</span>
          </div>
          <div className="rounded-2xl bg-slate-950 p-3 text-center border border-slate-800">
            <span className="text-xs text-slate-400 block font-medium">Cashback</span>
            <span className="text-lg font-black text-emerald-400">R$ 32,50</span>
          </div>
        </div>
      </div>

      {/* Main Menu Links */}
      <div className="p-4 space-y-6 max-w-xl mx-auto">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Minhas Atividades</span>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden divide-y divide-slate-800">
            <Link to="/my-tickets" className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition">
              <div className="flex items-center gap-3">
                <Ticket size={20} className="text-blue-400" />
                <span className="font-semibold text-sm">Meus Ingressos</span>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </Link>

            <Link to="/pass" className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition">
              <div className="flex items-center gap-3">
                <Award size={20} className="text-purple-400" />
                <span className="font-semibold text-sm">Meu Pass Curitiba 360</span>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </Link>
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Segurança & Notificações</span>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint size={20} className="text-emerald-400" />
                <div>
                  <p className="font-semibold text-sm">Biometria (Face ID / Digital)</p>
                  <p className="text-xs text-slate-400">Acesso rápido para abrir ingressos</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={biometricEnabled}
                onChange={() => setBiometricEnabled(!biometricEnabled)}
                className="h-5 w-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-amber-400" />
                <div>
                  <p className="font-semibold text-sm">Notificações Push</p>
                  <p className="text-xs text-slate-400">Avisos de eventos e cashback</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={pushEnabled}
                onChange={handleTogglePush}
                className="h-5 w-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 p-4 font-bold text-red-400 hover:bg-red-500/20 transition flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Sair da Conta
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}
