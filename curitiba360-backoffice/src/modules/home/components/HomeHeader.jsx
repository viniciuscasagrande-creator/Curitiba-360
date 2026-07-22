import React from "react";
import {
  Bell,
  Heart,
  MapPin,
  Menu,
  UserRound,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart";

export default function HomeHeader() {
  const { itemCount } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 text-decoration-none"
          aria-label="Curitiba 360"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold text-white shadow-sm">
            C360
          </div>

          <div className="hidden min-w-0 sm:block text-left">
            <p className="truncate text-sm font-bold text-slate-950 my-0">
              Curitiba 360
            </p>

            <div className="flex items-center gap-1 text-xs text-slate-500 my-0">
              <MapPin
                size={13}
                aria-hidden="true"
              />

              Curitiba, Paraná
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/favoritos"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 sm:flex text-decoration-none"
            aria-label="Favoritos"
          >
            <Heart
              size={20}
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 sm:flex border-none bg-transparent cursor-pointer"
            aria-label="Notificações"
          >
            <Bell
              size={20}
              aria-hidden="true"
            />
          </button>

          <Link
            to="/carrinho"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 text-decoration-none"
            aria-label={`Carrinho com ${itemCount} itens`}
          >
            <ShoppingCart size={20} aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[9px] font-bold text-white shadow-sm border border-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          <Link
            to="/perfil"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 text-decoration-none"
            aria-label="Perfil"
          >
            <UserRound
              size={20}
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 lg:hidden border-none bg-transparent cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu
              size={21}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
