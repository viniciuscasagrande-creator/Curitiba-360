import {
  BadgeCheck,
  Building2,
  CreditCard,
  FileText,
  Landmark,
  UserRound,
} from 'lucide-react';

export default function WithdrawalBankAccount({
  account,
}) {
  const fields = [
    {
      icon: Landmark,
      label: 'Banco',
      value: `${account.bankCode} · ${account.bank}`,
    },
    {
      icon: Building2,
      label: 'Agência',
      value: account.agency,
    },
    {
      icon: CreditCard,
      label: 'Conta',
      value: `${account.account} · ${account.accountType}`,
    },
    {
      icon: UserRound,
      label: 'Titular',
      value: account.holder,
    },
    {
      icon: FileText,
      label: 'Documento',
      value: account.document,
    },
  ];

  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm text-left">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900">
            Conta para recebimento
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Dados bancários utilizados nos repasses.
          </p>
        </div>

        {account.verified && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-700">
            <BadgeCheck size={13} />
            Verificada
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {fields.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
              <Icon size={16} />
            </span>

            <div className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
                {label}
              </span>

              <strong className="mt-1 block break-words text-sm font-black text-slate-700">
                {value}
              </strong>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <span className="block text-[10px] font-black uppercase tracking-[0.08em] text-emerald-600">
          Chave Pix · {account.pixKeyType}
        </span>

        <strong className="mt-1 block break-all text-sm font-black text-emerald-800">
          {account.pixKey}
        </strong>
      </div>
    </article>
  );
}
