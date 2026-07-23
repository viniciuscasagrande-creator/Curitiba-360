import React, { useState } from 'react';
import { Tag, Copy, Check, Calendar } from 'lucide-react';

export function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between relative overflow-hidden">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Tag size={14} />
            {coupon.title}
          </span>
          <span className="text-[10px] text-slate-400">
            Validade: {coupon.expiresAt}
          </span>
        </div>

        <p className="text-xs text-slate-300">{coupon.description}</p>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-auto">
        <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs font-bold text-amber-400">
          {coupon.code}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? 'Copiado!' : 'Copiar Código'}
        </button>
      </div>
    </div>
  );
}
export default CouponCard;
