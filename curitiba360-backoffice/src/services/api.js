// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Substitua pela URL do seu backend no futuro
  baseURL: 'https://api.curitiba360.com.br/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação automaticamente nas requisições
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('@Curitiba360:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
