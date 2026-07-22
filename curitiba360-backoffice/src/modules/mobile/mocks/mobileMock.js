export const initialMobileDevices = [
  {
    id: "dev-iphone-15",
    name: "iPhone 15 Pro Max - Operador 01",
    deviceIdentifier: "US-UUID-9999-AAAA",
    platform: "ios",
    appVersion: "2.4.1",
    status: "active",
    assignedEventIds: ["service-api"],
    lastSyncAt: new Date().toISOString(),
    lastActivityAt: new Date().toISOString(),
    registeredAt: new Date().toISOString()
  },
  {
    id: "dev-samsung-s23",
    name: "Galaxy S23 - Bilheteria Norte",
    deviceIdentifier: "AN-UUID-8888-BBBB",
    platform: "android",
    appVersion: "2.4.0",
    status: "active",
    assignedEventIds: ["service-api"],
    lastSyncAt: new Date().toISOString(),
    lastActivityAt: new Date().toISOString(),
    registeredAt: new Date().toISOString()
  }
];

export const initialMobileTickets = [
  {
    id: "tkt-001",
    eventName: "Visita Guiada Ópera de Arame",
    ticketCode: "TKT-OPERA-777",
    status: "available",
    offlineSignature: "SHA256:OFFLINE_SIG_OPERA_ARAME_777",
    holderName: "Vinicius Casagrande",
    holderDocument: "123.***.***-00",
    qrCodeValue: "curitiba360://ticket/tkt-001/sig-opera-777"
  },
  {
    id: "tkt-002",
    eventName: "Jardim Botânico VIP Tour",
    ticketCode: "TKT-BOTANICO-888",
    status: "used",
    offlineSignature: "SHA256:OFFLINE_SIG_BOTANICO_888",
    holderName: "Vinicius Casagrande",
    holderDocument: "123.***.***-00",
    qrCodeValue: "curitiba360://ticket/tkt-002/sig-botanico-888"
  }
];
export default { initialMobileDevices, initialMobileTickets };
