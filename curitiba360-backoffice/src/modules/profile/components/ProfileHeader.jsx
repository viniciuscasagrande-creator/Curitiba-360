import React from "react";
import {
  BadgeCheck,
  MailWarning,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";

import ProfileAvatar from "./ProfileAvatar";

export default function ProfileHeader({
  profile,
  saving,
  onPhotoChange,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm select-none">
      <div className="h-28 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-600" />

      <div className="px-5 pb-6 sm:px-7 text-left">
        <div className="-mt-14 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:text-left">
          <ProfileAvatar
            name={profile.name}
            photoURL={
              profile.photoURL
            }
            editable
            loading={saving}
            onPhotoChange={
              onPhotoChange
            }
          />

          <div className="min-w-0 flex-1 pb-1">
            <h1 className="truncate text-2xl font-bold text-slate-950 sm:text-3xl my-0">
              {profile.name}
            </h1>

            <p className="mt-1 truncate text-sm text-slate-500 my-0">
              {profile.email}
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              {profile.verified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <BadgeCheck size={15} />
                  Conta verificada
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <MailWarning size={15} />
                  E-mail não verificado
                </span>
              )}

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                {profile.role === "user"
                  ? "Visitante"
                  : profile.role}
              </span>
            </div>
          </div>

          <Link
            to="/perfil/dados-pessoais"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:w-auto text-decoration-none"
          >
            <Pencil size={16} />
            Editar perfil
          </Link>
        </div>
      </div>
    </section>
  );
}
