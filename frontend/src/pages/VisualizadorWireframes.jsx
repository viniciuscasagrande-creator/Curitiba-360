// src/pages/VisualizadorWireframes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VisualizadorWireframes() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [modalImagem, setModalImagem] = useState(null);
  const [abaVisualizador, setAbaVisualizador] = useState('backoffice'); // backoffice, portal-desktop, portal-mobile

  // 1. Backoffice Wireframes
  const backofficeWireframes = [
    { code: 'WF-001', name: 'Tela de login', route: '/login', img: '/wireframes/WF-001 - Tela de login.png' },
    { code: 'WF-002', name: 'Dashboard', route: '/dashboard', img: '/wireframes/WF-002 - Dashboard.png' },
    { code: 'WF-003', name: 'Detalhes da Atração (Totais)', route: '/atracoes/1/totais', img: '/wireframes/WF-003 - Detalhes da Atração_Totais da atração.png' },
    { code: 'WF-004', name: 'Perfil', route: '/perfil', img: '/wireframes/WF-004 - Perfil.png' },
    { code: 'WF-005', name: 'Gestão de Usuários', route: '/usuarios', img: '/wireframes/WF-005 - Gestão de Usuários.png' },
    { code: 'WF-006', name: 'Adicionar Usuários', route: '/usuarios/novo', img: '/wireframes/WF-006 - Adicionar Usuários.png' },
    { code: 'WF-007', name: 'Gestão de Contratos', route: '/comercial/contratos', img: '/wireframes/WF-007 - Gestão de Contratos.png' },
    { code: 'WF-008', name: 'Adicionar Contrato', route: '/comercial/contratos/novo', img: '/wireframes/WF-008 - Gestão de contratos_adicionar contrato.png' },
    { code: 'WF-009', name: 'Configurações Comerciais', route: '/comercial/configuracoes', img: '/wireframes/WF-009 - Configurações Comerciais.png' },
    { code: 'WF-010', name: 'Configurações Comerciais - Condição Comercial', route: '/comercial/configuracoes', img: '/wireframes/WF-010 - Configurações Comerciais_condição comercial.png' },
    { code: 'WF-011', name: 'Configurações Comerciais - Informação Financeira', route: '/comercial/configuracoes', img: '/wireframes/WF-011 - Configurações Comerciais_informação financeira.png' },
    { code: 'WF-012', name: 'Gestão de Atrações', route: '/atracoes', img: '/wireframes/WF-012 - Gestão de Atrações.png' },
    { code: 'WF-013', name: 'Adicionar Atração - Etapa 1', route: '/atracoes/nova', img: '/wireframes/WF-013 - Gestão de atrações_Adicionar Atração 1.png' },
    { code: 'WF-014', name: 'Adicionar Atração - Etapa 2', route: '/atracoes/nova', img: '/wireframes/WF-014 - Gestão de atrações_Adicionar Atração 2.png' },
    { code: 'WF-015', name: 'Adicionar Atração - Etapa 3', route: '/atracoes/nova', img: '/wireframes/WF-015 - Gestão de atrações_Adicionar Atração 3.png' },
    { code: 'WF-016', name: 'Detalhes da Atração - Categorias', route: '/atracoes/1/ingressos', img: '/wireframes/WF-016 - Detalhes da Atração_Categorias.png' },
    { code: 'WF-017', name: 'Pesquisar Ingresso - Administrador', route: '/atendimento/pesquisar', img: '/wireframes/WF-017 - Detalhes da Atrações_Pesquisar Ingresso – Administrador.png' },
    { code: 'WF-018', name: 'Pesquisar Ingresso - Detalhe do Ingresso', route: '/atendimento/pesquisar', img: '/wireframes/WF-018 - Detalhes da Atração_Pesquisar Ingresso_Detalhe do Ingresso.png' },
    { code: 'WF-019', name: 'Gestão de Ingresso', route: '/atracoes/1/ingressos', img: '/wireframes/WF-019 - Detalhes da Atração_Gestão de ingresso.png' },
    { code: 'WF-020', name: 'Adicionar Ingresso', route: '/atracoes/1/ingressos', img: '/wireframes/WF-020 - Detalhes da Atração_Gestão de Ingresso_Adicionar Ingresso.png' },
    { code: 'WF-021', name: 'Gestão de Cupons', route: '/atracoes/1/cupons', img: '/wireframes/WF-021 - Detalhes da Atração_Gestão de Cupons.png' },
    { code: 'WF-022', name: 'Gestão de Cupons - Gerar QR Code', route: '/atracoes/1/cupons', img: '/wireframes/WF-022 - Detalhes da Atração_Gestão de Cupons_Gerar QR Code.png' },
    { code: 'WF-023', name: 'Gestão de Cupons - Adicionar Cupom', route: '/atracoes/1/cupons', img: '/wireframes/WF-023 - Detalhes da Atração_Gestão de Cupons_Adicionar Cupom.png' },
    { code: 'WF-024', name: 'Gestão de Cupons - Adicionar Cupom Agência', route: '/atracoes/1/cupons', img: '/wireframes/WF-024 - Detalhes da Atração_Gestão de Cupons_Adicionar Cupom Agencia.png' },
    { code: 'WF-025', name: 'Gráficos Analytics', route: '/analytics', img: '/wireframes/WF-025 - Detalhes da Atração_Graficos Analytics.png' },
    { code: 'WF-026', name: 'Detalhes da Atração - Usuários', route: '/atracoes/1/relatorios', img: '/wireframes/WF-026 - Detalhes da Atração_Usuários.png' },
    { code: 'WF-027', name: 'Adicionar Usuário da Atração', route: '/atracoes/1/relatorios', img: '/wireframes/WF-027 - Detalhes da Atração_Gestão de usuários_Adicionar usuário.png' },
    { code: 'WF-028', name: 'Negociação Comercial - Condições', route: '/atracoes/1/relatorios', img: '/wireframes/WF-028 - Detalhes da Atração_Gestão financeira_Negociação Financeira_Condições Comerciais.png' },
    { code: 'WF-029', name: 'Negociação Financeira - Regras', route: '/atracoes/1/relatorios', img: '/wireframes/WF-029 - Detalhes da Atração_Gestão financeira_Negociação Financeira_Informações Financeiras.png' },
    { code: 'WF-030', name: 'Resumo das Despesas', route: '/atracoes/1/relatorios', img: '/wireframes/WF-030 - Detalhes da Atração_Gestão financeira_Negociação Financeira_Resumo das Despesas.png' },
    { code: 'WF-031', name: 'Validar Ingressos', route: '/atracoes/1/relatorios', img: '/wireframes/WF-031 - Detalhes da Atração_Gestão financeira_Negociação Financeira_Validar Ingressos.png' },
    { code: 'WF-032', name: 'Relatório - Vendas da Atração', route: '/atracoes/1/relatorios', img: '/wireframes/WF-032 - Detalhes da Atração_Gestão financeira_Relatórios da atração_Vendas.png' },
    { code: 'WF-033', name: 'PDF - Vendas da Atração', route: '/atracoes/1/relatorios', img: '/wireframes/WF-033 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Vendas .png' },
    { code: 'WF-034', name: 'Relatório - Abandono de Carrinho', route: '/atracoes/1/relatorios', img: '/wireframes/WF-034 - Detalhes da Atração_Gestão financeira_Relatórios da atração_Abandono de Carrinho.png' },
    { code: 'WF-035', name: 'PDF - Abandono de Carrinho', route: '/atracoes/1/relatorios', img: '/wireframes/WF-035 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Abandono de Carrinho.png' },
    { code: 'WF-036', name: 'Relatório - Ingresso Detalhado', route: '/atracoes/1/relatorios', img: '/wireframes/WF-036 - Detalhes da Atração_Gestão financeira_Relatórios da atração_Ingresso Detalhado.png' },
    { code: 'WF-037', name: 'PDF - Ingresso Detalhado', route: '/atracoes/1/relatorios', img: '/wireframes/WF-037 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Ingresso Detalhado.png' },
    { code: 'WF-038', name: 'Relatório - Categorias', route: '/atracoes/1/relatorios', img: '/wireframes/WF-038 - Detalhes da Atração_Gestão financeira_Relatórios da atração_Categorias.png' },
    { code: 'WF-039', name: 'PDF - Categorias', route: '/atracoes/1/relatorios', img: '/wireframes/WF-039 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Categorias.png' },
    { code: 'WF-040', name: 'Relatório - Cortesias Emitidas', route: '/atracoes/1/relatorios', img: '/wireframes/WF-040 - Detalhes da Atração_Gestão financeira_Relatórios da atração_Cortesias Emitidas.png' },
    { code: 'WF-041', name: 'PDF - Cortesias Emitidas', route: '/atracoes/1/relatorios', img: '/wireframes/WF-041 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Cortesias Emitidas.png' },
    { code: 'WF-042', name: 'Relatório - Validações', route: '/atracoes/1/relatorios', img: '/wireframes/WF-042 - Detalhes da Atração_Gestão financeira_Relatórios da atração_Validações.png' },
    { code: 'WF-043', name: 'PDF - Validações', route: '/atracoes/1/relatorios', img: '/wireframes/WF-043 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Validações.png' },
    { code: 'WF-044', name: 'Relatório - Comissões', route: '/atracoes/1/relatorios', img: '/wireframes/WF-044 - Detalhes da Atração_Gestão financeira_Relatórios da atração_Comissões.png' },
    { code: 'WF-045', name: 'PDF - Comissões', route: '/atracoes/1/relatorios', img: '/wireframes/WF-045 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Comissões.png' },
    { code: 'WF-046', name: 'Relatório - Borderô Resumido', route: '/atracoes/1/relatorios', img: '/wireframes/WF-046 -Detalhes da Atração_Gestão financeira_Relatórios da atração_Borderô Resumido.png' },
    { code: 'WF-047', name: 'PDF - Borderô Resumido', route: '/atracoes/1/relatorios', img: '/wireframes/WF-047 - PDF Detalhes da Atração_Gestão financeira_Relatórios da atração_Borderô Resumido.png' },
    { code: 'WF-048', name: 'Gestão de Agências', route: '/agencias', img: '/wireframes/WF-048 - Gestão de Agências.png' },
    { code: 'WF-049', name: 'Cadastro de Agência', route: '/agencias/novo', img: '/wireframes/WF-049 - Cadastro de Agência — Etapa 1 (Dados da Empresa).png' },
    { code: 'WF-050', name: 'Gestão de Agentes', route: '/comercial/agentes', img: '/wireframes/WF-050 - Gestão de Agentes.png' },
    { code: 'WF-051', name: 'Operação Comercial (Vendas)', route: '/comercial/vendas', img: '/wireframes/WF-051 - Operação Comercial.png' },
    { code: 'WF-052', name: 'Comissionamento (Agência)', route: '/financeiro/comissionamento', img: '/wireframes/WF-052 - Comissionamento (Agência).png' },
    { code: 'WF-053', name: 'Fila de Reembolsos', route: '/financeiro/reembolsos', img: '/wireframes/WF-053 - Fila de Reembolsos.png' },
    { code: 'WF-054', name: 'CMS Institucional', route: '/cms/institucional', img: '/wireframes/WF-054 - CMS Institucional.png' },
    { code: 'WF-055', name: 'CMS Home e Curadoria (Banners)', route: '/cms/home', img: '/wireframes/WF-055 - CMS Home e Curadoria (Banners).png' },
    { code: 'WF-056', name: 'Central de Notificações', route: '/notificacoes', img: '/wireframes/WF-056 - Central de Notificações.png' },
    { code: 'WF-057', name: 'Tela Inicial por Perfil', route: '/dashboard', img: '/wireframes/WF-057 - Tela Inicial por Perfil.png' },
    { code: 'WF-058', name: 'Gestão de Parceiros Comerciais', route: '/parceiros', img: '/wireframes/WF-058 - Gestão de Parceiros Comerciais.png' },
    { code: 'WF-059', name: 'Cadastro de Parceiro Comercial', route: '/parceiros/novo', img: '/wireframes/WF-059 - Cadastro de Parceiro Comercial.png' },
    { code: 'WF-060', name: 'Painel Anti-Cambista', route: '/comercial/anti-cambista', img: '/wireframes/WF-060 - Painel Anti-Cambista.png' },
    { code: 'WF-061', name: 'Gestão de Pacotes de Ingressos', route: '/pacotes', img: '/wireframes/WF-061 - Gestão de Pacotes de Ingressos.png' },
    { code: 'WF-062', name: 'Gestão de Pacotes - Adicionar', route: '/pacotes', img: '/wireframes/WF-062 - Gestão de Pacotes — Adicionar Pacote.png' },
    { code: 'WF-063', name: 'Relatórios Financeiros Globais', route: '/financeiro/relatorios', img: '/wireframes/WF-063 - Relatórios Financeiros Globais.png' },
    { code: 'WF-064', name: 'Cadastro de Agente', route: '/comercial/agentes/novo', img: '/wireframes/WF-064 - Cadastro de Agente.png' }
  ];

  // 2. Public Portal - Desktop Wireframes
  const portalDesktopWireframes = [
    { code: 'WF-001', name: 'Portal - Tela de login', route: '/portal/login', img: '/wireframes/WF-001 - Tela de login.png' },
    { code: 'WF-001A', name: 'Portal - Recuperar Senha', route: '/portal/recuperar-senha', img: '/wireframes/WF-001A - Recuperar Senha.png' },
    { code: 'WF-001B', name: 'Portal - Email Recuperar Senha', route: '/portal/email-recuperar-senha', img: '/wireframes/WF-001B - Email Recuperar Senha.png' },
    { code: 'WF-001C', name: 'Portal - Criar Nova Senha', route: '/portal/criar-senha', img: '/wireframes/WF-001C - Recuperar Senha Criar senha.png' },
    { code: 'WF-002', name: 'Portal - Página Inicial', route: '/portal', img: '/wireframes/WF-002 - Página Inicial.png' },
    { code: 'WF-002B', name: 'Portal - Página Inicial dropdown perfil', route: '/portal', img: '/wireframes/WF-002B - Página Inicial dropdown perfil.png' },
    { code: 'WF-003', name: 'Portal - Criar conta', route: '/portal/criar-conta', img: '/wireframes/WF-003- Criar conta.png' },
    { code: 'WF-003A', name: 'Portal - Email Confirmação de Cadastro', route: '/portal/email-confirmacao', img: '/wireframes/WF-003A - Email Confirmação de Cadastro.png' },
    { code: 'WF-003B', name: 'Portal - Confirmação de Cadastro', route: '/portal/confirmacao-cadastro', img: '/wireframes/WF-003B - Confirmação de Cadastro.png' },
    { code: 'WF-004', name: 'Portal - Cadastro de Parceiro Comercial', route: '/portal', img: '/wireframes/WF-004 - Cadastro de Parceiro Comercial.png' },
    { code: 'WF-004A', name: 'Portal - Cadastro de Agência', route: '/portal', img: '/wireframes/WF-004A - Cadastro de Agência.png' },
    { code: 'WF-004A-C', name: 'Portal - Auto-cadastro Agência - Conclusão', route: '/portal', img: '/wireframes/WF-004A - Auto-cadastro Agência — Conclusão.png' },
    { code: 'WF-004B-E1', name: 'Portal - Auto-cadastro Parceiro - Etapa 1', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Etapa 1 (Dados da Empresa).png' },
    { code: 'WF-004B-E2', name: 'Portal - Auto-cadastro Parceiro - Etapa 2', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Etapa 2 (Dados do Responsável).png' },
    { code: 'WF-004B-E3', name: 'Portal - Auto-cadastro Parceiro - Etapa 3', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Etapa 3 (Documentos e Informações Complementares).png' },
    { code: 'WF-004B-C', name: 'Portal - Auto-cadastro Parceiro - Conclusão', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Conclusão (Solicitação enviada).png' },
    { code: 'WF-005', name: 'Portal - Resultados da Pesquisa', route: '/portal', img: '/wireframes/WF-005 - Resultados da Pesquisa.png' },
    { code: 'WF-006', name: 'Portal - Pacotes de atrações', route: '/portal', img: '/wireframes/WF-006 - Pacotes de atrações.png' },
    { code: 'WF-007', name: 'Portal - Conhecendo Curitiba', route: '/portal', img: '/wireframes/WF-007 - Conhecendo Curitiba.png' },
    { code: 'WF-008', name: 'Portal - Detalhes da Atração', route: '/portal', img: '/wireframes/WF-008 - Detalhes da Atração.png' },
    { code: 'WF-0080C', name: 'Portal - Detalhes da Atração exibir imagem', route: '/portal', img: '/wireframes/WF-0080C - Detalhes da Atração exibir imagem.png' },
    { code: 'WF-008A', name: 'Portal - Detalhes da Atração adicionado ao carrinho', route: '/portal', img: '/wireframes/WF-008A - Detalhes da Atração adicionado ao carrinho.png' },
    { code: 'WF-008B', name: 'Portal - Detalhes da Atração pedido de login', route: '/portal', img: '/wireframes/WF-008B - Detalhes da Atração pedido de login.png' },
    { code: 'WF-008D', name: 'Portal - Detalhes da Atração exibir imagem galeria', route: '/portal', img: '/wireframes/WF-008D - Detalhes da Atração exibir imagem galeria.png' },
    { code: 'WF-010', name: 'Portal - Carrinho de Compras', route: '/portal', img: '/wireframes/WF-010 - Carrinho.png' },
    { code: 'WF-011', name: 'Portal - Pedido (Checkout)', route: '/portal', img: '/wireframes/WF-011 - Pedido.png' },
    { code: 'WF-012', name: 'Portal - Pagamento Cartão', route: '/portal', img: '/wireframes/WF-012 - Pagamento Cartão.png' },
    { code: 'WF-012A', name: 'Portal - Pagamento Google Pay', route: '/portal', img: '/wireframes/WF-012A - Pagamento Google Pay.png' },
    { code: 'WF-012B', name: 'Portal - Pagamento Pix', route: '/portal', img: '/wireframes/WF-012B - Pagamento Pix.png' },
    { code: 'WF-013', name: 'Portal - Pagamento Confirmado', route: '/portal', img: '/wireframes/WF-013 - Pagamento Confirmado.png' },
    { code: 'WF-013A', name: 'Portal - Email Pagamento Confirmado', route: '/portal/email-confirmacao', img: '/wireframes/WF-013A - Email Pagamento Confirmado.png' },
    { code: 'WF-014', name: 'Portal - Meus ingressos', route: '/portal', img: '/wireframes/WF-014 - Meus ingressos.png' },
    { code: 'WF-014A', name: 'Portal - Meus ingressos resumo do pedido', route: '/portal', img: '/wireframes/WF-014A - Meus ingressos resumo do pedido.png' },
    { code: 'WF-014B', name: 'Portal - Meus ingressos ver no mapa', route: '/portal', img: '/wireframes/WF-014B - Meus ingressos ver no mapa.png' },
    { code: 'WF-015', name: 'Portal - Configurações dados pessoais', route: '/portal', img: '/wireframes/WF-015 - Configurações dados pessoais.png' },
    { code: 'WF-015A', name: 'Portal - Configurações notificações', route: '/portal', img: '/wireframes/WF-015A - Configurações notificações.png' },
    { code: 'WF-015B', name: 'Portal - Configurações Cartões Salvos', route: '/portal', img: '/wireframes/WF-015B - Configurações Cartões Salvos.png' },
    { code: 'WF-015C', name: 'Portal - Notificações (Inbox)', route: '/portal', img: '/wireframes/WF-015C - Notificações.png' },
    { code: 'WF-016', name: 'Portal - Solicitação de Reembolso', route: '/portal', img: '/wireframes/WF-016 - Solicitação de Reembolso.png' },
    { code: 'WF-016A', name: 'Portal - Email Confirmação de Reembolso', route: '/portal', img: '/wireframes/WF-016A - Email Confirmacao de Reembolso.png' },
    { code: 'WF-016B', name: 'Portal - E-mail de Rejeição de Reembolso', route: '/portal', img: '/wireframes/WF-016B - E-mail de Rejeição de Reembolso.png' },
    { code: 'WF-017', name: 'Portal - Política de Privacidade', route: '/portal', img: '/wireframes/WF-017 - Política de Privacidade.png' },
    { code: 'WF-018', name: 'Portal - Condições de uso do site', route: '/portal', img: '/wireframes/WF-018 - Condições de uso do site.png' },
    { code: 'WF-019', name: 'Portal - FAQ - Perguntas frequentes', route: '/portal', img: '/wireframes/WF-019 - FAQ - Perguntas frequentes.png' },
    { code: 'WF-020', name: 'Portal - Sobre Nós', route: '/portal', img: '/wireframes/WF-020 - Sobre Nós.png' },
    { code: 'WF-021-V', name: 'Portal - Meus Favoritos — Estado Vazio', route: '/portal', img: '/wireframes/WF-021 - Meus Favoritos — Estado Vazio.png' },
    { code: 'WF-021', name: 'Portal - Meus Favoritos', route: '/portal', img: '/wireframes/WF-021 - Meus Favoritos.png' },
    { code: 'WF-022-S1', name: 'Portal - Transferência de Ingresso — Estado 1', route: '/portal', img: '/wireframes/WF-022 - Transferência de Ingresso — Estado 1.png' },
    { code: 'WF-022-S2', name: 'Portal - Transferência de Ingresso — Estado 2', route: '/portal', img: '/wireframes/WF-022 - Transferência de Ingresso — Estado 2.png' },
    { code: 'WF-022-S3', name: 'Portal - Transferência de Ingresso — Estado 3', route: '/portal', img: '/wireframes/WF-022 - Transferência de Ingresso — Estado 3.png' }
  ];

  // 3. Public Portal - Smartphone (Mobile) Wireframes
  const portalMobileWireframes = [
    { code: 'MWF-001', name: 'Mobile - Tela de login', route: '/portal/login', img: '/wireframes/Mobile WF-001 - Tela de login.png' },
    { code: 'MWF-001A', name: 'Mobile - Recuperar Senha', route: '/portal/recuperar-senha', img: '/wireframes/Mobile WF-001A - Recuperar Senha.png' },
    { code: 'MWF-001B', name: 'Mobile - Email Recuperar Senha', route: '/portal/email-recuperar-senha', img: '/wireframes/Mobile WF-001B - Email Recuperar Senha.png' },
    { code: 'MWF-001C', name: 'Mobile - Criar Nova Senha', route: '/portal/criar-senha', img: '/wireframes/Mobile WF-001C - Recuperar Senha Criar senha.png' },
    { code: 'MWF-002', name: 'Mobile - Página Inicial', route: '/portal', img: '/wireframes/Mobile WF-002 - Página Inicial.png' },
    { code: 'MWF-003', name: 'Mobile - Criar conta', route: '/portal/criar-conta', img: '/wireframes/Mobile WF-003- Criar conta.png' },
    { code: 'MWF-003A', name: 'Mobile - Email Confirmação de Cadastro', route: '/portal/email-confirmacao', img: '/wireframes/Mobile WF-003A - Email Confirmação de Cadastro.png' },
    { code: 'MWF-003B', name: 'Mobile - Confirmação de Cadastro', route: '/portal/confirmacao-cadastro', img: '/wireframes/Mobile WF-003B - Confirmação de Cadastro.png' },
    { code: 'MWF-004', name: 'Mobile - Cadastro de Parceiro', route: '/portal', img: '/wireframes/Mobile WF-004 - Cadastro de Parceiro Comercial.png' },
    { code: 'MWF-005', name: 'Mobile - Resultados da Pesquisa', route: '/portal', img: '/wireframes/Mobile WF-005 - Resultados da Pesquisa.png' },
    { code: 'MWF-007', name: 'Mobile - Conhecendo Curitiba', route: '/portal', img: '/wireframes/Mobile WF-007 - Conhecendo Curitiba.png' },
    { code: 'MWF-008', name: 'Mobile - Detalhes da Atração', route: '/portal', img: '/wireframes/Mobile WF-008 - Detalhes da Atração.png' },
    { code: 'MWF-0080C', name: 'Mobile - Detalhes da Atração exibir imagem', route: '/portal', img: '/wireframes/Mobile WF-0080C - Detalhes da Atração exibir imagem.png' },
    { code: 'MWF-008B', name: 'Mobile - Detalhes da Atração pedido de login', route: '/portal', img: '/wireframes/Mobile WF-008B - Detalhes da Atração pedido de login.png' },
    { code: 'MWF-008D', name: 'Mobile - Detalhes da Atração exibir imagem galeria', route: '/portal', img: '/wireframes/Mobile WF-008D - Detalhes da Atração exibir imagem galeria.png' },
    { code: 'MWF-010', name: 'Mobile - Carrinho', route: '/portal', img: '/wireframes/Mobile WF-010 - Carrinho.png' },
    { code: 'MWF-011', name: 'Mobile - Pedido', route: '/portal', img: '/wireframes/Mobile WF-011 - Pedido.png' },
    { code: 'MWF-012', name: 'Mobile - Pagamento Cartão', route: '/portal', img: '/wireframes/Mobile WF-012 - Pagamento Cartão.png' },
    { code: 'MWF-012A', name: 'Mobile - Pagamento Google Pay', route: '/portal', img: '/wireframes/Mobile WF-012A - Pagamento Google Pay.png' },
    { code: 'MWF-012B', name: 'Mobile - Pagamento Pix', route: '/portal', img: '/wireframes/Mobile WF-012B - Pagamento Pix.png' },
    { code: 'MWF-013', name: 'Mobile - Pagamento Confirmado', route: '/portal', img: '/wireframes/Mobile WF-013 - Pagamento Confirmado.png' },
    { code: 'MWF-013A', name: 'Mobile - Email Pagamento Confirmado', route: '/portal/email-confirmacao', img: '/wireframes/Mobile WF-013A - Pagamento Confirmado.png' },
    { code: 'MWF-014', name: 'Mobile - Meus ingressos', route: '/portal', img: '/wireframes/Mobile WF-014 - Meus ingressos.png' },
    { code: 'MWF-014A', name: 'Mobile - Meus ingressos resumo do pedido', route: '/portal', img: '/wireframes/Mobile WF-014A - Meus ingressos resumo do pedido.png' },
    { code: 'MWF-014B', name: 'Mobile - Meus ingressos ver no mapa', route: '/portal', img: '/wireframes/Mobile WF-014B - Meus ingressos ver no mapa.png' },
    { code: 'MWF-015', name: 'Mobile - Configurações dados pessoais', route: '/portal', img: '/wireframes/Mobile WF-015 - Configurações dados pessoais.png' },
    { code: 'MWF-015A', name: 'Mobile - Configurações notificações', route: '/portal', img: '/wireframes/Mobile WF-015A - Configurações notificações.png' },
    { code: 'MWF-015B', name: 'Mobile - Configurações Cartões Salvos', route: '/portal', img: '/wireframes/Mobile WF-015B - Configurações Cartões Salvos.png' },
    { code: 'MWF-015C', name: 'Mobile - Notificações (Inbox)', route: '/portal', img: '/wireframes/Mobile WF-015C - Notificações.png' },
    { code: 'MWF-016', name: 'Mobile - Solicitação de Reembolso', route: '/portal', img: '/wireframes/Mobile WF-016 - Solicitação de Reembolso.png' },
    { code: 'MWF-016A', name: 'Mobile - Email Confirmação de Reembolso', route: '/portal', img: '/wireframes/Mobile WF-016A - Email Confirmacao de Reembolso.png' },
    { code: 'MWF-017', name: 'Mobile - Política de Privacidade', route: '/portal', img: '/wireframes/Mobile WF-017 - Política de Privacidade.png' },
    { code: 'MWF-018', name: 'Mobile - Condições de uso do site', route: '/portal', img: '/wireframes/Mobile WF-018 - Condições de uso do site.png' },
    { code: 'MWF-019', name: 'Mobile - FAQ - Perguntas frequentes', route: '/portal', img: '/wireframes/Mobile WF-019 - FAQ - Perguntas frequentes.png' },
    { code: 'MWF-020', name: 'Mobile - Sobre Nós', route: '/portal', img: '/wireframes/Mobile WF-020 - Sobre Nós.png' }
  ];

  // Get active array based on tab
  const getActiveArray = () => {
    if (abaVisualizador === 'portal-desktop') return portalDesktopWireframes;
    if (abaVisualizador === 'portal-mobile') return portalMobileWireframes;
    return backofficeWireframes;
  };

  const wireframesAtivos = getActiveArray();

  const filtrados = wireframesAtivos.filter(wf => 
    wf.code.toLowerCase().includes(busca.toLowerCase()) || 
    wf.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Navegador de Wireframes & Validação</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Visualize todas as telas e mockups do projeto e acesse diretamente as rotas live correspondentes.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => { setAbaVisualizador('backoffice'); setBusca(''); }}
          style={{
            padding: '0.5rem 1.25rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
            backgroundColor: abaVisualizador === 'backoffice' ? '#3b82f6' : 'transparent',
            color: abaVisualizador === 'backoffice' ? 'white' : '#4b5563',
            fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s'
          }}
        >
          💼 Backoffice (Admin - 64 Telas)
        </button>
        <button
          onClick={() => { setAbaVisualizador('portal-desktop'); setBusca(''); }}
          style={{
            padding: '0.5rem 1.25rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
            backgroundColor: abaVisualizador === 'portal-desktop' ? '#3b82f6' : 'transparent',
            color: abaVisualizador === 'portal-desktop' ? 'white' : '#4b5563',
            fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s'
          }}
        >
          🖥️ Portal Público (Desktop - 50 Telas)
        </button>
        <button
          onClick={() => { setAbaVisualizador('portal-mobile'); setBusca(''); }}
          style={{
            padding: '0.5rem 1.25rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
            backgroundColor: abaVisualizador === 'portal-mobile' ? '#3b82f6' : 'transparent',
            color: abaVisualizador === 'portal-mobile' ? 'white' : '#4b5563',
            fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s'
          }}
        >
          📱 Portal Público (Smartphone - 35 Telas)
        </button>
      </div>

      {/* Busca */}
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Buscar por código (ex: WF-005) ou nome do wireframe..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' }}
        />
      </div>

      {/* Grid de Wireframes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filtrados.map((wf) => (
          <div key={wf.code + '-' + wf.name} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#3b82f6', backgroundColor: '#eff6ff', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                {wf.code}
              </span>
              <button 
                onClick={() => setModalImagem(wf)}
                style={{ padding: '0.25rem 0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                👁️ Ver Wireframe
              </button>
            </div>

            <div style={{ flex: 1, textAlign: 'left' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', color: '#1f2937' }}>{wf.name}</h3>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Rota: {wf.route}</span>
            </div>

            <button 
              onClick={() => navigate(wf.route)}
              style={{ width: '100%', padding: '0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8125rem' }}
            >
              🔗 Acessar Rota Live
            </button>
          </div>
        ))}
      </div>

      {/* Modal de visualização do Wireframe PNG */}
      {modalImagem && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000 }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', maxWidth: '90%', maxHeight: '90%', display: 'flex', flexDirection: 'column', gap: '1rem', width: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>{modalImagem.code} - {modalImagem.name}</h3>
              <button onClick={() => setModalImagem(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>
            <div style={{ overflow: 'auto', flex: 1, backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
              <img src={modalImagem.img} alt={modalImagem.name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button 
                onClick={() => setModalImagem(null)}
                style={{ padding: '0.5rem 1.5rem', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Fechar
              </button>
              <button 
                onClick={() => {
                  setModalImagem(null);
                  navigate(modalImagem.route);
                }}
                style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Acessar Rota Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
