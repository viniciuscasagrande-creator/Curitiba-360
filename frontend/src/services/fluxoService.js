// src/services/fluxoService.js
import api from './api';

export const fluxoService = {
  // Simula uma requisição GET para buscar as configurações da atração
  buscarConfiguracao: async (atracaoNome) => {
    // Em produção, seria algo como: 
    // const response = await api.get(`/fluxo/${atracaoNome}`);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            capacidadeAreaTriagem: 150,
            tempoMedioValidacao: 8,
            exigirControleBarreiras: true,
            layout: 'Zigue-zague contínuo',
            regrasOperacionais: 'As pessoas não podem atravessar os uni filas, devem se movimentar estritamente dentro do espaço delimitado pelo uni fila.',
            equipamentos: [
              { id: 'EQ-001', tipo: 'Catraca Fixa', local: 'Acesso Principal - Portão A', status: 'Online', ultimaSincronizacao: 'Agora' },
              { id: 'EQ-002', tipo: 'Catraca Fixa', local: 'Acesso Principal - Portão B', status: 'Online', ultimaSincronizacao: 'Há 2 min' }
            ]
          }
        });
      }, 1200); // Simula 1.2 segundos de tempo de carregamento da rede
    });
  },

  // Simula uma requisição POST/PUT para salvar os dados
  salvarConfiguracao: async (dados) => {
    // return await api.put(`/fluxo`, dados);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, message: 'Sucesso' });
      }, 800);
    });
  }
};
