import { INITIAL_SECURITY_DATA } from '../data/securityMockData';

const STORAGE_KEY_SECURITY_APP = 'curitiba360_security_mobile_v1';

function getStoredSecurity() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SECURITY_APP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SECURITY_APP, JSON.stringify(INITIAL_SECURITY_DATA));
      return INITIAL_SECURITY_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de segurança:', error);
    return INITIAL_SECURITY_DATA;
  }
}

function persistSecurity(data) {
  try {
    localStorage.setItem(STORAGE_KEY_SECURITY_APP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de segurança:', error);
  }
}

export const securityService = {
  async getSecurityOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredSecurity();
    return { success: true, data };
  },

  async toggleBiometrics(type) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredSecurity();

    if (type === 'faceId') data.profile.biometriaFaceId = !data.profile.biometriaFaceId;
    if (type === 'pin') data.profile.pinLocalAtivo = !data.profile.pinLocalAtivo;
    if (type === '2fa') data.profile.twoFactorAuth = !data.profile.twoFactorAuth;

    persistSecurity(data);
    return { success: true, profile: data.profile };
  },

  async revokeDevice(deviceId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredSecurity();

    data.dispositivosAutorizados = data.dispositivosAutorizados.filter((d) => d.id !== deviceId);

    data.auditoriaLogs.unshift({
      id: `AUD-${Date.now()}`,
      evento: `Revogação Remota do Dispositivo ${deviceId}`,
      dispositivo: 'iPhone 15 Pro Max',
      horario: new Date().toLocaleTimeString('pt-BR'),
      resultado: 'REVOGADO'
    });

    persistSecurity(data);
    return { success: true, message: `🔒 Dispositivo ${deviceId} revogado com sucesso!` };
  }
};
