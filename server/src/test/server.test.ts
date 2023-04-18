const PORT = process.env.PORT;
import { App } from "../app"

var app;

if (require.main === module) {

   app = new App().server.listen(PORT, () => { 
       console.log('Server Running in port: ' + PORT); 
   });
};

export { app };