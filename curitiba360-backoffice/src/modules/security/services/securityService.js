import {
  getSecuritySummaryRepository,
  getVulnerabilitiesRepository,
  getFraudAlertsRepository,
  getSessionsRepository,
  getConsentsRepository,
  terminateSessionRepository,
  approveFraudAlertRepository,
  blockFraudAlertRepository,
  fixVulnerabilityRepository
} from "../repositories/securityRepository";

export const securityService = {
  async getSummary() {
    const data = await getSecuritySummaryRepository();
    return { success: true, data };
  },

  async getVulnerabilities() {
    const data = await getVulnerabilitiesRepository();
    return { success: true, data };
  },

  async getFraudAlerts() {
    const data = await getFraudAlertsRepository();
    return { success: true, data };
  },

  async getSessions() {
    const data = await getSessionsRepository();
    return { success: true, data };
  },

  async getConsents() {
    const data = await getConsentsRepository();
    return { success: true, data };
  },

  async terminateSession(id) {
    const data = await terminateSessionRepository(id);
    return { success: true, data };
  },

  async approveFraudAlert(id) {
    const data = await approveFraudAlertRepository(id);
    return { success: true, data };
  },

  async blockFraudAlert(id) {
    const data = await blockFraudAlertRepository(id);
    return { success: true, data };
  },

  async fixVulnerability(id) {
    const data = await fixVulnerabilityRepository(id);
    return { success: true, data };
  }
};
