import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobileSimulator } from "../hooks/useMobileSimulator";
import { Smartphone, CheckCircle, XCircle, AlertTriangle, Wifi, WifiOff, ScanLine } from "lucide-react";

export default function OperationsMobileSimulatorPage() {
  const { tickets, checkInOffline } = useMobileSimulator();
  const [ticketCode, setTicketCode] = useState("");
  const [isOnline, setIsOnline] = useState(false); // Default offline to test offline check-in!
  const [result, setResult] = useState(null);
  const [overrideReason, setOverrideReason] = useState("");
  const [showOverride, setShowOverride] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!ticketCode.trim()) return;
    setResult(null);
    setShowOverride(false);
    const res = await checkInOffline(ticketCode);
    if (res.success) {
      setResult({ status: "success", message: `Check-in realizado com sucesso! Portador: ${res.ticket.holderName}` });
    } else {
      if (res.error === "TICKET_ALREADY_USED") {
        setResult({ status: "error", code: "TICKET_ALREADY_USED", message: "Erro: Este ingresso já foi validado anteriormente!" });
        setShowOverride(true);
      } else {
        setResult({ status: "error", message: "Erro: Ingresso inválido ou assinatura digital corrompida." });
      }
    }
  };

  const handleOverride = async () => {
    if (!overrideReason.trim()) return;
    const res = await checkInOffline(ticketCode, overrideReason);
    if (res.success) {
      setResult({ status: "success", message: `Override realizado com sucesso! Portador: ${res.ticket.holderName} (Motivo: ${overrideReason})` });
      setOverrideReason("");
      setShowOverride(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none max-w-md mx-auto">
        <div className="text-center">
          <Smartphone size={48} className="text-purple-600 mx-auto" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-2 my-0">App Operações: Curitiba 360</h1>
          <p className="mt-1 text-xs text-slate-505 my-0">Validador de ingressos offline com controle de duplicidade de QR Codes.</p>
        </div>

        {/* Connection Toggle Panel */}
        <section className="p-4 border rounded-3xl bg-slate-50 flex items-center justify-between shadow-sm">
          <span className="text-sm font-semibold text-slate-700">Estado da Conexão</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`inline-flex items-center gap-1.5 px-4 h-9 rounded-xl font-bold text-xs border-none cursor-pointer text-white transition ${isOnline ? 'bg-emerald-600' : 'bg-amber-600'}`}
          >
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? "Modo Online" : "Modo Offline"}
          </button>
        </section>

        {/* Scanner Simulator Frame */}
        <section className="border border-slate-300 rounded-[40px] bg-slate-950 p-3 shadow-2xl relative">
          <div className="bg-slate-900 rounded-[32px] overflow-hidden min-h-[460px] p-6 text-slate-100 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold my-0 text-white flex items-center gap-2">
                <ScanLine className="text-purple-400" />
                Simulador de Câmera/Leitor
              </h3>
              
              <form onSubmit={handleValidate} className="space-y-3">
                <input
                  type="text"
                  placeholder="Código do ingresso (Ex: TKT-OPERA-777)"
                  value={ticketCode}
                  onChange={(e) => setTicketCode(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm font-mono"
                />
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-purple-700 text-sm font-bold text-white hover:bg-purple-800 transition border-none cursor-pointer"
                >
                  Simular Leitura QR Code
                </button>
              </form>

              {/* Status and Feedback Screens */}
              {result && (
                <div className={`p-4 rounded-2xl border flex items-start gap-3 mt-4 ${result.status === 'success' ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : 'bg-red-950/30 border-red-800 text-red-300'}`}>
                  {result.status === 'success' ? <CheckCircle className="flex-shrink-0" /> : <XCircle className="flex-shrink-0" />}
                  <div>
                    <h4 className="font-bold text-sm my-0">{result.status === 'success' ? 'Sucesso' : 'Falha na Validação'}</h4>
                    <p className="text-xs mt-1 my-0 leading-relaxed font-semibold">{result.message}</p>
                  </div>
                </div>
              )}

              {/* Override Checkin */}
              {showOverride && (
                <div className="p-4 border border-amber-800 bg-amber-950/30 rounded-2xl space-y-3 mt-4 text-amber-200">
                  <div className="flex gap-2 items-center">
                    <AlertTriangle className="text-amber-500" />
                    <span className="text-xs font-bold">Autorizar Entrada (Override)?</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Motivo da liberação manual"
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                  <button
                    onClick={handleOverride}
                    className="w-full h-9 rounded-lg bg-amber-600 text-xs font-bold text-white hover:bg-amber-700 border-none cursor-pointer"
                  >
                    Confirmar Override Operacional
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-400 text-center font-mono">
              {!isOnline && "Sincronização local SQLite ativa. Logs armazenados."}
              {isOnline && "Conectado ao Cloud Functions via Firebase App Check."}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
