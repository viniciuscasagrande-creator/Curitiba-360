export { default as PartnerLandingPage } from "./pages/PartnerLandingPage";
export { default as PartnerRegistrationPage } from "./pages/PartnerRegistrationPage";
export { default as PartnerRegistrationSuccessPage } from "./pages/PartnerRegistrationSuccessPage";
export { default as PartnerOnboardingPage } from "./pages/PartnerOnboardingPage";
export { default as PartnerDashboardPage } from "./pages/PartnerDashboardPage";
export { default as PartnerProfilePage } from "./pages/PartnerProfilePage";
export { default as PartnerDocumentsPage } from "./pages/PartnerDocumentsPage";
export { default as PartnerTeamPage } from "./pages/PartnerTeamPage";
export { default as PartnerBankAccountPage } from "./pages/PartnerBankAccountPage";
export { default as PartnerSettingsPage } from "./pages/PartnerSettingsPage";

export { default as PartnerRoute } from "./guards/PartnerRoute";
export { default as ApprovedPartnerRoute } from "./guards/ApprovedPartnerRoute";
export { default as PartnerPermissionRoute } from "./guards/PartnerPermissionRoute";

export { usePartner } from "./hooks/usePartner";
export {
  getCurrentPartner,
  updatePartnerProfile,
  updatePartnerContact,
  updatePartnerAddress,
  updatePartnerBankAccount,
  submitPartnerForReview,
  completeOnboardingStep,
} from "./services/partnerService";
