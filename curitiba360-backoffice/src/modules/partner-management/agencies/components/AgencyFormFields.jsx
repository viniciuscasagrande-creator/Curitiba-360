export const inputClassName =
  'h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none transition placeholder:font-medium placeholder:text-slate-300 focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 disabled:cursor-not-allowed disabled:bg-slate-100';

export const textareaClassName =
  'min-h-24 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 outline-none transition placeholder:font-medium placeholder:text-slate-300 focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10';

export function FormField({
  label,
  error,
  required = false,
  className = '',
  children,
}) {
  return (
    <label className={`text-left block ${className}`}>
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      {children}

      {error && (
        <span className="mt-1.5 block text-[10px] font-bold text-red-600">
          {error.message}
        </span>
      )}
    </label>
  );
}

export function maskCnpj(value = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(
      /^(\d{2})(\d)/,
      '$1.$2',
    )
    .replace(
      /^(\d{2})\.(\d{3})(\d)/,
      '$1.$2.$3',
    )
    .replace(
      /\.(\d{3})(\d)/,
      '.$1/$2',
    )
    .replace(
      /(\d{4})(\d)/,
      '$1-$2',
    );
}

export function maskCpf(value = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(
      /^(\d{3})(\d)/,
      '$1.$2',
    )
    .replace(
      /\.(\d{3})(\d)/,
      '.$1.$2',
    )
    .replace(
      /\.(\d{3})(\d)/,
      '.$1-$2',
    );
}

export function maskCep(value = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(
      /^(\d{5})(\d)/,
      '$1-$2',
    );
}

export function maskPhone(value = '') {
  const numbers = value
    .replace(/\D/g, '')
    .slice(0, 11);

  if (numbers.length <= 10) {
    return numbers
      .replace(
        /^(\d{2})(\d)/,
        '($1) $2',
      )
      .replace(
        /(\d{4})(\d)/,
        '$1-$2',
      );
  }

  return numbers
    .replace(
      /^(\d{2})(\d)/,
      '($1) $2',
    )
    .replace(
      /(\d{5})(\d)/,
      '$1-$2',
    );
}
