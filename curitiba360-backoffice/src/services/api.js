// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // URL base do backend (substitua pela URL real em produção)
  baseURL: 'https://api.curitiba360.com.br/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// INTERCEPTOR DE REQUISIÇÃO (REQUEST)
// ==========================================
// Injeta o Token em todas as chamadas que saem do front-end
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('@Curitiba360:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ==========================================
// INTERCEPTOR DE RESPOSTA (RESPONSE)
// ==========================================
// Fica "escutando" tudo que volta do backend
api.interceptors.response.use(
  (response) => {
    // Se a requisição deu sucesso (200, 201), apenas deixa passar
    return response;
  },
  (error) => {
    // Se a requisição falhou, verifica se foi um erro de permissão (401)
    if (error.response && error.response.status === 401) {
      console.warn('Sessão expirada ou token inválido. O usuário será deslogado.');

      // 1. Limpa o cofre local de credenciais
      localStorage.removeItem('@Curitiba360:user');
      localStorage.removeItem('@Curitiba360:token');

      // 2. Redireciona o usuário imediatamente para a tela de login.
      // O uso do window.location é a forma mais segura de quebrar o ciclo
      // fora do contexto das rotas do React (já que o Axios não conhece o useNavigate).
      window.location.href = '/login';
    }

    // Se for outro erro (ex: 500 Servidor, 404 Não Encontrado), 
    // repassa o erro para o componente lidar (ex: mostrando um alert)
    return Promise.reject(error);
  }
);

export default api;