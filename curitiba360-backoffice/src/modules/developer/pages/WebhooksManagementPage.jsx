import React, { useState, useEffect } from 'react';
import { developerApiService } from '../services/developerApiService';
import WebhookConfigPanel from '../components/WebhookConfigPanel';
import WebhookDeliveryLogsTable from '../components/WebhookDeliveryLogsTable';

export default function WebhooksManagementPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await developerApiService.getDeveloperOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegisterWebhook = async (webhookData) => {
    await developerApiService.registerWebhook(webhookData);
    loadData();
  };

  const handleTriggerTest = async (webhookId) => {
    const res = await developerApiService.triggerWebhookTest(webhookId);
    alert(res.message);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando webhooks...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <WebhookConfigPanel webhooks={data.webhooks || []} onRegisterWebhook={handleRegisterWebhook} onTriggerTest={handleTriggerTest} />
      <WebhookDeliveryLogsTable logs={data.deliveryLogs || []} />
    </div>
  );
}
