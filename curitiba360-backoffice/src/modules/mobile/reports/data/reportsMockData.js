export const INITIAL_REPORTS_DATA = {
  relatorios: [
    { id: 'REP-01', titulo: 'Relatório Executivo Consolidador 360°', categoria: 'executive', tamanho: '1.4 MB', formato: 'PDF', dataGeracao: '2026-07-21', compartilhado: true },
    { id: 'REP-02', titulo: 'Resumo Operacional & Check-in Por Catraca', categoria: 'operational', tamanho: '850 KB', formato: 'CSV', dataGeracao: '2026-07-21', compartilhado: false },
    { id: 'REP-03', titulo: 'DRE Gerencial do Evento & Fluxo de Caixa', categoria: 'financial', tamanho: '2.1 MB', formato: 'XLSX', dataGeracao: '2026-07-20', compartilhado: true }
  ],

  documentosEvento: [
    { id: 'DOC-1', titulo: 'Alvará de Funcionamento Prefeitura de Curitiba', tipo: 'Alvará', tamanho: '3.2 MB', disponivelOffline: true, favorito: true },
    { id: 'DOC-2', titulo: 'Laudo de Vistoria Corpo de Bombeiros (AVCB)', tipo: 'Segurança', tamanho: '4.5 MB', disponivelOffline: true, favorito: true },
    { id: 'DOC-3', titulo: 'Contrato de Parceria Trem Serra Verde Express', tipo: 'Contrato', tamanho: '1.8 MB', disponivelOffline: false, favorito: false }
  ],

  downloadsLocais: [
    { id: 'DL-1', titulo: 'Alvará de Funcionamento Prefeitura de Curitiba', dataDownload: '21/07/2026 08:30', tamanho: '3.2 MB' },
    { id: 'DL-2', titulo: 'Relatório Executivo Consolidador 360°', dataDownload: '21/07/2026 09:15', tamanho: '1.4 MB' }
  ]
};
