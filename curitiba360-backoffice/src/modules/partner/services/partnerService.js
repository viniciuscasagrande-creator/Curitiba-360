import {
  getPartnerRepository,
  updatePartnerRepository,
} from "../repositories/partnerRepository";

export async function getCurrentPartner() {
  return getPartnerRepository();
}

export async function updatePartnerProfile(
  profile
) {
  const partner =
    await getCurrentPartner();

  return updatePartnerRepository({
    profile: {
      ...partner.profile,
      ...profile,
    },
  });
}

export async function updatePartnerContact(
  contact
) {
  const partner =
    await getCurrentPartner();

  return updatePartnerRepository({
    contact: {
      ...partner.contact,
      ...contact,
    },
  });
}

export async function updatePartnerAddress(
  address
) {
  const partner =
    await getCurrentPartner();

  return updatePartnerRepository({
    address: {
      ...partner.address,
      ...address,
    },
  });
}

export async function updatePartnerBankAccount(
  bankAccount
) {
  const partner =
    await getCurrentPartner();

  return updatePartnerRepository({
    bankAccount: {
      ...partner.bankAccount,
      ...bankAccount,
      status: "pending",
      rejectionReason: null,
    },

    verification: {
      ...partner.verification,
      bankAccountVerified: false,
    },
  });
}

export async function submitPartnerForReview() {
  const partner =
    await getCurrentPartner();

  const requiredSteps = [
    "type",
    "business",
    "responsible",
    "address",
    "profile",
    "documents",
    "bank",
  ];

  const incompleteStep =
    requiredSteps.find(
      (step) =>
        !partner.onboarding.completedSteps.includes(
          step
        )
    );

  if (incompleteStep) {
    throw new Error(
      "Complete todas as etapas antes de enviar o cadastro."
    );
  }

  return updatePartnerRepository({
    status: "under_review",

    onboarding: {
      ...partner.onboarding,
      currentStep: 8,
      percentage: 100,
    },
  });
}

export async function completeOnboardingStep(
  stepId
) {
  const partner =
    await getCurrentPartner();

  const completedSteps = Array.from(
    new Set([
      ...partner.onboarding.completedSteps,
      stepId,
    ])
  );

  const percentage = Math.round(
    (completedSteps.length / 8) * 100
  );

  return updatePartnerRepository({
    onboarding: {
      ...partner.onboarding,
      completedSteps,
      percentage: Math.min(
        percentage,
        100
      ),
    },
  });
}
