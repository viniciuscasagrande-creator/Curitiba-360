import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { Layers, MapPin, Bus, Circle } from "lucide-react";

export default function SmartMapPage() {
  const [activeLayer, setActiveLayer] = useState("all");

  const markers = [
    { id: 1, name: "Jardim Botânico", type: "attraction", lat: "50%", lng: "45%" },
    { id: 2, name: "Ópera de Arame", type: "attraction", lat: "25%", lng: "30%" },
    { id: 3, name: "Tubo Praça do Japão", type: "transit", lat: "60%", lng: "55%" },
    { id: 4, name: "EstaR Digital Batel", type: "parking", lat: "52%", lng: "40%" }
  ];

  const filteredMarkers = markers.filter(
    (m) => activeLayer === "all" || m.type === activeLayer
  );

  return (
    <SuperAppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] relative">
        {/* Layer Selector Overlay */}
        <div className="absolute top-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-slate-200 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
            <Layers size={14} className="text-emerald-600" /> Camadas do Mapa
          </span>
          <div className="flex gap-1.5 select-none font-mono">
            <button
              onClick={() => setActiveLayer("all")}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border transition cursor-pointer ${
                activeLayer === "all" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveLayer("attraction")}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border transition cursor-pointer ${
                activeLayer === "attraction" ? "bg-amber-600 text-white border-amber-600" : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              Atrações
            </button>
            <button
              onClick={() => setActiveLayer("transit")}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border transition cursor-pointer ${
                activeLayer === "transit" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              Tubo
            </button>
          </div>
        </div>

        {/* Map Canvas Simulation */}
        <div className="flex-1 bg-slate-200 relative overflow-hidden select-none">
          {/* Simulated grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
          
          {/* Simulated parks */}
          <div className="absolute w-36 h-24 bg-emerald-100 rounded-full blur-xl top-[15%] left-[20%] opacity-60" />
          <div className="absolute w-44 h-32 bg-emerald-100 rounded-full blur-xl top-[50%] left-[45%] opacity-60" />

          {/* Interactive markers */}
          {filteredMarkers.map((m) => {
            let color = "text-amber-600 bg-amber-50 border-amber-200";
            let Icon = MapPin;
            if (m.type === "transit") {
              color = "text-blue-600 bg-blue-50 border-blue-200";
              Icon = Bus;
            } else if (m.type === "parking") {
              color = "text-purple-600 bg-purple-50 border-purple-200";
              Icon = Circle;
            }

            return (
              <div
                key={m.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fadeIn"
                style={{ top: m.lat, left: m.lng }}
              >
                <div className={`p-1.5 rounded-full border shadow-md flex items-center justify-center ${color}`}>
                  <Icon size={16} />
                </div>
                <div className="bg-slate-900/90 text-white text-[8px] font-bold font-sans px-1.5 py-0.5 rounded shadow-sm mt-1 whitespace-nowrap">
                  {m.name}
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 text-[10px] text-slate-500 shadow-md">
            Use a barra de pesquisa ou mude as camadas acima para visualizar pontos de recarga do cartão transporte, estações tubo e pontos turísticos.
          </div>
        </div>
      </div>
    </SuperAppLayout>
  );
}
