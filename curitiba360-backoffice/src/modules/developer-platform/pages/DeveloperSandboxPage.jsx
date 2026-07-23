import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { PlayCircle, CheckCircle } from "lucide-react";

export default function DeveloperSandboxPage() {
  const [log, setLog] = useState([]);
  const [loadingAction, setLoadingAction] = useState(null);

  const triggerSimulation = (actionName, simulateFn) => {
    setLoadingAction(actionName);
    setTimeout(() => {
      simulateFn();
      setLoadingAction(null);
    }, 800);
  };

  const simulateOrder = () => {
    const orderId = `ord_sim_${Math.floor(1000 + Math.random() * 9000)}`;
    setLog(prev => [
      `[${new Date().toLocaleTimeString()}] SUCCESS: Pedido simulado criado: ${orderId}`,
      ...prev
    ]);
  };

  const simulatePayment = () => {
    setLog(prev => [
      `[${new Date().toLocaleTimeString()}] SUCCESS: Transação Pix simulada aprovada com status: approved`,
      ...prev
    ]);
  };

  const simulateWebhook = () => {
    setLog(prev => [
      `[${new Date().toLocaleTimeString()}] SUCCESS: Webhook despachado para endpoint cadastrado (order.approved)`,
      ...prev
    ]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Sandbox de Testes</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Simule requisições B2B fictícias, checkout Pix e disparos de webhook sem afetar os dados reais de produção.
          </p>
        </div>

        {/* Action Panel */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <strong className="text-slate-900 text-sm block">Criar Pedido Simulado</strong>
              <span className="text-[10px] text-slate-400 block">Gera uma transação fictícia no sandbox.</span>
            </div>
            <button
              onClick={() => triggerSimulation("order", simulateOrder)}
              disabled={loadingAction !== null}
              className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
            >
              {loadingAction === "order" ? "Processando..." : "Simular Pedido"}
            </button>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <strong className="text-slate-900 text-sm block">Aprovar Pagamento Pix</strong>
              <span className="text-[10px] text-slate-400 block">Simula webhook de aprovação instantânea.</span>
            </div>
            <button
              onClick={() => triggerSimulation("payment", simulatePayment)}
              disabled={loadingAction !== null}
              className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
            >
              {loadingAction === "payment" ? "Processando..." : "Simular Pix"}
            </button>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <strong className="text-slate-900 text-sm block">Disparar Webhook</strong>
              <span className="text-[10px] text-slate-400 block">Dispara payload JSON para o seu webhook.</span>
            </div>
            <button
              onClick={() => triggerSimulation("webhook", simulateWebhook)}
              disabled={loadingAction !== null}
              className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
            >
              {loadingAction === "webhook" ? "Processando..." : "Simular Webhook"}
            </button>
          </div>
        </section>

        {/* Sandbox Console Logs */}
        <section className="bg-slate-950 text-emerald-400 font-mono text-[10px] rounded-3xl p-6 shadow-sm space-y-3 min-h-64 flex flex-col justify-between border border-slate-800">
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {log.length === 0 ? (
              <span className="text-slate-500">// O console está vazio. Dispare uma simulação acima.</span>
            ) : (
              log.map((l, idx) => (
                <div key={idx} className="leading-relaxed">
                  {l}
                </div>
              ))
            )}
          </div>
          <span className="text-slate-500 text-[9px] border-t border-slate-900 pt-2 block uppercase tracking-wider">
            Sandbox Environment Console logs
          </span>
        </section>
      </div>
    </AdminLayout>
  );
}
