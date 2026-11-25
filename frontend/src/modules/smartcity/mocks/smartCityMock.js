export const smartCityMock = {
  summary: {
    cityRiskScore: 18,
    airQualityIndex: 42, // Good
    energySavingsPct: 34.2,
    waterLossesPct: 9.8,
    activeSensors: 1420,
    onlineSensorsPct: 98.4,
    trafficCongestionPct: 12.5, // low congestion
    smartParkingOcupancyPct: 68.3,
    streetLightingActive: 12450,
    streetLightingFailures: 4,
    wasteFillCriticalAlerts: 18,
    activeSimulations: 2,
    lastUpdate: "2026-07-23T09:30:00"
  },

  sensors: [
    { id: "sensor-air-01", type: "air_quality", name: "Estação Centro Cívico", status: "online", value: 38, unit: "AQI" },
    { id: "sensor-water-03", type: "water_flow", name: "Estação Copel Barigui", status: "online", value: 420, unit: "L/s" },
    { id: "sensor-bin-12", type: "waste_level", name: "Lixeira Inteligente Batel 04", status: "alert", value: 87, unit: "%" },
    { id: "sensor-light-404", type: "lighting", name: "Poste Inteligente Rua XV 22", status: "offline", value: 0, unit: "W" }
  ],

  utilities: {
    energy: { todayKwh: 45200, averageKwh: 48900, savingKwh: 3700 },
    water: { todayM3: 1240, lossRate: 9.8 }
  },

  weather: {
    temperature: 18.5,
    humidity: 72,
    windSpeed: 14.2,
    uvIndex: 3,
    rainProbability: 20
  },

  traffic: [
    { id: "route-01", name: "Av. Visconde de Guarapuava", speed: 45, status: "normal" },
    { id: "route-02", name: "Av. Sete de Setembro (Canaleta)", speed: 28, status: "slow" },
    { id: "route-03", name: "Rua XV de Novembro", speed: 0, status: "pedestrian" }
  ]
};
