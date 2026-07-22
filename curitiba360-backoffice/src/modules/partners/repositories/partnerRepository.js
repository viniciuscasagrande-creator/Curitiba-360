import {
  PARTNER_STATUS,
} from "../constants/partnerStatus";

export async function createPartnerRepository(
  partnerData
) {
  return {
    id: crypto.randomUUID(),
    ...partnerData,
    status: PARTNER_STATUS.PENDING_REVIEW,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
