import React, { useState } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';

export default function AiCopilotChatPanel({ conversations = [], onSendPrompt }) {
  const [prompt, setPrompt] = useState('');

  const quickPrompts = [
    'Quantos ingressos vendi hoje?',
    'Quanto tenho para receber?',
    'Faça um relatório executivo do evento',
    'Quais campanhas tiveram maior ROI?'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (onSendPrompt) onSendPrompt(prompt);
    setPrompt('');
  };

  const handleQuickClick = (qText) => {
    if (onSendPrompt) onSendPrompt(qText);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs flex flex-col h-[520px]">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-purple-600 animate-bounce" /> Assistente Copiloto IA do Produtor (DeepMind Gemini)
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-600" /> RAG Connected
        </span>
      </div>

      {/* CONVERSATION STREAM */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {conversations.map((msg) => {
          const isAi = msg.remetente.includes('AI') || msg.remetente.includes('Curitiba');

          return (
            <div key={msg.id} className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}>
              {isAi && (
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-3 rounded-2xl max-w-[80%] space-y-1 ${
                isAi ? 'bg-purple-50/70 border border-purple-200/60 text-slate-900' : 'bg-slate-900 text-white'
              }`}>
                <div className="flex items-center justify-between gap-4 text-[9px] font-bold">
                  <span className={isAi ? 'text-purple-800' : 'text-purple-300'}>{msg.remetente}</span>
                  <span className="text-slate-400 font-mono">{msg.horario}</span>
                </div>
                <p className="leading-relaxed text-[11px] font-medium whitespace-pre-wrap">{msg.texto}</p>
              </div>

              {!isAi && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* QUICK SUGGESTIONS */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-[10px]">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickClick(q)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-900 rounded-lg border border-slate-200 font-bold whitespace-nowrap transition-all shadow-2xs"
          >
            ✨ {q}
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          placeholder="Pergunte qualquer coisa sobre seus eventos, receita, ingressos..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1 transition-all"
        >
          <Send className="w-3.5 h-3.5" /> Enviar
        </button>
      </form>
    </div>
  );
}
