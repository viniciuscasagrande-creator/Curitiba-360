import { useEffect } from "react";

import {
  useProfile,
} from "../hooks/useProfile";

export default function ProfilePreferenceEffects() {
  const {
    profile,
  } = useProfile();

  const accessibility =
    profile?.preferences
      ?.accessibility;

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.toggle(
      "reduce-motion",
      Boolean(
        accessibility?.reducedMotion
      )
    );

    root.classList.toggle(
      "high-contrast",
      Boolean(
        accessibility?.highContrast
      )
    );

    root.classList.toggle(
      "larger-text",
      Boolean(
        accessibility?.largerText
      )
    );
  }, [
    accessibility?.reducedMotion,
    accessibility?.highContrast,
    accessibility?.largerText,
  ]);

  return null;
}
