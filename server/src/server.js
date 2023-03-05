const express = require('express')
const server = express();
const PORT = 3333


server.use(express.json())
server.use('/', require('./routes/userRoutes'))
server.use('/dashboard', require('./routes/barberRoutes'))


server.listen(PORT, () => {
    console.log("Server started on port 3333!");
})