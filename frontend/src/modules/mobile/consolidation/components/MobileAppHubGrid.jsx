import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Users, Scan, MessageSquare, Activity, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

export default function MobileAppHubGrid({ submodulos = [] }) {
  const navigate = useNavigate();

  const getIcon = (title) => {
    if (title.includes('Produtor')) return Smartphone;
    if (title.includes('Staff')) return Users;
    if (title.includes('Check-in')) return Scan;
    if (title.includes('Comunicação')) return MessageSquare;
    if (title.includes('Monitoramento')) return Activity;
    if (title.includes('Perfil')) return ShieldCheck;
    return FileText;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Central de Módulos Móveis Consolidados
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
          7 Módulos Prontos ✓
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {submodulos.map((mod) => {
          const Icon = getIcon(mod.titulo);

          return (
            <div
              key={mod.id}
              onClick={() => navigate(mod.rota)}
              className="p-3 bg-gradient-to-r from-slate-50 to-purple-50/40 rounded-xl border border-slate-200/80 hover:border-purple-300 transition-all cursor-pointer flex items-center justify-between shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 text-white rounded-lg group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">{mod.titulo}</div>
                  <div className="text-[10px] text-purple-700 font-bold">{mod.status}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-purple-600 font-bold group-hover:translate-x-1 transition-transform">
                <span>Acessar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
