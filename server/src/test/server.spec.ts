const PORT = 3001;
import { App } from "../app"

let appTest: any;

if (require.main === module) {
   appTest = new App().server.listen(PORT, () => { 
       console.log('Server Running in port: ' + PORT); 
   });
};

export default appTest;
