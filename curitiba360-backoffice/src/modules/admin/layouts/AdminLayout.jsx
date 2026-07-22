import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Users,
  Building2,
  Package,
  Layers,
  Webhook,
  Activity,
  Settings,
  HelpCircle,
  FileSpreadsheet,
  AlertOctagon,
  LogOut,
  Sparkles
} from "lucide-react";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: ShieldAlert, path: "/admin/dashboard" },
    { label: "Usuários", icon: Users, path: "/admin/usuarios" },
    { label: "Parceiros", icon: Building2, path: "/admin/parceiros" },
    { label: "Produtos", icon: Package, path: "/admin/conteudos/produtos" },
    { label: "Financeiro", icon: Layers, path: "/admin/financeiro" },
    { label: "Auditoria", icon: FileSpreadsheet, path: "/admin/auditoria" },
    { label: "Integrações", icon: Webhook, path: "/admin/integracoes" },
    { label: "Incidentes", icon: AlertOctagon, path: "/admin/seguranca/incidentes" },
    { label: "Configurações", icon: Settings, path: "/admin/configuracoes" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800 select-none">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            C
          </div>
          <div>
            <h4 className="font-bold text-white leading-none my-0">Curitiba 360</h4>
            <span className="text-[10px] text-emerald-500 font-semibold tracking-wider uppercase mt-1 block">Admin Console</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition text-decoration-none"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-red-400 hover:bg-red-950/30 hover:text-red-300 w-full transition text-left border-none bg-transparent cursor-pointer"
          >
            <LogOut size={18} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Operação Global Normal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs uppercase">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 my-0">Admin Demo</p>
              <p className="text-[10px] font-semibold text-slate-500 my-0">Super Administrador</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
