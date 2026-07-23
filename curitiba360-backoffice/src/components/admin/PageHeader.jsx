import React from 'react';

export function PageHeader({ category, title, description, actions }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 text-left">
      <div>
        {category && (
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            {category}
          </p>
        )}
        <h1 className="text-2xl font-black text-slate-950 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
