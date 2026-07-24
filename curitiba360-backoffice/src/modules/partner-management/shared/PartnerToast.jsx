import { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function PartnerToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-2xl transition-all animate-in slide-in-from-bottom-5">
      {isError ? (
        <XCircle className="text-rose-500 shrink-0" size={20} />
      ) : (
        <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
      )}
      <div className="text-xs text-left">
        <strong className="block font-black">{isError ? 'Atenção' : 'Sucesso'}</strong>
        <span className="font-medium text-slate-300">{toast.message}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="ml-3 text-slate-400 hover:text-white p-1"
      >
        <X size={16} />
      </button>
    </div>
  );
}
