import React, { useState } from 'react';
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Globe
} from 'lucide-react';

export function CouponQRCodeDialog({ coupon, onClose }) {
  if (!coupon) return null;

  const [copied, setCopied] = useState(false);
  const promoUrl = `https://curitiba360.com.br/atracao/${coupon.attractionId || 'opera-de-arame'}?cupom=${coupon.code || coupon.name}`;

  function handleCopy() {
    navigator.clipboard.writeText(promoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleDownload(format) {
    window.alert(`Download do QR Code do cupom ${coupon.code || coupon.name} em formato .${format} iniciado.`);
  }

  function handleShare(channel) {
    if (channel === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Aproveite o cupom de desconto no Curitiba 360: ${promoUrl}`)}`, '_blank');
    } else if (channel === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(promoUrl)}`, '_blank');
    } else if (channel === 'instagram') {
      handleCopy();
      window.alert('Link copiado! Cole na sua história ou publicação do Instagram.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-fade-in text-left">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <QrCode size={20} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">WF-022 &bull; QR Code do Cupom</p>
              <h3 className="text-base font-black text-slate-900">{coupon.name || coupon.code}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-4">
            <div className="text-center space-y-1">
              <QrCode size={110} className="mx-auto text-emerald-800" />
              <span className="text-[10px] font-mono font-bold text-emerald-700 block">{coupon.code || coupon.name}</span>
              <span className="inline-block rounded-md bg-emerald-600 text-white px-2 py-0.5 text-[9px] font-extrabold">
                {coupon.discountValue ? `R$ ${coupon.discountValue} OFF` : `${coupon.discountPercent || 15}% OFF`}
              </span>
            </div>
          </div>

          {/* Copyable Link Bar */}
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 text-xs">
            <input
              type="text"
              readOnly
              value={promoUrl}
              className="w-full bg-transparent text-[11px] font-mono font-medium text-slate-600 outline-none px-2 truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-8 shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3 text-[11px] font-bold text-white hover:bg-slate-800 transition"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        {/* Download & Share Actions */}
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDownload('png')}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-2.5 font-bold text-slate-700 hover:bg-slate-50"
            >
              <Download size={15} className="text-emerald-600" />
              Download PNG
            </button>
            <button
              type="button"
              onClick={() => handleDownload('svg')}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-2.5 font-bold text-slate-700 hover:bg-slate-50"
            >
              <Download size={15} className="text-blue-600" />
              Download SVG
            </button>
          </div>

          {/* Social Media Share buttons */}
          <div className="border-t border-slate-100 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              Compartilhar Campanha
            </span>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleShare('whatsapp')}
                className="flex h-10 items-center gap-1.5 rounded-2xl bg-emerald-500 text-white px-3 text-xs font-bold hover:bg-emerald-600 shadow-xs"
                title="WhatsApp"
              >
                <MessageCircle size={16} />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleShare('instagram')}
                className="flex h-10 items-center gap-1.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white px-3 text-xs font-bold hover:opacity-90 shadow-xs"
                title="Instagram"
              >
                <Share2 size={16} />
                Instagram
              </button>
              <button
                type="button"
                onClick={() => handleShare('facebook')}
                className="flex h-10 items-center gap-1.5 rounded-2xl bg-blue-600 text-white px-3 text-xs font-bold hover:bg-blue-700 shadow-xs"
                title="Facebook"
              >
                <Globe size={16} />
                Facebook
              </button>
            </div>
            <div className="pt-2 text-center">
              <a
                href={promoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
              >
                <ExternalLink size={14} />
                Abrir Landing Page da Atração
              </a>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 rounded-2xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default CouponQRCodeDialog;
