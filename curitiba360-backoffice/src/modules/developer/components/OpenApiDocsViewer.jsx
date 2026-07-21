import React from 'react';
import { BookOpen, Terminal, Code } from 'lucide-react';

export default function OpenApiDocsViewer({ spec = {} }) {
  const sampleCurl = `curl -X GET "http://localhost:3333/v1/events" \\
  -H "x-api-key: curitiba360_demo_key" \\
  -H "Content-Type: application/json"`;

  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Documentação OpenAPI 3.1 & Endpoints
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          Swagger / OpenAPI v3.1
        </span>
      </div>

      <div className="space-y-2">
        {(spec.endpoints || []).map((ep, idx) => (
          <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between font-mono font-bold">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] ${
                  ep.method === 'GET' ? 'bg-emerald-900 text-emerald-300' : 'bg-purple-900 text-purple-300'
                }`}>
                  {ep.method}
                </span>
                <span className="text-white">{ep.path}</span>
              </div>
              <span className="text-[9px] text-slate-400">Escopo: {ep.scope}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{ep.summary}</p>
          </div>
        ))}
      </div>

      {/* EXEMPLO DE REQUISIÇÃO CURL SOLICITADO PELO USUÁRIO */}
      <div className="space-y-1">
        <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <Terminal className="w-3 h-3 text-purple-400" /> Exemplo de Requisição cURL
        </div>
        <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-pre">
          {sampleCurl}
        </pre>
      </div>
    </div>
  );
}
