import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Globe, Send } from 'lucide-react';

export function ShareButton({ title, url = window.location.href, className = '' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `Confira este evento incrível no Curitiba 360: ${title || 'Evento Curitiba 360'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${url}`)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`p-2 rounded-full bg-black/40 text-slate-300 hover:text-white border border-white/10 hover:bg-black/60 transition-all ${className}`}
        title="Compartilhar evento"
      >
        <Share2 size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
          <div className="text-xs font-semibold text-slate-400 px-3 py-1.5 border-b border-slate-800">
            Compartilhar via
          </div>
          <div className="py-1 space-y-1">
            <button
              onClick={shareWhatsapp}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors text-left"
            >
              <MessageCircle size={16} /> WhatsApp
            </button>
            <button
              onClick={shareFacebook}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors text-left"
            >
              <Globe size={16} /> Facebook
            </button>
            <button
              onClick={shareTwitter}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors text-left"
            >
              <Send size={16} /> X (Twitter)
            </button>
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors text-left"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {copied ? 'Link Copiado!' : 'Copiar Link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default ShareButton;
