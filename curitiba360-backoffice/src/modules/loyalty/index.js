export { default as LoyaltyDashboardPage } from "./pages/LoyaltyDashboardPage";
export { default as BenefitsPage } from "./pages/BenefitsPage";
export { default as PointsPage } from "./pages/PointsPage";
export { default as CashbackPage } from "./pages/CashbackPage";
export { default as MissionsPage } from "./pages/MissionsPage";
export { default as CouponsPage } from "./pages/CouponsPage";
export { default as ReferralsPage } from "./pages/ReferralsPage";
export { default as LoyaltyStatementPage } from "./pages/LoyaltyStatementPage";
export { useLoyalty } from "./hooks/useLoyalty";
export {
  getLoyaltyAccount,
  creditPurchasePoints,
  redeemPoints,
  useCashback,
  claimMissionReward,
} from "./services/loyaltyService";
