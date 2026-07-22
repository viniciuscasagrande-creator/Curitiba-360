import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  PROFILE_CHANGED_EVENT,
} from "../repositories/profileRepository";

import {
  changePassword as changePasswordService,
  getProfile,
  requestAccountDeletion,
  updatePersonalData as updatePersonalDataService,
  updatePreferences as updatePreferencesService,
  updateProfilePhoto as updateProfilePhotoService,
} from "../services/profileService";

export function useProfile() {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const clearMessages =
    useCallback(() => {
      setError("");
      setSuccessMessage("");
    }, []);

  const loadProfile =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getProfile();

        setProfile(response);
      } catch (requestError) {
        console.error(requestError);

        setError(
          "Não foi possível carregar seu perfil."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    function handleProfileChanged(
      event
    ) {
      setProfile(
        event.detail || null
      );
    }

    window.addEventListener(
      PROFILE_CHANGED_EVENT,
      handleProfileChanged
    );

    return () => {
      window.removeEventListener(
        PROFILE_CHANGED_EVENT,
        handleProfileChanged
      );
    };
  }, []);

  const executeSave =
    useCallback(
      async (
        action,
        message
      ) => {
        setSaving(true);
        clearMessages();

        try {
          const response =
            await action();

          if (
            response &&
            typeof response === "object" &&
            response.id
          ) {
            setProfile(response);
          }

          setSuccessMessage(
            message ||
              response?.message ||
              "Alterações salvas com sucesso."
          );

          return response;
        } catch (requestError) {
          console.error(requestError);

          const message =
            requestError?.message ||
            "Não foi possível salvar as alterações.";

          setError(message);

          throw requestError;
        } finally {
          setSaving(false);
        }
      },
      [clearMessages]
    );

  const handleUpdatePersonalData =
    useCallback(
      (data) =>
        executeSave(
          () =>
            updatePersonalDataService(
              data
            ),
          "Dados pessoais atualizados com sucesso."
        ),
      [executeSave]
    );

  const handleUpdatePreferences =
    useCallback(
      (preferences) =>
        executeSave(
          () =>
            updatePreferencesService(
              preferences
            ),
          "Preferências atualizadas com sucesso."
        ),
      [executeSave]
    );

  const handleUpdatePhoto =
    useCallback(
      (photoURL) =>
        executeSave(
          () =>
            updateProfilePhotoService(
              photoURL
            ),
          "Foto de perfil atualizada."
        ),
      [executeSave]
    );

  const handleChangePassword =
    useCallback(
      (data) =>
        executeSave(
          () =>
            changePasswordService(
              data
            )
        ),
      [executeSave]
    );

  const handleDeleteAccount =
    useCallback(
      () =>
        executeSave(
          requestAccountDeletion,
          "Conta removida localmente."
        ),
      [executeSave]
    );

  return {
    profile,
    loading,
    saving,
    error,
    successMessage,

    updatePersonalData:
      handleUpdatePersonalData,

    updatePreferences:
      handleUpdatePreferences,

    updatePhoto:
      handleUpdatePhoto,

    changePassword:
      handleChangePassword,

    deleteAccount:
      handleDeleteAccount,

    clearMessages,
    reload: loadProfile,
  };
}
