import React, { useMemo, useState } from 'react';
import {
  QrCode,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Camera,
  Check
} from 'lucide-react';
import { AttractionSidebar } from '../../../components/AttractionSidebar';

export const INITIAL_VALIDATION_LOGS = [
  { id: 'TCK-90412-01', name: 'Carlos Eduardo', email: 'carlos.eduardo@gmail.com', status: 'validated', readAt: '2026-07-23T14:30:10', validatedBy: 'Portaria Principal (Guichê 1)' },
  { id: 'TCK-90412-02', name: 'Mariana Souza', email: 'mariana.souza@gmail.com', status: 'validated', readAt: '2026-07-23T14:32:45', validatedBy: 'Portaria Principal (Guichê 1)' },
  { id: 'TCK-90415-08', name: 'Roberto Almeida', email: 'roberto@curitibatours.com', status: 'cancelled', readAt: '2026-07-23T15:10:00', validatedBy: 'Catraca VIP 2' },
  { id: 'TCK-90418-05', name: 'Fernanda Lima', email: 'fernanda.lima@gmail.com', status: 'validated', readAt: '2026-07-23T15:45:20', validatedBy: 'Catraca Central' }
];

export function ValidateTicketsPage() {
  const [logs, setLogs] = useState(INITIAL_VALIDATION_LOGS);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all'); // 'all' | 'validated' | 'cancelled'
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState('');

  const filteredLogs = useMemo(() => {
    const term = search.trim().toLowerCase();
    return logs.filter((item) => {
      const matchTab = tab === 'all' || item.status === tab;
      const matchSearch =
        !term ||
        item.id.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term);
      return matchTab && matchSearch;
    });
  }, [logs, search, tab]);

  function handleStartValidation() {
    setScanning(true);
    setTimeout(() => {
      const newId = `TCK-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(10 + Math.random() * 90)}`;
      const newLog = {
        id: newId,
        name: 'Visitante Leitura QR',
        email: 'visitante.qr@curitiba360.com.br',
        status: 'validated',
        readAt: new Date().toISOString(),
        validatedBy: 'Validador Web App'
      };
      setLogs((prev) => [newLog, ...prev]);
      setScannedResult(`Ingresso ${newId} VALIDADO com sucesso!`);
      setScanning(false);
      setTimeout(() => setScannedResult(''), 3000);
    }, 1500);
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AttractionSidebar attractionId="attraction-001" attractionName="Parque Jaime Lerner" />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-6 text-left">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5 gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600">
              <QrCode size={15} />
              Operação de Catraca &bull; Portaria
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Validar Ingressos
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Leitura em tempo real de bilhetes, controle de acessos validados e prevenção de fraude.
            </p>
          </div>

          <button
            type="button"
            disabled={scanning}
            onClick={handleStartValidation}
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 disabled:opacity-50"
          >
            <Camera size={18} className={scanning ? 'animate-pulse' : ''} />
            {scanning ? 'Lendo QR Code...' : 'Iniciar Validação QR'}
          </button>
        </header>

        {scannedResult && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={18} className="text-emerald-600" />
            {scannedResult}
          </div>
        )}

        {/* Tabela & Filtros */}
        <section className="rounded-3xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <div className="border-b border-slate-100 p-5 space-y-4">
            {/* Abas */}
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Todos os Acessos', count: logs.length },
                { value: 'validated', label: 'Validados', count: logs.filter((l) => l.status === 'validated').length },
                { value: 'cancelled', label: 'Cancelados / Recusados', count: logs.filter((l) => l.status === 'cancelled').length }
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTab(t.value)}
                  className={`inline-flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-black transition ${
                    tab === t.value ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${tab === t.value ? 'bg-white/20 text-white' : 'bg-white text-slate-600'}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Busca */}
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por ID do ingresso, nome ou e-mail..."
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <th className="p-4">ID do Ingresso</th>
                  <th className="p-4">Nome do Titular</th>
                  <th className="p-4">E-mail</th>
                  <th className="p-4 text-center">Status Leitura</th>
                  <th className="p-4">Data e Hora</th>
                  <th className="p-4">Validado por</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLogs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="p-4 font-extrabold text-slate-800">{item.name}</td>
                    <td className="p-4 text-slate-500 font-medium">{item.email}</td>
                    <td className="p-4 text-center">
                      {item.status === 'validated' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-black text-emerald-700">
                          <CheckCircle2 size={13} /> Validado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-[10px] font-black text-rose-700">
                          <XCircle size={13} /> Cancelado / Recusado
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 font-semibold">
                      {new Date(item.readAt).toLocaleString('pt-BR')}
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{item.validatedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ValidateTicketsPage;
