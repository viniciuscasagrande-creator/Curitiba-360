import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMobileSimulator } from "../hooks/useMobileSimulator";
import { Smartphone, Sparkles, CreditCard, Ticket, User, QrCode } from "lucide-react";

export default function CustomerMobileSimulatorPage() {
  const { tickets, loading } = useMobileSimulator();
  const [activeTab, setActiveTab] = useState("wallet");

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none max-w-md mx-auto">
        <div className="text-center">
          <Smartphone size={48} className="text-emerald-600 mx-auto" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-2 my-0">App Cliente: Curitiba 360</h1>
          <p className="mt-1 text-xs text-slate-505 my-0">Simulador do aplicativo de experiências e carteira de ingressos do turista.</p>
        </div>

        {/* Mobile View Wrapper */}
        <section className="border border-slate-300 rounded-[40px] bg-slate-950 p-3 shadow-2xl relative">
          <div className="bg-white rounded-[32px] overflow-hidden min-h-[500px] flex flex-col justify-between p-4 text-slate-900">
            {/* Screen Content */}
            <div className="space-y-4 flex-1">
              {activeTab === "explore" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 my-0">Explorar Curitiba</h3>
                  <div className="p-3 border rounded-2xl bg-slate-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm my-0">Ópera de Arame - Premium Tour</h4>
                      <p className="text-[10px] text-slate-500 my-0">Ingresso individual com áudio guia</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">R$ 45,00</span>
                  </div>
                  <div className="p-3 border rounded-2xl bg-slate-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm my-0">Jardim Botânico Express VIP</h4>
                      <p className="text-[10px] text-slate-500 my-0">Fura fila e guia bilíngue</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">R$ 80,00</span>
                  </div>
                </div>
              )}

              {activeTab === "wallet" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 my-0">Meus Ingressos</h3>
                  <div className="space-y-3">
                    {tickets.map(tkt => (
                      <div key={tkt.id} className="p-4 border border-slate-200 rounded-2xl bg-emerald-50/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 my-0">{tkt.eventName}</h4>
                            <p className="text-[10px] text-slate-500 my-0 mt-0.5">Código: {tkt.ticketCode}</p>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${tkt.status === 'available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {tkt.status === 'available' ? 'Disponível' : 'Utilizado'}
                          </span>
                        </div>
                        {/* Offline QR Code Payload with Digital Signature */}
                        <div className="mt-3 bg-slate-900 text-slate-100 p-2.5 rounded-xl flex items-center gap-2">
                          <QrCode size={24} className="text-emerald-400 flex-shrink-0" />
                          <div className="overflow-hidden">
                            <span className="text-[8px] block font-mono text-slate-400">ASSINATURA CRIPTOGRÁFICA OFFLINE:</span>
                            <span className="text-[8px] font-mono block truncate">{tkt.offlineSignature}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Tabs */}
            <nav className="flex justify-around border-t border-slate-100 pt-3 mt-4">
              <button
                onClick={() => setActiveTab("explore")}
                className={`flex flex-col items-center gap-1 border-none bg-transparent cursor-pointer ${activeTab === 'explore' ? 'text-emerald-700' : 'text-slate-400'}`}
              >
                <Sparkles size={18} />
                <span className="text-[9px] font-bold">Explorar</span>
              </button>
              <button
                onClick={() => setActiveTab("wallet")}
                className={`flex flex-col items-center gap-1 border-none bg-transparent cursor-pointer ${activeTab === 'wallet' ? 'text-emerald-700' : 'text-slate-400'}`}
              >
                <Ticket size={18} />
                <span className="text-[9px] font-bold">Ingressos</span>
              </button>
            </nav>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
