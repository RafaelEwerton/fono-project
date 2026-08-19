# Passo 5 — Build na VPS

> Ordem de implementação: **5 de 9**. Próximo: [06-execucao-pm2](06-execucao-pm2.md).

Objetivo: clonar o repositório na VPS e gerar o build de produção com o preset `node-server`.

## 5.1. Clonar o repositório

Na VPS:

```sh
cd /var/www/fono-project
git clone https://github.com/RafaelEwerton/fono-project.git .
```

> Se preferir SSH: `git clone git@github.com:RafaelEwerton/fono-project.git .` (exige chave configurada na VPS/GitHub).

## 5.2. Instalar dependências

```sh
npm ci
```

> `npm ci` instala exatamente as versões do `package-lock.json`. Se falhar com erro de lockfile ausente, volte ao [passo 1](01-preparacao-repositorio.md).

## 5.3. Build de produção

```sh
NITRO_PRESET=node-server npm run build
```

Esperado ao final: geração da pasta `.output/` sem erros. Confirme o preset:

```sh
cat .output/nitro.json | grep preset
```

Saída esperada: `"preset": "node-server"`.

> Se aparecer `cloudflare-module`, o build não foi feito com a variável — refaça com `NITRO_PRESET=node-server`.

## 5.4. Teste manual (opcional, antes do PM2)

```sh
node .output/server/index.mjs
```

O app sobe na porta 3000. Teste de dentro da VPS:

```sh
curl -I http://localhost:3000
```

Espere um `HTTP/1.1 200 OK`. Interrompa com `Ctrl + C`.

---

Próximo passo: [06-execucao-pm2](06-execucao-pm2.md) — rodar o app com PM2.