import React, { useState } from "react";
import {
  Heart,
  LoaderCircle,
} from "lucide-react";

import { useFavorites } from "../hooks/useFavorites";

export default function FavoriteButton({
  itemId,
  label = true,
  size = "default",
  className = "",
}) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const [pending, setPending] =
    useState(false);

  const favorite =
    isFavorite(itemId);

  const sizeClasses = {
    icon: "h-9 w-9",
    default: "h-11 px-4",
  };

  async function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    setPending(true);

    try {
      await toggleFavorite(itemId);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={handleClick}
      aria-label={
        favorite
          ? "Remover dos favoritos"
          : "Adicionar aos favoritos"
      }
      aria-pressed={favorite}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
        favorite
          ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      {pending ? (
        <LoaderCircle
          size={18}
          className="animate-spin"
          aria-hidden="true"
        />
      ) : (
        <Heart
          size={18}
          className={
            favorite
              ? "fill-current"
              : ""
          }
          aria-hidden="true"
        />
      )}

      {label &&
        (favorite
          ? "Favoritado"
          : "Favoritar")}
    </button>
  );
}
