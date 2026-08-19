# Decisões de Arquitetura

Registro das decisões técnicas e das alternativas avaliadas para o deploy do fono-project.

## ADR 1 — Rodar SSR Node na VPS (e não estático nem Cloudflare)

**Decisão:** build com `NITRO_PRESET=node-server` e execução via `node .output/server/index.mjs` com PM2.

**Contexto:** o projeto usa TanStack Start com SSR via Nitro. O preset padrão injetado pelo `@lovable.dev/vite-tanstack-config` é `cloudflare-module` (para Cloudflare Workers), que não roda num servidor comum. A VPS contratada roda **AlmaLinux 8** (família RHEL).

**Alternativas descartadas:**

| Alternativa | Por que foi descartada |
|-------------|------------------------|
| `cloudflare-module` (padrão) | Destinado a Cloudflare Workers; não roda em VPS Node. |
| Build estático (`NITRO_PRESET=static`) | Funcionaria (a landing não tem backend), mas perde o SSR e diverge da arquitetura do projeto. Mantido como plano B. |
| Docker | Desnecessário para uma landing page sem dependências de infra; PM2 + Nginx é mais simples de manter. |

**Consequências:** VPS precisa de Node.js; o processo é gerenciado pelo PM2; Nginx atua como proxy reverso e termina o SSL.

## ADR 2 — Nginx como proxy reverso (e não servir a porta do Node direto)

**Decisão:** expor apenas Nginx nas portas 80/443; o app Node escuta somente em `127.0.0.1:3000`.

**Motivos:** SSL centralizado via Certbot, cache de assets, proteção do app Node, fácil redirect www e HTTP→HTTPS.

## ADR 3 — PM2 como process manager

**Decisão:** PM2 gerencia o processo (restart em crash, logs, `pm2 startup` para subir no boot).

**Alternativa descartada:** systemd unit manual — mais verboso; PM2 já fornece o mesmo via `pm2 startup` e agrega logs/status.

## ADR 4 — npm como gerenciador na VPS (e não bun)

**Decisão:** usar `npm ci` na VPS.

**Contexto:** o projeto tem `bun.lock` (Lovable) e `package-lock.json`. O ambiente da VPS instala Node/npm por padrão; `npm ci` reproduz o build de forma determinística a partir do lockfile.

**Observação:** `package-lock.json` precisa estar commitado (ver passo 1). O `bun.lock` continua servindo ao fluxo da Lovable/bun local.

## ADR 5 — SSL via Certbot (Let's Encrypt)

**Decisão:** `certbot --nginx` emite e renova certificados automaticamente (timer do systemd).

**Alternativa descartada:** certificados manuais/comprados — custo e manutenção desnecessários; Let's Encrypt é grátis e renova automático.

---

Documentos relacionados: [arquitetura do projeto](../01-arquitetura/arquitetura-do-projeto.md) · [comandos essenciais](comandos-essenciais.md).