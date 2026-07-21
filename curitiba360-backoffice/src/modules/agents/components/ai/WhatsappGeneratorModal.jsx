import React, { useState } from 'react';
import { Send, X, MessageSquare, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { aiCopilotService } from '../../services/aiCopilotService';

export default function WhatsappGeneratorModal({ isOpen, onClose, lead, onSendCopy }) {
  const [tone, setTone] = useState('amigavel'); // amigavel, urgente, corporativo
  const [copyText, setCopyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !lead) return null;

  const handleGenerate = async (selectedTone) => {
    setLoading(true);
    try {
      const res = await aiCopilotService.generateWhatsappCopy(lead.clienteNome, lead.eventoInteresse, selectedTone);
      if (res.success) setCopyText(res.copy);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-slate-800">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" /> Gerador de Mensagens WhatsApp (IA)
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
            <span className="font-extrabold text-purple-900 block">{lead.clienteNome}</span>
            <span className="text-[11px] text-purple-700">Evento: {lead.eventoInteresse}</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Selecione o Tom de Voz</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setTone('amigavel'); handleGenerate('amigavel'); }}
                className={`p-2 rounded-xl border font-bold text-center transition-all ${
                  tone === 'amigavel' ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-700'
                }`}
              >
                Amigável 🌟
              </button>
              <button
                type="button"
                onClick={() => { setTone('urgente'); handleGenerate('urgente'); }}
                className={`p-2 rounded-xl border font-bold text-center transition-all ${
                  tone === 'urgente' ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-700'
                }`}
              >
                Urgente ⚠️
              </button>
              <button
                type="button"
                onClick={() => { setTone('corporativo'); handleGenerate('corporativo'); }}
                className={`p-2 rounded-xl border font-bold text-center transition-all ${
                  tone === 'corporativo' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700'
                }`}
              >
                Corporativo 💼
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Copy Gerada pela IA</label>
            <textarea
              rows={4}
              value={copyText || 'Clique no tom de voz acima para gerar a mensagem com Inteligência Artificial...'}
              onChange={(e) => setCopyText(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium leading-relaxed"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleCopy}
              disabled={!copyText}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={() => { onSendCopy(copyText); onClose(); }}
              disabled={!copyText}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Disparar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
