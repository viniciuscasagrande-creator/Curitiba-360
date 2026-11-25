import React from 'react';
import { FileText, X, Send, Sparkles } from 'lucide-react';

export default function TemplateSelectorModal({ isOpen, onClose, templates = [], onSelectTemplate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-slate-800">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" /> Biblioteca de Templates Prontos
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => { onSelectTemplate(tpl); onClose(); }}
              className="p-3.5 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200/80 cursor-pointer transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-xs">{tpl.titulo}</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                  {tpl.categoria} ({tpl.canal.toUpperCase()})
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{tpl.conteudo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
