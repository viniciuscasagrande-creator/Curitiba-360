import { maskCpf, maskPhone } from '../utils/agencyFormMapper';

export default function AgencyStepResponsible({ formData, errors, onChange }) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
        Etapa 2 — Responsável Legal
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Nome Completo do Responsável *
          </label>
          <input
            type="text"
            required
            value={formData.responsibleName}
            onChange={(e) => onChange('responsibleName', e.target.value)}
            placeholder="Ex.: Maria Souza Lima"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.responsibleName && <span className="text-[10px] text-rose-600 font-bold">{errors.responsibleName}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            CPF *
          </label>
          <input
            type="text"
            required
            value={formData.responsibleCpf}
            onChange={(e) => onChange('responsibleCpf', maskCpf(e.target.value))}
            placeholder="000.000.000-00"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.responsibleCpf && <span className="text-[10px] text-rose-600 font-bold">{errors.responsibleCpf}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            E-mail de Contato *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="responsavel@suaempresa.com.br"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.email && <span className="text-[10px] text-rose-600 font-bold">{errors.email}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Telefone Celular *
          </label>
          <input
            type="text"
            required
            value={formData.responsiblePhone}
            onChange={(e) => onChange('responsiblePhone', maskPhone(e.target.value))}
            placeholder="(41) 99999-8888"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.responsiblePhone && <span className="text-[10px] text-rose-600 font-bold">{errors.responsiblePhone}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Cargo / Função
          </label>
          <input
            type="text"
            value={formData.responsibleRole}
            onChange={(e) => onChange('responsibleRole', e.target.value)}
            placeholder="Ex.: Diretor Executivo"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>
      </div>
    </div>
  );
}
