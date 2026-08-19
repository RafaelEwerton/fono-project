# Passo 1 — Preparação do repositório

> Ordem de implementação: **1 de 9**. Próximo: [02-build-local](02-build-local.md).

Objetivo: deixar o repositório pronto para ser clonado e buildado na VPS.

## 1.1. Situação atual

- O projeto usa **`package-lock.json`** (npm) e **`bun.lock`** (bun). Na VPS usaremos **npm**, portanto o `package-lock.json` precisa estar versionado.
- Hoje o `package-lock.json` ainda **não está commitado** (`?? package-lock.json` no git status).
- Sem esse arquivo no Git, o `npm ci` na VPS falha (o `npm ci` exige lockfile).

## 1.2. Regras do repositório (AGENTS.md)

O repositório está conectado à **Lovable**. Regras obrigatórias:

- **NÃO** reescrever histórico publicado: sem `--force`, `--amend` ou `rebase/squash` de commits já enviados.
- Manter a branch `main` sempre em estado funcional (commits vão sincronizar de volta para a Lovable).

## 1.3. Passos

Na máquina local, na pasta do projeto:

```sh
# 1. Conferir o estado
git status

# 2. Adicionar o package-lock.json
git add package-lock.json

# 3. Commit com mensagem clara
git commit -m "Add package-lock.json for npm ci on deployment"

# 4. Enviar para o GitHub
git push origin main
```

> Nota: `src/routeTree.gen.ts` pode aparecer modificado (é um arquivo gerado pelo plugin do TanStack Router). É normal; não precisa commitar se não fizer parte da sua alteração intencional, mas o `npm run build` o regenera automaticamente.

## 1.4. Verificação

Após o push, confirme no GitHub que o arquivo `package-lock.json` aparece na raiz do repositório (https://github.com/RafaelEwerton/fono-project).

---

Próximo passo: [02-build-local](02-build-local.md) — testar o build localmente antes de subir.