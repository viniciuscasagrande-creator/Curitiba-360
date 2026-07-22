import React from "react";
import { Check, Circle } from "lucide-react";

import { cn } from "../../utils/cn";

const passwordRules = [
  {
    id: "length",
    label: "Mínimo de 8 caracteres",
    validate: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "Uma letra maiúscula",
    validate: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    label: "Uma letra minúscula",
    validate: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    label: "Um número",
    validate: (password) => /\d/.test(password),
  },
  {
    id: "special",
    label: "Um caractere especial",
    validate: (password) =>
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  },
];

function getPasswordStrength(password) {
  const passedRules = passwordRules.filter((rule) =>
    rule.validate(password)
  ).length;

  if (!password) {
    return {
      level: 0,
      label: "Digite uma senha",
      textClass: "text-slate-500",
      barClass: "bg-slate-200",
    };
  }

  if (passedRules <= 2) {
    return {
      level: 1,
      label: "Senha fraca",
      textClass: "text-red-600",
      barClass: "bg-red-500",
    };
  }

  if (passedRules === 3) {
    return {
      level: 2,
      label: "Senha média",
      textClass: "text-amber-600",
      barClass: "bg-amber-500",
    };
  }

  if (passedRules === 4) {
    return {
      level: 3,
      label: "Senha boa",
      textClass: "text-blue-600",
      barClass: "bg-blue-500",
    };
  }

  return {
    level: 4,
    label: "Senha forte",
    textClass: "text-emerald-700",
    barClass: "bg-emerald-600",
  };
}

export function PasswordStrength({
  password = "",
  showRules = true,
}) {
  const strength = getPasswordStrength(password);

  return (
    <div className="space-y-4 text-left">
      <div>
        <div className="mb-2 flex items-center justify-between gap-4 select-none">
          <span className="text-xs font-medium text-slate-500">
            Segurança da senha
          </span>

          <span
            className={cn(
              "text-xs font-semibold",
              strength.textClass
            )}
          >
            {strength.label}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 select-none">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1.5 rounded-full transition",
                level <= strength.level
                  ? strength.barClass
                  : "bg-slate-200"
              )}
            />
          ))}
        </div>
      </div>

      {showRules && (
        <ul className="grid gap-2 sm:grid-cols-2 list-none pl-0">
          {passwordRules.map((rule) => {
            const passed = rule.validate(password);

            return (
              <li
                key={rule.id}
                className={cn(
                  "flex items-center gap-2 text-xs",
                  passed
                    ? "text-emerald-700"
                    : "text-slate-500"
                )}
              >
                {passed ? (
                  <Check
                    size={15}
                    className="shrink-0"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                ) : (
                  <Circle
                    size={12}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                )}

                {rule.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { passwordRules };
export default PasswordStrength;
