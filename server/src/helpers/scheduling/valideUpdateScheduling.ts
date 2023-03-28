import { z } from 'zod';

export const schedulingUpdateSchema = z.object({
  id: z.string({
    required_error: 'Id é obrigatório.'
  }),
  data: z.string({
    required_error: 'Data é obrigatória.'
  }).min(7, {
    message: 'Data incompleta.'
  }),
  hora: z.string({
    required_error: 'Hora é obrigatória.'
  }).min(4, {
    message: 'Hora deve ter no mínimo 4 caracteres.'
  }),
  id_servico: z.number({
    required_error: 'O valor de id_serviço deve ser um array com pelo menos um serviço.',
    invalid_type_error: 'O id do serviço deve ser um número dentro de um array.'
  }).array().nonempty({
    message: 'É necessário pelo menos um serviço para o agendamento.',
  })
})

type Scheduling = z.infer<typeof schedulingUpdateSchema>;