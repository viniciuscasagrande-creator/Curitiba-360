import React, { useState } from 'react';
import { MessageSquare, Send, AlertTriangle } from 'lucide-react';

export default function OperationalChatWidget({ mensagens = [], onSendMessage }) {
  const [text, setText] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (onSendMessage) onSendMessage(text.trim(), isPriority);
    setText('');
    setIsPriority(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-purple-600 animate-pulse" /> Chat Operacional #seguranca-embarque
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
          Ao Vivo (Encaminhamento Instantâneo)
        </span>
      </div>

      {/* MENSAGENS */}
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl space-y-1 ${
              msg.prioritaria
                ? 'bg-red-50 border border-red-300 text-red-900'
                : msg.autor.includes('Você')
                ? 'bg-purple-50 border border-purple-200 text-purple-950 ml-6'
                : 'bg-slate-50 border border-slate-200 text-slate-800 mr-6'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className={msg.prioritaria ? 'text-red-700 font-extrabold flex items-center gap-1' : 'text-slate-600'}>
                {msg.prioritaria && <AlertTriangle className="w-3 h-3 text-red-600" />}
                {msg.autor}
              </span>
              <span className="text-[9px] font-mono text-slate-400">{msg.horario}</span>
            </div>
            <p className="text-[11px] font-medium leading-normal">{msg.texto}</p>
          </div>
        ))}
      </div>

      {/* INPUT MENSAGEM */}
      <form onSubmit={handleSubmit} className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPriority(!isPriority)}
            className={`px-2.5 py-1 rounded font-bold text-[9px] transition-all flex items-center gap-1 ${
              isPriority ? 'bg-red-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3" /> URGENTE
          </button>
          <span className="text-[9px] text-slate-400">Marque se for um aviso crítico</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite sua mensagem para a equipe..."
            className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
          <button
            type="submit"
            className="px-3.5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
