import React from 'react';
import { User, MapPin, Building2, Calendar, Award, Send, PlusCircle, Wallet, Sparkles } from 'lucide-react';

export default function AgentDashboardHeader({ agentInfo = {}, onRequestPix, onNewSale }) {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4 border border-slate-800">
      {/* Elemento Decorativo Glassmorphism */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <img
            src={agentInfo.fotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt={agentInfo.nome}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-500/50 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                {agentInfo.cargo || 'Agente Comercial'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ Agente Ativo
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight mt-1 text-white">
              {agentInfo.nome}
            </h1>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-3 mt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-400" /> {agentInfo.agenciaNome}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" /> {agentInfo.regiao}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Último Acesso: {agentInfo.ultimoAcesso}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onNewSale}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Nova Venda PDV
          </button>

          <button
            onClick={onRequestPix}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" /> Resgate PIX
          </button>
        </div>
      </div>
    </div>
  );
}
