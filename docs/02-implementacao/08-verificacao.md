# Passo 8 — Verificação final

> Ordem de implementação: **8 de 9**. Próximo: [09-atualizacoes](09-atualizacoes.md).

Objetivo: validar que o site está no ar, com HTTPS, domínio e redirects corretos.

## 8.1. Checklist

| # | Verificação | Como testar |
|---|-------------|-------------|
| 1 | App rodando | `pm2 status` → `fono-project` **online** |
| 2 | App responde local | `curl -I http://localhost:3000` → `200 OK` |
| 3 | Nginx ativo | `sudo systemctl status nginx` → active (running) |
| 4 | Site no domínio | Abrir `https://meudominio.com.br` no navegador |
| 5 | HTTPS válido | Cadeado verde / sem aviso de certificado |
| 6 | Redirect www | Abrir `https://www.meudominio.com.br` → deve cair na raiz |
| 7 | Redirect HTTP→HTTPS | Abrir `http://meudominio.com.br` → deve redirecionar para `https://` |
| 8 | SSL renovável | `sudo certbot renew --dry-run` sem erros |
| 9 | Conteúdo correto | Landing da Dra. Bianca com fotos, FAQ, depoimentos, WhatsApp |
| 10 | Formulário | Enviar mensagem → mensagem de sucesso local |

## 8.2. Testes de linha de comando

```sh
# Resposta do domínio
curl -I https://meudominio.com.br

# Verificar o redirect www
curl -IL https://www.meudominio.com.br

# Verificar certificado
echo | openssl s_client -connect meudominio.com.br:443 2>/dev/null | openssl x509 -noout -dates
```

## 8.3. Se algo falhar

- **502 Bad Gateway** → app não está rodando ou caiu. Veja `pm2 status` e `pm2 logs fono-project`. Ver [troubleshooting](../03-operacao/troubleshooting.md).
- **Certificado inválido** → reemita: `sudo certbot --nginx -d meudominio.com.br -d www.meudominio.com.br`.
- **Site não abre** → DNS ainda não propagou (passo 3) ou firewall bloqueando (passo 4).

---

Próximo passo: [09-atualizacoes](09-atualizacoes.md) — como fazer deploy de novas versões.