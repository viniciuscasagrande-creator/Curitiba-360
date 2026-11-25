# 📋 Backlog de Desenvolvimento & Tarefas por Sprint

Este documento reúne a listagem de tarefas e critérios de aceitação divididos por Sprints para a implementação completa e integrada do ecossistema **Curitiba 360**.

---

## 🏃 Sprint 1 — Fundação (Login, Cadastro e Home Hub)

### Tarefas
* [ ] **T-1.1: Formulários de Autenticação**
  * Desenvolver a página de Login (`LoginPage`) e Cadastro (`RegisterPage`) usando o Design System.
  * Ligar componentes usando `react-hook-form` e validar com `zod`.
* [ ] **T-1.2: Layout e Contêiner Base**
  * Criar o Header global responsivo contendo busca rápida e avatar de perfil.
  * Criar a barra de navegação inferior (`BottomNavigation`) fixa para mobile.
* [ ] **T-1.3: Home Hub do Super App**
  * Montar a página inicial (`SuperAppHomePage`) com banners, grid de atalhos e recomendados.
  * Conectar atalhos às rotas de Eventos, Turismo e Carteira.

### Critérios de Aceite
* O formulário de login bloqueia cliques repetidos quando estiver enviando.
* A Home renderiza corretamente em telas mobile (360px) até monitores desktop (1920px).
* Ao digitar na barra de busca global, o usuário é direcionado para a tela de busca.

---

## 🏃 Sprint 2 — Eventos e Ingressos (Jornada de Compra)

### Tarefas
* [ ] **T-2.1: Listagem e Busca de Eventos**
  * Implementar a página `/app/events` com filtros rápidos de data e categorias.
  * Renderizar cards funcionais com informações de preço mínimo e data.
* [ ] **T-2.2: Página de Detalhe do Evento**
  * Criar o layout de `/app/events/:id` com galeria, mapa e descrição.
  * Integrar o painel flutuante de seleção de lotes e quantidades de ingressos.
* [ ] **T-2.3: Carrinho e Checkout de Pagamento**
  * Desenvolver o carrinho `/carrinho` com temporizador ativo de reserva de estoque.
  * Desenvolver a tela `/checkout` com opções de pagamento simulado (Pix com cópia de chave e cartão).
* [ ] **T-2.4: Tela de Resultado e Ingresso Ativo**
  * Criar `/checkout/resultado/:orderId` exibindo confirmação ou QR Code de pagamento pendente.
  * Estruturar a listagem em `/app/tickets` e o detalhe com QR Code do ingresso.

### Critérios de Aceite
* O temporizador do carrinho limpa a reserva e redireciona após 10 minutos de inatividade.
* A tela de checkout impede cliques de submissão dupla enquanto processa.
* O QR Code do ingresso digital gera um valor único e entra em modo alto brilho de tela ao ser focado.

---

## 🏃 Sprint 3 — Turismo e Mapa Interativo

### Tarefas
* [ ] **T-3.1: Hub de Explorar e Categorias**
  * Desenvolver a interface `/app/explore` integrando atalhos para parques, museus e gastronomia.
* [ ] **T-3.2: Mapa da Cidade e Filtros Locais**
  * Renderizar o mapa interativo mockado (com Pins interativos de atrações locais).
  * Ligar a seleção do Pin ao card flutuante de detalhes rápidos da atração.
* [ ] **T-3.3: Tela de Detalhes da Atração**
  * Exibir horários de funcionamento, regras de visitação e acessibilidade de locais públicos.

### Critérios de Aceite
* Alternar entre a visualização de lista e mapa não deve reiniciar o estado da busca do usuário.
* O mapa renderiza corretamente todos os pins de locais cadastrados baseados em dados de mock georreferenciados.

---

## 🏃 Sprint 4 — Carteira (Wallet) e Clube de Benefícios

### Tarefas
* [ ] **T-4.1: Tela de Saldo e Extrato**
  * Exibir o saldo de créditos e cashback de forma legível no Header e na carteira `/app/wallet`.
  * Renderizar listagem categorizada do extrato (Entradas, Compras, Estorno).
* [ ] **T-4.2: Cupons e Resgate de Benefícios**
  * Renderizar a vitrine de ofertas de parceiros para troca de pontos do Clube por descontos.

### Critérios de Aceite
* O saldo é atualizado imediatamente após a confirmação simulada de compra de um ingresso.
* A listagem de transações suporta paginação ou rolagem infinita limpa.

---

## 🏃 Sprint 5 — Perfil e Configurações

### Tarefas
* [ ] **T-5.1: Gestão de Cadastro Pessoal**
  * Formulários editáveis de dados de contato e endereços de faturamento.
* [ ] **T-5.2: Segurança e Histórico de Pedidos**
  * Visualização e gerenciamento de cartões de crédito tokenizados salvos.
  * Histórico de pedidos anteriores com status de pagamento.

### Critérios de Aceite
* Campos de alteração de senha exigem a confirmação da senha atual.
* O usuário pode excluir um cartão de crédito cadastrado com confirmação em modal.

---

## 🏃 Sprint 6 — Painel Administrativo de Parceiros

### Tarefas
* [ ] **T-6.1: Dashboard Executivo**
  * Renderizar gráficos de vendas por dia e tabelas de faturamento global de parceiros comerciais.
* [ ] **T-6.2: Gestão e Aprovação de Ingressos**
  * Criar interfaces de cadastro de atração, criação de lotes de ingressos e controle de cupons.

### Critérios de Aceite
* O acesso às rotas sob `/admin` e `/parceiro` é bloqueado para usuários que não possuem perfil correspondente.
