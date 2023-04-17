import { sendEmail, SendEmail } from "../../services/sendEmail.js";

class Subscriber{
      
      async email(dataEmail: SendEmail){
           return await sendEmail(dataEmail).catch(console.error);
      }
}

export default new Subscriber();

      