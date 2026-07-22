import React from "react";
import { Link } from "react-router-dom";

import { Checkbox } from "../ui";

export function TermsCheckbox({
  id = "accept-terms",
  checked,
  onChange,
  error,
}) {
  const label = (
    <span>
      Li e concordo com os{" "}
      <Link
        to="/termos"
        target="_blank"
        className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
        onClick={(event) => event.stopPropagation()}
      >
        Termos de Uso
      </Link>{" "}
      e com a{" "}
      <Link
        to="/privacidade"
        target="_blank"
        className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
        onClick={(event) => event.stopPropagation()}
      >
        Política de Privacidade
      </Link>
      .
    </span>
  );

  return (
    <Checkbox
      id={id}
      label={label}
      checked={checked}
      onChange={onChange}
      error={error}
    />
  );
}

export default TermsCheckbox;
