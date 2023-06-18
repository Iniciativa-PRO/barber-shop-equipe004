## Servidor da aplicação Barber Shop | em TypeScript

### Execurar com Docker Compose
```bash
$ docker compose up
```

### Pré requisitos para rodar o servidor. 👁️‍🗨️

- NodeJs instalado, foi desenvolvido com a v19.7.0;
- Um Banco de dados MySQL, local ou remoto.

## Executar

Para clonar e executar este projeto, você precisará do [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) e [npm](https://npmjs.com)) instalados em seu computador. Na sua linha de comando:

```bash
# Clone este Repositório
$ git clone https://github.com/HelenoSalgado/Barber-Shop-Server.git

# Entre no Repositório
$ cd Barber-Shop-Server/

# Instale as depêndencias
$ npm install

# Inicie o banco de dados
$ npx prisma migrate

# Pré popule o banco de dados
$ npx prisma db seed

# Execute testes
$ npm test

# Compile
$ npm run build

# Execute
$ npm run start
```
**Obs**: É preciso configurar o arquivo ".env" com os dados de acesso do banco de dados.
## Rotas

Aqui estão os modelos de requisição:
[REQUEST](./REQUEST.md);

### Módulos e tecnologias utilizadas: 📦

```
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.0",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/node": "^18.15.11",
    "@types/nodemailer": "^6.4.7",
    "@types/supertest": "^2.0.12",
    "jest": "^29.5.0",
    "prisma": "^4.12.0",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.4"
  },
  "dependencies": {
    "@prisma/client": "^4.12.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "nodemailer": "^6.9.1",
    "short-unique-id": "^4.4.4",
    "tsup": "^6.7.0",
    "tsx": "^3.12.5",
    "zod": "^3.21.4"
  },
  ```

## Funcionalidades da API REST

### No que se refere ao cliente 🧔🏽

+ Agendamento de serviço;
+ O cliente poderá agendar mais de um serviço [];
+ O cliente será redirecionado ao seu perfil automáticamente no primeiro agendamento;
+ Ele poderá criar um conta sem agendamento;
+ Ele poderá excluir um ou mais serviços;
+ Ele poderá cancelar o agendamento;
+ Ele poderá atualizar seus dados, com exeção do email;
+ E por fim, obviamente, ele poderá excluir seu perfil.

### No que se refere ao profissional ✂️

+ Ele terá uma área administrativa;
+ Poderá cadastrar, atualizar ou deletar serviços;
+ Poderá resgatar usuários do sistema;
+ Poderá ver quantos serviços estão agendados;
+ Poderá bucar agendamentos em datas específicas.
