import {
  Ban,
  CheckCircle2,
  Edit3,
  Eye,
  MoreHorizontal,
  PauseCircle,
  RotateCcw,
  Trash2,
  XCircle,
} from 'lucide-react';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

export default function AgencyRowActions({
  agency,
  onView,
  onEdit,
  onApprove,
  onReject,
  onSuspend,
  onInactivate,
  onReactivate,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const menuReference = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuReference.current &&
        !menuReference.current.contains(
          event.target,
        )
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    document.addEventListener(
      'keydown',
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );

      document.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, []);

  function runAction(action) {
    setOpen(false);
    action?.(agency);
  }

  const pending =
    agency.status ===
    'Pendente de Aprovação';

  const inactive =
    agency.status === 'Inativa';

  const suspended =
    agency.status === 'Suspensa';

  return (
    <div
      ref={menuReference}
      className="relative flex justify-end"
    >
      <button
        type="button"
        title="Ações"
        onClick={() =>
          setOpen((current) => !current)
        }
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
      >
        <MoreHorizontal size={17} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-40 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 text-left">
          <ActionButton
            icon={Eye}
            label="Visualizar detalhes"
            onClick={() =>
              runAction(onView)
            }
          />

          <ActionButton
            icon={Edit3}
            label="Editar agência"
            onClick={() =>
              runAction(onEdit)
            }
          />

          {pending && (
            <>
              <MenuDivider />

              <ActionButton
                icon={CheckCircle2}
                label="Aprovar agência"
                className="text-emerald-700 hover:bg-emerald-50"
                onClick={() =>
                  runAction(onApprove)
                }
              />

              <ActionButton
                icon={XCircle}
                label="Rejeitar agência"
                className="text-red-700 hover:bg-red-50"
                onClick={() =>
                  runAction(onReject)
                }
              />
            </>
          )}

          {!inactive &&
            !suspended &&
            !pending && (
              <>
                <MenuDivider />

                <ActionButton
                  icon={PauseCircle}
                  label="Suspender agência"
                  className="text-orange-700 hover:bg-orange-50"
                  onClick={() =>
                    runAction(onSuspend)
                  }
                />

                <ActionButton
                  icon={Ban}
                  label="Inativar agência"
                  onClick={() =>
                    runAction(onInactivate)
                  }
                />
              </>
            )}

          {(inactive || suspended) && (
            <>
              <MenuDivider />

              <ActionButton
                icon={RotateCcw}
                label="Reativar agência"
                className="text-emerald-700 hover:bg-emerald-50"
                onClick={() =>
                  runAction(onReactivate)
                }
              />
            </>
          )}

          <MenuDivider />

          <ActionButton
            icon={Trash2}
            label="Excluir agência"
            className="text-red-700 hover:bg-red-50"
            onClick={() =>
              runAction(onDelete)
            }
          />
        </div>
      )}
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  className = '',
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-black text-slate-600 transition hover:bg-slate-100 hover:text-slate-900',
        className,
      ].join(' ')}
    >
      <Icon size={15} />

      {label}
    </button>
  );
}

function MenuDivider() {
  return (
    <div className="my-1.5 h-px bg-slate-100" />
  );
}
