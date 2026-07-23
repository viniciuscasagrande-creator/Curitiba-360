export const esgPlatformMock = {
  summary: {
    esgScore: 84.6,
    carbonEmittedTons: 1420.5,
    carbonOffsetTons: 680.0,
    energyConsumedMwh: 120.4,
    waterConsumedM3: 4500,
    wasteRecycledPercent: 72.5,
    economicImpactBrl: 42689000,
    jobsGenerated: 340,
    localFirmsPercent: 88.0,
    sustainableSuppliersPercent: 74.0,
    sustainableEvents: 42,
    accessibilityScore: 91.2,
    odsAttended: 12,
    governanceComplianceRate: 98.4
  },

  carbonEmissions: [
    { id: "carb-001", source: "Shuttles Mobilidade", category: "Scope 1", quantity: 180.4, unit: "tCO2e", co2Equivalent: 180.4, calculatedAt: "2026-07-20" },
    { id: "carb-002", source: "Energia Elétrica Prédios", category: "Scope 2", quantity: 340.2, unit: "tCO2e", co2Equivalent: 340.2, calculatedAt: "2026-07-19" },
    { id: "carb-003", source: "Fornecedores Terceirizados", category: "Scope 3", quantity: 900.0, unit: "tCO2e", co2Equivalent: 900.0, calculatedAt: "2026-07-18" }
  ],

  energyDetails: {
    solarPercent: 42,
    windPercent: 18,
    gridPercent: 35,
    generatorPercent: 5,
    efficiencyIndex: 94.2
  },

  waterDetails: {
    totalConsumptionM3: 4500,
    reusePercent: 28.5,
    rainwaterCapturePercent: 12.0,
    wasteRatePercent: 4.2
  },

  wasteDetails: {
    organicKg: 8500,
    recyclableKg: 14200,
    eWasteKg: 340,
    glassKg: 1200,
    metalKg: 950,
    plasticKg: 4300,
    paperKg: 6800,
    hazardousKg: 120
  },

  socialDetails: {
    accessibilityCriteria: {
      ramps: true,
      lifts: true,
      accessibleToilets: true,
      librasInterpreter: true,
      brailleSignage: false,
      accessibleTransport: true
    },
    diversity: {
      genderFemalePercent: 54,
      genderMalePercent: 46,
      racePardoPretoPercent: 38,
      raceBrancoPercent: 58,
      raceIndigenaAmareloPercent: 4,
      pcdStaffPercent: 8.2,
      leadershipDiversityPercent: 45
    }
  },

  economicDetails: {
    touristRevenueBrl: 28400000,
    localTaxesBrl: 4200000,
    localPartnerships: 156
  },

  projects: [
    { id: "proj-esg-001", name: "Compensação Verde Curitiba", targetOds: ["ODS 13", "ODS 15"], investment: 120000, status: "in_progress" },
    { id: "proj-esg-002", name: "Lixo Zero nos Parques", targetOds: ["ODS 11", "ODS 12"], investment: 85000, status: "active" }
  ],

  goals: [
    { id: "goal-esg-001", title: "Redução de 20% Carbono Frota", target: 20, current: 14.5, status: "on_track" },
    { id: "goal-esg-002", title: "Adesão 90% Fornecedores Locais", target: 90, current: 88.0, status: "completed" }
  ],

  suppliers: [
    { id: "sup-esg-01", name: "Cooperativa Recicla Sul", esgScore: 92, compliance: "compliant", status: "certified" },
    { id: "sup-esg-02", name: "Alimentos Ecológicos PR", esgScore: 88, compliance: "compliant", status: "certified" }
  ]
};
