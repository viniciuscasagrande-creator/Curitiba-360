// src/pages/auth/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import PasswordField from '../../components/auth/PasswordField';
import PasswordStrength from '../../components/auth/PasswordStrength';
import AuthButton from '../../components/auth/AuthButton';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Nova senha salva com sucesso! Faça login com suas novas credenciais.');
    navigate('/login');
  };

  return (
    <AuthLayout 
      bannerTitle="Nova Senha de Acesso" 
      bannerDesc="Escolha uma senha robusta combinando letras maiúsculas, números e caracteres especiais para blindar sua conta."
      stepText="Redefinir Senha"
    >
      <div className="space-y-6">
        {/* Título & Descrição */}
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Criar nova senha</h2>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            Insira sua nova senha abaixo e confirme-a para reestabelecer o acesso ao Curitiba 360.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <PasswordField
              label="Nova senha"
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

          <AuthButton type="submit">
            Salvar senha
          </AuthButton>
        </form>
      </div>
    </AuthLayout>
  );
}
