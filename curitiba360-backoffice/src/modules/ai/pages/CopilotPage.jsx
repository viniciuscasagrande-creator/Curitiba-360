import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useAIChat } from "../hooks/useAIChat";
import { Send, Sparkles } from "lucide-react";

export default function CopilotPage() {
  const { messages, sendMessage } = useAIChat();
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-140px)] flex flex-col justify-between text-left select-none max-w-4xl mx-auto">
        <header className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 my-0 flex items-center gap-2">
            <Sparkles className="text-purple-600 animate-pulse" />
            AI Copilot
          </h1>
          <p className="text-xs text-slate-505 my-0 mt-1">Faça perguntas sobre vendas, campanhas com melhor ROI ou otimização de preços.</p>
        </header>

        {/* Messages */}
        <section className="flex-1 overflow-y-auto py-6 space-y-4 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-3xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="my-0 leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Input */}
        <form onSubmit={handleSend} className="pt-4 border-t border-slate-200 flex gap-3">
          <input
            type="text"
            placeholder="Pergunte ao Copilot (ex: Qual meu produto mais vendido?)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 h-12 px-5 rounded-full border border-slate-300 focus:outline-none focus:border-purple-600 bg-white"
          />
          <button
            type="submit"
            className="h-12 w-12 rounded-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center transition border-none cursor-pointer"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
