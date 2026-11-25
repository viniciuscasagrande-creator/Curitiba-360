# Curitiba 360 — Backoffice fiel aos wireframes

Projeto React + Vite criado a partir do arquivo `wfback.zip`.

## Conteúdo

- 71 referências visuais oficiais.
- Tela de login em `/login`.
- Dashboard em `/dashboard`.
- Galeria completa em `/telas`.
- Uma rota individual para cada wireframe.
- Sem emojis.
- Ícones de interface com Lucide React.
- Configuração pronta para Vercel.

## Executar

```bash
npm install
npm run dev
```

## Publicar na Vercel

```bash
npx vercel --prod
```

## Como integrar ao projeto Curitiba360 existente

1. Copie `public/wireframes` para o projeto atual.
2. Copie `src/data/screens.js`.
3. Copie os componentes `Gallery.jsx` e `ScreenViewer.jsx`.
4. Adicione as rotas de `App.jsx`.
5. Mantenha `/login` como rota inicial.
6. Substitua gradualmente cada imagem por componentes React funcionais, preservando o wireframe como referência visual.

## Observação

Esta entrega é uma base de ajuste visual fiel. As imagens não foram redesenhadas, cortadas ou substituídas.
