import { Landmark } from 'lucide-react';

export default function AgencyBankCard({ agency }) {
  if (!agency) return null;

  const bank = agency.bankAccount || {};
  const hasBank = bank.bankName || agency.bank;

  if (!hasBank) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400 font-medium italic">
        Dados bancários ainda não cadastrados para esta agência.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-left">
      <h4 className="font-black text-slate-800 flex items-center gap-2">
        <Landmark size={15} className="text-emerald-600" />
        Conta Bancária Oficial
      </h4>
      <p><strong>Banco:</strong> {bank.bankName || agency.bank} ({bank.bankCode || agency.bankCode})</p>
      <p><strong>Tipo de Conta:</strong> {bank.accountType || agency.accountType || 'Corrente'}</p>
      <p><strong>Agência:</strong> {bank.agency || agency.agency} &bull; <strong>Conta:</strong> {bank.account || agency.account}</p>
      <p><strong>Titular da Conta:</strong> {bank.holder || agency.bankHolder || agency.corporateName}</p>
      <p><strong>CPF/CNPJ Titular:</strong> {bank.holderDocument || agency.cnpj}</p>
    </div>
  );
}
