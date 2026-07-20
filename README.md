# Curitiba360 - Viva a Cidade Integrada 🌲🍊

O **Curitiba360** é uma plataforma digital inovadora e bilíngue criada para conectar hotéis, pontos turísticos, bares, restaurantes e turistas em Curitiba. 

Este projeto foi construído do zero seguindo as especificações do arquivo de documentação [PJL-Curitiba360.pdf](file:///C:/Users/vinad/Downloads/Documentação/Documentação/PJL-Curitiba360.pdf) fornecido.

---

## 🚀 Como Executar o Projeto

Certifique-se de que você possui o **Node.js** instalado na sua máquina.

1. Abra o terminal na pasta do projeto: `C:\Users\vinad\OneDrive\Documentos\Curitiba 360`
2. Execute o seguinte comando para iniciar o servidor de desenvolvimento local:
   ```bash
   npm run dev
   ```
3. O servidor abrirá automaticamente a aplicação no seu navegador padrão no endereço `http://localhost:3000`.

---

## 🎨 Destaques do Design e Funcionalidades

### 1. Estética Premium e Glassmorphic
*   **Design de Alto Impacto**: Paleta de cores baseada em tons escuros e elegantes, com destaque no **Laranja Curitiba** e no **Turquesa**.
*   **Micro-Animações**: Transições suaves nas rotas do mapa, efeitos de hover de profundidade nos cards e suavidade na alternância de abas.
*   **Suporte a Temas**: Altere a qualquer momento entre o tema escuro default e um tema claro de alta legibilidade através do botão de sol/lua no cabeçalho.

### 2. Mapa Interativo de Curitiba ([js/map.js](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/js/map.js))
*   **Desenho Vetorial (SVG)**: Mapa responsivo de Curitiba conectando os principais pontos de visita em uma rota dinâmica e pulsante (Linha Turismo).
*   **Pins Interativos**: Ao clicar em pontos como o *Jardim Botânico*, *Ópera de Arame*, *Museu Oscar Niemeyer*, *Centro Histórico* e o novo *Parque Jaime Lerner*, a barra lateral carrega dados históricos, horários de funcionamento, ingressos e tags atualizadas no idioma selecionado.

### 3. Simulador de QR Code do Hotel ([js/app.js](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/js/app.js))
*   Permite escolher o hotel de estadia (ex: Pestana, Radisson, Bourbon) e simular a leitura do QR Code físico do cartão do hotel, personalizando as saudações da página e simulando o fluxo nativo.

### 4. Vitrine de Pacotes e Checkout com Pesquisa
*   Três pacotes temáticos completos com precificação de desconto embutida.
*   **Checkout Inteligente**: Modal de cadastro que realiza a pesquisa de perfil obrigatória do turista (dias de estadia, motivo da viagem, cidade de origem).
*   **Ingresso Digital com QR Code**: Emissão imediata do ingresso digital gerando um QR Code vetorial funcional com o código do ticket para apresentação física nos estabelecimentos parceiros.

### 5. Portal do Parceiro / Dashboard ([js/dashboard.js](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/js/dashboard.js))
*   Painel estatístico voltado para hotéis, bares e prefeitura visualizarem as métricas de conversão e alcance estimadas no plano de negócios.
*   **Gráficos SVG Dinâmicos**: Gráficos construídos nativamente sem dependências de bibliotecas pesadas para exibição de acessos por canais e origem dos turistas.
*   **Heatmap de Hotéis**: Gráfico de barras horizontais indicando a quantidade de scans originada de cada hotel parceiro, atualizado em tempo real quando você realiza uma compra no simulador de turista!

### 6. Chatbot WhatsApp Integrado
*   Widget flutuante simulando suporte ao cliente por WhatsApp com respostas inteligentes pré-programadas baseadas nas suas dúvidas sobre ingressos, descontos e atrações do mapa.

---

## 📁 Estrutura de Arquivos Criada

*   [index.html](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/index.html) - Estrutura HTML semântica e bilinguismo.
*   [css/styles.css](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/css/styles.css) - Tokens de cores, temas escuro/claro, flexbox/grid responsivos e animações.
*   [js/app.js](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/js/app.js) - Dicionário de traduções, gerenciamento de estado dos modais, QR code e chat.
*   [js/map.js](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/js/map.js) - Conteúdo e controle do mapa interativo.
*   [js/dashboard.js](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/js/dashboard.js) - Lógica de gráficos, métricas e atualização de dados em tempo real.
*   [package.json](file:///C:/Users/vinad/OneDrive/Documentos/Curitiba%20360/package.json) - Scripts de execução do servidor local.
