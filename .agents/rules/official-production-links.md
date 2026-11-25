---
trigger: always_on
description: Regra oficial de deploy e sincronização obrigatória nos dois links oficiais https://curitiba360-unificado.vercel.app/ e https://curitiba360-app.vercel.app/
---

# Regra Oficial de Produção Curitiba 360°

Sempre que qualquer atualização for feita no projeto Curitiba 360°, os dois links oficiais abaixo devem receber o deploy e estar 100% sincronizados:
- https://curitiba360-unificado.vercel.app/
- https://curitiba360-app.vercel.app/

Comandos obrigatórios de publicação:
1. `git push origin main` e `git push curitiba360-main main:main --force` e `git push projetos-cwb main:main --force`
2. `cd frontend && npx vercel --prod --yes`
3. `npx vercel alias set <deployment-url> curitiba360-unificado.vercel.app`
4. `npx vercel alias set <deployment-url> curitiba360-app.vercel.app`
