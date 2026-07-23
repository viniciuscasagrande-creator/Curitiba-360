# 🔥 Arquitetura Firebase & Modelagem de Dados — Curitiba 360

Este documento especifica a modelagem NoSQL do Google Firestore, a estrutura de controle de acesso do Firebase Auth e os fluxos de notificação em nuvem (Cloud Messaging).

---

## 🔐 1. Firebase Authentication & Funções (Roles)

Todos os usuários da plataforma possuem cadastro no Authentication, com metadados de perfil gravados em Firestore na coleção `/users` com a seguinte atribuição de privilégios (`roles`):

```json
{
  "uid": "USER_ID_EXEMPLO",
  "email": "usuario@exemplo.com",
  "role": "citizen" // citizen | partner | admin
}
```

* **citizen**: Acesso padrão do aplicativo de consumo, com permissão para realizar compras, salvar favoritos e gerenciar carteira.
* **partner**: Acesso ao console de parceiros, com permissão para cadastrar atrações e visualizar relatórios de vendas de suas próprias produções.
* **admin**: Acesso total a todas as coleções, aprovação de parceiros, logs de auditoria e configurações do sistema.

---

## 📦 2. Estrutura de Coleções Firestore (Esquemas de Dados)

### Coleção: `/users`
Guarda dados do cadastro e perfil de cada usuário.
```json
{
  "displayName": "Vinicius Casagrande",
  "cpf": "123.456.789-00",
  "phoneNumber": "+5541999999999",
  "role": "citizen",
  "createdAt": "2026-07-23T10:00:00Z"
}
```

### Coleção: `/events`
Contém as atrações e eventos disponíveis.
```json
{
  "title": "Festival de Teatro de Curitiba",
  "description": "Edição comemorativa com espetáculos ao ar livre.",
  "category": "teatro",
  "date": "2026-08-15T20:00:00Z",
  "location": {
    "address": "Guairão, Curitiba - PR",
    "lat": -25.4302,
    "lng": -49.2685
  },
  "pricing": {
    "minPrice": 40.0,
    "maxPrice": 120.0
  },
  "capacity": 1500,
  "sold": 450,
  "partnerId": "PARTNER_UID_HERE"
}
```

### Coleção: `/orders`
Contém o registro definitivo de compras de ingressos.
```json
{
  "userId": "USER_UID_HERE",
  "eventId": "EVENT_ID_HERE",
  "items": [
    {
      "ticketType": "inteira",
      "quantity": 2,
      "price": 80.0
    }
  ],
  "payment": {
    "method": "pix",
    "status": "approved", // pending | approved | cancelled
    "total": 160.0
  },
  "createdAt": "2026-07-23T10:30:00Z"
}
```

### Coleção: `/wallets`
Contém saldos reativos de crédito e cashback de usuários.
```json
{
  "userId": "USER_UID_HERE",
  "balance": 250.0,
  "cashback": 15.5,
  "updatedAt": "2026-07-23T10:31:00Z"
}
```

---

## ⚡ 3. Cloud Functions (Regras de Backend)

* **`processOrderPayment`**: Acionada via Firestore Trigger ou Webhook, valida o pagamento e altera o status do pedido para `approved`, gerando automaticamente os QR Codes dos bilhetes.
* **`updateEventInventory`**: Trigger executada após a criação de um pedido, garantindo que o estoque de lotes seja reduzido de forma transacional livre de condições de corrida.
