import React from "react";
import { Link } from "react-router-dom";

export function AuthFooter({ text, linkText, to }) {
  return (
    <div className="mt-8 text-center select-none">
      <p className="text-sm text-slate-650">
        {text}{" "}
        {linkText && to && (
          <Link
            to={to}
            className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
          >
            {linkText}
          </Link>
        )}
      </p>
    </div>
  );
}

export default AuthFooter;
