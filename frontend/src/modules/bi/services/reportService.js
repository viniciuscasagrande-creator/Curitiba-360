export const reportService = {
  async listCustomReports() {
    return { success: true, data: [] };
  },
  async createReport(report) {
    return { success: true, data: report };
  }
};
