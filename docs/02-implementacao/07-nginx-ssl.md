# Passo 7 — Nginx (proxy reverso) + SSL

> Ordem de implementação: **7 de 9**. Próximo: [08-verificacao](08-verificacao.md).

Objetivo: expor o site nas portas 80/443, encaminhar para o app Node (porta 3000) e emitir certificado SSL.

> No AlmaLinux os sites do Nginx ficam em `/etc/nginx/conf.d/*.conf` (o `nginx.conf` já inclui essa pasta).

## 7.1. Criar o arquivo de configuração do site

```sh
nano /etc/nginx/conf.d/fono-project.conf
```

Conteúdo:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name fonobiancacavalcante.com.br www.fonobiancacavalcante.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> O Certbot (próximo passo) adicionará o bloco `443 ssl` e o redirect HTTP→HTTPS automaticamente.

## 7.2. Testar, habilitar e recarregar o Nginx

```sh
nginx -t
systemctl enable --now nginx
systemctl reload nginx
```

`nginx -t` deve responder `syntax is ok` / `test is successful`.

> Teste rápido antes do SSL: `curl -I http://fonobiancacavalcante.com.br` — deve responder 200.

## 7.3. Emitir o certificado SSL (Certbot)

```sh
dnf install -y epel-release
dnf install -y certbot python3-certbot-nginx
certbot --nginx -d fonobiancacavalcante.com.br -d www.fonobiancacavalcante.com.br \
  --non-interactive --agree-tos -m SEU_EMAIL --redirect
```

> Sem `--non-interactive`, o Certbot pergunta o e-mail, aceita os termos e oferece o redirect HTTP→HTTPS (escolha **redirect**).

## 7.4. Confirmar a renovação automática

No AlmaLinux a renovação usa um timer do systemd:

```sh
systemctl list-timers --all | grep certbot
systemctl is-enabled certbot-renew.timer   # deve retornar "enabled"
certbot renew --dry-run
```

---

Próximo passo: [08-verificacao](08-verificacao.md) — checklist final.