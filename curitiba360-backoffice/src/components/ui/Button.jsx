// src/components/ui/Button.jsx
import React from 'react';

export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, icon, style = {}, ...props }) {
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary': // O botão grafite do wireframe (Ex: Adicionar Agência)
        return { backgroundColor: '#4b5563', color: 'white', border: 'none' }; 
      case 'outline': // O botão de filtro do wireframe
        return { backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db' };
      case 'danger':
        return { backgroundColor: '#ef4444', color: 'white', border: 'none' };
      default:
        return { backgroundColor: '#4b5563', color: 'white', border: 'none' };
    }
  };

  const baseStyles = {
    padding: '0.5rem 1rem', // Padding mais enxuto conforme mockup
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    fontSize: '0.875rem',
    opacity: disabled ? 0.6 : 1,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
    ...getVariantStyles(),
    ...style
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={baseStyles} {...props}>
      {children}
      {icon && <span style={{ fontSize: '1rem', lineHeight: 1 }}>{icon}</span>}
    </button>
  );
}