// src/pages/auth/PartnerRegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthButton from '../../components/auth/AuthButton';

export default function PartnerRegisterPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [segment, setSegment] = useState('hotel'); // hotel, restaurant, guide, agency
  const [responsibleName, setResponsibleName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !cnpj || !responsibleName || !email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    alert('Sua solicitação de parceria comercial foi enviada com sucesso! Analisaremos sua ficha e responderemos em até 48 horas.');
    navigate('/login');
  };

  return (
    <AuthLayout 
      bannerTitle="Seja um Parceiro 360" 
      bannerDesc="Disponibilize seus serviços, venda ingressos e aumente a visibilidade do seu negócio de turismo no ecossistema inteligente de Curitiba."
      stepText="Parceiro Comercial"
    >
      <div className="space-y-6">
        {/* Botão Voltar */}
        <div>
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1"
          >
            ← Voltar para o Login
          </button>
        </div>

        {/* Título */}
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Auto-cadastro</h2>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            Preencha a ficha cadastral abaixo para enviar sua solicitação de credenciamento.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">Nome da Empresa / Fantasia</label>
            <input
              type="text"
              required
              placeholder="ex: Hotel Centro Curitiba"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">CNPJ</label>
              <input
                type="text"
                required
                placeholder="00.000.000/0001-00"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">Segmento</label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm cursor-pointer"
              >
                <option value="hotel">🏨 Meio de Hospedagem</option>
                <option value="restaurant">🍽️ Gastronomia / Bar</option>
                <option value="guide">🗺️ Guia de Turismo</option>
                <option value="agency">🎒 Agência de Receptivo</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">Nome do Responsável</label>
            <input
              type="text"
              required
              placeholder="ex: Roberto Carlos"
              value={responsibleName}
              onChange={(e) => setResponsibleName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">E-mail Corporativo</label>
            <input
              type="email"
              required
              placeholder="roberto@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
            />
          </div>

          <AuthButton type="submit" className="pt-2">
            Solicitar Parceria 🤝
          </AuthButton>
        </form>
      </div>
    </AuthLayout>
  );
}
