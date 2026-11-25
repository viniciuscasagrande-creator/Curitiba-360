import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu } from "lucide-react";

export default function SensorsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/live" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à Operação ao Vivo
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Sensores IoT Operacionais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Valide a telemetria e integridade dos sensores de fumaça, temperatura e botões de pânico instalados.
          </p>
        </div>

        {/* Sensors list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Cpu size={18} className="text-purple-755 font-bold" /> Telemetria de Sensores
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Sensor de Fumaça - Bloco A</strong>
                <span className="text-[10px] text-slate-505 block">ID: iot-smoke-01 | Último Valor: 0.0 ppm | Limite Max: 50.0 ppm | Atualizado: Agora</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Normal
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Termômetro - Central de Energia</strong>
                <span className="text-[10px] text-slate-505 block">ID: iot-temp-03 | Último Valor: 42.5 °C | Limite Max: 60.0 °C | Atualizado: Agora</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Normal
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
