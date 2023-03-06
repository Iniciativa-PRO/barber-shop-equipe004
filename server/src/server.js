const express = require('express');
const tokenAdmin = require('./middlewares/tokenAdmin');
const server = express();
const PORT = 3333


server.use(express.json())
server.use('/dashboard', tokenAdmin, require('./routes/barberRoutes'))
server.use('/', require('./routes/userRoutes'))

server.listen(PORT, () => {
    console.log("Server started on port 3333!");
})