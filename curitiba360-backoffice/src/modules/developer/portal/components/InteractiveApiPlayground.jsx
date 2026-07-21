import React, { useState } from 'react';
import { Play, Terminal } from 'lucide-react';

export default function InteractiveApiPlayground({ endpoints = [], onExecuteRequest }) {
  const [selectedPath, setSelectedPath] = useState('/v1/events');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    if (onExecuteRequest) {
      const res = await onExecuteRequest(selectedPath);
      setResponse(res);
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-purple-400" /> Playground Interativo REST API
        </h3>
        <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-mono text-[9px] font-bold">
          Sandbox Live Test
        </span>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={selectedPath}
          onChange={(e) => setSelectedPath(e.target.value)}
          className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs font-bold"
        >
          {endpoints.map((ep, i) => (
            <option key={i} value={ep.path}>
              {ep.method} {ep.path} - {ep.description}
            </option>
          ))}
        </select>

        <button
          onClick={handleRun}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-md transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" /> {loading ? 'Executando...' : 'Enviar'}
        </button>
      </div>

      {response && (
        <div className="space-y-1">
          <div className="text-[10px] text-slate-400 font-mono">Resposta da API (HTTP {response.status}):</div>
          <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-pre">
            {JSON.stringify(response.body, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
