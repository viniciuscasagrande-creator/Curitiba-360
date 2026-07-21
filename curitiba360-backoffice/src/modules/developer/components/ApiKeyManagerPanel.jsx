import React, { useState } from 'react';
import { Key, Plus, Copy, CheckCircle2, Shield } from 'lucide-react';

export default function ApiKeyManagerPanel({ apiKeys = [], onCreateKey }) {
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [form, setForm] = useState({
    nome: '',
    parceiro: '',
    escopos: ['events:read', 'orders:read']
  });

  const handleCopy = (id, key) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCreateKey) onCreateKey(form);
    setShowModal(false);
    setForm({ nome: '', parceiro: '', escopos: ['events:read', 'orders:read'] });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Key className="w-3.5 h-3.5 text-purple-600" /> Chaves de API Pública (`x-api-key`)
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px] shadow-xs flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Gerar Nova API Key
        </button>
      </div>

      <div className="space-y-2">
        {apiKeys.map((k) => (
          <div key={k.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span>{k.nome} ({k.parceiro})</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px]">
                {k.status}
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200 font-mono text-[11px] text-purple-950 font-bold">
              <span>{k.key}</span>
              <button
                onClick={() => handleCopy(k.id, k.key)}
                className="p-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-sans text-[9px] flex items-center gap-1"
              >
                {copiedId === k.id ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedId === k.id ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            <div className="flex items-center gap-1 flex-wrap text-[9px] text-slate-500 font-mono">
              <span className="font-bold text-slate-700">Escopos:</span>
              {k.escopos.map((sc, i) => (
                <span key={i} className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-800 border border-purple-200">
                  {sc}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-purple-600" /> Gerar Nova Chave de API
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome da Aplicação</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Integração App Agência"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Parceiro / Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Guia Curitiba"
                  value={form.parceiro}
                  onChange={(e) => setForm({ ...form, parceiro: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded shadow-sm">
                  Gerar API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
