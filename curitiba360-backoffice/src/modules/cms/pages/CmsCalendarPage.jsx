import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { Calendar as CalendarIcon, FileText, File } from "lucide-react";

export default function CmsCalendarPage() {
  const { calendarEvents, loading } = useCmsDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando calendário editorial...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Calendário Editorial</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore datas agendadas para lançamentos de artigos de blog, campanhas de cupons ou novas landing pages de eventos.
          </p>
        </div>

        {/* Calendar schedule view */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <CalendarIcon size={18} className="text-purple-750" /> Cronograma de Publicações
          </h3>
          
          <div className="space-y-3">
            {calendarEvents.map(evt => (
              <div key={evt.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-750">
                    {evt.type === "post" ? <FileText size={16} /> : <File size={16} />}
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">{evt.title}</strong>
                    <span className="text-[10px] text-slate-450 block uppercase tracking-wider font-bold">{evt.type}</span>
                  </div>
                </div>
                
                <span className="text-[10px] font-mono text-purple-750 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-bold shrink-0">
                  {new Date(evt.publishDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
