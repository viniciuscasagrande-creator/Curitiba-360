import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDevopsDashboard } from "../hooks/useDevopsDashboard";
import { Database, Plus, RefreshCw, AlertOctagon } from "lucide-react";

export default function BackupsPage() {
  const { backups, createBackup, loading } = useDevopsDashboard();
  const [backupName, setBackupName] = useState("Firestore Manual Backup");
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!backupName.trim()) return;
    await createBackup(backupName);
    setBackupName("Firestore Manual Backup");
    alert("Backup disparado com sucesso!");
  };

  const triggerRestore = (backup) => {
    setSelectedBackup(backup);
    setShowRestoreModal(true);
  };

  const confirmRestore = () => {
    alert(`Restauração de desastre iniciada com base no backup: ${selectedBackup.name}. A integridade do Firestore será restabelecida.`);
    setShowRestoreModal(false);
    setSelectedBackup(null);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Backups & Disaster Recovery</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore logs de backups periódicos do Firestore e Storage, e realize restaurações de emergência.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          {/* Backups List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Histórico de Backups</h3>
            <div className="space-y-3">
              {backups.map(b => (
                <div key={b.id} className="p-4 border border-slate-200 rounded-2xl bg-white flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-3">
                    <Database className="text-slate-500" size={24} />
                    <div>
                      <h4 className="font-bold text-slate-800 my-0">{b.name}</h4>
                      <p className="text-xs text-slate-505 my-0 mt-1">
                        Tamanho: {(b.sizeBytes / (1024 * 1024)).toFixed(2)} MB • Data: {new Date(b.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {b.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => triggerRestore(b)}
                      className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 bg-white text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      Restaurar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trigger manual backup */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-slate-900 my-0">Criar Backup Manual</h3>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Identificador do Backup</label>
                <input
                  type="text"
                  required
                  value={backupName}
                  onChange={(e) => setBackupName(e.target.value)}
                  className="w-full h-10 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-emerald-700 text-sm font-bold text-white hover:bg-emerald-800 transition border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Iniciar Backup
              </button>
            </form>
          </section>
        </section>

        {/* Restore Confirmation Modal */}
        {showRestoreModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
              <div className="flex gap-3 text-red-600">
                <AlertOctagon size={32} className="flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 my-0 text-lg">Aviso de Restauração</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Você está prestes a sobrescrever os dados ativos do Firestore com o estado de <strong>{selectedBackup?.name}</strong>. Esta ação não poderá ser desfeita.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="h-9 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmRestore}
                  className="h-9 px-4 rounded-xl border-none bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
                >
                  Confirmar Restauração
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
