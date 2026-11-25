# 🖥️ Arquitetura das Telas & Roteamento React — MVP Curitiba 360

Este documento descreve o mapeamento completo das rotas React, o controle de acesso (RBAC) e as especificações técnicas detalhadas das telas que compõem o MVP do **Curitiba 360**.

---

## 🗺️ 1. Tabela de Rotas React e Navegação

Todas as rotas do aplicativo (App) e do console administrativo (Admin) seguem o mapeamento abaixo:

| Rota (URL) | Componente React | Acesso (RBAC) | Origem / Fluxo | Destino Principal (Ação) |
| :--- | :--- | :--- | :--- | :--- |
| `/login` | `LoginPage` | Público | Splash Screen / Direto | `/app/home` ou `/admin` |
| `/criar-conta` | `RegisterPage` | Público | `/login` | `/app/home` |
| `/esqueci-minha-senha` | `ForgotPasswordPage` | Público | `/login` | `/recuperacao-enviada` |
| `/redefinir-senha` | `ResetPasswordPage` | Público | Link no E-mail | `/login` |
| `/app/home` | `SuperAppHomePage` | Autenticado (Cidadão/Turista) | `/login` | `/app/explore`, `/app/wallet` |
| `/app/explore` | `ExplorePage` | Autenticado (Cidadão/Turista) | `/app/home` | `/app/events/:id`, `/app/map` |
| `/app/events` | `EventsPage` | Autenticado (Cidadão/Turista) | `/app/explore` | `/app/events/:id` |
| `/app/events/:id` | `EventDetailsPage` | Autenticado (Cidadão/Turista) | `/app/events` | `/carrinho` (Seleção de Lote) |
| `/carrinho` | `CartPage` | Autenticado (Cidadão/Turista) | `/app/events/:id` | `/checkout` |
| `/checkout` | `CheckoutPage` | Autenticado (Cidadão/Turista) | `/carrinho` | `/checkout/resultado/:orderId` |
| `/checkout/resultado/:orderId`| `CheckoutResultPage`| Autenticado (Cidadão/Turista) | `/checkout` | `/app/tickets` |
| `/app/tickets` | `TicketsPage` | Autenticado (Cidadão/Turista) | `/app/home` / `/checkout/resultado` | `/app/tickets/:id` (Visualização) |
| `/app/attractions` | `AttractionsPage` | Autenticado (Cidadão/Turista) | `/app/home` | `/app/attractions/:slug` |
| `/app/wallet` | `WalletPage` | Autenticado (Cidadão/Turista) | `/app/home` / Menu Inferior | `/app/wallet/historico` |
| `/app/profile` | `ProfilePage` | Autenticado (Cidadão/Turista) | Menu Inferior | `/app/profile/seguranca` |
| `/admin` | `AdminDashboardPage` | Autenticado (Gestor/Admin) | `/login` | `/admin/events`, `/admin/finance` |
| `/parceiro/produtos` | `ProductsPage` | Autenticado (Parceiro/Admin) | `/admin` Sidebar | `/parceiro/produtos/novo` |
| `/parceiro/financeiro` | `FinancialDashboardPage` | Autenticado (Parceiro/Admin) | `/admin` Sidebar | `/parceiro/financeiro/repasse` |

---

## 📋 2. Especificação Técnica Detalhada das Telas (MVP)

### 1. Tela de Login (`LoginPage`)
* **Objetivo**: Autenticar o usuário e realizar o redirecionamento com base nas credenciais informadas.
* **Componentes**:
  * Logo em alta definição (SVG).
  * Inputs reativos com validação instantânea (`react-hook-form` + `zod`).
  * Botão com micro-animação de loading e feedback tátil.
  * Links rápidos de navegação.
* **Fluxo**:
  * Credenciais corretas (Cidadão) ➔ Redireciona para `/app/home`.
  * Credenciais corretas (Admin/Parceiro) ➔ Redireciona para `/admin`.
  * Esqueci senha ➔ `/esqueci-minha-senha`.
* **APIs & Backend**: Consumo do `authService.login(email, password)`.
* **Coleções Firebase**: `users` (Verificação de Role: `role: 'citizen' | 'partner' | 'admin'`).
* **Estados**:
  * *Loading*: Desabilita inputs, exibe spinner no botão principal.
  * *Erro*: Exibe banner de credenciais inválidas ou conta bloqueada.
* **Responsividade**: Layout centralizado com grid responsivo. Mobile (100% largura), Tablet/Desktop (Card centralizado com imagem de Curitiba ao lado).
* **Critérios de Aceite**: Senha oculta por padrão com botão de revelar; submissão por tecla `Enter` suportada.

---

### 2. Tela de Cadastro (`RegisterPage`)
* **Objetivo**: Criar conta de usuário final na plataforma.
* **Componentes**: Nome Completo, CPF (com máscara e validação matemática), Telefone, E-mail, Senha e Confirmação de Senha.
* **Fluxo**: Formulário de Cadastro ➔ Validação Local ➔ Criação no Auth ➔ Registro no Firestore ➔ Redireciona para `/app/home`.
* **APIs & Backend**: `authService.register(userData)`.
* **Coleções Firebase**: Gravação inicial de perfil na coleção `/users/{uid}`.
* **Estados**:
  * *Loading*: Bloqueio de novos cliques para evitar cadastros duplicados.
  * *Erro*: Notificação visual de CPF já existente ou senhas divergentes.
* **Critérios de Aceite**: Validação robusta de formato de e-mail e força de senha (mínimo de 8 caracteres, contendo letras e números).

---

### 3. Home do Aplicativo (`SuperAppHomePage`)
* **Objetivo**: Atuar como a central inteligente (Hub) de serviços e lazer da cidade.
* **Componentes**:
  * Header com perfil do usuário, saldo rápido da carteira e sino de notificações.
  * Carrossel dinâmico de banners (promocionais e informativos).
  * Botões de atalho rápido em Grid (Eventos, Turismo, Benefícios, Carteira).
  * Seção "Próximos Eventos" em carrossel horizontal.
* **Fluxo**: Cliques redirecionam para as seções correspondentes (`/app/explore`, `/app/events`, `/app/wallet`).
* **APIs & Backend**: `eventService.getHighlightedEvents()`, `walletService.getBalance()`.
* **Coleções Firebase**: `/events`, `/banners`, `/users/{uid}`.
* **Estados**:
  * *Vazio*: Seção de recomendados oculta caso não haja dados históricos do usuário.
  * *Loading*: Shimmer effects ocupando os placeholders dos banners e cards.
* **Responsividade**: Mobile-first. Grid de 4 colunas para atalhos rápidos em mobile, expandindo para 8 colunas em desktop.

---

### 4. Tela Explorar (`ExplorePage`)
* **Objetivo**: Busca centralizada de atrações, eventos e utilidades urbanas.
* **Componentes**: Barra de busca preditiva, gaveta lateral de filtros avançados (Faixa de Preço, Categoria, Acessibilidade, Data) e listagem de resultados com alternância para mapa.
* **Fluxo**: Seleção de card ➔ Redireciona para `/app/events/:id` ou `/app/attractions/:slug`.
* **APIs & Backend**: `searchService.query(searchParams)`.
* **Coleções Firebase**: `/events`, `/attractions` (leitura indexada).
* **Estados**:
  * *Sem Resultados*: Mensagem amigável com sugestão de limpeza de filtros.
* **Critérios de Aceite**: Filtros devem ser aplicados em tempo real sem travamento de tela (debounce de 300ms na digitação).

---

### 5. Detalhes do Evento (`EventDetailsPage`)
* **Objetivo**: Apresentar dados completos do evento e permitir a seleção de ingressos.
* **Componentes**: Galeria de fotos com lightbox, descrição completa, mapa com geolocalização do endereço, painel colateral fixo de ingressos (seleção de lotes e quantidade).
* **Fluxo**: Botão "Comprar" ➔ Adiciona ao carrinho ➔ Redireciona para `/carrinho`.
* **APIs & Backend**: `eventService.getEventById(id)`.
* **Coleções Firebase**: `/events/{id}`, `/events/{id}/tickets_inventory`.
* **Estados**:
  * *Esgotado*: Botão "Comprar" desabilitado com aviso de lotação máxima atingida.
* **Responsividade**: Em mobile, painel de compra fixa-se na base da tela (sticky footer). Em desktop, o painel fica fixado na lateral direita.

---

### 6. Carrinho Inteligente (`CartPage`)
* **Objetivo**: Revisar os itens selecionados, aplicar benefícios/cupons e confirmar valores.
* **Componentes**: Listagem de itens, campo de cupom promocional, slider para uso de cashback acumulado, cronômetro de expiração dos ingressos (reserva temporária de estoque).
* **Fluxo**: Confirmar Compra ➔ Redireciona para `/checkout`.
* **APIs & Backend**: `cartService.validateCart()`.
* **Coleções Firebase**: `/carts/{userId}` (persistência temporária para recuperação de carrinho abandonado).
* **Critérios de Aceite**: O cronômetro inicia em 10 minutos. Ao zerar, os ingressos voltam ao estoque e o carrinho é limpo com aviso visual.

---

### 7. Checkout e Pagamento (`CheckoutPage`)
* **Objetivo**: Concluir o pagamento de forma segura.
* **Componentes**: Seletor de forma de pagamento (Pix com QR Code dinâmico, Cartão de Crédito com formulário criptografado), campo de dados de faturamento.
* **Fluxo**: Pagamento bem-sucedido ➔ `/checkout/resultado/:orderId`.
* **APIs & Backend**: `paymentService.processPayment()`.
* **Coleções Firebase**: Gravidade do pedido em `/orders/{orderId}`.
* **Estados**:
  * *Processando*: Tela de bloqueio inteira com feedback de transação bancária em andamento (anti-duplicação de cobrança).
* **Critérios de Aceite**: Nenhum dado sensitivo de cartão de crédito (como CVV) pode trafegar ou ser armazenado no frontend de forma limpa.

---

### 8. Confirmação da Compra (`CheckoutResultPage`)
* **Objetivo**: Exibir o status final do pedido e fornecer o acesso rápido aos bilhetes.
* **Componentes**: Ícone animado (Sucesso/Erro/Aguardando), detalhes da transação, botão de copiar código Pix (se aplicável), botão "Ver Meus Ingressos".
* **Fluxo**: Clique em "Ver Meus Ingressos" ➔ Redireciona para `/app/tickets`.
* **APIs & Backend**: `orderService.getOrderStatus(orderId)`.
* **Coleções Firebase**: `/orders/{orderId}` (leitura em tempo real usando snapshot).

---

### 9. Carteira Digital (`WalletPage`)
* **Objetivo**: Concentrar o controle financeiro do usuário dentro do ecossistema Curitiba 360.
* **Componentes**: Card de Saldo Geral, Extrato detalhado de transações (entradas, saídas, reembolsos), aba de cupons ativos e saldo de cashback.
* **Fluxo**: Acesso ao histórico ou clique em reembolso ➔ `/app/profile/pedidos`.
* **APIs & Backend**: `walletService.getTransactions()`.
* **Coleções Firebase**: `/wallets/{userId}`, `/transactions/{userId}`.
* **Limitação MVP**: Recursos de depósito via Pix ou saque estão mockados, operando apenas com simulação local para segurança regulatória.
