export default function AgencyStepBank({ formData, onChange }) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
        Etapa 4 — Dados Bancários & PIX
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Nome do Banco
          </label>
          <input
            type="text"
            value={formData.bankName}
            onChange={(e) => onChange('bankName', e.target.value)}
            placeholder="Banco do Brasil, Santander, Itaú..."
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Código do Banco
          </label>
          <input
            type="text"
            value={formData.bankCode}
            onChange={(e) => onChange('bankCode', e.target.value)}
            placeholder="001, 033, 341..."
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Agência Bancária
          </label>
          <input
            type="text"
            value={formData.agency}
            onChange={(e) => onChange('agency', e.target.value)}
            placeholder="0001"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Número da Conta
          </label>
          <input
            type="text"
            value={formData.account}
            onChange={(e) => onChange('account', e.target.value)}
            placeholder="123456-7"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Tipo de Conta
          </label>
          <select
            value={formData.accountType}
            onChange={(e) => onChange('accountType', e.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500 bg-white"
          >
            <option value="Corrente">Conta Corrente</option>
            <option value="Poupança">Conta Poupança</option>
            <option value="Pagamento">Conta de Pagamento</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Tipo da Chave PIX
          </label>
          <select
            value={formData.pixKeyType}
            onChange={(e) => onChange('pixKeyType', e.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500 bg-white"
          >
            <option value="CNPJ">CNPJ</option>
            <option value="E-mail">E-mail</option>
            <option value="Telefone">Telefone</option>
            <option value="Chave Aleatória">Chave Aleatória</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
            Chave PIX
          </label>
          <input
            type="text"
            value={formData.pixKey}
            onChange={(e) => onChange('pixKey', e.target.value)}
            placeholder="Informe a chave PIX principal"
            className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-bold text-slate-800 outline-none focus:border-slate-500 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
