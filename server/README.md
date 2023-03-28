## Servidor da aplicação Barber Shop | em TypeScript

Esse projeto surgiu como uma oportunidade de aprender TypeScript migrando o código JavaScript [deste projeto](https://github.com/Iniciativa-PRO/barber-shop-equipe004) para TypeScript. Em breve este se tornará o código padrão.

## Executar

Para clonar e executar este projeto, você precisará do [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) e [npm](https://npmjs.com)) instalados em seu computador. Na sua linha de comando:

```bash
# Clone este Repositório
$ git clone https://github.com/HelenoSalgado/Barber-Shop-Server.git

# Entre no Repositório
$ cd Barber-Shop-Server/

# Instale as depêndencias
$ npm install

# Compile
$ npm run build

# Execute
$ npm run start
```

## Rotas

Aqui estão os modelos de requisição:
[REQUEST](./REQUEST.md);


### Publicas:

+ ***BaseURL***/**api**/**v1**/**servicos**
+ ***BaseURL***/**api**/**v1**/**agendamento**/**criar**
+ ***BaseURL***/**api**/**v1**/**criar-conta**
+ ***BaseURL***/**api**/**v1**/**entrar**

### Privadas:

+ ***BaseURL***/**api**/**v1**/**dashboard**/**agendamento**/**buscar**
+ ***BaseURL***/**api**/**v1**/**dashboard**/**servico**/**buscar**
+ ***BaseURL***/**api**/**v1**/**dashboard**/**servico**/**criar**
+ ***BaseURL***/**api**/**v1**/**dashboard**/**servico**/**atualizar**
+ ***BaseURL***/**api**/**v1**/**dashboard**/**servico**/**deletar**

**Usuário:**

+ ***BaseURL***/**api**/**v1**/**usuário**/**buscar**
+ ***BaseURL***/**api**/**v1**/**usuário**/**atualizar**
+ ***BaseURL***/**api**/**v1**/**usuário**/**deletar**
+ ***BaseURL***/**api**/**v1**/**usuário**/**logout**

+ ***BaseURL***/**api**/**v1**/**usuario**/**agendamento**/**buscar**
+ ***BaseURL***/**api**/**v1**/**usuario**/**agendamento**/**atualizar**
+ ***BaseURL***/**api**/**v1**/**usuario**/**agendamento**/**deletar**

+ ***BaseURL***/**api**/**v1**/**usuário**/**buscar**
+ ***BaseURL***/**api**/**v1**/**usuário**/**atualizar**
+ ***BaseURL***/**api**/**v1**/**usuário**/**deletar**
+ ***BaseURL***/**api**/**v1**/**usuário**/**logout**
