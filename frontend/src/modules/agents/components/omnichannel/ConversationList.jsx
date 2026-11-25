import React from 'react';
import { MessageSquare, Mail, Bell, Search, CheckCircle2, Clock } from 'lucide-react';

export default function ConversationList({ conversations = [], selectedId, onSelectConversation, searchQuery, setSearchQuery }) {
  const getChannelBadge = (canal) => {
    if (canal === 'whatsapp') {
      return <span className="p-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] flex items-center gap-0.5"><MessageSquare className="w-3 h-3" /> WhatsApp</span>;
    }
    return <span className="p-1 rounded bg-purple-100 text-purple-800 font-bold text-[9px] flex items-center gap-0.5"><Mail className="w-3 h-3" /> E-mail</span>;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col h-[560px] text-xs overflow-hidden">
      {/* Busca */}
      <div className="p-3 border-b border-slate-100 bg-slate-50/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cliente ou telefone..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
      </div>

      {/* Lista de Atendimentos */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {conversations.map((conv) => {
          const isSelected = conv.id === selectedId;

          return (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`p-3.5 cursor-pointer transition-colors space-y-1.5 ${
                isSelected ? 'bg-purple-50 border-l-4 border-l-purple-600' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-xs truncate max-w-[160px]">{conv.clienteNome}</span>
                <span className="text-[9px] text-slate-400 font-mono">{conv.ultimaMensagemData.slice(11, 16)}</span>
              </div>

              <div className="flex items-center justify-between">
                {getChannelBadge(conv.canal)}
                {conv.naoLidas > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[9px]">
                    {conv.naoLidas} novas
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 truncate font-medium">{conv.ultimaMensagemTexto}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
