import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-1 hover:text-slate-900 transition"
      >
        <Home size={13} className="text-slate-400" />
        <span>Backoffice</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={13} className="text-slate-300 shrink-0" />
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-slate-900 transition truncate max-w-[150px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-bold text-slate-900 truncate max-w-[180px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumb;
