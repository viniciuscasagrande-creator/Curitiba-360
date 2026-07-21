import React, { useState } from 'react';
import { Terminal, Play } from 'lucide-react';

export default function CliCommandSimulator() {
  const [selectedCmd, setSelectedCmd] = useState('curitiba360 webhook listen');
  const [output, setOutput] = useState('');

  const commands = [
    { cmd: 'curitiba360 login', result: '✔ Logged in as dev@curitiba360.com.br (Sandbox Active)' },
    { cmd: 'curitiba360 init', result: '✔ Project initialized with @curitiba360/sdk-node' },
    { cmd: 'curitiba360 webhook listen', result: '➜ Listening to live webhooks at http://localhost:3000/webhooks\n✔ Received event: order.paid (200 OK)' },
    { cmd: 'curitiba360 mock start', result: '🚀 Mock Server running on http://localhost:3333/v1/mock' }
  ];

  const handleRun = () => {
    const found = commands.find((c) => c.cmd === selectedCmd);
    if (found) setOutput(found.result);
  };

  return (
    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-purple-400" /> CLI Oficial (`curitiba360` CLI tool)
        </h3>
        <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-mono text-[9px] font-bold">
          npx curitiba360
        </span>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={selectedCmd}
          onChange={(e) => setSelectedCmd(e.target.value)}
          className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs font-bold"
        >
          {commands.map((c, i) => (
            <option key={i} value={c.cmd}>
              $ {c.cmd}
            </option>
          ))}
        </select>

        <button
          onClick={handleRun}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-md transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" /> Executar CLI
        </button>
      </div>

      {output && (
        <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-[10px] whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
}
