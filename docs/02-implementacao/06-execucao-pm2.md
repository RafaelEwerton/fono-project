# Passo 6 — Execução com PM2

> Ordem de implementação: **6 de 9**. Próximo: [07-nginx-ssl](07-nginx-ssl.md).

Objetivo: manter o app Node rodando em segundo plano, com reinício automático e subida junto com o sistema.

## 6.1. Iniciar o app com PM2

Na pasta do projeto (`/var/www/fono-project`):

```sh
pm2 start .output/server/index.mjs --name fono-project
```

Verificar o status:

```sh
pm2 status
```

Saída esperada: `fono-project` com status **online**, restart count 0.

## 6.2. Persistir a configuração

```sh
pm2 save
```

## 6.3. Subir junto com o sistema (reboot)

```sh
pm2 startup
```

O comando imprime um comando `sudo env PATH=... pm2 startup ...` — **execute o que ele sugerir** (o PM2 cria o serviço systemd). Exemplo do formato:

```sh
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u <usuario> --hp /home/<usuario>
```

Depois:

```sh
pm2 save
```

## 6.4. Porta

O app escuta na porta **3000** (padrão do Nitro). Para forçar outra porta:

```sh
PORT=3000 pm2 start .output/server/index.mjs --name fono-project
```

> A porta fica apenas local (`127.0.0.1:3000`). Ela nunca é exposta à internet — o Nginx faz o proxy (passo 7).

## 6.5. Comandos úteis do PM2

```sh
pm2 logs fono-project        # ver logs em tempo real
pm2 restart fono-project     # reiniciar
pm2 reload fono-project      # reload (zero downtime)
pm2 stop fono-project        # parar
pm2 delete fono-project      # remover da lista
pm2 startup                  # configurar boot automático
pm2 save                     # salvar processo na lista de boot
```

---

Próximo passo: [07-nginx-ssl](07-nginx-ssl.md) — proxy reverso + HTTPS.