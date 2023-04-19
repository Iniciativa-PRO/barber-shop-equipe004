import { sendEmail, SendEmail } from "../../services/sendEmail";

class Subscriber{
      
      async email(dataEmail: SendEmail){
           return await sendEmail(dataEmail).catch(console.error);
      }
}

export default new Subscriber();

      