import {
  deleteProfileRepository,
  getProfileRepository,
  updatePreferencesRepository,
  updateProfilePhotoRepository,
  updateProfileRepository,
} from "../repositories/profileRepository";

function onlyNumbers(value = "") {
  return String(value).replace(/\D/g, "");
}

function formatPhone(value = "") {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 10) {
    return numbers.replace(
      /^(\d{2})(\d{4})(\d{0,4}).*/,
      "($1) $2-$3"
    );
  }

  return numbers.replace(
    /^(\d{2})(\d{5})(\d{0,4}).*/,
    "($1) $2-$3"
  );
}

function formatCpf(value = "") {
  return onlyNumbers(value)
    .slice(0, 11)
    .replace(
      /^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/,
      "$1.$2.$3-$4"
    );
}

function formatZipCode(value = "") {
  return onlyNumbers(value)
    .slice(0, 8)
    .replace(
      /^(\d{5})(\d{0,3}).*/,
      "$1-$2"
    );
}

function normalizePersonalData(data) {
  return {
    name: data.name?.trim() || "",
    phone: formatPhone(data.phone),
    birthDate: data.birthDate || null,
    cpf: formatCpf(data.cpf),
    gender: data.gender || "",

    address: {
      zipCode: formatZipCode(
        data.address?.zipCode
      ),

      street:
        data.address?.street?.trim() || "",

      number:
        data.address?.number?.trim() || "",

      complement:
        data.address?.complement?.trim() || "",

      neighborhood:
        data.address?.neighborhood?.trim() || "",

      city:
        data.address?.city?.trim() || "",

      state:
        data.address?.state
          ?.trim()
          .toUpperCase()
          .slice(0, 2) || "",
    },
  };
}

export async function getProfile() {
  return getProfileRepository();
}

export async function updatePersonalData(data) {
  const normalizedData =
    normalizePersonalData(data);

  return updateProfileRepository(
    normalizedData
  );
}

export async function updatePreferences(
  preferences
) {
  return updatePreferencesRepository({
    categories: Array.from(
      new Set(
        preferences.categories || []
      )
    ),

    notifications: {
      email: Boolean(
        preferences.notifications?.email
      ),

      push: Boolean(
        preferences.notifications?.push
      ),

      whatsapp: Boolean(
        preferences.notifications?.whatsapp
      ),

      promotions: Boolean(
        preferences.notifications?.promotions
      ),

      events: Boolean(
        preferences.notifications?.events
      ),
    },

    accessibility: {
      reducedMotion: Boolean(
        preferences.accessibility
          ?.reducedMotion
      ),

      highContrast: Boolean(
        preferences.accessibility
          ?.highContrast
      ),

      largerText: Boolean(
        preferences.accessibility
          ?.largerText
      ),
    },
  });
}

export async function updateProfilePhoto(
  photoURL
) {
  if (
    photoURL !== null &&
    typeof photoURL !== "string"
  ) {
    throw new Error(
      "A foto de perfil informada é inválida."
    );
  }

  return updateProfilePhotoRepository(
    photoURL
  );
}

export async function changePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}) {
  if (!currentPassword) {
    throw new Error(
      "Informe sua senha atual."
    );
  }

  if (
    !newPassword ||
    newPassword.length < 8
  ) {
    throw new Error(
      "A nova senha deve ter pelo menos 8 caracteres."
    );
  }

  if (
    newPassword !== confirmPassword
  ) {
    throw new Error(
      "As senhas não coincidem."
    );
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 500);
  });

  return {
    success: true,
    message:
      "Senha atualizada em modo demonstrativo.",
  };
}

export async function requestAccountDeletion() {
  return deleteProfileRepository();
}
