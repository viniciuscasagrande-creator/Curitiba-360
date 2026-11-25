import { useState, useEffect } from "react";
import { offlineSyncService } from "../services/offlineSyncService";

export function useOfflineSync() {
  const [syncStatus, setSyncStatus] = useState({ isOnline: true, pendingActionsCount: 0 });

  useEffect(() => {
    const handleStatus = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: navigator.onLine }));
    };
    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);
    return () => {
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, []);

  const sync = async () => {
    return await offlineSyncService.syncPendingActions();
  };

  return { syncStatus, sync };
}
