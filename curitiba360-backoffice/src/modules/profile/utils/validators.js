import { onlyNumbers } from "./masks";

export function validateCpf(value = "") {
  const clean = onlyNumbers(value);
  
  if (clean.length !== 11) {
    return false;
  }

  // Check for known invalid patterns
  if (/^(\d)\1{10}$/.test(clean)) {
    return false;
  }

  // Validate digit 1
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(clean.charAt(9), 10)) {
    return false;
  }

  // Validate digit 2
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(clean.charAt(10), 10)) {
    return false;
  }

  return true;
}

export function validatePhone(value = "") {
  const clean = onlyNumbers(value);
  return clean.length === 10 || clean.length === 11;
}

export function validateCep(value = "") {
  const clean = onlyNumbers(value);
  return clean.length === 8;
}
