import { maskCnpj, maskPhone } from '../utils/agencyFormMapper';

export default function AgencyStepCompany({ formData, errors, onChange }) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
        Etapa 1 — Dados da Empresa
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Nome Fantasia *
          </label>
          <input
            type="text"
            required
            value={formData.tradeName}
            onChange={(e) => onChange('tradeName', e.target.value)}
            placeholder="Ex.: Curitiba Tour Agencia"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.tradeName && <span className="text-[10px] text-rose-600 font-bold">{errors.tradeName}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Razão Social *
          </label>
          <input
            type="text"
            required
            value={formData.corporateName}
            onChange={(e) => onChange('corporateName', e.target.value)}
            placeholder="Ex.: Curitiba Turismo Serviços Ltda"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.corporateName && <span className="text-[10px] text-rose-600 font-bold">{errors.corporateName}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            CNPJ *
          </label>
          <input
            type="text"
            required
            value={formData.cnpj}
            onChange={(e) => onChange('cnpj', maskCnpj(e.target.value))}
            placeholder="00.000.000/0001-00"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
          {errors.cnpj && <span className="text-[10px] text-rose-600 font-bold">{errors.cnpj}</span>}
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Inscrição Estadual
          </label>
          <input
            type="text"
            value={formData.stateRegistration}
            onChange={(e) => onChange('stateRegistration', e.target.value)}
            placeholder="Isento ou Número"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Tipo de Empresa
          </label>
          <select
            value={formData.companyType}
            onChange={(e) => onChange('companyType', e.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500 bg-white"
          >
            <option value="Empresa de Pequeno Porte">Empresa de Pequeno Porte (EPP)</option>
            <option value="Microempresa">Microempresa (ME)</option>
            <option value="Sociedade Limitada">Sociedade Limitada (Ltda)</option>
            <option value="Sociedade Anônima">Sociedade Anônima (S.A.)</option>
            <option value="MEI">Microempreendedor Individual (MEI)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Website URL
          </label>
          <input
            type="url"
            value={formData.site}
            onChange={(e) => onChange('site', e.target.value)}
            placeholder="https://suaempresa.com.br"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Telefone Comercial
          </label>
          <input
            type="text"
            value={formData.commercialPhone}
            onChange={(e) => onChange('commercialPhone', maskPhone(e.target.value))}
            placeholder="(41) 3333-4444"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>
      </div>
    </div>
  );
}
