export const contractPartnersMock = [
  {
    id: 'partner-001',
    name: 'Parque Jaime Lerner',
    legalName: 'Instituto Jaime Lerner',
    document: '72.096.639/0001-23',
    attractions: [
      {
        id: 'attraction-001',
        name: 'Parque Jaime Lerner'
      },
      {
        id: 'attraction-002',
        name: 'Ópera de Arame'
      }
    ]
  },
  {
    id: 'partner-002',
    name: 'Serra Verde Express',
    legalName: 'Serra Verde Express Ltda.',
    document: '11.222.333/0001-44',
    attractions: [
      {
        id: 'attraction-003',
        name: 'Passeio Curitiba–Morretes'
      }
    ]
  },
  {
    id: 'partner-003',
    name: 'Agência Silva',
    legalName: 'Agência Silva Turismo Ltda.',
    document: '22.333.444/0001-55',
    attractions: [
      {
        id: 'attraction-004',
        name: 'Linha Turismo Curitiba'
      }
    ]
  }
];

export const commercialConditionsMock = [
  {
    id: 'condition-001',
    name: 'Padrão 10%',
    serviceFee: 10,
    paymentTermDays: 15
  },
  {
    id: 'condition-002',
    name: 'Parceiro Premium 8%',
    serviceFee: 8,
    paymentTermDays: 7
  },
  {
    id: 'condition-003',
    name: 'Agência 12%',
    serviceFee: 12,
    paymentTermDays: 30
  }
];

export const financialInformationMock = [
  {
    id: 'financial-001',
    name: 'Repasse padrão',
    description: 'Repasse quinzenal via PIX.'
  },
  {
    id: 'financial-002',
    name: 'Repasse semanal',
    description: 'Repasse semanal com fechamento às segundas-feiras.'
  },
  {
    id: 'financial-003',
    name: 'Repasse mensal',
    description: 'Repasse no quinto dia útil do mês seguinte.'
  }
];

export const contractTemplatesMock = [
  {
    id: 'commercial-agreement',
    name: 'Contrato de parceria comercial',
    title: 'CONTRATO DE PARCERIA COMERCIAL',
    introduction:
      'Por este instrumento particular, as partes identificadas celebram o presente contrato de parceria comercial.',
    clauses: [
      {
        id: 'clause-001',
        title: 'Objeto do contrato',
        content:
          'O presente contrato tem por objeto a comercialização, divulgação e operação dos serviços e ingressos da atração selecionada.'
      },
      {
        id: 'clause-002',
        title: 'Responsabilidades do parceiro',
        content:
          'O parceiro deverá manter atualizadas todas as informações cadastrais, comerciais e operacionais relacionadas à atração.'
      },
      {
        id: 'clause-003',
        title: 'Condições comerciais',
        content:
          'As taxas, prazos de repasse e demais condições financeiras serão definidas no cadastro de condições comerciais vinculado a este contrato.'
      },
      {
        id: 'clause-004',
        title: 'Vigência',
        content:
          'O contrato terá vigência conforme as datas informadas no cadastro e poderá ser renovado mediante acordo entre as partes.'
      }
    ]
  }
];

export default {
  contractPartnersMock,
  commercialConditionsMock,
  financialInformationMock,
  contractTemplatesMock
};
