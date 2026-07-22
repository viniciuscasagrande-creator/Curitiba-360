const SECURITY_STORAGE_KEY = "curitiba360:security";

const DEFAULT_SECURITY_STATE = {
  passwordUpdatedAt: "2026-07-15T14:20:00.000Z",
  twoFactor: false,
  sessions: [
    {
      id: "sess-1",
      browser: "Chrome",
      platform: "Windows 11",
      city: "Curitiba",
      country: "Brasil",
      current: true,
      lastSeen: "Agora",
    },
    {
      id: "sess-2",
      browser: "Safari",
      platform: "iOS (iPhone)",
      city: "Curitiba",
      country: "Brasil",
      current: false,
      lastSeen: "Ontem",
    },
  ],
  devices: [
    {
      id: "dev-1",
      name: "Notebook Dell XPS",
      type: "desktop",
      platform: "Windows",
      lastLogin: "2026-07-22T10:00:00.000Z",
      ip: "186.220.198.11",
    },
    {
      id: "dev-2",
      name: "iPhone 16 Pro",
      type: "mobile",
      platform: "iOS",
      lastLogin: "2026-07-21T18:30:00.000Z",
      ip: "186.220.198.24",
    },
    {
      id: "dev-3",
      name: "MacBook Air M2",
      type: "desktop",
      platform: "macOS",
      lastLogin: "2026-07-15T14:15:00.000Z",
      ip: "177.45.20.98",
    },
  ],
  history: [
    {
      id: "hist-1",
      action: "Login realizado",
      date: "22 Jul 2026, 10:00",
      city: "Curitiba",
      ip: "186.220.198.11",
    },
    {
      id: "hist-2",
      action: "Troca de senha",
      date: "15 Jul 2026, 14:20",
      city: "Curitiba",
      ip: "186.220.198.11",
    },
    {
      id: "hist-3",
      action: "Novo dispositivo cadastrado",
      date: "12 Jul 2026, 09:45",
      city: "Curitiba",
      ip: "186.220.198.24",
    },
  ],
};

function getStoredState() {
  const stored = localStorage.getItem(SECURITY_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(DEFAULT_SECURITY_STATE));
    return DEFAULT_SECURITY_STATE;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_SECURITY_STATE;
  }
}

function saveState(state) {
  localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(state));
}

// Calculate the score dynamically based on rules
function calculateScore(state) {
  let score = 0;
  
  // Rule 1: Password is strong (Zod schema enforces this, so we get 20 points)
  score += 20;

  // Rule 2: Password recent (updated < 90 days)
  const lastUpdated = new Date(state.passwordUpdatedAt);
  const diffDays = Math.floor((new Date() - lastUpdated) / (1000 * 60 * 60 * 24));
  if (diffDays < 90) {
    score += 20;
  }

  // Rule 3: 2FA enabled
  if (state.twoFactor) {
    score += 30;
  }

  // Rule 4: Few sessions (< 3)
  if (state.sessions.length < 3) {
    score += 15;
  }

  // Rule 5: Email verified (Since user profile emailVerified defaults to true or can be read, we add 15 points)
  // To keep it simple and unified, let's read the user profile verified state
  const profileRaw = localStorage.getItem("curitiba360:user-profile");
  let verified = true; // default fallback
  if (profileRaw) {
    try {
      verified = JSON.parse(profileRaw).verified;
    } catch {}
  }
  if (verified) {
    score += 15;
  }

  return score;
}

export async function fetchSecurityStateRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 200));
  const state = getStoredState();
  return {
    ...state,
    score: calculateScore(state),
  };
}

export async function updatePasswordRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 500));
  const state = getStoredState();
  state.passwordUpdatedAt = new Date().toISOString();
  
  // Add to history
  state.history.unshift({
    id: `hist-${Date.now()}`,
    action: "Troca de senha",
    date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    city: "Curitiba",
    ip: "186.220.198.11",
  });

  saveState(state);
  return {
    ...state,
    score: calculateScore(state),
  };
}

export async function toggleTwoFactorRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 300));
  const state = getStoredState();
  state.twoFactor = !state.twoFactor;

  // Add to history
  state.history.unshift({
    id: `hist-${Date.now()}`,
    action: state.twoFactor ? "Autenticação em 2 etapas ativada" : "Autenticação em 2 etapas desativada",
    date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    city: "Curitiba",
    ip: "186.220.198.11",
  });

  saveState(state);
  return {
    ...state,
    score: calculateScore(state),
  };
}

export async function terminateSessionRepository(sessionId) {
  await new Promise((resolve) => window.setTimeout(resolve, 250));
  const state = getStoredState();
  
  // Filter out the terminated session
  state.sessions = state.sessions.filter((s) => s.id !== sessionId || s.current);

  saveState(state);
  return {
    ...state,
    score: calculateScore(state),
  };
}

export async function terminateAllSessionsRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 300));
  const state = getStoredState();
  
  // Keep only current session
  state.sessions = state.sessions.filter((s) => s.current);

  saveState(state);
  return {
    ...state,
    score: calculateScore(state),
  };
}

export async function deleteSecurityRepository() {
  localStorage.removeItem(SECURITY_STORAGE_KEY);
  return true;
}
