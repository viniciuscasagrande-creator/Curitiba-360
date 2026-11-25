import { governmentRepository } from "../repositories/governmentRepository";

export const governmentService = {
  fetchDashboardData: async () => {
    return governmentRepository.getData();
  },

  addProgram: async (program) => {
    const data = governmentRepository.getData();
    const newProgram = {
      ...program,
      id: `prog-${Date.now()}`
    };
    data.programs.push(newProgram);
    governmentRepository.saveData(data);
    return newProgram;
  },

  addProject: async (project) => {
    const data = governmentRepository.getData();
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`,
      progress: 0
    };
    data.projects.push(newProject);
    governmentRepository.saveData(data);
    return newProject;
  },

  addOuvidoria: async (ticket) => {
    const data = governmentRepository.getData();
    const newTicket = {
      ...ticket,
      id: `ouv-${Date.now()}`,
      date: new Date().toISOString().split("T")[0]
    };
    data.ouvidoria.push(newTicket);
    governmentRepository.saveData(data);
    return newTicket;
  }
};
