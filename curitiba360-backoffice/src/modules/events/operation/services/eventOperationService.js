import { INITIAL_EVENT_OPERATION_DATA } from '../data/eventOperationMockData';

const STORAGE_KEY_EVENT_OP = 'curitiba360_events_operation_v1';

function getStoredOperation() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_EVENT_OP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_EVENT_OP, JSON.stringify(INITIAL_EVENT_OPERATION_DATA));
      return INITIAL_EVENT_OPERATION_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de operação:', error);
    return INITIAL_EVENT_OPERATION_DATA;
  }
}

function persistOperation(data) {
  try {
    localStorage.setItem(STORAGE_KEY_EVENT_OP, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de operação:', error);
  }
}

export const eventOperationService = {
  async getOperationOverview(eventId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredOperation();
    return { success: true, data };
  },

  async addStaffMember(eventId, staffData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredOperation();

    const newStaff = {
      id: `STF-${Date.now()}`,
      status: 'presente',
      ...staffData
    };

    data.equipeStaff.push(newStaff);
    persistOperation(data);
    return { success: true, staff: newStaff };
  },

  async addVendor(eventId, vendorData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredOperation();

    const newVendor = {
      id: `VND-${Date.now()}`,
      status: 'pendente',
      ...vendorData
    };

    data.fornecedores.push(newVendor);
    persistOperation(data);
    return { success: true, vendor: newVendor };
  },

  async issueCredential(eventId, credentialData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredOperation();

    const newCred = {
      id: `CRD-${Date.now()}`,
      qrCode: `CRD-QR-${Date.now()}`,
      status: 'emitido',
      ...credentialData
    };

    data.credenciamentoBadges.push(newCred);
    persistOperation(data);
    return { success: true, credential: newCred };
  },

  async toggleChecklistItem(eventId, checkId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredOperation();
    const index = data.checklistVistoria.findIndex((c) => c.id === checkId);
    if (index === -1) throw new Error('Item não encontrado.');

    data.checklistVistoria[index].ok = !data.checklistVistoria[index].ok;
    persistOperation(data);
    return { success: true, item: data.checklistVistoria[index] };
  }
};
