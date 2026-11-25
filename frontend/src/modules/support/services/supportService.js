import * as supportRepository from "../repositories/supportRepository";

export const supportService = {
  async getSummary() {
    try {
      const data = await supportRepository.getSupportSummary();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getTickets() {
    try {
      const data = await supportRepository.getSupportTickets();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getSlas() {
    try {
      const data = await supportRepository.getSlas();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getHealthScores() {
    try {
      const data = await supportRepository.getHealthScores();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getArticles() {
    try {
      const data = await supportRepository.getArticles();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getIncidents() {
    try {
      const data = await supportRepository.getIncidents();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async createTicket(ticket) {
    try {
      const data = await supportRepository.createTicketRepository(ticket);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateTicketStatus(id, status) {
    try {
      const data = await supportRepository.updateTicketStatusRepository(id, status);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveArticle(article) {
    try {
      const data = await supportRepository.saveArticleRepository(article);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async saveIncident(incident) {
    try {
      const data = await supportRepository.saveIncidentRepository(incident);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
