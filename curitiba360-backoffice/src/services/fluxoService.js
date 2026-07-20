// src/services/fluxoService.js
import api from './api';

// Helper para simular delay de rede (latência de 800ms a 1s)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getFluxoConfig = async () => {
  await delay(1000); // Simula atraso na rede
  
  // Futuro endpoint real:
  // const response = await api.get('/fluxo/config');
  // return response.data;

  return {
    capacidadeAreaTriagem: 150,
    tempoMedioValidacao: 8, // segundos
    exigirControleBarreiras: true,
    layout: 'Zigue-zague com divisores físicos'
  };
};

export const updateFluxoConfig = async (config) => {
  await delay(1000);

  // Futuro endpoint real:
  // const response = await api.put('/fluxo/config', config);
  // return response.data;

  return {
    success: true,
    message: 'Configurações de fluxo salvas com sucesso no servidor!',
    config
  };
};

export const getEquipamentos = async () => {
  await delay(800);

  return [
    { id: 'EQ-001', tipo: 'Catraca Fixa', local: 'Acesso Principal - Portão A', status: 'Online', ultimaSincronizacao: 'Agora' },
    { id: 'EQ-002', tipo: 'Catraca Fixa', local: 'Acesso Principal - Portão B', status: 'Online', ultimaSincronizacao: 'Há 2 min' },
    { id: 'EQ-005', tipo: 'Leitor Móvel (App)', local: 'Fila VIP / Preferencial', status: 'Offline', ultimaSincronizacao: 'Há 2 horas' },
  ];
};
