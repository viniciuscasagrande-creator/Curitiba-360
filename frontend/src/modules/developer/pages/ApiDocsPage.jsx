import React, { useState, useEffect } from 'react';
import { developerApiService } from '../services/developerApiService';
import OpenApiDocsViewer from '../components/OpenApiDocsViewer';
import ApiKeyManagerPanel from '../components/ApiKeyManagerPanel';
import WebhookConfigPanel from '../components/WebhookConfigPanel';
import WebhookDeliveryLogsTable from '../components/WebhookDeliveryLogsTable';
import { Code, Terminal } from 'lucide-react';

export default function ApiDocsPage() {
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

  const handleCreateKey = async (keyData) => {
    await developerApiService.createApiKey(keyData);
    loadData();
  };

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
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando documentação da API Pública v1...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-600" /> Portal do Desenvolvedor & API Pública REST v1
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Documentação OpenAPI 3.1, gestão de API Keys (`x-api-key`), escopos e webhooks assinados via HMAC sha256.
          </p>
        </div>
      </div>

      <OpenApiDocsViewer spec={data.openApiSpec || {}} />
      <ApiKeyManagerPanel apiKeys={data.apiKeys || []} onCreateKey={handleCreateKey} />
      <WebhookConfigPanel webhooks={data.webhooks || []} onRegisterWebhook={handleRegisterWebhook} onTriggerTest={handleTriggerTest} />
      <WebhookDeliveryLogsTable logs={data.deliveryLogs || []} />
    </div>
  );
}
