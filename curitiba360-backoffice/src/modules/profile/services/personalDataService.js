import { fetchPersonalDataRepository, savePersonalDataRepository } from "../repositories/personalDataRepository";
import { fetchAddressByCep } from "../utils/cepService";
import { onlyNumbers } from "../utils/masks";

export async function getPersonalData() {
  return fetchPersonalDataRepository();
}

export async function savePersonalData(data) {
  // Check if CPF is valid
  const cleanCpf = onlyNumbers(data.cpf);
  if (cleanCpf.length !== 11) {
    throw new Error("CPF inválido.");
  }
  
  return savePersonalDataRepository(data);
}

export async function lookupAddress(cep) {
  const clean = onlyNumbers(cep);
  if (clean.length !== 8) {
    throw new Error("CEP inválido.");
  }
  return fetchAddressByCep(clean);
}
