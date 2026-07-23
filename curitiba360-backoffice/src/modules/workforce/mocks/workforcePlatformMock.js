export const workforcePlatformMock = {
  summary: {
    activeEmployees: 842,
    activeContractors: 186,
    openVacancies: 28,
    candidatesInProcess: 416,
    admissionsThisMonth: 34,
    terminationsThisMonth: 12,
    turnoverRate: 1.8,
    absenteeismRate: 2.6,
    overtimeHours: 1840,
    scheduleCoverageRate: 94.8,
    pendingTrainings: 126,
    expiringCertifications: 18,
    averagePerformanceScore: 8.4,
    engagementScore: 82.6,
    workforceShortages: 4
  },

  departments: [
    { id: "department-001", name: "Operações", employees: 284, openPositions: 12, absenteeismRate: 3.4, scheduleCoverageRate: 92.8 },
    { id: "department-002", name: "Atendimento", employees: 168, openPositions: 6, absenteeismRate: 2.1, scheduleCoverageRate: 96.4 },
    { id: "department-003", name: "Tecnologia", employees: 84, openPositions: 7, absenteeismRate: 1.2, scheduleCoverageRate: 98.1 }
  ],

  shifts: [
    { id: "shift-001", title: "Operação Festival Curitiba 360", location: "Centro de Eventos", startAt: "2026-07-25T14:00:00", endAt: "2026-07-26T01:00:00", requiredEmployees: 84, allocatedEmployees: 78, status: "partially_filled" },
    { id: "shift-002", title: "Atendimento Praça Central", location: "Praça Central", startAt: "2026-07-25T08:00:00", endAt: "2026-07-25T18:00:00", requiredEmployees: 24, allocatedEmployees: 24, status: "filled" }
  ],

  employees: [
    { id: "emp-101", registrationNumber: "RE-9081", name: "Carlos Roberto", departmentId: "department-001", positionId: "pos-01", employmentType: "employee", workModel: "on_site", admissionDate: "2024-03-10", status: "active" },
    { id: "emp-102", registrationNumber: "RE-9082", name: "Amanda Silva", departmentId: "department-002", positionId: "pos-02", employmentType: "employee", workModel: "hybrid", admissionDate: "2025-01-15", status: "active" }
  ],

  candidates: [
    { id: "cand-201", vacancyId: "vac-01", name: "Roberta Souza", email: "roberta@domain.com", phone: "(41) 99881-2233", source: "career_page", stage: "interview", score: 88, consentGranted: true }
  ],

  alerts: [
    { id: "alert-001", severity: "high", title: "Escala incompleta", description: "A operação do Festival Curitiba 360 ainda precisa de seis profissionais." },
    { id: "alert-002", severity: "warning", title: "Certificações próximas do vencimento", description: "Dezoito certificações operacionais vencem nos próximos 30 dias." }
  ]
};
