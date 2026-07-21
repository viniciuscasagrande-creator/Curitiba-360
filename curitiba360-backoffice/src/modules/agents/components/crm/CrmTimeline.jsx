import React from 'react';
import { MessageSquare, Phone, Mail, ShoppingCart, Clock, User, ShieldAlert } from 'lucide-react';

export default function CrmTimeline({ interacoes = [] }) {
  const getIcon = (tipo) => {
    switch (tipo) {
      case 'whatsapp':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />;
      case 'chamada':
        return <Phone className="w-3.5 h-3.5 text-blue-600" />;
      case 'email':
        return <Mail className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <ShoppingCart className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" /> Histórico de Interações 360°
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-[10px] text-slate-700">
          {interacoes.length} registros
        </span>
      </div>

      <div className="space-y-3">
        {interacoes.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
            <div className="p-2 rounded-lg bg-white shadow-2xs border border-slate-200/60 mt-0.5">
              {getIcon(item.tipo)}
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="font-bold text-slate-900 leading-tight">{item.descricao}</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-2">
                <span>🕒 {item.data}</span>
                <span>•</span>
                <span>Por: <b>{item.usuario}</b></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
