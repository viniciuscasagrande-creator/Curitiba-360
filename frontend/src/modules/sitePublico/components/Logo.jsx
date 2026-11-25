import React from 'react';

export default function Logo({ size = 'md', className = '' }) {
  const heights = {
    sm: '68px',
    md: '96px',
    lg: '140px'
  };

  const currentHeight = heights[size] || heights.md;

  return (
    <div 
      className={`group flex items-center select-none cursor-pointer transition-all duration-300 ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Official Curitiba 360° Horizontal Header Logo with Rounded Corners */}
      <img 
        src="/logos/curitiba360_official_header_logo.png" 
        alt="Curitiba 360 Logo Oficial" 
        style={{ 
          height: currentHeight,
          width: 'auto',
          objectFit: 'contain',
          borderRadius: '18px',
          padding: '2px',
          filter: 'drop-shadow(0 4px 16px rgba(0, 168, 150, 0.35)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1))',
          transition: 'transform 0.3s ease, filter 0.3s ease',
          display: 'block'
        }} 
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.06)';
          e.currentTarget.style.filter = 'drop-shadow(0 8px 24px rgba(0, 168, 150, 0.55))';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.filter = 'drop-shadow(0 4px 16px rgba(0, 168, 150, 0.35))';
        }}
      />
    </div>
  );
}









