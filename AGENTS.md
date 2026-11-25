# REGRAS OFICIAIS DO PROJETO CURITIBA 360° (ALWAYS-ON)

## 1. Domínios Oficiais de Produção (Vercel) — Obrigatório Manter Sempre Sincronizados
Toda atualização realizada no sistema **Curitiba 360°** (`E:\Projetos Vs Code\360`) **DEVE** ser publicada e mantida sincronizada nos **2 links oficiais de produção**:

1. **https://curitiba360-unificado.vercel.app/**
2. **https://curitiba360-app.vercel.app/**

### Procedimento Obrigatório de Deploy e Sincronização
Sempre que finalizar qualquer alteração ou evolução no projeto:
1. **Commit e Push nos Repositórios GitHub:**
   ```powershell
   git add -A
   git commit -m "<mensagem>"
   git push origin main
   git push curitiba360-main main:main --force
   git push projetos-cwb main:main --force
   ```
2. **Deploy na Vercel e Alias Oficial para os Dois Links:**
   Executar dentro de `E:\Projetos Vs Code\360\frontend`:
   ```powershell
   npx vercel --prod --yes
   npx vercel alias set <url-do-deployment-gerado> curitiba360-unificado.vercel.app
   npx vercel alias set <url-do-deployment-gerado> curitiba360-app.vercel.app
   ```

## 2. Identidade Visual e Assinatura Oficial
- **Logos Oficiais:** Utilizar sempre as logos oficiais do Curitiba 360° (`/logos/official_emblem_logo.png` e `/logos/official_curitiba360_horizontal.png`).
- **Assinatura no Rodapé:** Manter em todos os rodapés (Portal Público, Backoffice e 71 Telas):
  `Desenvolvedor: VINICIUS CASAGRANDE — Programador • CEO MBA System of America`
