import "dotenv/config";

export default {
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL as unknown as number,
    secure: process.env.SECURE_EMAIL as unknown as boolean, 
    auth: {
      user: process.env.FROM_EMAIL, 
      pass: process.env.PASS_EMAIL,
    },
};