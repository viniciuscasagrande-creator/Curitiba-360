import { useEffect } from 'react';
import { X } from 'lucide-react';

import AgentFilters from './AgentFilters';

export function AgentFilterDrawer({
  open = false,
  filters = {},
  agencies = [],
  cities = [],
  loading = false,

  statusOptions,
  availabilityOptions,
  typeOptions,
  specialtyOptions,
  stateOptions,

  onChange,
  onApply,
  onReset,
  onClose,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose?.();
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={[
        'fixed inset-0 z-[100]',
        'flex justify-end',
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Filtros de agentes"
    >
      <button
        type="button"
        aria-label="Fechar filtros"
        onClick={onClose}
        className={[
          'absolute inset-0',
          'bg-slate-950/50',
          'backdrop-blur-sm',
          'transition-opacity',
        ].join(' ')}
      />

      <aside
        className={[
          'relative z-10 text-left',
          'h-full w-full',
          'max-w-xl',
          'overflow-hidden',
          'bg-white',
          'shadow-2xl',
          'animate-in',
          'slide-in-from-right',
          'duration-300',
        ].join(' ')}
      >
        <AgentFilters
          filters={filters}
          agencies={agencies}
          cities={cities}
          disabled={loading}
          statusOptions={statusOptions}
          availabilityOptions={
            availabilityOptions
          }
          typeOptions={typeOptions}
          specialtyOptions={
            specialtyOptions
          }
          stateOptions={stateOptions}
          onChange={onChange}
          onApply={onApply}
          onReset={onReset}
          onClose={onClose}
        />
      </aside>

      <button
        type="button"
        aria-label="Fechar painel"
        onClick={onClose}
        className={[
          'absolute right-3 top-3',
          'z-20 hidden h-10 w-10',
          'items-center justify-center',
          'rounded-xl',
          'bg-white',
          'text-slate-500',
          'shadow-lg',
          'transition-colors',
          'hover:text-slate-900',
          'sm:flex',
          'lg:hidden',
        ].join(' ')}
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default AgentFilterDrawer;
