import { profileMock } from "../mocks/profileMock";

const PROFILE_STORAGE_KEY = "curitiba360:user-profile";
const PROFILE_CHANGED_EVENT = "curitiba360:profile-changed";

function cloneProfile(profile) {
  return JSON.parse(JSON.stringify(profile));
}

function parseStoredProfile(value) {
  if (!value) {
    return null;
  }

  try {
    const parsedProfile = JSON.parse(value);

    return parsedProfile &&
      typeof parsedProfile === "object"
      ? parsedProfile
      : null;
  } catch {
    return null;
  }
}

function emitProfileChanged(profile) {
  window.dispatchEvent(
    new CustomEvent(PROFILE_CHANGED_EVENT, {
      detail: cloneProfile(profile),
    })
  );
}

export async function getProfileRepository() {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 250);
  });

  const storedProfile = parseStoredProfile(
    localStorage.getItem(PROFILE_STORAGE_KEY)
  );

  if (storedProfile) {
    return cloneProfile(storedProfile);
  }

  const initialProfile = cloneProfile(profileMock);

  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(initialProfile)
  );

  return initialProfile;
}

export async function updateProfileRepository(data) {
  const currentProfile =
    await getProfileRepository();

  const nextProfile = {
    ...currentProfile,
    ...data,

    address: {
      ...currentProfile.address,
      ...(data.address || {}),
    },

    preferences: {
      ...currentProfile.preferences,
      ...(data.preferences || {}),

      notifications: {
        ...currentProfile.preferences?.notifications,
        ...(data.preferences?.notifications || {}),
      },

      accessibility: {
        ...currentProfile.preferences?.accessibility,
        ...(data.preferences?.accessibility || {}),
      },
    },

    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(nextProfile)
  );

  emitProfileChanged(nextProfile);

  return cloneProfile(nextProfile);
}

export async function updatePreferencesRepository(
  preferences
) {
  return updateProfileRepository({
    preferences,
  });
}

export async function updateProfilePhotoRepository(
  photoURL
) {
  return updateProfileRepository({
    photoURL,
  });
}

export async function deleteProfileRepository() {
  localStorage.removeItem(
    PROFILE_STORAGE_KEY
  );

  window.dispatchEvent(
    new CustomEvent(PROFILE_CHANGED_EVENT, {
      detail: null,
    })
  );

  return true;
}

export {
  PROFILE_CHANGED_EVENT,
  PROFILE_STORAGE_KEY,
};
