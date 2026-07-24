export const initialAttractionForm = {
  status: 'draft',

  partnerId: 'partner-001',
  partnerName: 'Instituto Jaime Lerner',
  mainImage: null,

  general: {
    name: '',
    operationType: 'event',
    venueName: '',
    zipCode: '',
    state: 'PR',
    city: 'Curitiba',
    address: '',
    number: '',
    complement: '',
    ageRating: 'free',
    capacity: '',
    minorsAllowedWithGuardian: true
  },

  schedule: {
    date: '',
    startTime: '',
    doorsOpenTime: ''
  },

  infrastructure: {
    coveredArea: false,
    accessibility: false,
    parking: false
  },

  banking: {
    usePartnerData: true,
    bank: '',
    agency: '',
    account: '',
    beneficiaryName: '',
    beneficiaryDocument: '',
    statementEmail: ''
  },

  media: {
    homeImage: null,
    horizontalImage: null,
    backgroundImage: null,
    promotionalVideoUrl: ''
  },

  negotiationNotes: '',
  release: '',

  ticket: {
    enabled: true,
    categoryId: '',
    categoryName: '',
    status: 'active',
    price: '',
    quantity: '',
    batchCode: '001',
    customMessage: '',
    orderExpirationHours: 48
  }
};
