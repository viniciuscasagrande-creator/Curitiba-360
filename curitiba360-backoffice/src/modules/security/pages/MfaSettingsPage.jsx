import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSecurityDashboard } from "../hooks/useSecurityDashboard";
import { Key, EyeOff, ShieldCheck, ToggleRight, ToggleLeft, AlertTriangle } from "lucide-react";

export default function MfaSettingsPage() {
  const { sessions, terminateSession, loading } = useSecurityDashboard();

  // Settings states
  const [mfaForced, setMfaForced] = useState(true);
  const [complexityForced, setComplexityForced] = useState(true);

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">MFA & Políticas de Sessão</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerencie regras de autenticação multi-etapa, complexidade de senhas corporativas e controle sessões ativas.</p>
        </div>

        {/* Global Security Settings */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Forçar MFA (Multifator)</h4>
                <p className="text-xs text-slate-500 mt-1">Exigir autenticação OTP (Google Authenticator ou SMS) de todos os administradores e parceiros.</p>
              </div>
              <button
                onClick={() => setMfaForced(!mfaForced)}
                className="text-purple-700 hover:text-purple-900 cursor-pointer"
              >
                {mfaForced ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-4">
              <div>
                <h4 className="font-bold text-slate-900 my-0 text-sm">Complexidade de Senha Forte</h4>
                <p className="text-xs text-slate-505 mt-1">Exigir pelo menos 12 caracteres, um número, caractere especial e letra maiúscula.</p>
              </div>
              <button
                onClick={() => setComplexityForced(!complexityForced)}
                className="text-purple-700 hover:text-purple-900 cursor-pointer"
              >
                {complexityForced ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
            </div>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 my-0 text-sm">Políticas Globais de Expiração</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Tempo de ociosidade máximo</span>
                <span className="font-bold text-slate-700">15 minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Renovação periódica obrigatória</span>
                <span className="font-bold text-slate-700">A cada 90 dias</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span className="font-medium">Tentativas consecutivas erradas (Lockout)</span>
                <span className="font-bold">5 tentativas</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sessions audit & termination */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Sessões & Dispositivos Ativos</h3>
          {loading ? (
            <div className="text-xs text-slate-400 py-4 text-center">Carregando sessões...</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {sessions.map(sess => (
                <div key={sess.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-3">
                      <strong className="text-slate-900 text-sm">{sess.userName}</strong>
                      <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                        {sess.ipAddress}
                      </span>
                    </div>
                    <p className="text-slate-500 my-0">Localização estimada: <strong className="text-slate-700">{sess.location}</strong> | Dispositivo: <span className="font-medium">{sess.device}</span></p>
                    <p className="text-[10px] text-slate-400 my-0">Logado desde: {new Date(sess.activeSince).toLocaleTimeString()}</p>
                  </div>

                  <button
                    onClick={() => terminateSession(sess.id)}
                    className="h-8 px-3 text-xs font-bold text-red-700 border border-red-200 hover:bg-red-50 rounded-xl cursor-pointer transition flex items-center gap-1"
                  >
                    <EyeOff size={12} /> Derrubar Sessão
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
