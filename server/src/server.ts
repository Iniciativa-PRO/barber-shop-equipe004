import dotenv from 'dotenv';
const PORT = process.env.PORT;

import { App } from "./app"

new App().server.listen(PORT, () => { 
    console.log('Server Running in port: ' + PORT); 
});