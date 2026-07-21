export const INITIAL_CONSOLIDATION_DATA = {
  appInfo: {
    nome: 'Curitiba 360 Mobile',
    slug: 'curitiba360-app',
    versao: '1.8.0',
    versaoBuild: 42,
    easProjectId: 'proj-curitiba360-prod-2026',
    ambiente: 'Produção (Production)',
    otaUpdateStatus: 'Atualizado (OTA Versão 1.8.0-hotfix1)'
  },

  submodulosMobile: [
    { id: 'sub-1', titulo: 'Aplicativo do Produtor', rota: '/mobile/produtor', icone: 'Smartphone', status: 'Ativo' },
    { id: 'sub-2', titulo: 'Aplicativo Staff', rota: '/mobile/staff', icone: 'Users', status: 'Ativo' },
    { id: 'sub-3', titulo: 'Check-in Offline', rota: '/mobile/checkin', icone: 'Scan', status: 'Ativo (SQLite)' },
    { id: 'sub-4', titulo: 'Comunicação & Alertas', rota: '/mobile/comunicacao', icone: 'MessageSquare', status: 'Ativo' },
    { id: 'sub-5', titulo: 'Monitoramento em Tempo Real', rota: '/mobile/monitoramento', icone: 'Activity', status: 'Ativo' },
    { id: 'sub-6', titulo: 'Perfil & Segurança', rota: '/mobile/seguranca', icone: 'ShieldCheck', status: 'Ativo (Biometria)' },
    { id: 'sub-7', titulo: 'Relatórios & Documentos', rota: '/mobile/relatorios', icone: 'FileText', status: 'Ativo' }
  ],

  firebaseConfigStatus: {
    authConnected: true,
    firestoreConnected: true,
    cloudMessagingActive: true,
    storageBucket: 'gs://curitiba360-mobile.appspot.com'
  },

  easBuildHistory: [
    { profile: 'production', platform: 'Android (AAB)', status: 'SUCCESS', buildId: 'b-android-991', data: '21/07/2026 13:50' },
    { profile: 'production', platform: 'iOS (IPA)', status: 'SUCCESS', buildId: 'b-ios-992', data: '21/07/2026 13:55' }
  ],

  checklistsLojas: {
    googlePlay: [
      { item: 'Pacote AAB assinado com chave de produção', ok: true },
      { item: 'Capturas de tela em telefone de 6.5" e tablet de 10"', ok: true },
      { item: 'Política de Privacidade e Termos de Uso vinculados', ok: true },
      { item: 'Declaração de permissões da Câmera e Notificações Push', ok: true }
    ],
    appStore: [
      { item: 'Build IPA com certificado de distribuição da Apple', ok: true },
      { item: 'Descrição em Português e palavras-chave de busca', ok: true },
      { item: 'Identificador de Aplicativo com Suporte a Push Notifications', ok: true },
      { item: 'Suporte a Login com Apple configurado no Firebase Auth', ok: true }
    ]
  }
};
