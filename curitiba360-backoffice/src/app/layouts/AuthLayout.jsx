import React from "react";
import { Link } from "react-router-dom";

import { cn } from "../../utils/cn";

export default function AuthLayout({
  children,
  className,
  showBrand = true,
  showFooter = true,
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[30rem] flex-col bg-white px-6 py-8 sm:min-h-0 sm:my-8 sm:rounded-3xl sm:border sm:border-slate-200 sm:px-8 sm:shadow-lg">
        {showBrand && (
          <header className="mb-10">
            <Link
              to="/"
              aria-label="Ir para a página inicial"
              className="inline-flex items-center gap-3 text-decoration-none"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-sm font-bold text-white select-none">
                360
              </div>

              <div className="text-left">
                <p className="text-lg font-bold leading-none text-slate-955 my-0">
                  Curitiba 360
                </p>

                <p className="mt-1.5 text-xs text-slate-500 my-0 select-none">
                  Descubra Curitiba por completo
                </p>
              </div>
            </Link>
          </header>
        )}

        <div className={cn("flex-1", className)}>
          {children}
        </div>

        {showFooter && (
          <footer className="mt-10 border-t border-slate-100 pt-6 text-center select-none">
            <p className="text-xs leading-5 text-slate-500 my-0">
              Ao continuar, você concorda com os{" "}
              <Link
                to="/termos"
                className="font-medium text-emerald-700 hover:text-emerald-800 text-decoration-none"
              >
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link
                to="/privacidade"
                className="font-medium text-emerald-700 hover:text-emerald-800 text-decoration-none"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </footer>
        )}
      </div>
    </main>
  );
}
