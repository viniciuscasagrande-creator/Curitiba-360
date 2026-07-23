# 🖥️ Console Administrativo & KPIs — Curitiba 360

Este documento descreve as especificações funcionais e a estruturação de métricas de desempenho para o **Painel Administrativo** da plataforma.

---

## 📈 1. KPIs Estratégicos (Métricas do Painel)

O dashboard principal apresenta cartões de desempenho (KPIs) atualizados com os dados de vendas e operações.

* **Faturamento Total (Receita)**: Volume financeiro bruto transacionado nas compras de ingressos e pacotes de turismo.
* **Eventos Ativos**: Quantidade de espetáculos e atrações com lotes de ingressos abertos para vendas na plataforma.
* **Eventos Finalizados**: Quantidade de espetáculos cuja data de realização já ocorreu.
* **Ingressos Vendidos**: Total de bilhetes emitidos pela plataforma.
* **Reservas Ativas**: Quantidade de agendamentos agendados para locais com controle de lotação.
* **Usuários Cadastrados**: Total de cidadãos e turistas cadastrados no sistema.
* **Parceiros Ativos (B2B)**: Quantidade de produtores, agências e estabelecimentos com credenciamento aprovado.
* **Ticket Médio**: Valor médio gasto pelos participantes por transação (`Receita / Total de Pedidos`).
* **Taxa de Conversão**: Relação entre o número de compras concluídas e visitas únicas na plataforma.
* **Ocupação Média**: Percentual médio de lotação preenchido nos locais parceiros.
* **Cashback Utilizado**: Volume financeiro resgatado pelos usuários finais para abatimento em compras de ingressos.

---

## 📂 2. Seções Administrativas Operacionais

### A. Gestão de Eventos e Lotes
Interface dedicada a cadastrar eventos, criar lotes de ingressos (ex: Inteira, Meia-entrada, VIP), gerenciar preços dinâmicos e estabelecer limites de ingressos por CPF.

### B. Gestão de Pedidos
Painel contendo o histórico de vendas em tempo real, pesquisa por número de transação e gerenciamento de solicitações de estorno/reembolso.

### C. Painel Financeiro e Repasses
Controle de split financeiro para parceiros e comissões para agências turísticas, controle de depósitos e conciliação bancária simulada.

### D. Relatórios e Analytics (BI)
Interface contendo gráficos de abandono de carrinho, vendas por categoria e comportamento do usuário.
