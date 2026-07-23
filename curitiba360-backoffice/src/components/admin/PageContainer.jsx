import React from 'react';

export function PageContainer({ children, className = '' }) {
  return (
    <div className={`space-y-6 text-left ${className}`}>
      {children}
    </div>
  );
}

export default PageContainer;
