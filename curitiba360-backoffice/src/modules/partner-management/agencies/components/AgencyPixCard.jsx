import { CreditCard } from 'lucide-react';

export default function AgencyPixCard({ agency }) {
  if (!agency) return null;

  const bank = agency.bankAccount || {};
  const pixKey = bank.pixKey || agency.pixKey;

  if (!pixKey) return null;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 space-y-1 text-xs text-left">
      <h4 className="font-black text-emerald-900 flex items-center gap-2">
        <CreditCard size={15} className="text-emerald-600" />
        Chave PIX Cadastrada ({bank.pixKeyType || agency.pixType || 'Chave'})
      </h4>
      <strong className="font-mono text-sm block font-black text-emerald-950">
        {pixKey}
      </strong>
    </div>
  );
}
