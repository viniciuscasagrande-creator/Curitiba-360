import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw, Zap } from 'lucide-react';

export default function CopilotChat({ chatHistory = [], onSendMessage }) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    setSending(true);
    const text = inputPrompt;
    setInputPrompt('');

    setTimeout(async () => {
      await onSendMessage(text);
      setSending(false);
    }, 200);
  };

  const quickPrompts = [
    '🎯 Como bater a meta este mês?',
    '📱 Gerar mensagem para cliente VIP',
    '🚨 Quais clientes estão em risco de churn?',
    '🕒 Qual o melhor horário para ligar hoje?'
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col h-[520px] text-xs">
      {/* CABEÇALHO DO CHAT */}
      <div className="p-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
            <Bot className="w-5 h-5 text-purple-300 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm">Copiloto IA de Vendas 🤖</h3>
            <p className="text-[11px] text-purple-300 font-medium">Assistente Comercial Preditivo 24/7</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
          • Online e Pronto
        </span>
      </div>

      {/* ÁREA DE MENSAGENS */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div className={`p-1.5 rounded-lg text-white font-bold text-[10px] ${
              msg.sender === 'user' ? 'bg-purple-600' : 'bg-slate-800'
            }`}>
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`p-3 rounded-2xl space-y-1 ${
              msg.sender === 'user'
                ? 'bg-purple-600 text-white font-semibold rounded-tr-none'
                : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-tl-none'
            }`}>
              <p className="leading-relaxed">{msg.texto}</p>
              <span className={`text-[9px] block text-right font-mono ${
                msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CHIPS DE PROMPTS RÁPIDOS */}
      <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(prompt)}
            className="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold whitespace-nowrap text-[10px] transition-colors border border-purple-200/60"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* FORMULÁRIO DE ENVIO */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Pergunte algo ao Copiloto IA (ex: Como fechar a meta de Julho?)"
          className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
        <button
          type="submit"
          disabled={sending}
          className="p-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
