import { useState, useEffect } from 'react';
import { validateTicketCode, getCheckins } from '../../services/checkinService';
import { getAccessPoints } from '../../services/accessPointService';
import { QrCode, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

export default function AccessScanner() {
  const [ticketCode, setTicketCode] = useState('');
  const [selectedGate, setSelectedGate] = useState('Portão A');
  const [gates, setGates] = useState([]);
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalToday: 1842, validated: 1526, pending: 316 });

  useEffect(() => {
    async function init() {
      const accessPoints = await getAccessPoints();
      setGates(accessPoints);
      const checkinData = await getCheckins();
      setStats({
        totalToday: 1842 + checkinData.length,
        validated: 1526 + checkinData.filter(c => c.status === 'liberado').length,
        pending: Math.max(0, 316 - checkinData.filter(c => c.status === 'liberado').length)
      });
    }
    init();
  }, []);

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!ticketCode.trim()) return;

    setLoading(true);
    setValidationResult(null);

    const result = await validateTicketCode(ticketCode, 'ev-1', selectedGate, 'Operador-1');
    setValidationResult(result);
    setLoading(false);

    if (result.success) {
      setStats(prev => ({
        ...prev,
        validated: prev.validated + 1,
        pending: Math.max(0, prev.pending - 1)
      }));
      setTicketCode('');
    }
  };

  const sampleCodes = ['CTB360-ABCD1234', 'CTB360-OPERA991', 'CTB360-USED1111', 'CTB360-CANC2222', 'CTB360-UNPAID33'];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            <QrCode size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">CURITIBA 360 ACCESS</h1>
            <p className="text-xs text-slate-400">Terminal de Validação na Entrada</p>
          </div>
        </div>

        {/* Gate selector */}
        <select
          value={selectedGate}
          onChange={e => setSelectedGate(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white outline-none focus:border-blue-500"
        >
          {gates.map(g => (
            <option key={g.id} value={g.name}>{g.name}</option>
          ))}
          {!gates.length && <option value="Portão A">Portão A - Principal</option>}
        </select>
      </header>

      {/* Main scanner area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full space-y-6">
        {/* Scanner Simulation Card */}
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10 border-2 border-blue-500/30 text-blue-400 animate-pulse">
              <QrCode size={48} />
            </div>
            <h2 className="text-xl font-bold">Leitor de QR Code / Código</h2>
            <p className="text-xs text-slate-400">Digite ou escaneie o código do ingresso digital</p>
          </div>

          <form onSubmit={handleValidate} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: CTB360-ABCD1234"
                value={ticketCode}
                onChange={e => setTicketCode(e.target.value.toUpperCase())}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-center font-mono text-lg font-bold text-white uppercase placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || !ticketCode.trim()}
              className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg transition hover:bg-blue-500 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  Validando...
                </>
              ) : (
                'Validar Ingresso'
              )}
            </button>
          </form>

          {/* Quick simulation buttons */}
          <div className="pt-2 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center mb-2 font-medium">Testar Códigos de Demonstração:</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {sampleCodes.map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setTicketCode(code)}
                  className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-mono font-medium text-slate-300 hover:bg-slate-700 transition"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Validation Result Popup */}
        {validationResult && (
          <div
            className={`w-full rounded-2xl p-6 text-center shadow-2xl border transition-all ${
              validationResult.color === 'green'
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100'
                : validationResult.color === 'yellow'
                ? 'bg-amber-950/90 border-amber-500 text-amber-100'
                : 'bg-red-950/90 border-red-500 text-red-100'
            }`}
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              {validationResult.color === 'green' && <CheckCircle2 size={36} className="text-emerald-400" />}
              {validationResult.color === 'yellow' && <AlertTriangle size={36} className="text-amber-400" />}
              {validationResult.color === 'red' && <XCircle size={36} className="text-red-400" />}
            </div>
            <h3 className="text-2xl font-black">{validationResult.title}</h3>
            <p className="mt-2 text-sm font-medium opacity-90">{validationResult.message}</p>
          </div>
        )}

        {/* Live Gate Stats */}
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
            <span className="block text-xs font-medium text-slate-400">Entradas Hoje</span>
            <span className="text-xl font-black text-white">{stats.totalToday}</span>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
            <span className="block text-xs font-medium text-emerald-400">Validados</span>
            <span className="text-xl font-black text-emerald-400">{stats.validated}</span>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
            <span className="block text-xs font-medium text-amber-400">Pendentes</span>
            <span className="text-xl font-black text-amber-400">{stats.pending}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
