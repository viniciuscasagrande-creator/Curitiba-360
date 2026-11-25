export const digitalTwinMock = {
  summary: {
    liveVisitors: 12450,
    activeEvents: 8,
    tourismFluxScore: 84, // out of 100
    avgTransitTimeMinutes: 22.4,
    occupancyRatePct: 76.5,
    availableCapacityPax: 42000,
    energyConsumptionMwh: 12.8,
    waterConsumptionM3: 450,
    wasteCollectedTons: 3.4,
    carbonEmissionsSavedKg: 1420,
    airQualityIndex: 42, // Good
    securityAlertsCount: 0,
    activeOccurrences: 2,
    smartParkingVacancyPct: 38.4,
    smartCityIndex: 82.5,
    lastUpdate: "2026-07-23T09:30:00"
  },

  entities: [
    { id: "entity-01", organizationId: "org-curitiba", entityType: "park", geometry: { type: "Point", coordinates: [-25.4277, -49.2731] }, properties: { name: "Jardim Botânico", loadPct: 62 }, status: "normal", lastUpdate: "2026-07-23T09:30:00" },
    { id: "entity-02", organizationId: "org-curitiba", entityType: "museum", geometry: { type: "Point", coordinates: [-25.4098, -49.2672] }, properties: { name: "Museu Oscar Niemeyer", loadPct: 45 }, status: "normal", lastUpdate: "2026-07-23T09:30:00" }
  ],

  iotDevices: [
    { id: "iot-cam-01", organizationId: "org-curitiba", type: "camera", latitude: -25.4284, longitude: -49.2736, status: "online", lastHeartbeat: "2026-07-23T09:29:50", telemetry: { detectionCount: 42 } },
    { id: "iot-sens-02", organizationId: "org-curitiba", type: "air_quality", latitude: -25.4105, longitude: -49.2680, status: "online", lastHeartbeat: "2026-07-23T09:29:45", telemetry: { co2: 380, pm25: 12 } }
  ]
};
