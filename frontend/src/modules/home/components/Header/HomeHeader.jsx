import React from "react";
import { Heart, User, MapPin, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../auth";

export default function HomeHeader({ favoritesCount = 0 }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 py-3 select-none">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-decoration-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-lg shadow-md shadow-emerald-100">
            C
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-slate-900 leading-none block">
              Curitiba<span className="text-emerald-600">360</span>
            </span>
            <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500 font-medium">
              <MapPin size={10} className="text-emerald-600" />
              <span>Curitiba, PR</span>
            </div>
          </div>
        </Link>

        {/* Shortcuts */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
            aria-label="Notificações"
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-600"></span>
          </button>

          {/* Favorites */}
          <Link
            to="/favoritos"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-600 transition hover:bg-slate-100"
            aria-label="Favoritos"
          >
            <Heart size={18} />
            {favoritesCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* User Profile */}
          <Link
            to={user ? "/perfil" : "/login"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-600 transition hover:bg-slate-100 overflow-hidden"
            aria-label="Perfil"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="h-full w-full object-cover" />
            ) : (
              <User size={18} />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
