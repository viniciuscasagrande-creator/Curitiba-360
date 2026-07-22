import { forwardRef, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { cn } from "../../utils/cn";

const PasswordInput = forwardRef(
  (
    {
      id,
      label = "Senha",
      error,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-800"
        >
          {label}
        </label>

        <div
          className={cn(
            "flex h-12 items-center rounded-xl border bg-white px-3",
            "transition focus-within:ring-2",
            error
              ? "border-red-500 focus-within:ring-red-100"
              : [
                  "border-slate-300",
                  "focus-within:border-emerald-700",
                  "focus-within:ring-emerald-100",
                ]
          )}
        >
          <LockKeyhole
            size={19}
            className="mr-3 text-slate-400"
            aria-hidden="true"
          />

          <input
            ref={ref}
            id={id}
            type={visible ? "text" : "password"}
            className={cn(
              "h-full min-w-0 flex-1 bg-transparent border-none",
              "text-sm text-slate-950 outline-none",
              "placeholder:text-slate-400",
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="ml-2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 border-none cursor-pointer"
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          >
            {visible ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>

        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
export default PasswordInput;
