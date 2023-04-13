"use strict";
import nodemailer from 'nodemailer';


export async function sendEmail(
  email: string, 
  senha: string, 
  data: string, 
  hora: string, 
  servico: {
    nome: string
  }[]): Promise<void>{

  let transporter = nodemailer.createTransport({
    host: "SMTP.office365.com",
    port: 587,
    secure: false, 
    auth: {
      user: "helenosalgado@hotmail.com", 
      pass: "EuSouLindo",
    },
  });

  let info = await transporter.sendMail({
    from: '"Barber Shop 👻" <helenosalgado@hotmail.com>', // sender address
    to: `"${email}"`,
    subject: "Barber Shop | Agendamento Realizado com Sucesso ✔", // Subject line
    text: "Email Teste.",
    html: `"<p>Este é um e-mail teste que trás os dados de agendamento e login para o seu perfil no site Barber Shop:</p><a href="http://localhost">Página de Login</a><p><strong>senha</strong>: ${senha}</p><h3>Agendado</h3><p><strong>Data</strong>: ${data}</p><p><strong>Hora</strong>: ${hora}</p><p><strong>serviço ou serviços</strong>:</p> ${servico.map(s => {return `<p>${s.nome}</p>`})}`
  });

  console.log("Message sent: %s", info.messageId);

}