import { schedulingSchema } from "../helpers/scheduling/valideScheduling";
import verifyIdService from "../helpers/service/verifyIdService";
import { generateId, generateSenha } from "../helpers/user/processDataUser";
import prisma from "../lib/prisma";
import SchedulingRepository from "../database/repositories/SchedulingRepository";
import { schedulingUpdateSchema } from "../helpers/scheduling/valideUpdateScheduling";
import { searchSchema } from "../helpers/scheduling/searchSchema";

export interface Scheduling {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  data: string;
  hora: string;
  id_servico: number[]; 
}

export interface SchedulingUpdate{
  id: string;
  data: string; 
  hora: string; 
  id_servico: number[];
}

class SchedulingService{
    
    async create(dataScheduling: Scheduling){

      const scheduling: Scheduling = schedulingSchema.parse(dataScheduling);

      const userExist = await prisma.user.findUnique({
        where: { email: scheduling.email },
      });

      if (userExist)
        return { message: 'Usuário já existe.' };

      scheduling.senha = generateSenha(scheduling.senha);
      scheduling.id = generateId();
      const idService = verifyIdService(scheduling.id_servico);
      
      return SchedulingRepository.create(scheduling, idService);

    }

    async show(id: string){
      
      const scheduling =  SchedulingRepository.show(id);
      if (!scheduling) 
         return { message: 'Sem agendamento'};

      return scheduling;

    }

    async update(dataScheduling: SchedulingUpdate){

      const scheduling = schedulingUpdateSchema.parse(dataScheduling);
      const idService = verifyIdService(scheduling.id_servico);

      return SchedulingRepository.update(scheduling, idService);

    }

    async delete(id: string){

      SchedulingRepository.delete(id);
      return { message: 'Agendamento deletado com sucesso.' };

    }

    async schedulingsShow(){

      return SchedulingRepository.schedulingsShow();

    }

    async search(key: string){

      const data = searchSchema.parse(key);

      const search = SchedulingRepository.search(data);
    
      if ((await search).length == 0)
         return { message: 'Nenhum agendamento encontrado.' };

      return search;

    }
}

export default new SchedulingService();