# Passo 3 — DNS: apontar o domínio para a VPS

> Ordem de implementação: **3 de 9**. Próximo: [04-instalacao-servidor](04-instalacao-servidor.md).

Objetivo: fazer o domínio apontar para o **IP público** da VPS via registro **A**.

## 3.1. O que é necessário

- **IP público da VPS** (ex.: `203.0.113.25`) — disponível no painel do provedor.
- **Domínio registrado** (ex.: `meudominio.com.br`) e acesso ao painel de DNS do registrador (ou do serviço que hospeda o DNS, ex.: Cloudflare, Hostinger, Registro.br, GoDaddy).

## 3.2. Registros a criar

No painel de DNS, crie **dois registros do tipo A**:

| Tipo | Nome/Host | Valor | TTL |
|------|-----------|-------|-----|
| A | `@` (raiz) | `<IP_DA_VPS>` | 3600 |
| A | `www` | `<IP_DA_VPS>` | 3600 |

- O registro `@` garante que `https://meudominio.com.br` funcione.
- O registro `www` garante que `https://www.meudominio.com.br` funcione (usaremos redirect no Nginx).

> Se o seu painel exige "registro ANAME/ALIAS" ou CNAME para a raiz, siga as instruções do provedor. Para IP fixo da VPS, **A record** é o correto.

## 3.3. Verificar a propagação

Após salvar, aguarde alguns minutos (pode levar até 24h, mas normalmente é rápido). Verifique de qualquer máquina:

```sh
nslookup meudominio.com.br
nslookup www.meudominio.com.br
```

Ou use `ping`:

```sh
ping meudominio.com.br
```

O IP retornado deve ser o mesmo da VPS.

> Ferramentas online úteis: `dnschecker.org` (verifica de vários países) e o site do próprio registrador.

## 3.4. Atenção

- **Nenhum serviço precisa estar rodando ainda.** O Nginx (próximos passos) é quem vai responder na porta 80/443 quando o domínio bater na VPS.
- Enquanto o DNS não propaga, você pode testar o app direto pelo IP: `http://<IP_DA_VPS>:3000` (desde que a porta esteja liberada no firewall — ver passo 4/9).

---

Próximo passo: [04-instalacao-servidor](04-instalacao-servidor.md) — instalar Node, Nginx, PM2 e firewall na VPS.