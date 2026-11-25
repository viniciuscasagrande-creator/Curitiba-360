import {
  getGovernanceSummaryRepository,
  getBackupsRepository,
  getRaciRepository,
  getSlaPoliciesRepository,
  getChangesRepository,
  approveChangeRepository,
  createBackupRepository,
  triggerDrpSimulationRepository
} from "../repositories/governanceRepository";

export const governanceService = {
  async getSummary() {
    const data = await getGovernanceSummaryRepository();
    return { success: true, data };
  },

  async getBackups() {
    const data = await getBackupsRepository();
    return { success: true, data };
  },

  async getRaci() {
    const data = await getRaciRepository();
    return { success: true, data };
  },

  async getSlaPolicies() {
    const data = await getSlaPoliciesRepository();
    return { success: true, data };
  },

  async getChanges() {
    const data = await getChangesRepository();
    return { success: true, data };
  },

  async approveChange(id) {
    const data = await approveChangeRepository(id);
    return { success: true, data };
  },

  async createBackup(databaseName) {
    const data = await createBackupRepository(databaseName);
    return { success: true, data };
  },

  async triggerDrpSimulation() {
    const data = await triggerDrpSimulationRepository();
    return { success: true, data };
  }
};
