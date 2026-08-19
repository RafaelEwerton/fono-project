# Índice — Vault de Documentação do fono-project

Vault de documentação do projeto **fono-project** (landing page da Dra. Bianca Cavalcante, fonoaudióloga).

Objetivo: documentar a arquitetura e o passo a passo de **implementação** para subir o projeto na VPS com domínio próprio, usando Node.js (SSR) + PM2 + Nginx + SSL.

---

## Mapa de navegação

### 01 — Arquitetura

- [arquitetura-do-projeto](01-arquitetura/arquitetura-do-projeto.md) — Stack, fluxo de rede, por que o preset `node-server`.

### 02 — Implementação (build + deploy na VPS)

> Ordem de execução sugerida. Cada passo depende do anterior.

| # | Documento | O que cobre |
|---|-----------|-------------|
| 1 | [preparacao-repositorio](02-implementacao/01-preparacao-repositorio.md) | Commit do `package-lock.json`, regras do repositório (AGENTS.md) |
| 2 | [build-local](02-implementacao/02-build-local.md) | Build e teste no Windows antes de subir |
| 3 | [dns](02-implementacao/03-dns.md) | Apontamento do domínio (registro A) para o IP da VPS |
| 4 | [instalacao-servidor](02-implementacao/04-instalacao-servidor.md) | Node 22, Nginx, PM2 e firewall na VPS |
| 5 | [build-vps](02-implementacao/05-build-vps.md) | Clone, instalação de dependências e build na VPS |
| 6 | [execucao-pm2](02-implementacao/06-execucao-pm2.md) | Rodar o app com PM2 (persistência e reinício automático) |
| 7 | [nginx-ssl](02-implementacao/07-nginx-ssl.md) | Proxy reverso do Nginx + certificado SSL (certbot) |
| 8 | [verificacao](02-implementacao/08-verificacao.md) | Checklist final de validação do site no ar |
| 9 | [atualizacoes](02-implementacao/09-atualizacoes.md) | Fluxo de deploy de novas versões |

### 03 — Operação

- [troubleshooting](03-operacao/troubleshooting.md) — Erros comuns e soluções.
- [monitoramento](03-operacao/monitoramento.md) — Logs, reinício automático, backups.

### 04 — Referência

- [comandos-essenciais](04-referencia/comandos-essenciais.md) — Tabela-atalho com todos os comandos.
- [decisoes-de-arquitetura](04-referencia/decisoes-de-arquitetura.md) — Decisões tomadas e alternativas descartadas.

---

## Resumo rápido

| Item | Valor |
|------|-------|
| Repositório | https://github.com/RafaelEwerton/fono-project.git |
| Branch | `main` |
| Stack | TanStack Start (React 19 + Vite 8) + Nitro (SSR) |
| Build de produção | `NITRO_PRESET=node-server npm run build` |
| Artefato | `.output/server/index.mjs` |
| Porta do app | 3000 (interna, atrás do Nginx) |
| Servidor | AlmaLinux 8 VPS (172.245.185.27) |
| Front | Nginx (proxy reverso) + Certbot (SSL) |
| Process manager | PM2 |
| Domínio | fonobiancacavalcante.com.br (Registro.br) |

> Nota: a VPS roda **AlmaLinux 8** (família RHEL) — os passos usam `dnf`, `firewalld` e `/etc/nginx/conf.d/`. O passo a passo detalhado está nos arquivos de implementação.

---

## Status do deploy (realizado em 2026-08-18)

| Item | Estado |
|------|--------|
| Domínio | https://fonobiancacavalcante.com.br (e www) — **no ar** |
| HTTPS | Certificado Let's Encrypt válido, renovação automática via `certbot-renew.timer` |
| HTTP→HTTPS | Redirect 301 configurado |
| App | PM2 `fono-project` online (`/var/www/fono-project/.output/server/index.mjs`) |
| Boot automático | `pm2 startup` + `pm2 save` configurados |
| Firewall | firewalld liberando ssh/http/https |
| Versões | Node v22.23.2, Nginx 1.14, PM2 7.0.3, certbot 1.22.0 |
