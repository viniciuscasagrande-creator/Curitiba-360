# 🚀 Escopo do MVP (Minimum Viable Product) — Curitiba 360

Este documento especifica os limites de escopo e os critérios de validação das funcionalidades integradas na primeira versão operacional (MVP) do **Curitiba 360**.

---

## 🎯 1. Funcionalidades Incluídas no MVP

O MVP é focado na jornada completa do turista e do cidadão que deseja descobrir e consumir eventos e turismo na cidade de Curitiba:

### A. Autenticação e Gestão de Contas
* **Login & Registro**: Criação de contas de usuário final.
* **Validação**: Validação de dados locais como CPF, telefone e senhas correspondentes.
* **Segurança**: Recuperação de senha por e-mail e redefinição de credenciais.

### B. Hub de Informação & Busca
* **Home do Super App**: Acesso a atalhos em grade, carrossel de banners em destaque e listagem de eventos recomendados.
* **Explorar & Filtros**: Busca global por texto e filtros rápidos por categoria, bairro e faixa de preço.

### C. Fluxo de Vendas (Ticketing)
* **Lista de Eventos**: Grid dinâmico de eventos disponíveis.
* **Detalhes do Evento**: Fotos, descrição longa, localização com mapa interativo e política de cancelamento.
* **Seleção de Ingressos**: Grid de lotes ativos, quantidade por CPF e controle de estoque básico.
* **Carrinho**: Revisão de valores, aplicação de desconto e temporizador ativo de expiração da reserva.
* **Checkout & Pagamento**: Simulação de pagamentos por Pix (QR Code dinâmico com chave de texto copia e cola) e Cartão de Crédito.
* **Confirmação**: Tela de feedback de sucesso, dados de transação e atalho para bilhetes.

### D. Bilheteira Digital
* **Meus Ingressos**: Listagem de compras anteriores dividida entre ingressos ativos, utilizados e cancelados.
* **Ingresso Digital (E-ticket)**: QR Code único e dinâmico na tela para leitura física na entrada do evento.

### E. Turismo e Localização
* **Atrativos**: Detalhes completos de pontos de visitação pública e parques da cidade.
* **Mapa**: Visualização de atrações no mapa da cidade com Pins interativos.

### F. Carteira Básica
* **Consumo de Créditos**: Consulta rápida de saldo financeiro mockado e cashback utilizável em compras de ingressos.

---

## 🚫 2. Recursos Desativados ou Removidos do MVP

Estes recursos foram mapeados e estruturados no código-fonte, mas permanecem desativados por chaves de feature flag ou simulação local até as fases subsequentes de desenvolvimento:

* **Integração Real de Adquirente (Stripe/Mercado Pago)**: O checkout opera com simulação de resposta aprovada instantânea para testes de fluxo.
* **Split Financeiro B2B Ativo**: O cálculo de taxas e o split financeiro de comissões de agências parceiras são simulados em banco local, sem ordens de transferência bancária reais.
* **Governo Digital Integrado**: Serviços de abertura de chamados públicos (ouvidoria), protocolos da Defesa Civil e SOS urbano aparecem na navegação, mas não efetuam envio de relatórios reais.
* **Inteligência Artificial Ativa (Concierge AI)**: O assistente virtual exibe uma conversa baseada em árvore de decisão estática, sem chamadas pagas da API da OpenAI/Meta.
* **Telemetria de Smart City**: Os indicadores de trânsito em tempo real e sensores de qualidade do ar utilizam dados estáticos atualizados de forma agendada no banco de dados, em vez de APIs de sensores urbanos ativas.
