import React, { useState } from 'react';
import { AlertTriangle, Plus, Send } from 'lucide-react';

export default function StaffIncidentForm({ onRegisterIncident }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ tipo: 'Infraestrutura', descricao: '', gravidade: 'media' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegisterIncident) onRegisterIncident(form);
    setShowModal(false);
    setForm({ tipo: 'Infraestrutura', descricao: '', gravidade: 'media' });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Registro de Ocorrências em Campo
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded text-[10px] shadow-xs flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Reportar Ocorrência
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Reportar Nova Ocorrência
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tipo de Ocorrência</label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                >
                  <option value="Infraestrutura">Infraestrutura / Instalações</option>
                  <option value="Segurança">Segurança / Acesso Não Autorizado</option>
                  <option value="Atendimento">Atendimento / Suporte ao Cliente</option>
                  <option value="Limpeza">Limpeza / Conservação</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gravidade</label>
                <select
                  value={form.gravidade}
                  onChange={(e) => setForm({ ...form, gravidade: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                >
                  <option value="baixa">Baixa (Aviso)</option>
                  <option value="media">Média (Atenção Requerida)</option>
                  <option value="alta">Alta (Ação Imediata)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descrição Detalhada</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Relate o que ocorreu no setor..."
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-amber-600 text-white font-bold rounded shadow-sm flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" /> Enviar Alerta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
