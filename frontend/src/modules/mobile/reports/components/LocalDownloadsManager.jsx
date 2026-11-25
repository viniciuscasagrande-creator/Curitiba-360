import React from 'react';
import { DownloadCloud, HardDrive } from 'lucide-react';

export default function LocalDownloadsManager({ downloads = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <DownloadCloud className="w-3.5 h-3.5 text-purple-600" /> Histórico de Downloads Locais (Cache)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">{downloads.length} arquivos</span>
      </div>

      <div className="space-y-2">
        {downloads.map((dl) => (
          <div key={dl.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{dl.titulo}</div>
              <div className="text-[10px] text-slate-500 font-mono">Baixado em: {dl.dataDownload} ({dl.tamanho})</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
              Armazenado
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
