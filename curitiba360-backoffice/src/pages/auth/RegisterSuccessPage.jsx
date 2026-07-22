// src/pages/auth/RegisterSuccessPage.jsx
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthButton from '../../components/auth/AuthButton';

export default function RegisterSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'usuario@mail.com';
  const name = searchParams.get('name') || 'Visitante';

  return (
    <AuthLayout 
      bannerTitle="Cadastro Realizado!" 
      bannerDesc="Parabéns! Sua conta foi pré-registrada no ecossistema Curitiba 360. Agora resta apenas a ativação."
      stepText="Ativação pendente"
    >
      <div className="space-y-6 text-center">
        <div className="text-5xl">✉️</div>
        
        <div className="space-y-2 text-left">
          <h2 className="text-2xl font-extrabold text-white tracking-tight text-center">Confirmação de e-mail</h2>
          <p className="text-slate-300 text-sm leading-relaxed text-center">
            Olá, <strong className="text-white">{name}</strong>!<br />
            Enviamos um e-mail com o link de validação para: <strong className="text-emerald-400 font-semibold">{email}</strong>.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 leading-relaxed text-left space-y-3">
          <p className="margin-0 font-semibold text-slate-350">💡 Simule o fluxo de ativação:</p>
          <AuthButton 
            onClick={() => navigate(`/portal/email-confirmacao?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`)}
            variant="secondary"
          >
            📥 Abrir Caixa de Entrada Mock
          </AuthButton>
        </div>

        <div className="pt-2">
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="text-xs text-slate-450 hover:text-white font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
