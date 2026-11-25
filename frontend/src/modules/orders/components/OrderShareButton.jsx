import React from "react";
import { Share2 } from "lucide-react";

export default function OrderShareButton({ order = {} }) {
  const handleShare = async () => {
    const mainItem = order?.items?.[0] || {};
    const text = `Meu pedido ${order.code} para ${mainItem.title} está confirmado no Curitiba 360!`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Curitiba 360",
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        window.alert("Detalhes do pedido copiados para a área de transferência!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
    >
      <Share2 size={16} />
      Compartilhar Pedido
    </button>
  );
}
