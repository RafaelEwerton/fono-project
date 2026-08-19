# Passo 4 — Instalação do servidor (Node, Nginx, PM2, firewall)

> Ordem de implementação: **4 de 9**. Próximo: [05-build-vps](05-build-vps.md).

Objetivo: preparar a VPS **AlmaLinux 8** (família RHEL) para rodar o app.

> Comandos executados como **root** via SSH:
> `ssh root@IP_DA_VPS`  (IP real: `172.245.185.27`)

## 4.1. Atualizar o sistema

```sh
dnf update -y
```

## 4.2. Instalar Node.js 22 LTS (via NodeSource)

```sh
dnf install -y git curl
curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
dnf install -y nodejs
```

Verificar:

```sh
node -v   # deve mostrar v22.x
npm -v    # deve mostrar 10.x
```

## 4.3. Instalar o Nginx

```sh
dnf install -y nginx
```

O Nginx do RHEL carrega os sites de `/etc/nginx/conf.d/*.conf` (não há `sites-available`). É lá que fica o config do site (passo 7).

## 4.4. Instalar o PM2 (global)

```sh
npm install -g pm2
```

Verificar:

```sh
pm2 -v
```

## 4.5. Configurar o firewall (firewalld)

No AlmaLinux o firewall padrão é o **firewalld** (não ufw). Se ainda não estiver instalado:

```sh
dnf install -y firewalld
systemctl enable --now firewalld
```

Liberar SSH, HTTP e HTTPS:

```sh
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

Verificar:

```sh
firewall-cmd --list-services
# esperado: ssh http https
```

> **SELinux:** verifique com `getsebool httpd_can_network_connect`. Se estiver **enforcing**, libere o proxy reverso do Nginx:
> `setsebool -P httpd_can_network_connect 1` (no nosso caso o SELinux está **disabled**).

## 4.6. Criar pasta da aplicação

```sh
mkdir -p /var/www/fono-project
```

---

Próximo passo: [05-build-vps](05-build-vps.md) — clonar, instalar dependências e buildar na VPS.