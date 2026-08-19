# Monitoramento

Rotinas de operação para manter o site saudável.

## 1. Logs do aplicativo

O PM2 coleta os logs do app em tempo real:

```sh
pm2 logs fono-project            # seguir logs ao vivo
pm2 logs fono-project --lines 50 # últimas 50 linhas
```

Arquivos de log do PM2 ficam em `~/.pm2/logs/`:

```sh
ls ~/.pm2/logs/
```

## 2. Status do processo

```sh
pm2 status
pm2 describe fono-project
```

Verifique: status **online**, restart count baixo (muitos restarts indicam crash loop), uso de memória/CPU.

## 3. Nginx

```sh
sudo systemctl status nginx
sudo nginx -t                     # validar config
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 4. Reinício automático (já configurado)

- **PM2** reinicia o processo após crash (configurado no [passo 6](../02-implementacao/06-execucao-pm2.md)).
- **PM2 startup** sobe o app junto com o reboot da VPS.
- **Certbot timer** renova o SSL automaticamente — confirme:

```sh
sudo systemctl status certbot.timer
```

## 5. Verificação de rotina (ex.: semanal)

```sh
# App e portas
pm2 status
curl -I http://localhost:3000

# Página pública
curl -I https://meudominio.com.br

# Disco
df -h

# Memória
free -h
```

## 6. Backup

O app é uma landing page sem banco de dados. O que vale preservar:

- O repositório (já versionado no GitHub).
- O `.output/` pode ser regenerado com o build (não precisa de backup).
- Configurações do servidor: `sudo cp -r /etc/nginx/conf.d /root/backup-nginx/`.

Para backups automáticos do repositório, o Git/GitHub já cumpre esse papel — basta manter `main` atualizada.

## 7. Alerta de indisponibilidade (opcional)

Ferramentas simples de uptime monitoring externo: UptimeRobot, Better Uptime, Pingdom — todas têm plano grátis e avisam por e-mail quando `https://meudominio.com.br` ficar fora do ar.

---

Documentos relacionados: [troubleshooting](troubleshooting.md) · [comandos essenciais](../04-referencia/comandos-essenciais.md).