# Barber Shop

Aqui você poderá obter informações de como a aplicação Barber Shop, → site empresarial de barbearia ← está sendo desenvolvida. Falaremos sobre o propósito, funcionalidades, e como executar.


### *O escritor espera pelo sopro de ideia que começará uma história*
(**Maurício Gomyde**)

Todo mundo espera coisas boas acontecerem, ás vezes esperamos muito. Como dizem, a esperança é a ultima que morre, mas esperar horas e horas no salão para fazer a barba ou cortar o cabelo, não é uma coisa muito interessante, é possível ser feliz como menos despesa. Foi pensando no bem estar do cliente e satisfação dos profissionais da Barber Shop que eleboramos um site com as seguintes funcionalidades:



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

## Como esse projeto está sendo desenvolvido? 🏁

Este projeto foi dividido em 04 etapas fundamentais:

* **Desenvolvimento de Banco de Dados | MySQL**;
* **Desenvolvimento do Backend | NodeJs**;
* **Desenvolvimento do Frontend | HTML, CSS**;
* **Integração do Frontend com o Backend | JavaScript**;

O projeto e as etapas foram devidamente documentadas no figma e no trello da [equipe004](https://trello.com/b/6cucpZSy/barber-shop-equipe-004).
## Falando especialmete sobre o banco de dados, é pertinente dizer que,
O relacionamento entre tabelas foi feito conforme esse [diagrama](https://trello.com/1/cards/63fa0bbd3e53a000d7332df4/attachments/63fa0bcc299f72dd4db06d4b/download/db.png), sendo a tabela **agendamento** hospedeira do id tanto do **serviço**, quanto do **usuário**.  Um acréscimo interessante que foi implementado, foi um relacionamento de muitos para muitos(mn) entre a entidade agendamento e usuário, isso possibilita que os dados de agendamento e serviços no perfil do usuário sejam resgatados numa só requisição, juntamente com os dados do usuário. 

**Veja como ficou:**

![](https://github.com/Iniciativa-PRO/barber-shop-equipe004/blob/main/assets/img-readme/Captura%20de%20tela%20de%202023-03-08%2012-03-12.png)

## O que já está pronto? 🕵🏾‍♀️

O Backend com nodeJs foi finalizado, já é possivel testar a API desenvolvida e verificar se as rotas fazem mesmo o que prometem, ele se encontra no diretório "**server**" dentro do repositório.

### Pré requisitos para rodar o servidor. 👁️‍🗨️

* NodeJs instalado, foi desenvolvido com a v19.7.0;
* Um Banco de dados MySQL, local ou remoto ( [dá para testar simplesmente com SQLite](https://www.prisma.io/docs/concepts/database-connectors/sqlite#:~:text=1-,datasource%20db%20%7B,%7D,-The%20fields%20passed) );
* O npm para dar aquele npm install no terminal pelo diretório "server";

### Módulos e tecnologias utilizadas: 📦

```
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.0.3",
    "@prisma/client": "^4.11.0",
    "bcryptjs": "^2.4.3",
    "superstruct": "^1.0.3"
    "is-email": "^1.0.2",
    "jsonwebtoken": "^9.0.0",
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "prisma": "^4.11.0"
  } 
  ```

### Falando rapidamente sobre cada uma, é o seguinte: 📝

1.  express: - express é biblioteca mais popular para rodar um servidor e servir as rotas através do NodeJs;
2.  dotenv: - utilizado para guardar as variáveis de ambiente com segurança, informações de acesso ao banco de dados, por exemplo;
3.  @prisma/client: - também é bastante popular e, principalmente, elegante, para criar modelos de tabelas e relacionamentos dentro do NodeJs, é o prisma que cria automaticamente o banco de dados, basta fornecer os dados de acesso;
4.  bcryptjs: - Gera senhas mais seguras a partir da senha fornecida pelo usário, e depois compara com a senha de login para ver se é a mesma.
5.  superstruct: - útil para validação de dados de entrada de todos os tipos;
6.  is-email: - valida especialmente o email;
7.  jsonwebtoken: - fornece token de acesso ao usário autenticado no sistema;
8.  nodemon: - dependencia de desenvolvimento - atualiza o servidor a cada auteração;
9.  prisma: - utilizado em conjunto com o @prisma/client; o prisma tem um visualizador de banco de dados próprio, o que é bem interessante.

Depois de instalar as dependências com *npm install*, e o schema.prisma configurado, os seguintes comandos devem ser executados: *npx prisma init*, *npx prisma migrate dev --name create* e *npx prisma studio*, respectivamente. E depois, abrindo um segundo terminal no vscode *npm run dev* para rodar o servidor. provavelente você terá que excluir a pasta **migrations** dentro da pasta **prisma**, se der algum erro.

*server/src/prisma/**schema.prisma***
```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
### Rotas da aplicação. 🔄

As rotas podem ser divididas em dois grupos; as publicas e as privadas. Começando pelas publicas temos:

**Publicas:**

+ ***BaseURL***/**servicos**
+ ***BaseURL***/**agendamento**/**criar**
+ ***BaseURL***/**usuario**/**criar**
+ ***BaseURL***/**usuario**/**login**

**Privadas:**
+ ***BaseURL***/**dashboard**/**agendamento**/**buscar**
+ ***BaseURL***/**dashboard**/**servico**/**buscar**
+ ***BaseURL***/**dashboard**/**servico**/**criar**
+ ***BaseURL***/**dashboard**/**servico**/**atualizar**
+ ***BaseURL***/**dashboard**/**servico**/**deletar**

As cinco rotas acima, **/dashboard/** são exclusivas do dono do negócio. Entre as rotas privadas abaixo estão todas as rotas do usuário, com exceção de duas, criar usuário e login que estão entre as rotas publicas.

**Usuário:**
+ ***BaseURL***/**usuário**/**buscar**
+ ***BaseURL***/**usuário**/**atualizar**
+ ***BaseURL***/**usuário**/**deletar**
+ ***BaseURL***/**usuário**/**logout**

A rota buscar trará as informações do usuário para sua página de perfil. O usuário pode atualizar nome, número de telefone e senha. E por fim, poderá deletar o próprio perfil.

+ ***BaseURL***/**usuario**/**agendamento**/**buscar**
+ ***BaseURL***/**usuario**/**agendamento**/**atualizar**
+ ***BaseURL***/**usuario**/**agendamento**/**deletar**

Atualizar agendamento também cria um novo agendamento, se este não existir, isso é muito fácil usando o método upsert do prisma. Atualizar agendamento pode adicionar um ou mais serviços.

+ ***BaseURL***/**usuário**/**buscar**
+ ***BaseURL***/**usuário**/**atualizar**
+ ***BaseURL***/**usuário**/**deletar**
+ ***BaseURL***/**usuário**/**logout**

## Veja como ficou a organização pelo insomnia. 

![](https://github.com/Iniciativa-PRO/barber-shop-equipe004/blob/main/assets/img-readme/barbershop.png) 

<hr>

**Por enquanto é isso, vamos terminar o desenvolvimeto do frontend  e descrever aqui como foi feito.**
