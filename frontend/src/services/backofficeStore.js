// frontend/src/services/backofficeStore.js
// Repositório vivo do Backoffice Curitiba 360° (alimenta todas as 71 telas WF-001 a WF-064)
import { platformSyncService } from './platformSyncService';

const KEY = 'cwb360:backoffice_store_v1';

const DEFAULT_DATA = {
  profile: {
    firstName: 'João',
    lastName: 'da Silva',
    role: 'Administrador',
    cpfCnpj: '999.999.999-99',
    email: 'joao.silva@curitiba360.com',
    phone: '(41) 99999-9999',
    language: 'Português Brasil',
    googleAnalyticsConnected: true,
    logo: '/logos/official_emblem_logo.png'
  },
  users: [
    { id: 2798, nome: 'Darlene Robertson', email: 'Darlene.Robertson@curitiba360.com', perfil: 'Administrador', status: 'Ativo', dataCriacao: '02/07/2026 16:44:22', ultimoLogin: '25/11/2026 10:15:00' },
    { id: 2799, nome: 'Carlos Eduardo Mendes', email: 'carlos.mendes@curitiba360.com', perfil: 'Parceiro Comercial', status: 'Ativo', dataCriacao: '10/07/2026 11:20:00', ultimoLogin: '25/11/2026 09:30:00' },
    { id: 2800, nome: 'Marina Costa Ribeiro', email: 'marina.costa@curitibasightseeing.com.br', perfil: 'Agência', status: 'Ativo', dataCriacao: '12/07/2026 14:10:00', ultimoLogin: '24/11/2026 18:45:00' },
    { id: 2801, nome: 'Roberto Almeida', email: 'roberto.almeida@parquejaimelerner.com', perfil: 'Editor', status: 'Ativo', dataCriacao: '15/07/2026 08:00:00', ultimoLogin: '24/11/2026 16:12:00' },
    { id: 2802, nome: 'Fernanda Souza', email: 'fernanda.souza@operadearame.com.br', perfil: 'Leitor', status: 'Ativo', dataCriacao: '18/07/2026 13:25:00', ultimoLogin: '23/11/2026 15:00:00' },
    { id: 2803, nome: 'Lucas Silveira', email: 'lucas.silveira@serraverde.com.br', perfil: 'Agente', status: 'Inativo', dataCriacao: '20/07/2026 17:40:00', ultimoLogin: '01/10/2026 12:00:00' }
  ],
  contracts: [
    {
      partnerId: 2798,
      partnerName: 'Parque Jaime Lerner',
      type: 'Parceiro Comercial',
      items: [
        { id: 2798, atracao: 'Parque Jaime Lerner', status: 'Ativo', expiracao: '31/12/2027 16:44:22' },
        { id: 2799, atracao: 'Ópera de Arame', status: 'Rascunho', expiracao: '31/12/2027 16:44:22' },
        { id: 2800, atracao: 'Rua da Música', status: 'Ativo', expiracao: '31/12/2027 16:44:22' }
      ]
    },
    {
      partnerId: 2801,
      partnerName: 'Agência Silva',
      type: 'Agência',
      items: [
        { id: 2805, atracao: 'Todas as Atrações Credenciadas', status: 'Ativo', expiracao: '31/12/2027 16:44:22' }
      ]
    },
    {
      partnerId: 2802,
      partnerName: 'Serra Verde Express',
      type: 'Parceiro Comercial',
      items: [
        { id: 2810, atracao: 'Trem Morretes & Antonina', status: 'Ativo', expiracao: '31/12/2027 16:44:22' }
      ]
    }
  ],
  commercialConditions: [
    { id: 2798, apelido: 'Padrão 10%', status: 'Ativo', tipo: 'Porcentagem', valor: '10%', txCreditoVista: '1,5%', txCreditoParcelado: '1,35%', txPix: '0,95%', txAntecipacao: '0,25%', prazoPagamento: 10, txInternacional: '0,25%' },
    { id: 2799, apelido: 'Parceiro Premium 12%', status: 'Ativo', tipo: 'Porcentagem', valor: '12%', txCreditoVista: '1,5%', txCreditoParcelado: '1,35%', txPix: '0,95%', txAntecipacao: '0,25%', prazoPagamento: 15, txInternacional: '0,25%' },
    { id: 2800, apelido: 'Taxa Fixa R$ 5,50', status: 'Inativo', tipo: 'Valor', valor: '5,5', txCreditoVista: '1,5%', txCreditoParcelado: '1,35%', txPix: '0,95%', txAntecipacao: '0,25%', prazoPagamento: 20, txInternacional: '0,25%' },
    { id: 2801, apelido: 'Agência Receptivo 15%', status: 'Ativo', tipo: 'Porcentagem', valor: '15%', txCreditoVista: '1,5%', txCreditoParcelado: '1,35%', txPix: '0,95%', txAntecipacao: '0,25%', prazoPagamento: 30, txInternacional: '0,25%' }
  ],
  financialInfo: [
    { id: 1234, apelido: 'Padrão 10%', liberadoSaque: 'Sim', percentualSaque: '10%', valorLiberado: '10.000,00', tempoMinimoDias: 15, descontarPix: 'Sim', descontoPix: '0,15', descontarTed: 'Sim', descontoTed: '0,15', status: 'Ativo' }
  ],
  attractions: [
    { id: 1, code: 2798, nome: 'Parque Jaime Lerner', local: 'Pilarzinho - Curitiba', parceiro: 'Parque Jaime Lerner', status: 'Ativo', dataCriacao: '02/07/2026 16:44:22', vendidos: 11, cortesias: 9, total: 20, receita: 'R$ 200,00', imagem: '/parque_jaime_lerner.jpg' },
    { id: 2, code: 2799, nome: 'Ópera de Arame', local: 'Abranches - Curitiba', parceiro: 'Parque Jaime Lerner', status: 'Ativo', dataCriacao: '02/07/2026 16:44:22', vendidos: 85, cortesias: 10, total: 95, receita: 'R$ 950,00', imagem: '/opera_de_arame.jpg' },
    { id: 3, code: 2800, nome: 'Jardim Botânico', local: 'Jardim Botânico - Curitiba', parceiro: 'Serra Verde Express', status: 'Ativo', dataCriacao: '05/07/2026 16:44:22', vendidos: 120, cortesias: 15, total: 135, receita: 'R$ 1.200,00', imagem: '/jardim_botanico.jpg' },
    { id: 4, code: 2801, nome: 'Museu Oscar Niemeyer', local: 'Centro Cívico - Curitiba', parceiro: 'Instituto Jaime Lerner', status: 'Ativo', dataCriacao: '10/07/2026 16:44:22', vendidos: 140, cortesias: 25, total: 165, receita: 'R$ 2.475,00', imagem: '/museu_niemeyer.jpg' },
    { id: 5, code: 2802, nome: 'Parque Barigui', local: 'Bigorrilho - Curitiba', parceiro: 'Parque Barigui S.A.', status: 'Ativo', dataCriacao: '12/07/2026 16:44:22', vendidos: 110, cortesias: 12, total: 122, receita: 'R$ 1.100,00', imagem: '/parque_barigui.jpg' },
    { id: 6, code: 2803, nome: 'Centro Histórico & Largo', local: 'São Francisco - Curitiba', parceiro: 'Curitiba Sightseeing', status: 'Inativo', dataCriacao: '15/07/2026 16:44:22', vendidos: 45, cortesias: 9, total: 54, receita: 'R$ 450,00', imagem: '/centro_historico.jpg' }
  ],
  categories: [
    { id: 2798, nome: 'Morador Curitiba Adulto', status: 'Inativo' },
    { id: 2799, nome: 'Doador de sangue', status: 'Ativo' },
    { id: 2800, nome: 'Estudante', status: 'Ativo' },
    { id: 2801, nome: 'Idoso', status: 'Ativo' },
    { id: 2802, nome: 'Adulto', status: 'Ativo' }
  ],
  ticketBatches: [
    { id: 2798, categoria: 'Estudante', status: 'Ativo', valor: 'R$ 10,00', quantidade: 4, lote: '001', msgCustomizada: 'Estudante', expiracaoHoras: 10 },
    { id: 2799, categoria: 'Adulto', status: 'Ativo', valor: 'R$ 20,00', quantidade: 50, lote: '001', msgCustomizada: 'Inteira Padrão', expiracaoHoras: 10 },
    { id: 2800, categoria: 'Morador Curitiba Adulto', status: 'Ativo', valor: 'R$ 10,00', quantidade: 30, lote: '002', msgCustomizada: 'Morador CWB', expiracaoHoras: 10 },
    { id: 2801, categoria: 'Idoso', status: 'Ativo', valor: 'R$ 10,00', quantidade: 20, lote: '001', msgCustomizada: 'Meia Idoso', expiracaoHoras: 10 }
  ],
  coupons: [
    { id: 2798, nome: 'JOAO10', usuario: 'João da Silva', agencia: 'Agência Silva', status: 'Ativo', tipo: 'Porcentagem', valor: '10%', quantidade: 50, link: 'curitiba360.com/joao10', saldo: 45, mostrarAtracao: 'Sim', diasSemana: 'SEG QUA SEX', inicio: '02/07/2026 16:44:22', final: '31/12/2026 16:44:22', categorias: ['Adulto', 'Estudante', 'Meia'] },
    { id: 2799, nome: 'PESTANA10', usuario: 'Hotel Pestana Curitiba', agencia: 'Hotel Pestana 5★', status: 'Ativo', tipo: 'Porcentagem', valor: '10%', quantidade: 100, link: 'curitiba360.com/?ref=hotel-pestana', saldo: 88, mostrarAtracao: 'Sim', diasSemana: 'SEG TER QUA QUI SEX SAB DOM', inicio: '01/07/2026 10:00:00', final: '31/12/2026 23:59:00', categorias: ['Adulto', 'Estudante'] },
    { id: 2800, nome: 'VERAO10', usuario: 'João da Silva', agencia: 'Rota Serra Verde', status: 'Ativo', tipo: 'Valor', valor: 'R$ 10,00', quantidade: 50, link: 'curitiba360.com/verao10', saldo: 45, mostrarAtracao: 'Sim', diasSemana: 'SEG QUA SEX', inicio: '02/07/2026 16:44:22', final: '31/12/2026 16:44:22', categorias: ['Adulto', 'Estudante'] }
  ],
  agencies: [
    { id: '011', nomeFantasia: 'Rota Serra Verde', cnpj: '31.245.678/0001-09', email: 'cadastro@rotaserraverde.com.br', status: 'Pendente', qtdAgentes: 0, dataCadastro: '18/04/2026 10:12:33', cidadeUf: 'Curitiba/PR' },
    { id: '010', nomeFantasia: 'Norte Sul Viagens', cnpj: '27.889.541/0001-44', email: 'contato@nortesulviagens.com.br', status: 'Pendente', qtdAgentes: 0, dataCadastro: '18/04/2026 09:20:11', cidadeUf: 'Foz do Iguaçu/PR' },
    { id: '009', nomeFantasia: 'Araucária Turismo', cnpj: '22.903.114/0001-77', email: 'responsavel@araucariaturismo.com.br', status: 'Pendente', qtdAgentes: 0, dataCadastro: '17/04/2026 16:47:20', cidadeUf: 'Ponta Grossa/PR' },
    { id: '008', nomeFantasia: 'Campos Gerais Trips', cnpj: '19.775.032/0001-56', email: 'agencia@camposgeraistrips.com.br', status: 'Ativa', qtdAgentes: 4, dataCadastro: '17/04/2026 14:05:08', cidadeUf: 'Guarapuava/PR' },
    { id: '007', nomeFantasia: 'Litoral Experience', cnpj: '16.440.928/0001-35', email: 'cadastro@litoralexperience.com.br', status: 'Ativa', qtdAgentes: 6, dataCadastro: '17/04/2026 11:33:42', cidadeUf: 'Paranaguá/PR' },
    { id: '001', nomeFantasia: 'Turismo CWB Ltda', cnpj: '12.345.678/0001-90', email: 'ana.lima@turismocwb.com', status: 'Ativa', qtdAgentes: 8, dataCadastro: '10/01/2026 14:32:00', cidadeUf: 'Curitiba/PR' }
  ],
  agents: [
    { id: '001', nome: 'João Pereira dos Santos', cpf: '123.456.789-**', email: 'joao.santos@turismocwb.com', agencia: 'Turismo Curitiba Ltda', qtdAtracoes: 12, status: 'Ativo', dataCadastro: '10/01/2026 14:32:00' },
    { id: '002', nome: 'Maria Oliveira Costa', cpf: '987.654.321-**', email: 'maria.costa@prtravel.com', agencia: 'Paraná Travel', qtdAtracoes: 8, status: 'Ativo', dataCadastro: '15/02/2026 09:45:00' },
    { id: '003', nome: 'Carlos Eduardo Lima', cpf: '456.789.012-**', email: 'carlos.lima@sulreceptivo.com', agencia: 'Sul Receptivo', qtdAtracoes: 5, status: 'Ativo', dataCadastro: '20/03/2026 11:20:00' },
    { id: '004', nome: 'Fernanda Souza Rocha', cpf: '321.654.987-**', email: 'fernanda.rocha@iguacutours.com', agencia: 'Iguaçu Tours', qtdAtracoes: 3, status: 'Pendente', dataCadastro: '05/04/2026 16:10:00' },
    { id: '005', nome: 'Rafael Almeida Nunes', cpf: '789.012.345-**', email: 'rafael.nunes@visitare.com', agencia: 'Visitare Viagens', qtdAtracoes: 7, status: 'Ativo', dataCadastro: '12/04/2026 08:30:00' }
  ],
  partners: [
    { id: '001', razaoSocial: 'Museu Oscar Niemeyer', nomeFantasia: 'Museu Oscar Niemeyer', cnpj: '12.345.678/0001-90', email: 'contato@mon.com.br', status: 'Ativa', qtdAtracoes: 3, dataCadastro: '10/01/2026 14:32:00' },
    { id: '002', razaoSocial: 'Parque Barigui S.A.', nomeFantasia: 'Parque Barigui', cnpj: '98.765.432/0001-11', email: 'gestao@barigui.com.br', status: 'Ativa', qtdAtracoes: 1, dataCadastro: '15/02/2026 09:45:00' },
    { id: '003', razaoSocial: 'Jardim Botânico Turismo', nomeFantasia: 'Jardim Botânico', cnpj: '45.678.901/0001-22', email: 'adm@jardimbotanico.com.br', status: 'Ativa', qtdAtracoes: 2, dataCadastro: '20/03/2026 11:20:00' },
    { id: '004', razaoSocial: 'Ópera de Arame Eventos', nomeFantasia: 'Ópera de Arame', cnpj: '33.221.100/0001-33', email: 'eventos@operadearame.com.br', status: 'Ativa', qtdAtracoes: 1, dataCadastro: '05/04/2026 16:10:00' },
    { id: '005', razaoSocial: 'Torre Panorâmica Ltda', nomeFantasia: 'Torre Panorâmica', cnpj: '77.889.900/0001-44', email: 'contato@torre.com.br', status: 'Ativa', qtdAtracoes: 1, dataCadastro: '12/04/2026 08:30:00' }
  ],
  packages: [
    { id: 1042, nome: 'Curitiba Clássica', atracoes: 3, precoOriginal: 'R$ 240,00', precoPacote: 'R$ 180,00', desconto: '25%', vigencia: '01/07/2026 – 31/12/2026', disponibilidade: 48, status: 'Ativo' },
    { id: 1038, nome: 'Natureza e Cultura', atracoes: 4, precoOriginal: 'R$ 320,00', precoPacote: 'R$ 240,00', desconto: '25%', vigencia: '15/06/2026 – 15/09/2026', disponibilidade: 12, status: 'Ativo' },
    { id: 1035, nome: 'Sabores de Curitiba', atracoes: 2, precoOriginal: 'R$ 180,00', precoPacote: 'R$ 135,00', desconto: '25%', vigencia: '01/08/2026 – 30/11/2026', disponibilidade: 96, status: 'Ativo' },
    { id: 1029, nome: 'Família no Jardim', atracoes: 3, precoOriginal: 'R$ 210,00', precoPacote: 'R$ 147,00', desconto: '30%', vigencia: '10/07/2026 – 10/10/2026', disponibilidade: 5, status: 'Ativo' },
    { id: 1021, nome: 'Noite no Centro', atracoes: 2, precoOriginal: 'R$ 160,00', precoPacote: 'R$ 120,00', desconto: '25%', vigencia: '01/05/2026 – 31/08/2026', disponibilidade: 0, status: 'Ativo' }
  ],
  refunds: [
    { id: '#R-2041', pedidoId: '#10452', turista: 'Ana Beatriz Lima', atracao: 'Jardim Botânico', valor: 'R$ 90,00', motivo: 'Desistência', origem: 'Turista', dataCompra: '10/06/2026', dataSolic: '22/06/2026', sla: '11 dias', status: 'Pendente' },
    { id: '#R-2039', pedidoId: '#10448', turista: 'Bruno Carvalho', atracao: 'Ópera de Arame', valor: 'R$ 45,00', motivo: 'Evento cancelado', origem: 'Agência', dataCompra: '08/06/2026', dataSolic: '20/06/2026', sla: '9 dias', status: 'Pendente' },
    { id: '#R-2036', pedidoId: '#10441', turista: 'Carla Menezes', atracao: 'Museu Oscar N.', valor: 'R$ 180,00', motivo: 'Erro de compra', origem: 'Turista', dataCompra: '05/06/2026', dataSolic: '18/06/2026', sla: '5 dias', status: 'Pendente' },
    { id: '#R-2033', pedidoId: '#10435', turista: 'Diego Santos', atracao: 'Torre Panorâmica', valor: 'R$ 60,00', motivo: 'Duplicidade', origem: 'Agente', dataCompra: '01/06/2026', dataSolic: '15/06/2026', sla: '3 dias', status: 'Pendente' },
    { id: '#R-2030', pedidoId: '#10428', turista: 'Elaine Prado', atracao: 'Bosque Alemão', valor: 'R$ 120,00', motivo: 'Problema de saúde', origem: 'Turista', dataCompra: '28/05/2026', dataSolic: '12/06/2026', sla: '2 dias', status: 'Pendente' }
  ],
  antiCambista: {
    limiteTransferencias: 2,
    cpfs: [
      { cpf: '***.456.789-**', nome: 'Maria Fernanda Souza', total: 7, eventos: 'Ópera de Arame; Jardim Botânico', status: 'Ativa', ultima: '04/07/2026 14:32' },
      { cpf: '***.654.321-**', nome: 'Carlos Eduardo Lima', total: 6, eventos: 'Museu Oscar Niemeyer; Torre Panorâmica', status: 'Ativa', ultima: '03/07/2026 09:15' },
      { cpf: '***.789.123-**', nome: 'Ana Paula Ribeiro', total: 5, eventos: 'Bosque Alemão; Parque Tanguá', status: 'Ativa', ultima: '02/07/2026 18:44' },
      { cpf: '***.654.987-**', nome: 'Roberto Almeida', total: 4, eventos: 'Ópera de Arame; Museu Oscar Niemeyer', status: 'Bloqueada', ultima: '01/07/2026 11:20' },
      { cpf: '***.123.456-**', nome: 'Juliana Costa', total: 3, eventos: 'Jardim Botânico; Torre Panorâmica', status: 'Ativa', ultima: '30/06/2026 16:05' },
      { cpf: '***.321.789-**', nome: 'Fernando Martins', total: 3, eventos: 'Parque Tanguá; Bosque Alemão', status: 'Ativa', ultima: '29/06/2026 08:50' }
    ]
  },
  banners: [
    { ordem: 1, arquivo: 'verao-2026.jpg', titulo: 'Verão em Curitiba', cta: 'Ver ofertas', periodo: '01/01 – 31/03', status: 'Ativo' },
    { ordem: 2, arquivo: 'natal-luz.jpg', titulo: 'Natal Luz', cta: 'Comprar agora', periodo: '01/12 – 31/12', status: 'Agendado' },
    { ordem: 3, arquivo: 'promo-ingr.jpg', titulo: 'Promoção de Ingressos', cta: 'Aproveitar', periodo: '15/06 – 15/07', status: 'Ativo' },
    { ordem: 4, arquivo: 'inverno.jpg', titulo: 'Roteiro de Inverno', cta: 'Explorar', periodo: '01/06 – 31/08', status: 'Expirado' },
    { ordem: 5, arquivo: 'festival.jpg', titulo: 'Festival Gastronômico', cta: 'Saiba mais', periodo: '10/07 – 20/07', status: 'Inativo' }
  ],
  notifications: [
    { nome: 'Boas-vindas Agência', tipo: 'E-mail', evento: 'Aprovação de Parceiro', status: 'Ativo', ultimaEdicao: '01/07/2026 10:15' },
    { nome: 'Compra Confirmada', tipo: 'Ambos', evento: 'Compra Confirmada', status: 'Ativo', ultimaEdicao: '28/06/2026 14:32' },
    { nome: 'Reembolso Aprovado', tipo: 'E-mail', evento: 'Reembolso Aprovado', status: 'Ativo', ultimaEdicao: '20/06/2026 09:00' },
    { nome: 'Lembrete de Visita', tipo: 'Push', evento: 'Lembrete de Visita', status: 'Ativo', ultimaEdicao: '15/06/2026 16:40' },
    { nome: 'Promoção Verão', tipo: 'Ambos', evento: 'Promoção / Oferta', status: 'Inativo', ultimaEdicao: '10/06/2026 11:22' }
  ],
  commissions: [
    { periodo: 'Jun/2026', vendas: 'R$ 42.000,00', qtdIngressos: 934, bruta: 'R$ 4.200,00', deducoes: 'R$ 210,00', liquida: 'R$ 3.990,00', status: 'Fechado' },
    { periodo: 'Mai/2026', vendas: 'R$ 38.500,00', qtdIngressos: 852, bruta: 'R$ 3.850,00', deducoes: 'R$ 120,00', liquida: 'R$ 3.730,00', status: 'Rep. Solicitado' },
    { periodo: 'Abr/2026', vendas: 'R$ 35.200,00', qtdIngressos: 781, bruta: 'R$ 3.520,00', deducoes: 'R$ 95,00', liquida: 'R$ 3.425,00', status: 'Em Contestação' },
    { periodo: 'Mar/2026', vendas: 'R$ 40.100,00', qtdIngressos: 889, bruta: 'R$ 4.010,00', deducoes: 'R$ 180,00', liquida: 'R$ 3.830,00', status: 'Repasse Pago' },
    { periodo: 'Fev/2026', vendas: 'R$ 33.800,00', qtdIngressos: 742, bruta: 'R$ 3.380,00', deducoes: 'R$ 60,00', liquida: 'R$ 3.320,00', status: 'Repasse Pago' }
  ]
};

export const backofficeStore = {
  getState() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        localStorage.setItem(KEY, JSON.stringify(DEFAULT_DATA));
        return DEFAULT_DATA;
      }
      return { ...DEFAULT_DATA, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_DATA;
    }
  },

  setState(updater) {
    const current = this.getState();
    const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('cwb360_backoffice_update'));
    } catch (e) {
      console.error(e);
    }
    return next;
  },

  subscribe(callback) {
    const handler = () => callback(this.getState());
    window.addEventListener('cwb360_backoffice_update', handler);
    window.addEventListener('cwb360_sync_update', handler);
    return () => {
      window.removeEventListener('cwb360_backoffice_update', handler);
      window.removeEventListener('cwb360_sync_update', handler);
    };
  },

  getLiveVouchers() {
    const syncVouchers = platformSyncService.getVouchers();
    return [
      ...syncVouchers.map((v, idx) => ({
        id: 2798 + idx,
        codigo: v.id || v.code || '1234567890',
        status: v.status === 'Pendente' ? 'Vendido' : v.status,
        atracao: v.atracao || 'Ópera de Arame',
        categoria: v.categoria || 'Morador Curitiba Adulto',
        localizacao: 'Curitiba',
        dataHora: v.dataCompra || '01/10/2026 10:00',
        turista: v.turista || 'Darlene Robertson',
        email: 'Darlene.Robertson@gmail.com',
        cpf: v.cpf || '123.456.789-00',
        valor: `R$ ${Number(v.valor || 17.5).toFixed(2).replace('.', ',')}`,
        validadoPor: 'João da Silva'
      })),
      { id: 2798, codigo: '1234567890', status: 'Vendido', atracao: 'Opera de Arame', categoria: 'Morador Curitiba Adulto', localizacao: 'Curitiba', dataHora: '01/10/2026 10:00', turista: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', cpf: '123.456.789-10', valor: 'R$ 17,50', validadoPor: 'João da Silva' },
      { id: 2799, codigo: '1234567891', status: 'Validado', atracao: 'Opera de Arame', categoria: 'Morador Curitiba Adulto', localizacao: 'Curitiba', dataHora: '01/10/2026 10:00', turista: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', cpf: '123.456.789-10', valor: 'R$ 17,50', validadoPor: 'João da Silva' },
      { id: 2800, codigo: '1234567892', status: 'Cancelado', atracao: 'Opera de Arame', categoria: 'Morador Curitiba Adulto', localizacao: 'Curitiba', dataHora: '01/10/2026 10:00', turista: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', cpf: '123.456.789-10', valor: 'R$ 17,50', validadoPor: 'João da Silva' }
    ];
  }
};
