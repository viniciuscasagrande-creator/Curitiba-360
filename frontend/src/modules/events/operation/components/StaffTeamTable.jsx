import React, { useState } from 'react';
import { Users, Plus, Phone, CheckCircle2 } from 'lucide-react';

export default function StaffTeamTable({ equipe = [], onAddStaff }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nome: '', funcao: '', setor: 'Segurança', telefone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddStaff) onAddStaff(form);
    setShowModal(false);
    setForm({ nome: '', funcao: '', setor: 'Segurança', telefone: '' });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" /> Equipe Operacional & Staff Alocado
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Profissionais em atividade no evento.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Profissional
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3">Nome / Profissional</th>
              <th className="p-3">Função / Cargo</th>
              <th className="p-3">Setor</th>
              <th className="p-3">Telefone Contato</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {equipe.map((stf) => (
              <tr key={stf.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-extrabold text-slate-900">{stf.nome}</td>
                <td className="p-3 font-semibold text-purple-800">{stf.funcao}</td>
                <td className="p-3 font-bold text-slate-600">{stf.setor}</td>
                <td className="p-3 font-mono text-[11px] flex items-center gap-1 text-slate-500">
                  <Phone className="w-3 h-3 text-slate-400" /> {stf.telefone}
                </td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                    stf.status === 'presente' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {stf.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Alocar Novo Profissional na Equipe</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Função / Cargo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Agente de Portaria"
                  value={form.funcao}
                  onChange={(e) => setForm({ ...form, funcao: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Setor</label>
                <select
                  value={form.setor}
                  onChange={(e) => setForm({ ...form, setor: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                >
                  <option value="Segurança">Segurança</option>
                  <option value="Atendimento">Atendimento & Credenciamento</option>
                  <option value="Produção">Produção & Som</option>
                  <option value="Limpeza">Limpeza & Conservação</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Telefone WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="(41) 99999-0000"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded shadow-sm">Salvar Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
