import { onlyNumbers } from "./masks";

const MOCK_CEP_DATABASE = {
  "80010000": {
    street: "Rua XV de Novembro",
    neighborhood: "Centro",
    city: "Curitiba",
    state: "PR",
  },
  "80020000": {
    street: "Praça Tiradentes",
    neighborhood: "Centro",
    city: "Curitiba",
    state: "PR",
  },
  "80240000": {
    street: "Avenida Sete de Setembro",
    neighborhood: "Batel",
    city: "Curitiba",
    state: "PR",
  },
  "81530000": {
    street: "Avenida Coronel Francisco H. dos Santos",
    neighborhood: "Jardim das Américas",
    city: "Curitiba",
    state: "PR",
  },
};

export async function fetchAddressByCep(cep = "") {
  const clean = onlyNumbers(cep);

  await new Promise((resolve) => {
    window.setTimeout(resolve, 300);
  });

  if (clean.length !== 8) {
    throw new Error("CEP deve conter 8 dígitos.");
  }

  const result = MOCK_CEP_DATABASE[clean];

  if (result) {
    return { ...result };
  }

  // Fallback default for any other valid CEP
  return {
    street: "Rua Depoimento Demonstrativo",
    neighborhood: "Bairro Simulado",
    city: "Curitiba",
    state: "PR",
  };
}
