import React from "react";
import {
  BarChart3,
  Building2,
  CalendarDays,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Visão geral",
    to: "/parceiro/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Atrações e eventos",
    to: "/parceiro/produtos",
    icon: CalendarDays,
  },
  {
    label: "Pedidos",
    to: "/parceiro/pedidos",
    icon: ShoppingBag,
  },
  {
    label: "Financeiro",
    to: "/parceiro/dados-bancarios", // Map to bank account for safety
    icon: CreditCard,
  },
  {
    label: "Relatórios",
    to: "/parceiro/relatorios",
    icon: BarChart3,
  },
  {
    label: "Perfil comercial",
    to: "/parceiro/perfil",
    icon: Building2,
  },
  {
    label: "Documentos",
    to: "/parceiro/documentos",
    icon: FileText,
  },
  {
    label: "Equipe",
    to: "/parceiro/equipe",
    icon: Users,
  },
  {
    label: "Configurações",
    to: "/parceiro/configuracoes",
    icon: Settings,
  },
];

export default function PartnerLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-50 select-none text-left">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-white">
            <Building2 size={21} />
          </div>

          <div className="ml-3">
            <p className="font-bold text-slate-955 my-0">
              Curitiba 360
            </p>

            <p className="text-xs text-slate-500 my-0">
              Portal do Parceiro
            </p>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {menuItems.map(
            ({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition text-decoration-none",
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                  ].join(" ")
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 lg:hidden bg-white cursor-pointer"
          >
            <Menu size={20} />
          </button>

          <div className="ml-auto">
            <span className="text-sm font-semibold text-slate-700">
              Portal do Parceiro
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
