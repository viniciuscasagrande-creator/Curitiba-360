export const INITIAL_SMARTVENUE_DATA = {
  nocMetrics: {
    pessoasPresentes: 12450,
    checkinsMin: 180,
    tempoMedioEntradaSeg: 42,
    taxaOcupacao: 84,
    portoesAbertos: 8,
    incidentesAtivos: 1,
    statusNoc: 'NOC_OPERATIONAL'
  },

  iotDevices: [
    { id: 'iot-01', nome: 'Catraca Principal Portão A', tipo: 'Turnstile Reader', status: 'online', bateria: '100% (AC)', firmware: 'v2.4.1' },
    { id: 'iot-02', nome: 'Leitor QR Code Portão B', tipo: 'Handheld Scanner', status: 'online', bateria: '84%', firmware: 'v1.8.9' },
    { id: 'iot-03', nome: 'Totem Autoatendimento VIP', tipo: 'Kiosk', status: 'online', bateria: '100% (AC)', firmware: 'v3.0.2' },
    { id: 'iot-04', nome: 'Sensor de Presença Estacionamento', tipo: 'Presence Sensor', status: 'offline', bateria: '12%', firmware: 'v1.0.5' }
  ],

  filasAcessos: [
    { id: 'queue-01', portao: 'Portão A (Principal)', pessoasAguardando: 45, tempoEsperaMin: 4, velocidadeCheckinsMin: 45 },
    { id: 'queue-02', portao: 'Portão B (Turística)', pessoasAguardando: 12, tempoEsperaMin: 1, velocidadeCheckinsMin: 30 },
    { id: 'queue-03', portao: 'Portão C (VIP/Camarote)', pessoasAguardando: 8, tempoEsperaMin: 1, velocidadeCheckinsMin: 20 }
  ]
};
