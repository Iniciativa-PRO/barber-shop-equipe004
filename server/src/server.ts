import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const server = express();
dotenv.config();
const PORT = process.env.PORT;

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
server.use(cors(corsOptions));
server.use(express.json());
server.use('/api/v1/', require('./routes/barberPublicRoutes'));
server.use('/api/v1/dashboard', require('./routes/barberAdminRoutes'));
server.use('/api/v1/usuario', require('./routes/userRoutes'))

server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})