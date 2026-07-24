import { Search } from 'lucide-react';
import { maskCep } from '../utils/agencyFormMapper';

export default function AgencyStepAddress({ formData, errors, isSearchingCep, onChange, onSearchCep }) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
        Etapa 3 — Endereço da Sede
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            CEP (Busca Automática)
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => {
                const val = maskCep(e.target.value);
                onChange('zipCode', val);
                if (val.replace(/\D/g, '').length === 8) {
                  onSearchCep(val);
                }
              }}
              placeholder="80000-000"
              className="w-full rounded-2xl border border-slate-200 p-3 pr-10 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {isSearchingCep ? <span className="animate-spin text-xs">🌀</span> : <Search size={16} />}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Bairro
          </label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => onChange('district', e.target.value)}
            placeholder="Ex.: Centro"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Rua / Logradouro
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => onChange('street', e.target.value)}
            placeholder="Rua XV de Novembro"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Número
          </label>
          <input
            type="text"
            value={formData.number}
            onChange={(e) => onChange('number', e.target.value)}
            placeholder="123"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Complemento
          </label>
          <input
            type="text"
            value={formData.complement}
            onChange={(e) => onChange('complement', e.target.value)}
            placeholder="Sala 402, Bloco B"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Cidade *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Curitiba"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.city && <span className="text-[10px] text-rose-600 font-bold">{errors.city}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Estado (UF) *
          </label>
          <input
            type="text"
            required
            maxLength={2}
            value={formData.state}
            onChange={(e) => onChange('state', e.target.value.toUpperCase())}
            placeholder="PR"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500 uppercase"
          />
          {errors.state && <span className="text-[10px] text-rose-600 font-bold">{errors.state}</span>}
        </div>
      </div>
    </div>
  );
}
