import {
  createPartnerRepository,
} from "../repositories/partnerRepository";

const PARTNER_REQUESTS_KEY =
  "curitiba360:partner-requests";

export async function registerPartner(data) {
  const normalizedData = {
    responsible: {
      name: data.responsibleName.trim(),
      email: data.responsibleEmail
        .trim()
        .toLowerCase(),
      phone: data.responsiblePhone,
    },

    company: {
      legalName: data.companyName.trim(),
      tradeName: data.tradeName.trim(),
      documentType: data.documentType,
      document: data.document,
      category: data.category,
      website: data.website?.trim() || "",
      instagram:
        data.instagram?.trim() || "",
      description: data.description.trim(),
    },

    address: {
      zipCode: data.zipCode,
      street: data.street.trim(),
      number: data.number.trim(),
      complement:
        data.complement?.trim() || "",
      neighborhood:
        data.neighborhood.trim(),
      city: data.city.trim(),
      state: data.state
        .trim()
        .toUpperCase(),
    },

    acceptedCommercialTerms:
      data.acceptCommercialTerms,

    acceptedPrivacy:
      data.acceptPrivacy,
  };

  const partner =
    await createPartnerRepository(
      normalizedData
    );

  const storedRequests = JSON.parse(
    localStorage.getItem(
      PARTNER_REQUESTS_KEY
    ) || "[]"
  );

  localStorage.setItem(
    PARTNER_REQUESTS_KEY,
    JSON.stringify([
      ...storedRequests,
      partner,
    ])
  );

  return partner;
}

export function findPartnerRequestById(
  partnerId
) {
  if (!partnerId) {
    return null;
  }

  const storedRequests = JSON.parse(
    localStorage.getItem(
      PARTNER_REQUESTS_KEY
    ) || "[]"
  );

  return (
    storedRequests.find(
      (request) =>
        request.id === partnerId
    ) || null
  );
}
