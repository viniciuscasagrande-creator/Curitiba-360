# 🎨 Design System & Tokens Visuais — Curitiba 360

Este documento reúne a padronização visual da plataforma **Curitiba 360**, especificando paletas de cores, tipografia, espaçamentos, regras de ícones e comportamentos de componentes reutilizáveis para garantir unidade estética premium e consistência técnica.

---

## 🎨 1. Paleta de Cores e Tokens HSL

As cores foram selecionadas inspirando-se na identidade urbana de Curitiba (como os ônibus biarticulados vermelhos, o verde da araucária e a arquitetura modernista).

```css
:root {
  /* Cores Principais */
  --primary-hue: 355;      /* Curitiba Red */
  --primary-saturation: 85%;
  --primary-lightness: 50%;
  --primary: hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness));
  --primary-hover: hsl(var(--primary-hue), var(--primary-saturation), 40%);
  
  --secondary-hue: 150;    /* Araucária Green */
  --secondary-saturation: 60%;
  --secondary-lightness: 35%;
  --secondary: hsl(var(--secondary-hue), var(--secondary-saturation), var(--secondary-lightness));

  /* Cores Neutras (Modo Escuro / Premium Dark por Padrão) */
  --bg-main: hsl(220, 15%, 8%);
  --bg-card: hsl(220, 15%, 13%);
  --bg-border: hsl(220, 12%, 20%);
  
  /* Tipografia */
  --text-main: hsl(0, 0%, 95%);
  --text-muted: hsl(220, 10%, 65%);
  
  /* Cores de Feedback */
  --success: hsl(140, 70%, 45%);
  --warning: hsl(35, 90%, 55%);
  --error: hsl(0, 85%, 55%);
}
```

---

## ✍️ 2. Tipografia e Escala de Fontes

A tipografia do projeto utiliza a família **Outfit** ou **Inter** via Google Fonts para uma leitura moderna e fluida.

* **Família de Fontes Principal**: `'Outfit', sans-serif;`
* **Escala Typográfica**:
  * `Heading 1 (h1)`: `2.25rem` / `36px` (Semibold, `font-weight: 600`)
  * `Heading 2 (h2)`: `1.75rem` / `28px` (Semibold, `font-weight: 600`)
  * `Heading 3 (h3)`: `1.25rem` / `20px` (Medium, `font-weight: 500`)
  * `Texto Geral (Body)`: `1rem` / `16px` (Regular, `font-weight: 400`)
  * `Legendas / Muted`: `0.875rem` / `14px` (Regular, `font-weight: 400`)

---

## 📐 3. Grid, Espaçamentos e Bordas

Seguindo o padrão de design moderno, os espaçamentos baseiam-se em múltiplos de **4px** (escala de 8pt):

* **Padding / Margem Geral**:
  * `space-xs`: `0.25rem` / `4px`
  * `space-sm`: `0.5rem` / `8px`
  * `space-md`: `1rem` / `16px`
  * `space-lg`: `1.5rem` / `24px`
  * `space-xl`: `2rem` / `32px`
* **Arredondamento de Bordas (Border Radius)**:
  * `radius-sm`: `6px` (Inputs, Badges)
  * `radius-md`: `12px` (Cards, Botões Grandes, Modais)
  * `radius-lg`: `20px` (Banners, Carrosséis principais)

---

## 🏷️ 4. Diretrizes de Componentes Comuns

### A. Botões (Buttons)
* **Primary**: Fundo preenchido com `--primary`, texto em branco, efeito hover de transição suave (`transition: background 0.2s ease`).
* **Secondary**: Borda fina de `1px` em `--bg-border`, fundo transparente, ícone ao lado do texto.
* **Loading state**: Adiciona classe `.is-loading`, substitui o texto por um spinner circular giratório e desabilita cliques.

### B. Cards de Item (Product/Event Cards)
* **Glassmorphism**: Fundo `--bg-card` com transparência suave e desfoque (`backdrop-filter: blur(8px)`).
* **Hover Interaction**: Elevação suave da sombra e leve subida no eixo Y (`transform: translateY(-4px)`).
* **Imagens**: Proporção de tela `16:9` com cantos superiores arredondados e efeito `zoom` sutil ao focar.

### C. Campos de Entrada (Form Inputs)
* **Foco**: Borda ganha destaque com cor `--primary` e um leve `box-shadow` externo brilhante.
* **Erro**: Borda em `--error` e texto de ajuda abaixo em vermelho (`fontSize: 12px`).
* **Mostrar/Ocultar Senha**: Botão de olho (`Eye` / `EyeOff`) posicionado na lateral direita dentro do input.

---

## 🎯 5. Biblioteca de Ícones Mapeados (Lucide React)

Para garantir consistência sem inflar o bundle final do projeto, mapeamos os ícones para cada representação visual:

* 🎫 **Ticket** (`Ticket`): Ingressos, bilhetes digitais e lotes.
* 📍 **MapPin** (`MapPin`): Localização de eventos, pontos turísticos e roteiros.
* 🍽 **Utensils** (`Utensils`): Gastronomia e restaurantes.
* 🏨 **Hotel** (`Hotel`): Hospedagem e hotéis cadastrados.
* 🛍 **ShoppingBag** (`ShoppingBag`): Marketplace e produtos comerciais.
* 💳 **CreditCard** (`CreditCard`): Carteira digital, PIX e cartões cadastrados.
* 🎁 **Gift** (`Gift`): Benefícios, cashback e clube.
* ❤️ **Heart** (`Heart`): Favoritos e curtidas.
* 🔔 **Bell** (`Bell`): Notificações e alertas da prefeitura.
* 👤 **User** (`User`): Conta, perfil do usuário e segurança.
* 🔍 **Search** (`Search`): Campo de busca global e busca preditiva.
