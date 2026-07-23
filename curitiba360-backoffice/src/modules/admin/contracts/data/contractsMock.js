export const CONTRACT_STATUS = {
  DRAFT: 'draft',
  PENDING_SIGNATURE: 'pending_signature',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  INACTIVE: 'inactive',
  CANCELLED: 'cancelled'
};

export const PARTNER_TYPES = {
  COMMERCIAL_PARTNER: 'commercial_partner',
  AGENCY: 'agency',
  AGENT: 'agent',
  PUBLIC_AGENCY: 'public_agency',
  SUPPLIER: 'supplier'
};

export const contractStatusLabels = {
  draft: 'Rascunho',
  pending_signature: 'Aguardando assinatura',
  active: 'Ativo',
  expired: 'Expirado',
  inactive: 'Inativo',
  cancelled: 'Cancelado'
};

export const statusLabels = contractStatusLabels;

export const partnerTypeLabels = {
  commercial_partner: 'Parceiro Comercial',
  agency: 'Agência',
  agent: 'Agente',
  public_agency: 'Órgão Público',
  supplier: 'Fornecedor'
};

export const partnersContractsMock = [
  {
    id: 'partner-001',
    name: 'Parque Jaime Lerner',
    type: 'commercial_partner',
    city: 'Curitiba',
    document: '72.096.639/0001-23',
    contracts: [
      {
        id: 'CTR-2798',
        number: '2798',
        title: 'Contrato de Operação e Comercialização',
        attractionId: 'attraction-001',
        attractionName: 'Parque Jaime Lerner',
        status: 'active',
        startDate: '2026-01-01',
        expirationDate: '2027-01-01',
        createdAt: '2026-07-02T16:44:22',
        automaticRenewal: false,
        documentUrl: '',
        signature: {
          provider: 'docusign',
          status: 'signed',
          envelopeId: 'env-001'
        }
      },
      {
        id: 'CTR-2799',
        number: '2799',
        title: 'Contrato Comercial Complementar',
        attractionId: 'attraction-001',
        attractionName: 'Parque Jaime Lerner',
        status: 'draft',
        startDate: '2026-08-01',
        expirationDate: '2027-08-01',
        createdAt: '2026-07-04T10:20:00',
        automaticRenewal: false,
        documentUrl: '',
        signature: {
          provider: 'docusign',
          status: 'not_sent',
          envelopeId: ''
        }
      },
      {
        id: 'CTR-2800',
        number: '2800',
        title: 'Contrato de Bilheteria',
        attractionId: 'attraction-001',
        attractionName: 'Parque Jaime Lerner',
        status: 'active',
        startDate: '2026-02-01',
        expirationDate: '2027-02-01',
        createdAt: '2026-07-06T14:00:00',
        automaticRenewal: true,
        documentUrl: '',
        signature: {
          provider: 'docusign',
          status: 'signed',
          envelopeId: 'env-002'
        }
      }
    ]
  },
  {
    id: 'partner-002',
    name: 'Agência Silva',
    type: 'agency',
    city: 'Curitiba',
    document: '11.222.333/0001-44',
    contracts: [
      {
        id: 'CTR-2801',
        number: '2801',
        title: 'Contrato de Agência',
        attractionId: 'attraction-002',
        attractionName: 'Ópera de Arame',
        status: 'active',
        startDate: '2026-03-01',
        expirationDate: '2027-03-01',
        createdAt: '2026-07-08T09:30:00',
        automaticRenewal: false,
        documentUrl: '',
        signature: {
          provider: 'docusign',
          status: 'signed',
          envelopeId: 'env-003'
        }
      }
    ]
  },
  {
    id: 'partner-003',
    name: 'Serra Verde Express',
    type: 'commercial_partner',
    city: 'Curitiba',
    document: '22.333.444/0001-55',
    contracts: [
      {
        id: 'CTR-2802',
        number: '2802',
        title: 'Contrato de Comercialização',
        attractionId: 'attraction-003',
        attractionName: 'Passeio de Trem Curitiba–Morretes',
        status: 'inactive',
        startDate: '2025-01-01',
        expirationDate: '2026-01-01',
        createdAt: '2025-01-01T10:00:00',
        automaticRenewal: false,
        documentUrl: '',
        signature: {
          provider: 'docusign',
          status: 'signed',
          envelopeId: 'env-004'
        }
      }
    ]
  }
];

export default partnersContractsMock;
