import {
  Building2,
  CalendarDays,
  FileText,
  Landmark,
  UserRound,
  X,
} from 'lucide-react';

import ApprovalStatusBadge from './ApprovalStatusBadge';
import ApprovalTimeline from './ApprovalTimeline';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function ApprovalDetailsDrawer({
  approval,
  onClose,
  onAction,
}) {
  if (!approval) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Fechar detalhes"
        onClick={onClose}
        className="absolute inset-0"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto bg-slate-50 shadow-2xl text-left">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-black text-slate-950">
                  {approval.reference}
                </h2>

                <ApprovalStatusBadge
                  status={approval.status}
                />
              </div>

              <p className="mt-2 text-xs font-bold text-slate-500">
                Solicitado em{' '}
                {formatDateTime(
                  approval.requestDate,
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        <div className="space-y-6 p-6">
          <section className="grid grid-cols-2 gap-3">
            <ValueCard
              label="Valor solicitado"
              value={formatCurrency(
                approval.amount,
              )}
            />

            <ValueCard
              label="Valor líquido"
              value={formatCurrency(
                approval.netAmount,
              )}
              highlighted
            />
          </section>

          <Section title="Produtor e evento">
            <Information
              icon={Building2}
              label="Produtor"
              value={approval.producerName}
            />

            <Information
              icon={CalendarDays}
              label="Evento"
              value={approval.eventName}
            />

            <Information
              icon={UserRound}
              label="Solicitado por"
              value={approval.requestedBy}
            />

            <Information
              icon={FileText}
              label="Borderô"
              value={
                approval.borderoReference
              }
            />
          </Section>

          <Section title="Dados bancários">
            <Information
              icon={Landmark}
              label="Banco"
              value={`${approval.bankCode} · ${approval.bank}`}
            />

            <Information
              icon={Building2}
              label="Agência e conta"
              value={`Agência ${approval.agency} · Conta ${approval.account}`}
            />

            <Information
              icon={UserRound}
              label="Titular"
              value={approval.holder}
            />

            <Information
              icon={FileText}
              label="Documento"
              value={approval.document}
            />
          </Section>

          <Section title="Timeline">
            <ApprovalTimeline
              items={approval.timeline}
            />
          </Section>

          <Section title="Observações">
            <div className="rounded-2xl bg-slate-50 p-4">
              <span className="text-[10px] font-black uppercase text-slate-400">
                Produtor
              </span>

              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {approval.producerObservation ||
                  'Nenhuma observação informada.'}
              </p>
            </div>

            <div className="mt-3 rounded-2xl bg-amber-50 p-4">
              <span className="text-[10px] font-black uppercase text-amber-600">
                Financeiro
              </span>

              <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
                {approval.internalObservation ||
                  'Nenhuma observação interna.'}
              </p>
            </div>
          </Section>
        </div>

        <footer className="sticky bottom-0 border-t border-slate-200 bg-white/95 p-5 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {['Aprovado', 'Rejeitado'].map(
              (action) => (
                <ActionButton
                  key={action}
                  label={
                    action === 'Aprovado'
                      ? 'Aprovar'
                      : 'Rejeitar'
                  }
                  onClick={() =>
                    onAction(action)
                  }
                />
              ),
            )}

            <ActionButton
              label="Solicitar ajuste"
              onClick={() =>
                onAction(
                  'Ajuste solicitado',
                )
              }
            />

            <ActionButton
              label="Marcar pago"
              onClick={() =>
                onAction('Pago')
              }
            />
          </div>
        </footer>
      </aside>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-black text-slate-900">
        {title}
      </h3>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}

function Information({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500">
        <Icon size={15} />
      </span>

      <div>
        <span className="block text-[9px] font-black uppercase tracking-[0.06em] text-slate-400">
          {label}
        </span>

        <strong className="mt-1 block text-sm font-black text-slate-700">
          {value}
        </strong>
      </div>
    </div>
  );
}

function ValueCard({
  label,
  value,
  highlighted = false,
}) {
  return (
    <article
      className={[
        'rounded-2xl border p-4',
        highlighted
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-slate-200 bg-white',
      ].join(' ')}
    >
      <span className="text-[10px] font-black uppercase text-slate-400">
        {label}
      </span>

      <strong
        className={[
          'mt-2 block text-xl font-black',
          highlighted
            ? 'text-emerald-700'
            : 'text-slate-900',
        ].join(' ')}
      >
        {value}
      </strong>
    </article>
  );
}

function ActionButton({
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-[10px] font-black text-slate-700 hover:bg-slate-50"
    >
      {label}
    </button>
  );
}
