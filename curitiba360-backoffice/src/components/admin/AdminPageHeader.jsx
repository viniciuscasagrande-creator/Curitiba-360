import React from 'react';
import Breadcrumb from './Breadcrumb';

export function AdminPageHeader({
  title,
  icon,
  description,
  breadcrumbItems = [],
  actions
}) {
  return (
    <div className="space-y-2 border-b border-slate-200 pb-4 text-left">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-black text-lg shadow-xs">
              {icon}
            </span>
          )}
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              {title}
            </h1>
            {description && (
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPageHeader;
