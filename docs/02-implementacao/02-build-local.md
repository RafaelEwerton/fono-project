# Passo 2 — Build local (teste no Windows)

> Ordem de implementação: **2 de 9**. Próximo: [03-dns](03-dns.md).

Objetivo: validar o build de produção **antes** de mexer na VPS. Roda na máquina Windows (PowerShell).

## 2.1. Pré-requisitos locais

- Node.js 22+ e npm instalados (ambiente atual: Node v22.21.1 / npm 10.9.4).
- Dependências instaladas: `node_modules` já presente.

## 2.2. Comando de build

No PowerShell, dentro da pasta do projeto:

```powershell
# Definir o preset do Nitro para Node.js (válido apenas para esta sessão)
$env:NITRO_PRESET = "node-server"

# Build de produção
npm run build
```

Se as dependências ainda não estiverem instaladas:

```powershell
npm ci
$env:NITRO_PRESET = "node-server"
npm run build
```

> **Importante:** o preset padrão do projeto é `cloudflare-module` (para Cloudflare Workers). Sem a variável `NITRO_PRESET=node-server`, o build geraria um artefato que **não** roda num servidor Node comum. Use sempre essa variável no build de produção para a VPS.

## 2.3. O que o build gera

- Pasta `.output/` com:
  - `server/index.mjs` — servidor SSR (entry).
  - `public/` — assets estáticos (HTML, JS, CSS, imagens).
  - `nitro.json` — metadados (deve indicar `preset: node-server`).

## 2.4. Testar o servidor localmente

```powershell
node .output/server/index.mjs
```

O app sobe na porta **3000** (padrão do Nitro). Abra no navegador:

```
http://localhost:3000
```

Espere ver a landing page da Dra. Bianca. Para parar: `Ctrl + C`.

Para trocar a porta (opcional):

```powershell
$env:PORT = "3000"
node .output/server/index.mjs
```

## 2.5. Estruturas de saída esperadas

O `.output` deve conter o servidor autossuficiente. Se abriu o `.output/nitro.json`, o campo `preset` precisa ser `"node-server"` — se aparecer `cloudflare-module`, o build foi feito sem a variável de ambiente.

---

Com o build local validado, siga para o próximo passo: [03-dns](03-dns.md) — apontar o domínio.