// src/components/ui/Button.jsx
import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button', 
  disabled = false,
  style = {},
  ...props 
}) {
  
  // Definição das cores baseadas na variante
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return { backgroundColor: '#10b981', color: 'white', border: 'none' }; // Verde (Ação Principal)
      case 'secondary':
        return { backgroundColor: '#3b82f6', color: 'white', border: 'none' }; // Azul (Ação Secundária)
      case 'danger':
        return { backgroundColor: '#ef4444', color: 'white', border: 'none' }; // Vermelho (Excluir/Cancelar)
      case 'outline':
        return { backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db' }; // Contorno Padrão
      case 'ghost':
        return { backgroundColor: 'transparent', color: '#4b5563', border: 'none' }; // Sem fundo
      default:
        return { backgroundColor: '#10b981', color: 'white', border: 'none' };
    }
  };

  const baseStyles = {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    opacity: disabled ? 0.6 : 1,
    transition: 'opacity 0.2s',
    ...getVariantStyles(),
    ...style
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      style={baseStyles}
      {...props}
    >
      {children}
    </button>
  );
}
