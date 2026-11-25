import { useState } from 'react';
import { askCuritibaAI } from '../../services/aiService';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Olá! Sou o assistente de IA do Curitiba 360 🤖. Como posso ajudar você a aproveitar o melhor de Curitiba hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'Quero fazer algo diferente hoje à noite',
    'Roteiro de 3 dias para a família',
    'Como economizar com o meu Pass?'
  ];

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const aiResponse = await askCuritibaAI(text);
    setMessages([...newMessages, { sender: 'ai', text: aiResponse.reply }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[70vh] rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
      {/* AI Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-950 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="font-bold text-white text-base">Curitiba 360 AI</h2>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> Online • Assistente Pessoal
          </span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Bot size={16} />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-xs text-slate-400 animate-pulse">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
              <RefreshCw size={16} className="animate-spin" />
            </div>
            Pensando nas melhores recomendações para você...
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-3 border-t border-slate-800/60 bg-slate-950/60 flex gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 whitespace-nowrap hover:bg-slate-800 hover:text-white transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 border-t border-slate-800 bg-slate-950 p-3"
      >
        <input
          type="text"
          placeholder="Pergunte à IA do Curitiba 360..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition hover:bg-blue-500 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
