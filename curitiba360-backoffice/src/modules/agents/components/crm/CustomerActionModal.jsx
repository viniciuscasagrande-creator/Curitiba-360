import React, { useState } from 'react';
import { Send, X, MessageSquare, Tag, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function CustomerActionModal({ isOpen, onClose, customer = {}, onActionComplete }) {
  const [actionType, setActionType] = useState('whatsapp'); // whatsapp, cupom, chamada, nota
  const [mensagem, setMensagem] = useState('Olá! Temos uma oferta especial exclusiva para você...');
  const [cupomCodigo, setCupomCodigo] = useState('CWBVIP10');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !customer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      onActionComplete(actionType, { mensagem, cupomCodigo });
      setProcessing(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-slate-800">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-purple-600" /> Ação Comercial — {customer.nome}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alternador de Ação */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setActionType('whatsapp')}
            className={`p-2 rounded-xl border font-bold text-center transition-all flex items-center justify-center gap-1 ${
              actionType === 'whatsapp' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setActionType('cupom')}
            className={`p-2 rounded-xl border font-bold text-center transition-all flex items-center justify-center gap-1 ${
              actionType === 'cupom' ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-700'
            }`}
          >
            <Tag className="w-3.5 h-3.5" /> Cupom
          </button>
          <button
            type="button"
            onClick={() => setActionType('chamada')}
            className={`p-2 rounded-xl border font-bold text-center transition-all flex items-center justify-center gap-1 ${
              actionType === 'chamada' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700'
            }`}
          >
            <Phone className="w-3.5 h-3.5" /> Ligação
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {actionType === 'whatsapp' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mensagem WhatsApp ({customer.telefone})</label>
              <textarea
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          )}

          {actionType === 'cupom' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Código do Cupom de Desconto</label>
              <input
                type="text"
                value={cupomCodigo}
                onChange={(e) => setCupomCodigo(e.target.value.toUpperCase())}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-purple-700"
              />
            </div>
          )}

          {actionType === 'chamada' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Registro da Chamada / Notas de Reunião</label>
              <textarea
                rows={3}
                placeholder="Informe o resultado do contato com o cliente..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md"
            >
              {processing ? 'Enviando...' : 'Executar Ação Comercial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
