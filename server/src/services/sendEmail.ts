import nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';

export interface SendEmail{
  email: string, 
  senha: string, 
  data: string, 
  hora: string, 
  servico: {
    nome: string
  }[]
}

interface SendEmailAuth {
  host: string,
    port: number,
    secure: boolean, 
    auth: {
      user: string, 
      pass: string,
    },
}


export async function sendEmail(data: SendEmail): Promise<void> {

  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass,
    },
  } as SendEmailAuth);

  const info = await transporter.sendMail({

    from: `'"Barber Shop 👻" <${emailConfig.auth.user}>'`,
    to: `"${data.email}"`,
    subject: "Barber Shop | Agendamento Realizado com Sucesso ✔",
    text: "Email Teste.",
    html: `"<p>Este é um e-mail teste que trás os dados de agendamento e login para o seu perfil no site Barber Shop:</p><a href="http://localhost">Página de Login</a><p><strong>senha</strong>: ${data.senha}</p><h3>Agendado</h3><p><strong>Data</strong>: ${data.data}</p><p><strong>Hora</strong>: ${data.hora}</p><p><strong>serviço ou serviços</strong>:</p> ${data.servico.map(s => { return `<p>${s.nome}</p>` })}`

  });

  console.log("Message sent: %s", info.messageId);

}