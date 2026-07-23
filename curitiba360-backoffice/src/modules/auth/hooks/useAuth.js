import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      profile: null,
      loading: false,
      authenticated: false,
      login: async () => {},
      register: async () => {},
      loginWithGoogle: async () => {},
      recoverPassword: async () => {},
      logout: async () => {}
    };
  }

  return context;
}
export default useAuth;
