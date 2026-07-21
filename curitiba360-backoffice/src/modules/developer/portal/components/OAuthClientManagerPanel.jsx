import React from 'react';
import { Lock, ShieldCheck, Key } from 'lucide-react';

export default function OAuthClientManagerPanel() {
  const oauthClients = [
    {
      id: 'CLIENT-8801',
      appName: 'App Concessionária Turística Curitiba',
      clientId: 'c360_client_id_8849102',
      clientSecret: 'c360_sec_••••••••••••••••',
      grantTypes: ['authorization_code', 'pkce', 'refresh_token'],
      redirectUris: ['https://concessionariaturismo.com.br/callback']
    },
    {
      id: 'CLIENT-8802',
      appName: 'Sistema ERP Contábil Parceiro',
      clientId: 'c360_client_id_7712390',
      clientSecret: 'c360_sec_••••••••••••••••',
      grantTypes: ['client_credentials'],
      redirectUris: ['https://erp.parceiro.com.br/oauth/token']
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-purple-600" /> Clientes OAuth 2.1 & PKCE (Authorization Code & Client Credentials)
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">OAuth 2.1 Especificação Corporativa</span>
      </div>

      <div className="space-y-2">
        {oauthClients.map((cl) => (
          <div key={cl.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 font-mono">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs font-sans">
              <span>{cl.appName}</span>
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                {cl.grantTypes.join(' + ')}
              </span>
            </div>

            <div className="text-[10px] text-slate-600">
              Client ID: <b className="text-purple-900">{cl.clientId}</b>
            </div>

            <div className="text-[9px] text-slate-400 font-sans">
              Redirect URIs: {cl.redirectUris.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
