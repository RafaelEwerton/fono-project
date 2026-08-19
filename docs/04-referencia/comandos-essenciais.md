# Comandos Essenciais

Atalho para os comandos mais usados. Substitua `meudominio.com.br` e `IP_DA_VPS`.

> Ambiente real: VPS **AlmaLinux 8** (`172.245.185.27`), domínio `fonobiancacavalcante.com.br`.

## Local (Windows / PowerShell)

| Ação | Comando |
|------|---------|
| Instalar dependências | `npm ci` |
| Build de produção (VPS) | `$env:NITRO_PRESET = "node-server"; npm run build` |
| Rodar servidor | `node .output/server/index.mjs` |
| Rodar dev | `npm run dev` |

## VPS (AlmaLinux/RHEL, shell)

| Ação | Comando |
|------|---------|
| Atualizar sistema | `dnf update -y` |
| Instalar Node 22 | `curl -fsSL https://rpm.nodesource.com/setup_22.x \| bash - && dnf install -y nodejs` |
| Instalar Nginx | `dnf install -y nginx` |
| Instalar PM2 | `npm install -g pm2` |
| Firewall (firewalld) | `dnf install -y firewalld && systemctl enable --now firewalld` |
| Liberar portas | `firewall-cmd --permanent --add-service=ssh; firewall-cmd --permanent --add-service=http; firewall-cmd --permanent --add-service=https; firewall-cmd --reload` |
| Clonar repo | `cd /var/www/fono-project && git clone https://github.com/RafaelEwerton/fono-project.git .` |
| Instalar deps | `npm install` (ou `npm ci` se houver lockfile commitado) |
| Build | `NITRO_PRESET=node-server npm run build` |
| Iniciar app | `pm2 start .output/server/index.mjs --name fono-project` |
| Persistir PM2 | `pm2 save && pm2 startup` |
| Ver status | `pm2 status` / `pm2 logs fono-project` |
| Reload | `pm2 reload fono-project` |
| Testar local | `curl -I http://localhost:3000` |

## Nginx + SSL

| Ação | Comando |
|------|---------|
| Criar config | `nano /etc/nginx/conf.d/fono-project.conf` |
| Testar config | `nginx -t` |
| Habilitar/recarregar | `systemctl enable --now nginx && systemctl reload nginx` |
| Instalar Certbot | `dnf install -y epel-release && dnf install -y certbot python3-certbot-nginx` |
| Emitir SSL | `certbot --nginx -d fonobiancacavalcante.com.br -d www.fonobiancacavalcante.com.br --non-interactive --agree-tos -m SEU_EMAIL --redirect` |
| Renovação dry-run | `certbot renew --dry-run` |
| Timer de renovação | `systemctl is-enabled certbot-renew.timer` |

## Deploy de atualização (VPS)

```sh
cd /var/www/fono-project
git pull origin main
npm install
NITRO_PRESET=node-server npm run build
pm2 reload fono-project
```

## Verificação

| Ação | Comando |
|------|---------|
| Site público | `curl -I https://fonobiancacavalcante.com.br` |
| Certificado | `echo \| openssl s_client -connect fonobiancacavalcante.com.br:443 2>/dev/null \| openssl x509 -noout -dates` |
| DNS | `nslookup fonobiancacavalcante.com.br` |
| App local na VPS | `curl -I http://localhost:3000` |

---

Documentos relacionados: [decisões de arquitetura](decisoes-de-arquitetura.md) · [troubleshooting](../03-operacao/troubleshooting.md).