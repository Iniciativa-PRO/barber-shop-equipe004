import { schedulingSchema } from "../helpers/scheduling/valideScheduling";
import verifyIdService from "../helpers/service/verifyIdService";
import { generateId, generateSenha } from "../helpers/user/processDataUser";
import prisma from "../lib/prisma";
import SchedulingRepository from "../database/repositories/SchedulingRepository";
import { schedulingUpdateSchema } from "../helpers/scheduling/valideUpdateScheduling";
import { searchSchema } from "../helpers/scheduling/searchSchema";
import subscribers from "../database/subscribers";
import { msg } from "../constants";


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

//export type SendEmail = Omit<Scheduling, "id" | "telefone">;

class SchedulingService{
    
    async create(dataScheduling: Scheduling){

      const scheduling: Scheduling = schedulingSchema.parse(dataScheduling);

      const userExist = await prisma.user.findUnique({
        where: { email: scheduling.email },
      });

      if (userExist)
        return { message: msg.userExist };

      scheduling.senha = generateSenha(scheduling.senha);
      scheduling.id = generateId();
      const idService = verifyIdService(scheduling.id_servico);

      const createScheduling =  await SchedulingRepository.create(scheduling, idService);

      const dataEmail = {
        email: dataScheduling.email,
        senha: dataScheduling.senha,
        data: dataScheduling.data,
        hora: dataScheduling.hora,
        servico: createScheduling.servico
      }

      subscribers.email(dataEmail);

      return createScheduling;

    }

    async show(id: string){
      
      const scheduling =  SchedulingRepository.show(id);
      if (!scheduling) 
         return { message: msg.notScheduling };

      return scheduling;

    }

    async update(dataScheduling: SchedulingUpdate){

      const scheduling = schedulingUpdateSchema.parse(dataScheduling);
      const idService = verifyIdService(scheduling.id_servico);

      return SchedulingRepository.update(scheduling, idService);

    }

    async delete(id: string){

      SchedulingRepository.delete(id);
      return { message: msg.sucessDeleteScheduling };

    }

    async schedulingsShow(){

      return SchedulingRepository.schedulingsShow();

    }

    async search(key: string){

      const data = searchSchema.parse(key);

      const search = SchedulingRepository.search(data);
    
      if ((await search).length == 0)
         return { message: msg.notScheduling };

      return search;

    }

    async sendEmail(){
      
    }
}

export default new SchedulingService();