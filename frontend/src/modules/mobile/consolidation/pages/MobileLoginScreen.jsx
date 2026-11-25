import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Lock, ShieldCheck } from 'lucide-react';

export default function MobileLoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('carlos.spinola@curitiba360.com.br');
  const [senha, setSenha] = useState('••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/mobile/app');
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white text-xs p-6 flex flex-col justify-center max-w-md mx-auto shadow-2xl">
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center border-2 border-purple-400 shadow-xl">
          <Smartphone className="w-8 h-8 text-white" />
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-white">Curitiba 360 Mobile</h1>
          <p className="text-xs text-purple-300">Aplicativo do Produtor & Operação Staff</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 text-left bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">E-mail corporativo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-lg shadow-lg transition-all"
          >
            Entrar no Aplicativo
          </button>
        </form>

        <div className="text-[10px] text-slate-500 font-mono">
          Suporte a Biometria (Face ID) e Autenticação Offline Ativos ✓
        </div>
      </div>
    </div>
  );
}
