import { optional, string, z } from 'zod';

export const userUpdateSchema = z.object({
  id: z.string({
    required_error: 'id é obrigatório',
    invalid_type_error: 'id deve ser do tipo string'
  }),
  nome: z.string({
    required_error: 'Nome é obrigatório.',
    invalid_type_error: 'Não é um nome válido.'
  }).min(2).max(26),
  telefone: z.number({
    required_error: 'Telefone é obrigatório.',
    invalid_type_error: 'Não é do tipo numérico.'
  }),
  senha: z.any(optional(string())),
})

type UserUpdate = z.input<typeof userUpdateSchema>;