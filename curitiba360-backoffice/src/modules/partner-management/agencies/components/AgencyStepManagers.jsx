import { useState } from 'react';
import { Plus, Trash2, UserPlus } from 'lucide-react';
import { maskPhone } from '../utils/agencyFormMapper';

export default function AgencyStepManagers({ formData, onChange }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  function handleAddManager(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newManager = {
      id: `manager-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    onChange('managers', [...(formData.managers || []), newManager]);
    setName('');
    setEmail('');
    setPhone('');
  }

  function handleRemoveManager(id) {
    onChange('managers', (formData.managers || []).filter((m) => m.id !== id));
  }

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
        <UserPlus size={16} />
        Etapa 5 — Gestores Adicionais da Conta
      </h3>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <span className="block text-[10px] font-black uppercase text-slate-500">
          Adicionar Novo Gestor
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do gestor"
            className="rounded-xl border border-slate-200 p-2.5 text-xs font-bold text-slate-800 outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="rounded-xl border border-slate-200 p-2.5 text-xs font-bold text-slate-800 outline-none"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(maskPhone(e.target.value))}
            placeholder="Celular"
            className="rounded-xl border border-slate-200 p-2.5 text-xs font-bold text-slate-800 outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleAddManager}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-black text-white hover:bg-slate-800"
        >
          <Plus size={14} />
          Adicionar Gestor
        </button>
      </div>

      <div className="space-y-2">
        {(formData.managers || []).map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
            <div className="text-xs">
              <strong className="block text-slate-900">{m.name}</strong>
              <span className="text-slate-500">{m.email} &bull; {m.phone || 'Sem celular'}</span>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveManager(m.id)}
              className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
