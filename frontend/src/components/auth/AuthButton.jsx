// src/components/auth/AuthButton.jsx
import React from 'react';

export default function AuthButton({ type = "button", onClick, children, variant = "primary", disabled = false, icon }) {
  if (variant === "google") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-3 select-none disabled:opacity-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#ea4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.357-2.827-6.357-6.314s2.848-6.314 6.357-6.314c1.62 0 3.096.608 4.22 1.62l3.197-3.197C19.26 2.378 15.984 1 12.24 1 5.922 1 1 5.92 1 12.2s4.922 11.2 11.24 11.2c6.545 0 10.74-4.51 10.74-10.93 0-.64-.06-1.22-.16-1.785H12.24z"/>
        </svg>
        {children || "Entrar com o Google"}
      </button>
    );
  }

  const baseStyle = "w-full py-3 rounded-xl font-bold tracking-wide transition-colors cursor-pointer border-none shadow-lg text-sm select-none disabled:opacity-50";
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/10",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white shadow-black/10 border border-slate-750"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant] || variants.primary}`}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="text-base">{icon}</span>}
        {children}
      </div>
    </button>
  );
}
