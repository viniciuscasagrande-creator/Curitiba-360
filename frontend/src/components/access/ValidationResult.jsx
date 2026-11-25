import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function ValidationResult({ result }) {
  if (!result) {
    return null
  }

  const approved = result.status === 'approved'
  const warning = result.status === 'already_used'

  const Icon = approved
    ? CheckCircle
    : warning
      ? AlertTriangle
      : XCircle

  return (
    <div
      className={`
        mt-6 rounded-3xl p-8 text-center shadow-lg border
        ${
          approved
            ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100'
            : warning
              ? 'bg-amber-950/90 border-amber-500 text-amber-100'
              : 'bg-red-950/90 border-red-500 text-red-100'
        }
      `}
    >
      <Icon size={64} className="mx-auto" />

      <h2 className="mt-4 text-2xl font-black">
        {approved
          ? 'ACESSO LIBERADO'
          : warning
            ? 'INGRESSO JÁ UTILIZADO'
            : 'ACESSO NEGADO'}
      </h2>

      <p className="mt-2 font-medium opacity-90">{result.message}</p>

      {result.ticket && (
        <div className="mt-6 border-t border-white/10 pt-4 text-sm font-mono space-y-1">
          <p>Código: <strong className="font-bold text-white">{result.ticket.code}</strong></p>
          <p>Status: <strong className="uppercase">{result.ticket.status}</strong></p>
        </div>
      )}
    </div>
  )
}
