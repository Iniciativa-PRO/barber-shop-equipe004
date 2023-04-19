const PORT = process.env.PORT;
import { App } from "../app"

let appTest: any;

// True por enquanto até eu encontrar o erro;

if (true) {

   appTest = new App().server.listen(PORT, () => { 
       console.log('Server Running in port: ' + PORT); 
   });
};

export default appTest;
