# Troubleshooting

Erros e problemas comuns no deploy e operação do fono-project.

## 1. Build gera preset `cloudflare-module` em vez de `node-server`

**Sintoma:** `.output/nitro.json` mostra `"preset": "cloudflare-module"`.

**Causa:** o build foi executado sem a variável `NITRO_PRESET=node-server`.

**Solução:**

```sh
NITRO_PRESET=node-server npm run build
cat .output/nitro.json | grep preset   # deve mostrar "node-server"
```

No PowerShell local:

```powershell
$env:NITRO_PRESET = "node-server"
npm run build
```

## 2. `npm ci` falha na VPS

**Sintoma:** erro tipo "The lockfile isn't up to date" ou "package-lock.json not found".

**Causa:** `package-lock.json` não commitado no GitHub.

**Solução:** rodar na máquina local o [passo 1](../02-implementacao/01-preparacao-repositorio.md) e refazer o pull na VPS.

## 3. Erro 502 Bad Gateway

**Sintoma:** o Nginx responde 502 no domínio.

**Causas possíveis:**

- App Node parado/crashou → verifique: `pm2 status` e `pm2 logs fono-project`.
- App na porta errada → o Nginx faz proxy para `127.0.0.1:3000`; confirme que o app usa essa porta (padrão do Nitro).
- Proxy target desligado → teste manual: `curl -I http://localhost:3000`.

**Solução:** reinicie o app:

```sh
pm2 restart fono-project
pm2 logs fono-project
```

Se o app não sobe, rode manualmente para ver o erro:

```sh
node .output/server/index.mjs
```

## 4. Porta 3000 já em uso

**Sintoma:** `EADDRINUSE` nos logs do PM2.

**Solução:** identificar e parar o processo, ou mudar a porta:

```sh
sudo lsof -i :3000
pm2 kill
pm2 start .output/server/index.mjs --name fono-project
```

## 5. DNS não propaga

**Sintoma:** `ping meudominio.com.br` não retorna o IP da VPS, ou o site não abre mesmo com tudo rodando.

**Solução:**
- Confira os registros A (passo 3).
- Aguarde a propagação (TTL de 3600s = até 1h, mas pode ser mais).
- Teste com `nslookup`/`dnschecker.org`.
- Se estava funcionando e parou, verifique se o IP da VPS mudou.

## 6. Certificado SSL inválido / vencido

**Sintoma:** aviso de certificado no navegador.

**Solução:**

```sh
sudo certbot renew
sudo systemctl reload nginx
```

Se o domínio mudou ou o certificado não existe:

```sh
sudo certbot --nginx -d meudominio.com.br -d www.meudominio.com.br
```

## 7. Firewall bloqueando acesso

**Sintoma:** site não abre, mas tudo roda na VPS (`curl localhost` funciona).

**Solução:** liberar as portas no firewalld (AlmaLinux):

```sh
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
firewall-cmd --list-services
```

## 8. PM2 não sobe no reboot

**Sintoma:** após reiniciar a VPS, `pm2 status` vazio.

**Solução:** reconfigurar o startup:

```sh
pm2 startup
# executar o comando sugerido
pm2 save
```

## 9. Nginx servindo página padrão

**Sintoma:** acessa o domínio e cai na página padrão do Nginx (Welcome to nginx) ou em outro site.

**Solução:** no AlmaLinux, remova/ajuste o config conflitante em `/etc/nginx/conf.d/` e valide:

```sh
nginx -t
systemctl reload nginx
```

Verifique também se o bloco `server` tem o `server_name` correto e o proxy para `127.0.0.1:3000`.

## 10. Conteúdo desatualizado no ar

**Sintoma:** o site não reflete as últimas alterações do repositório.

**Solução:** seguir o [fluxo de atualizações](../02-implementacao/09-atualizacoes.md) completo (pull → npm ci → build → pm2 reload).

---

Documentos relacionados: [comandos essenciais](../04-referencia/comandos-essenciais.md) · [monitoramento](monitoramento.md) · [verificação](../02-implementacao/08-verificacao.md).