import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.number().optional(),
  tipo: z.string({
    required_error: 'Tipo do serviço é obrigatório.',
    invalid_type_error: 'Tipo deve ser uma string.'
  }).min(4, {
    message: 'Tipo do serviço deve conter no mínimo 4 caracteres.'
}).max(10, {
    message: 'Tipo do serviço deve conter no máximo 10 caracteres.'
}).transform(tipo => tipo.toLowerCase()),
  nome: z.string({
    required_error: 'Nome do serviço é obrigatório.',
    invalid_type_error: 'Nome deve ser uma string.'
  }).min(4, {
    message: 'Nome do serviço deve conter no mínimo 4 caracteres.'
}).max(26, {
    message: 'Nome do serviço deve conter no máximo 26 caracteres.'
}),
  loja: z.string({
    required_error: 'Nome da loja é obrigatório.'
  }).min(2).max(20),
  preco: z.string({
    required_error: 'Preço é obrigatório.'
  }).min(2).max(2),
  descricao: z.string({
    required_error: 'Descrição é obrigatória.'
  }).min(10, { 
    message: 'Descrição deve ter entre 10 e 100 caracteres.'
  }).max(100),
})

//type Service = z.infer<typeof serviceSchema>;
