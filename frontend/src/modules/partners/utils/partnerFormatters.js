export function formatPhone(value = "") {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(
      2,
      6
    )}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(
    2,
    7
  )}-${digits.slice(7)}`;
}

export function formatZipCode(value = "") {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatCpf(value = "") {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(
      /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
      "$1.$2.$3-$4"
    );
}

export function formatCnpj(value = "") {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 14);

  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(
      /^(\d{2})\.(\d{3})\.(\d{3})(\d)/,
      "$1.$2.$3/$4"
    )
    .replace(
      /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
      "$1.$2.$3/$4-$5"
    );
}

export function formatDocument(
  value,
  type
) {
  return type === "cpf"
    ? formatCpf(value)
    : formatCnpj(value);
}
