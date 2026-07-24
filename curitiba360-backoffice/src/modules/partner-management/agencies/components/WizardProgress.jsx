import { Check } from 'lucide-react';

const STEPS = [
  { number: 1, title: 'Empresa' },
  { number: 2, title: 'Responsável' },
  { number: 3, title: 'Endereço' },
  { number: 4, title: 'Bancos' },
  { number: 5, title: 'Gestores' },
  { number: 6, title: 'Documentos' },
  { number: 7, title: 'Revisão' },
];

export default function WizardProgress({ currentStep, onSelectStep }) {
  const percentage = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="space-y-3 bg-white p-5 border-b border-slate-200 text-left">
      <div className="flex items-center justify-between text-xs">
        <span className="font-black text-slate-900">Progresso do Cadastro</span>
        <span className="font-mono font-bold text-emerald-600">{percentage}% Concluído</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between overflow-x-auto gap-2 pt-2">
        {STEPS.map((step) => {
          const isDone = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => onSelectStep && onSelectStep(step.number)}
              className="flex items-center gap-1.5 focus:outline-none whitespace-nowrap"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black transition ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-slate-900 text-white ring-4 ring-slate-900/10'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? <Check size={12} /> : step.number}
              </span>
              <span
                className={`text-xs font-bold ${
                  isCurrent ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
