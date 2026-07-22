import React, { useState } from "react";
import {
  Check,
  MapPin,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";

import FavoriteButton from "../../favorites/components/FavoriteButton";

export default function DetailActions({
  item,
}) {
  const [copied, setCopied] =
    useState(false);

  async function shareItem() {
    const shareData = {
      title: item.title,
      text: item.subtitle,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(
          shareData
        );

        return;
      }

      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-wrap gap-3 text-left select-none">
      <FavoriteButton
        itemId={item.id}
      />

      <button
        type="button"
        onClick={shareItem}
        className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
      >
        {copied ? (
          <Check size={18} />
        ) : (
          <Share2 size={18} />
        )}

        {copied
          ? "Link copiado"
          : "Compartilhar"}
      </button>

      <Link
        to={`/mapa?local=${encodeURIComponent(
          item.id
        )}`}
        className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 text-decoration-none"
      >
        <MapPin size={18} />

        Ver no mapa
      </Link>
    </div>
  );
}
