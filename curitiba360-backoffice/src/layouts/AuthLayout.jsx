import React from "react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0d0f14] p-4 font-sans text-gray-100 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-800 bg-[#131720]/80 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 font-bold text-white text-2xl shadow-lg shadow-red-600/20">
            360
          </div>
          <h1 className="mt-4 text-xl font-bold tracking-tight text-white">Curitiba 360</h1>
          <p className="text-sm text-gray-400">Portal de Identidade do Cidadão</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
