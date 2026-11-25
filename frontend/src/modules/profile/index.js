export {
  default as ProfilePage,
} from "./pages/ProfilePage";

export {
  default as PersonalDataPage,
} from "./pages/PersonalDataPage";

export {
  default as PreferencesPage,
} from "./pages/PreferencesPage";

export {
  default as SecurityPage,
} from "./pages/SecurityPage";

export {
  default as OrdersHistoryPage,
} from "./pages/OrdersHistoryPage";

export {
  useProfile,
} from "./hooks/useProfile";

export {
  usePersonalData,
} from "./hooks/usePersonalData";

export {
  useSecurity,
} from "./hooks/useSecurity";

export {
  personalDataSchema,
} from "./schemas/personalDataSchema";

export {
  securitySchema,
} from "./schemas/securitySchema";

export {
  changePassword,
  getProfile,
  requestAccountDeletion,
  updatePersonalData,
  updatePreferences,
  updateProfilePhoto,
} from "./services/profileService";

export {
  default as ProfilePreferenceEffects,
} from "./components/ProfilePreferenceEffects";

export {
  preferencesSchema,
} from "./schemas/preferencesSchema";
