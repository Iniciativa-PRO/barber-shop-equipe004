export interface SendEmail{
    email: string, 
    senha: string, 
    data: string, 
    hora: string, 
    servico: {
      nome: string
    }[]
  }

export interface SendEmailAuth {
    host: string,
      port: number,
      secure: boolean, 
      auth: {
        user: string, 
        pass: string,
      },
  }