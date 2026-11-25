import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, User, BrainCircuit } from "lucide-react";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Olá! Sou o Assistente Virtual Curitiba 360. Como posso te ajudar hoje?" }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let aiText = "Desculpe, não entendi. Posso ajudar a consultar o saldo da carteira, ver ingressos ou roteiros turísticos.";
      if (userText.toLowerCase().includes("ingresso") || userText.toLowerCase().includes("evento")) {
        aiText = "Você possui 2 ingressos ativos na sua carteira. O próximo evento é o Festival Cultural de Curitiba em 15/08.";
      } else if (userText.toLowerCase().includes("saldo") || userText.toLowerCase().includes("carteira")) {
        aiText = "Seu saldo disponível na carteira é de R$ 82,50, além de R$ 34,80 acumulados em cashback.";
      } else if (userText.toLowerCase().includes("ônibus") || userText.toLowerCase().includes("linha")) {
        aiText = "A Linha Turismo funciona de terça a domingo a partir das 09h. O ticket custa R$ 50,00.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    }, 1000);
  };

  return (
    <SuperAppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] font-sans">
        {/* Header */}
        <div className="p-4 border-b border-slate-200/80 bg-white flex items-center gap-2 shrink-0">
          <Link to="/app/home" className="text-emerald-700 font-bold hover:no-underline">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <BrainCircuit size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 m-0">Assistente IA C360</h3>
              <span className="text-[8px] text-emerald-600 font-mono font-bold block">Online • Copiloto da Cidade</span>
            </div>
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                  m.sender === "user"
                    ? "bg-slate-200 text-slate-700 border-slate-350"
                    : "bg-emerald-50 text-emerald-600 border-emerald-100"
                }`}
              >
                {m.sender === "user" ? <User size={12} /> : <Sparkles size={12} />}
              </div>
              <div
                className={`p-3 rounded-2xl text-[10px] leading-relaxed ${
                  m.sender === "user"
                    ? "bg-slate-900 text-white font-sans"
                    : "bg-white border border-slate-200 text-slate-800 font-sans"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Form area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200/80 flex gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre clima, saldo, ônibus..."
            className="flex-1 pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
          <button
            type="submit"
            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl border-none shadow-2xs transition cursor-pointer"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </SuperAppLayout>
  );
}
