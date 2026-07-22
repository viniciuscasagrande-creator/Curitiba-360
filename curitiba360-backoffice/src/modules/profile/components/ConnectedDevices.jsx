import React from "react";
import { Laptop, Smartphone } from "lucide-react";

export default function ConnectedDevices({ devices = [] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
          <Laptop size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-955 my-0">
            Dispositivos Conectados
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
            Aparelhos autorizados a acessar sua conta.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {devices.map((device) => {
          const isMobile = device.type === "mobile";
          
          return (
            <div
              key={device.id}
              className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-slate-50/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                {isMobile ? <Smartphone size={18} /> : <Laptop size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-955 my-0 text-sm">
                  {device.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 my-0">
                  {device.platform} • Último login: {new Date(device.lastLogin).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="text-right text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                IP {device.ip}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
