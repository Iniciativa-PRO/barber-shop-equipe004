import { msg } from "../constants";
import ServiceRepository from "../database/repositories/ServiceRepository";
import { serviceSchema } from "../helpers/service/valideService";

export interface Service{
   id?: number;
   tipo: string;
   nome: string;
   loja: string;
   preco: string;
   descricao: string;
}

class ServiceService{

    async create(dataService: Service){

        const service = serviceSchema.parse(dataService);
        return ServiceRepository.create(service);
    }

    async show(id: number){

        const service = await ServiceRepository.show(id);

        if(!service)
           return { message: msg.notService };

        return service;

    }

    async update(dataService: Service){

        const service = serviceSchema.parse(dataService);
        return ServiceRepository.update(service);

    }

    async delete(id: number){

        ServiceRepository.delete(id);
        return { message: msg.sucessDeleteService };
    }

    async searchAll(){

        return ServiceRepository.searchAll();
        
    }
}

export default new ServiceService();