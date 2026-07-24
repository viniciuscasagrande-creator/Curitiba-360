import { useState } from 'react';
import { User, X, CheckCircle2 } from 'lucide-react';

export default function AgentFormModal({ agencies, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    agencyId: agencies[0]?.id || '',
    language: 'Português',
    permissions: ['Emitir Ingressos'],
  });

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const selectedAgency = agencies.find((a) => a.id === formData.agencyId);
    onSubmit({
      ...formData,
      agencyName: selectedAgency?.tradeName || '',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl text-left space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <User size={18} className="text-emerald-600" />
            Cadastrar Novo Agente (B2B)
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Nome Completo *
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex.: Carlos Santos"
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                CPF *
              </label>
              <input
                required
                type="text"
                value={formData.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                Telefone Celular *
              </label>
              <input
                required
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(41) 90000-0000"
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              E-mail de Acesso *
            </label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="agente@agencia.com.br"
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              Agência Vinculada *
            </label>
            <select
              required
              value={formData.agencyId}
              onChange={(e) => handleChange('agencyId', e.target.value)}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
            >
              {agencies.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.tradeName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
            >
              <CheckCircle2 size={16} />
              Cadastrar Agente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
