# Sistema de Gerenciamento de Biblioteca

- **Interface de frontend** construída com *React* e *TailwindCSS*.
- **API de backend** construída com *Node.js (AdonisJS)*.

### Execução

1. No diretório raiz do projeto, execute o seguinte comando para construir e iniciar os containers:

```bash
docker-compose up --build
```

   O Docker Compose iniciará:
   - **Interface de Frontend**: Disponível em `http://localhost`
   - **API de Backend**: Disponível em `http://localhost:3333`
   - **PostgreSQL**: Rodando na porta `5432`

>[!Note]
>Na primeira vez que você rodar o sistema, você deve rodar o seguinte comando para executar as migrações e popular o banco de dados com dados fictícios (seed):

```bash
docker-compose exec -it library_api node ace migration:fresh --seed
```

2. Para parar os containers, pressione `Ctrl + C` e execute:

```bash
docker-compose down
```
