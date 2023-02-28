const express = require('express')
const server = express();
const PORT = 3333
const db = require('./db/connect')
const dotenv = require('dotenv/config'); 
const routes = require('./routes/usuariosRoutes');

server.use(express.json())
server.use(routes)


db.sync(() => console.log('Conectado ao Banco.'))

server.listen(PORT, () => console.log("Server started on port 3333!"));