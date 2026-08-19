# Arquitetura do Projeto

## Visão geral

O `fono-project` é uma landing page institucional da clínica de fonoaudiologia da **Dra. Bianca Cavalcante** (João Pessoa/PB). É uma página única de apresentação: hero, sobre, serviços, FAQ, depoimentos, blog (visual), contato e rodapé. **Não possui backend, banco de dados, login nem sistema de agendamento.**

O formulário de contato é 100% client-side: ao enviar, apenas exibe uma mensagem de sucesso local. A integração real de captação é via link de WhatsApp.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | TanStack Start (`@tanstack/react-start`) |
| UI | React 19 |
| Build | Vite 8 |
| Renderização | SSR (Server-Side Rendering) via Nitro |
| Server runtime | Node.js |
| Estilo | Tailwind CSS 4 + shadcn/ui |
| Roteamento | TanStack Router |
| Dados cliente | TanStack Query |
| Gerenciador de pacotes | npm (`package-lock.json`) / bun (`bun.lock`) |

## Estrutura relevante do projeto

```
fono-project/
├── src/
│   ├── server.ts            ← entry SSR (wraps @tanstack/react-start/server-entry)
│   ├── start.ts             ← criação do createStart + middlewares (CSRF)
│   ├── router.tsx           ← criação do router do TanStack
│   ├── routes/
│   │   ├── __root.tsx       ← layout raiz (head, meta, fonts)
│   │   └── index.tsx        ← página única da landing
│   ├── components/          ← componentes UI (shadcn)
│   └── lib/                 ← utilitários
├── vite.config.ts           ← config Lovable (@lovable.dev/vite-tanstack-config)
├── package.json
├── .output/                 ← build de produção (gerado)
└── docs/                    ← este vault de documentação
```

## Como o build funciona

O `vite.config.ts` usa `@lovable.dev/vite-tanstack-config`. Esse pacote injeta o plugin do Nitro no comando `vite build` (produção), com preset padrão **`cloudflare-module`**.

Pontos-chave validados no código do pacote:

1. O preset é aplicado via `defaultPreset: "cloudflare-module"` — usado **somente** se o preset não for definido por outra via.
2. O Nitro resolve o preset na ordem: `preset` do config → env `NITRO_PRESET` → env `SERVER_PRESET` → `defaultPreset`.
3. As env vars `NITRO_PRESET`/`SERVER_PRESET` **só são ignoradas dentro do sandbox da Lovable**. Localmente (ou na VPS), elas são respeitadas.

→ Por isso, para rodar na VPS com Node.js, o build deve ser feito com:

```sh
NITRO_PRESET=node-server npm run build
```

O resultado é um servidor Node autossuficiente em `.output/`, executado com `node .output/server/index.mjs`.

## Fluxo de rede na VPS

```
                    Internet
                       │
                       ▼
                  DNS (A record)
                       │
                       ▼
            Nginx :80 / :443  (domínio + SSL via Certbot)
                       │ proxy_pass
                       ▼
       Node app (PM2) 127.0.0.1:3000
                       │
                       ▼
            .output/server/index.mjs (SSR)
```

- O **Nginx** é o único exposto ao mundo: responde nas portas 80 (HTTP) e 443 (HTTPS), termina o SSL e encaminha as requisições para o app Node.
- O **app Node** roda apenas em `127.0.0.1:3000` (não precisa ser público).
- O **PM2** mantém o processo vivo, reinicia após crash e sobe junto com o sistema.

## Decisões de arquitetura

- **Preset `node-server`** em vez de `cloudflare-module` → deploy em VPS com Node.
- **PM2 + Nginx** em vez de Docker → simplicidade para uma landing page sem dependências de infraestrutura.
- **Alternativas descartadas** estão em [decisões de arquitetura](../04-referencia/decisoes-de-arquitetura.md).

---

Próximo passo na implementação: [01-preparacao-repositorio](../02-implementacao/01-preparacao-repositorio.md).