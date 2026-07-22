import {
  fetchSecurityStateRepository,
  updatePasswordRepository,
  toggleTwoFactorRepository,
  terminateSessionRepository,
  terminateAllSessionsRepository,
  deleteSecurityRepository,
} from "../repositories/securityRepository";

export async function getSecurityState() {
  return fetchSecurityStateRepository();
}

export async function updatePassword() {
  return updatePasswordRepository();
}

export async function toggleTwoFactor() {
  return toggleTwoFactorRepository();
}

export async function terminateSession(sessionId) {
  return terminateSessionRepository(sessionId);
}

export async function terminateAllSessions() {
  return terminateAllSessionsRepository();
}

export async function deleteSecurityData() {
  return deleteSecurityRepository();
}
