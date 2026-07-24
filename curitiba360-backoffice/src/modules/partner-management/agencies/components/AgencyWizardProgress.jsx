import {
  Check,
} from 'lucide-react';

export default function AgencyWizardProgress({
  steps,
  currentStep,
  onStepChange,
}) {
  const percentage =
    steps.length <= 1
      ? 100
      : (currentStep /
          (steps.length - 1)) *
        100;

  return (
    <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-7 text-left">
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-300"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const completed =
            index < currentStep;

          const active =
            index === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() =>
                onStepChange(index)
              }
              className="flex min-w-max items-center gap-2"
            >
              <span
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-xl text-[10px] font-black transition',
                  active
                    ? 'bg-slate-900 text-white'
                    : completed
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-400',
                ].join(' ')}
              >
                {completed ? (
                  <Check size={14} />
                ) : (
                  index + 1
                )}
              </span>

              <span
                className={[
                  'text-xs font-black',
                  active
                    ? 'text-slate-900'
                    : completed
                      ? 'text-emerald-700'
                      : 'text-slate-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
