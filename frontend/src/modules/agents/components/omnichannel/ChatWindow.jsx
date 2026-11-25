import React, { useState } from 'react';
import { Send, MessageSquare, Mail, Phone, User, FileText, Sparkles, CheckCheck } from 'lucide-react';

export default function ChatWindow({ conversation, onSendMessage, onOpenTemplates }) {
  const [textInput, setTextInput] = useState('');

  if (!conversation) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center h-[560px] p-6 text-center text-slate-400 text-xs">
        <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
        <p className="font-semibold text-slate-600">Selecione uma conversa para iniciar o atendimento omnichannel</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    onSendMessage(conversation.id, textInput, conversation.canal);
    setTextInput('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col h-[560px] text-xs overflow-hidden">
      {/* CABEÇALHO DA CONVERSA */}
      <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-xs">
            {conversation.clienteNome.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-xs">{conversation.clienteNome}</h3>
            <p className="text-[10px] text-slate-300">
              {conversation.clienteTelefone} • {conversation.clienteEmail}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplates}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" /> Usar Template Pronto
          </button>
        </div>
      </div>

      {/* ÁREA DE MENSAGENS */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
        {(conversation.mensagens || []).map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 max-w-[80%] ${
              msg.sender === 'agent' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div className={`p-3 rounded-2xl space-y-1 ${
              msg.sender === 'agent'
                ? 'bg-emerald-700 text-white font-semibold rounded-tr-none shadow-sm'
                : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-tl-none'
            }`}>
              <p className="leading-relaxed whitespace-pre-line">{msg.texto}</p>
              <div className={`text-[9px] flex items-center justify-end gap-1 font-mono ${
                msg.sender === 'agent' ? 'text-emerald-200' : 'text-slate-400'
              }`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'agent' && <CheckCheck className="w-3 h-3 text-emerald-300" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DIGITAÇÃO & ENVIO */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
        <textarea
          rows={2}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder={`Digite a resposta para enviar via ${conversation.canal.toUpperCase()}...`}
          className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
        <button
          type="submit"
          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
