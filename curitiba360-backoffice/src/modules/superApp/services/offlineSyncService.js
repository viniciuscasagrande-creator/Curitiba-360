export const offlineSyncService = {
  async getSyncStatus() {
    return {
      success: true,
      data: {
        isOnline: navigator.onLine,
        lastSyncAt: new Date().toISOString(),
        pendingActionsCount: 0
      }
    };
  },

  async syncPendingActions() {
    return {
      success: true,
      syncTimestamp: new Date().toISOString(),
      syncedItems: 0
    };
  }
};
