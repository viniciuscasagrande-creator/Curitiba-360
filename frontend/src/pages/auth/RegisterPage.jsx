// src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import PasswordField from '../../components/auth/PasswordField';
import PasswordStrength from '../../components/auth/PasswordStrength';
import AuthButton from '../../components/auth/AuthButton';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !cpf) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setStep(2);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    navigate(`/cadastro-concluido?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
  };

  return (
    <AuthLayout 
      bannerTitle="Seja bem-vindo!" 
      bannerDesc="Crie sua conta de visitante para salvar seus pontos preferidos, acessar rotas personalizadas e comprar ingressos sem taxas."
      stepText={`Etapa ${step} de 2`}
    >
      <div className="space-y-6">
        {/* Botão Voltar */}
        <div>
          <button 
            type="button"
            onClick={() => step === 2 ? setStep(1) : navigate('/login')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-1"
          >
            ← {step === 2 ? 'Voltar para dados pessoais' : 'Voltar para o Login'}
          </button>
        </div>

        {/* Título & Descrição */}
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Criar conta</h2>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            {step === 1 ? 'Insira seus dados pessoais para iniciar seu cadastro.' : 'Escolha uma senha segura para proteger o seu acesso.'}
          </p>
        </div>

        {/* Step 1 Form */}
        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">Nome Completo</label>
              <input
                type="text"
                required
                placeholder="ex: João da Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-355 uppercase tracking-wider select-none">E-mail</label>
              <input
                type="email"
                required
                placeholder="exemplo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">Telefone</label>
                <input
                  type="tel"
                  required
                  placeholder="(41) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider select-none">CPF</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-655 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                />
              </div>
            </div>

            <AuthButton type="submit" className="pt-2">
              Próxima etapa →
            </AuthButton>
          </form>
        ) : (
          /* Step 2 Form */
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1">
              <PasswordField
                label="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordStrength password={password} />
            </div>

            <PasswordField
              label="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <AuthButton type="submit" className="pt-2">
              Concluir Cadastro
            </AuthButton>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
