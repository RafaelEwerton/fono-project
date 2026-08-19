# Passo 9 — Deploy de atualizações

> Ordem de implementação: **9 de 9**. Início do ciclo de manutenção.

Objetivo: fluxo para subir novas versões do site na VPS com segurança.

## 9.1. Fluxo completo

Na **máquina local** (quando fizer alterações na Lovable ou localmente):

```sh
git pull origin main     # se veio da Lovable
git add -A
git commit -m "descrição da mudança"
git push origin main
```

Na **VPS**:

```sh
cd /var/www/fono-project

# 1. Baixar a nova versão
git pull origin main

# 2. Instalar dependências (se mudaram)
npm ci

# 3. Rebuild de produção
NITRO_PRESET=node-server npm run build

# 4. Reload zero-downtime
pm2 reload fono-project
```

## 9.2. Resumo do passo a passo

```sh
cd /var/www/fono-project
git pull origin main
npm ci
NITRO_PRESET=node-server npm run build
pm2 reload fono-project
```

> `pm2 reload` (diferente de `restart`) recarrega sem derrubar as conexões ativas.

## 9.3. Boas práticas

- Faça deploy em horários de baixo tráfego.
- Antes de subir para produção, valide o build localmente ([passo 2](02-build-local.md)).
- Mantenha `package-lock.json` sempre commitado (o `npm ci` depende dele).
- Após o deploy, rode o [checklist de verificação](08-verificacao.md) rapidamente (pelo menos `curl -I`).

## 9.4. Rollback (se necessário)

O Git permite voltar a qualquer versão anterior:

```sh
cd /var/www/fono-project
git log --oneline -5
git checkout <hash-do-commit-anterior> -- .
npm ci
NITRO_PRESET=node-server npm run build
pm2 reload fono-project
```

---

Referência rápida: [comandos essenciais](../04-referencia/comandos-essenciais.md) · [troubleshooting](../03-operacao/troubleshooting.md).