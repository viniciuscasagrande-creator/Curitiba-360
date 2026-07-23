import React from 'react';

export function Skeleton({ className = 'h-6 w-full' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`}
    />
  );
}

export default Skeleton;
