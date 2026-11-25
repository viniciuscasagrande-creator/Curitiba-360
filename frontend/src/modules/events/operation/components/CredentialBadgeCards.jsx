import React, { useState } from 'react';
import { ShieldCheck, QrCode, Plus } from 'lucide-react';

export default function CredentialBadgeCards({ badges = [], onIssueCredential }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ titular: '', tipo: 'Staff / Produção', nivelAcesso: 'Acesso Livre' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onIssueCredential) onIssueCredential(form);
    setShowModal(false);
    setForm({ titular: '', tipo: 'Staff / Produção', nivelAcesso: 'Acesso Livre' });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <QrCode className="w-4 h-4 text-purple-600" /> Credenciamento & Badges de Acesso
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Emissão de crachás com QR Code para imprensa, VIPs e staff.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Emitir Credencial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {badges.map((crd) => (
          <div key={crd.id} className="p-3.5 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-purple-300 font-bold">{crd.id}</span>
              <span className="px-2 py-0.5 rounded bg-purple-800 text-purple-200 font-bold text-[9px]">
                {crd.tipo}
              </span>
            </div>

            <div className="font-extrabold text-white text-xs">{crd.titular}</div>
            <div className="text-[10px] text-slate-300 font-medium">Nível: <b>{crd.nivelAcesso}</b></div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono text-emerald-400 font-bold">
              <span>QR: {crd.qrCode}</span>
              <span>✓ Emitido</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
            <h3 className="text-base font-bold text-slate-900">Emitir Nova Credencial de Acesso</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Titular</label>
                <input
                  type="text"
                  required
                  value={form.titular}
                  onChange={(e) => setForm({ ...form, titular: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tipo de Credencial</label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                >
                  <option value="Staff / Produção">Staff / Produção</option>
                  <option value="Imprensa / Mídia">Imprensa / Mídia</option>
                  <option value="Convidade VIP">Convidado VIP</option>
                  <option value="Fornecedor">Fornecedor</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded shadow-sm">Gerar Credencial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
