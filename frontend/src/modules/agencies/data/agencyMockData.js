export const INITIAL_AGENCIES = [
  {
    id: 'AG-1001',
    razaoSocial: 'Turismo Curitiba 360 Ltda',
    nomeFantasia: 'Tour CWB Premium',
    cnpj: '98.765.432/0001-10',
    inscricaoEstadual: '109.87654-32',
    email: 'contato@tourcwbpremium.com.br',
    telefone: '(41) 3322-1000',
    site: 'https://www.tourcwbpremium.com.br',
    endereco: {
      cep: '80020-000',
      logradouro: 'Rua XV de Novembro',
      numero: '1234',
      complemento: 'Cj 501',
      bairro: 'Centro',
      cidade: 'Curitiba',
      uf: 'PR'
    },
    cidade: 'Curitiba',
    uf: 'PR',
    status: 'ativo',
    responsavelComercial: {
      nome: 'Maria Oliveira',
      cargo: 'Diretora Comercial',
      cpf: '123.456.789-00',
      whatsapp: '(41) 99888-1122',
      email: 'maria.oliveira@tourcwbpremium.com.br'
    },
    responsavel: 'Maria Oliveira',
    qtdAgentes: 8,
    limiteCredito: 50000.00,
    comissaoPadrao: 12.5,
    dataCadastro: '2026-01-10',
    ultimoAcesso: '2026-07-21 10:14',
    historicoAprovacao: [
      { data: '2026-01-10', evento: 'Cadastro submetido para análise', usuario: 'Sistema' },
      { data: '2026-01-11', evento: 'Aprovado pelo administrador', usuario: 'Admin Curitiba360' },
      { data: '2026-01-12', evento: 'Contrato assinado via DocuSign', usuario: 'Maria Oliveira' }
    ]
  },
  {
    id: 'AG-1002',
    razaoSocial: 'Batel Agência de Viagens Eireli',
    nomeFantasia: 'Batel Turismo & Pass',
    cnpj: '12.222.333/0001-44',
    inscricaoEstadual: '901.22334-55',
    email: 'atendimento@batelturismo.com.br',
    telefone: '(41) 3015-8899',
    site: 'https://www.batelturismo.com.br',
    endereco: {
      cep: '80420-090',
      logradouro: 'Avenida do Batel',
      numero: '1750',
      complemento: 'Salas 302/303',
      bairro: 'Batel',
      cidade: 'Curitiba',
      uf: 'PR'
    },
    cidade: 'Curitiba',
    uf: 'PR',
    status: 'ativo',
    responsavelComercial: {
      nome: 'Juliana Costa',
      cargo: 'Gerente Operacional',
      cpf: '987.654.321-11',
      whatsapp: '(41) 99777-3344',
      email: 'juliana.costa@batelturismo.com.br'
    },
    responsavel: 'Juliana Costa',
    qtdAgentes: 12,
    limiteCredito: 75000.00,
    comissaoPadrao: 15.0,
    dataCadastro: '2026-02-15',
    ultimoAcesso: '2026-07-21 09:30',
    historicoAprovacao: [
      { data: '2026-02-15', evento: 'Cadastro submetido para análise', usuario: 'Sistema' },
      { data: '2026-02-16', evento: 'Contrato homologado', usuario: 'Admin Curitiba360' }
    ]
  },
  {
    id: 'AG-1003',
    razaoSocial: 'Serra do Mar Operadora Turística S/A',
    nomeFantasia: 'Serra do Mar Express',
    cnpj: '45.111.999/0001-88',
    inscricaoEstadual: 'ISENTO',
    email: 'comercial@serradomarexpress.com.br',
    telefone: '(41) 3462-5500',
    site: 'https://www.serradomarexpress.com.br',
    endereco: {
      cep: '83350-000',
      logradouro: 'Rua das Flores',
      numero: '45',
      complemento: '',
      bairro: 'Centro Historic',
      cidade: 'Morretes',
      uf: 'PR'
    },
    cidade: 'Morretes',
    uf: 'PR',
    status: 'pending_approval',
    responsavelComercial: {
      nome: 'Carlos Eduardo Santos',
      cargo: 'Sócio Diretor',
      cpf: '456.789.123-22',
      whatsapp: '(41) 99666-5544',
      email: 'carlos.santos@serradomarexpress.com.br'
    },
    responsavel: 'Carlos Eduardo Santos',
    qtdAgentes: 3,
    limiteCredito: 25000.00,
    comissaoPadrao: 10.0,
    dataCadastro: '2026-07-20',
    ultimoAcesso: '2026-07-21 08:15',
    historicoAprovacao: [
      { data: '2026-07-20 18:30', evento: 'Nova agência cadastrada pelo portal B2B (Aguardando Aprovação)', usuario: 'Carlos Eduardo Santos' }
    ]
  },
  {
    id: 'AG-1004',
    razaoSocial: 'Iguaçu & Capital Viagens Ltda',
    nomeFantasia: 'Iguaçu Eco Tours',
    cnpj: '33.444.555/0001-22',
    inscricaoEstadual: '809.11223-99',
    email: 'reservas@iguacuecotours.com.br',
    telefone: '(45) 3523-9900',
    site: 'https://www.iguacuecotours.com.br',
    endereco: {
      cep: '85851-000',
      logradouro: 'Avenida Brasil',
      numero: '890',
      complemento: 'Bloco B',
      bairro: 'Centro',
      cidade: 'Foz do Iguaçu',
      uf: 'PR'
    },
    cidade: 'Foz do Iguaçu',
    uf: 'PR',
    status: 'ativo',
    responsavelComercial: {
      nome: 'Roberto Alencar',
      cargo: 'Gerente Geral',
      cpf: '789.123.456-33',
      whatsapp: '(45) 99111-8899',
      email: 'roberto@iguacuecotours.com.br'
    },
    responsavel: 'Roberto Alencar',
    qtdAgentes: 15,
    limiteCredito: 100000.00,
    comissaoPadrao: 15.0,
    dataCadastro: '2026-03-01',
    ultimoAcesso: '2026-07-21 11:02'
  },
  {
    id: 'AG-1005',
    razaoSocial: 'Paraná Receptivo e Eventos Eireli',
    nomeFantasia: 'Paraná Travel Experience',
    cnpj: '77.888.999/0001-66',
    inscricaoEstadual: 'ISENTO',
    email: 'operacoes@paranatravel.com.br',
    telefone: '(41) 3224-4411',
    site: '',
    endereco: {
      cep: '80010-010',
      logradouro: 'Rua Marechal Deodoro',
      numero: '500',
      complemento: 'Sala 12',
      bairro: 'Centro',
      cidade: 'Curitiba',
      uf: 'PR'
    },
    cidade: 'Curitiba',
    uf: 'PR',
    status: 'suspenso',
    responsavelComercial: {
      nome: 'Fernanda Lima',
      cargo: 'Supervisora de Operações',
      cpf: '321.654.987-44',
      whatsapp: '(41) 98822-4455',
      email: 'fernanda@paranatravel.com.br'
    },
    responsavel: 'Fernanda Lima',
    qtdAgentes: 5,
    limiteCredito: 15000.00,
    comissaoPadrao: 10.0,
    dataCadastro: '2026-04-12',
    ultimoAcesso: '2026-07-15 14:20'
  }
];
