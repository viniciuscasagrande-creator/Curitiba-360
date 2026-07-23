import React, { useEffect, useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import { notificationService } from "../services/notificationService";
import { Link } from "react-router-dom";
import { ArrowLeft, BellRing, Check } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationService.getNotifications().then((res) => {
      if (res.success) setNotifications(res.data);
      setLoading(false);
    });
  }, []);

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 m-0">Notificações</h2>
            <p className="text-[10px] text-slate-500 m-0">Alertas de trânsito, avisos meteorológicos e comprovantes de cashback.</p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-xl flex items-center gap-0.5 hover:bg-emerald-100 cursor-pointer"
          >
            <Check size={11} /> Ler Tudo
          </button>
        </div>

        {loading ? (
          <div className="text-center py-6 text-slate-400">Carregando avisos...</div>
        ) : (
          <div className="space-y-2.5">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`bg-white border rounded-3xl p-4 flex gap-3 items-start transition ${
                  !n.read ? "border-emerald-300 shadow-2xs" : "border-slate-200"
                }`}
              >
                <BellRing size={16} className={!n.read ? "text-emerald-600 animate-swing" : "text-slate-400"} />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 m-0 flex items-center gap-1.5 leading-tight">
                    {n.title}
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                  </h4>
                  <p className="text-[10px] text-slate-500 m-0 mt-1 leading-snug">{n.message}</p>
                  <span className="text-[8px] text-slate-400 font-mono mt-1.5 block">
                    {new Date(n.date).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SuperAppLayout>
  );
}
