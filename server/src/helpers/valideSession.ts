import { z } from 'zod';

export const userSessionSchema = z.object({
  email: z.string({
    required_error: 'Email é obrigatório.',
  }).email({
    message: 'Não é um email válido.'
  }),
  senha: z.string({
    required_error: 'Senha é obrigatória.',
  })
})

type UserLogin = z.input<typeof userSessionSchema>;