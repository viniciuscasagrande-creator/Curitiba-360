import { getProfileRepository, updateProfileRepository } from "./profileRepository";

export async function fetchPersonalDataRepository() {
  const profile = await getProfileRepository();
  return {
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone || "",
    birthDate: profile.birthDate || "",
    cpf: profile.cpf || "",
    gender: profile.gender || "",
    address: {
      zipCode: profile.address?.zipCode || "",
      street: profile.address?.street || "",
      number: profile.address?.number || "",
      complement: profile.address?.complement || "",
      neighborhood: profile.address?.neighborhood || "",
      city: profile.address?.city || "",
      state: profile.address?.state || "",
    },
  };
}

export async function savePersonalDataRepository(data) {
  return updateProfileRepository(data);
}
