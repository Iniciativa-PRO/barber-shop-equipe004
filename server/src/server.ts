import express from 'express';
import dotenv from 'dotenv';
const server = express();
dotenv.config();
const PORT = process.env.PORT;

console.log(PORT);

server.use(express.json());
server.use('/api/v1/', require('./routes/barberPublicRoutes'));
server.use('/api/v1/dashboard', require('./routes/barberAdminRoutes'));
server.use('/api/v1/usuario', require('./routes/userRoutes'))

server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})