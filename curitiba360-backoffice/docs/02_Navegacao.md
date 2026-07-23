# 🔄 Mapa Mestre de Navegação — Curitiba 360

Este documento detalha a árvore de navegação completa e os fluxos de transição de tela para os ambientes mobile (**Super App**) e desktop (**Painel Administrativo**).

---

## 📱 1. Fluxo de Abertura do Aplicativo

Quando o usuário abre o aplicativo, a verificação de autenticação é executada para definir o destino imediato.

```mermaid
graph TD
    Splash[Splash Screen / Inicialização] --> CheckAuth{Usuário Logado?}
    
    CheckAuth -- Sim ➔ Citizen --> Home[Home / Super App]
    CheckAuth -- Sim ➔ Partner/Admin --> Admin[Dashboard Admin]
    
    CheckAuth -- Não --> Login[Tela de Login]
    Login --> Register[Criar Conta / Cadastro]
    Login --> Forgot[Recuperar Senha]
    Forgot --> EmailSent[E-mail de Confirmação Enviado]
```

---

## 🏠 2. Hub Inteligente (Home)

A Home atua como ponto de partida (Hub) para todas as seções internas do Super App.

```mermaid
graph TD
    Home[Home / Super App] --> Header[Header Global]
    Home --> Banner[Banner Principal]
    Home --> Quick[Acesso Rápido]
    Home --> List1[Próximos Eventos]
    Home --> List2[Descubra Curitiba]
    Home --> Nav[Navegação Inferior]
    
    Header --> Search[Busca Global]
    Header --> Notifications[Notificações]
    Header --> Wallet[Carteira]
    Header --> Profile[Perfil]
    
    Quick --> Eventos[🎫 Eventos]
    Quick --> Turismo[📍 Explorar Curitiba]
    Quick --> Gastro[🍽 Gastronomia]
    Quick --> Hotel[🏨 Hospedagem]
    Quick --> Mkt[🛍 Marketplace]
    Quick --> CardWallet[💳 Carteira]
    Quick --> Fav[❤️ Favoritos]
```

---

## 🎟️ 3. Fluxo de Eventos e Ingressos (MVP)

A jornada linear de compra de ingressos até a validação de acesso.

```mermaid
stateDiagram-v2
    Home --> Eventos : Acesso Rápido / Busca
    Eventos --> Categorias : Filtrar por Tema
    Categorias --> Pesquisa : Digitação
    Pesquisa --> Detalhe_Evento : Clicar no Card
    Detalhe_Evento --> Selecao_Lotes : "Comprar Ingresso"
    Selecao_Lotes --> Carrinho : Selecionar quantidade
    Carrinho --> Checkout : "Ir para pagamento"
    Checkout --> Processando : Confirmar Pix/Cartão
    Processando --> Aprovado : Sucesso do Banco
    Aprovado --> Ingresso_Digital : "Ver meu ingresso"
    Ingresso_Digital --> [*]
```

---

## 🗺️ 4. Fluxo de Turismo e Atrativos

Como o usuário explora a cidade de Curitiba e realiza reservas.

```mermaid
graph LR
    Home --> Exp[Explorar Curitiba]
    Exp --> Cat[Categorias Temáticas]
    Cat --> Atr[Página do Atrativo]
    Atr --> Map[Visualizar no Mapa]
    Atr --> Res[Reserva / Agendamento]
```

*Categorias de Turismo mapeadas:*
* **Parques** (ex: Barigui, Tanguá, Jardim Botânico)
* **Museus** (ex: MON, Museu Paranaense)
* **Feiras** (ex: Feira do Largo da Ordem)
* **Igrejas** (ex: Catedral de Curitiba)
* **Gastronomia** (ex: Bairros de Santa Felicidade)
* **Compras** (ex: Shoppings e Galerias)
* **Passeios** (ex: Linha Turismo)

---

## 💳 5. Fluxo da Carteira (Wallet)

Gerenciamento de saldo, histórico e cashback.

```mermaid
graph TD
    Wallet[Carteira] --> Balance[Visualizar Saldo]
    Wallet --> Pix[Gerar Pix para Depósito]
    Wallet --> Cards[Gerenciar Cartões Cadastrados]
    Wallet --> Cashback[Consultar Saldo Cashback]
    Wallet --> History[Consultar Extrato]
    Wallet --> Benefits[Consultar Clube de Benefícios]
```

---

## 👤 6. Fluxo de Perfil do Usuário

Configurações e informações do participante.

```mermaid
graph TD
    Profile[Perfil] --> PersonalData[Dados Pessoais]
    Profile --> Address[Endereços Cadastrados]
    Profile --> Security[Segurança e MFA]
    Profile --> Tickets[Meus Ingressos Comprados]
    Profile --> Bookings[Minhas Reservas Ativas]
    Profile --> Orders[Histórico de Pedidos]
    Profile --> Favorites[Locais & Eventos Favoritos]
    Profile --> Settings[Configurações Gerais]
```

---

## 🖥️ 7. Navegação do Painel Administrativo (Admin Console)

O console administrativo é isolado e gerencia o marketplace, finanças e cadastros.

```mermaid
graph TD
    Admin[Dashboard Admin] --> Ev[Eventos e Lotes]
    Admin --> Ped[Gestão de Pedidos]
    Admin --> Fin[Painel Financeiro / Repasses]
    Admin --> Cli[Clientes / CRM]
    Admin --> Par[Parceiros B2B]
    Admin --> Mkt[Campanhas e Automação]
    Admin --> Rel[Relatórios e Logs]
    Admin --> Config[Configurações Globais]
```
