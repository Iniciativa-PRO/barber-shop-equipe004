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

    async show(){

        return ServiceRepository.show();

    }

    async update(dataService: Service){

        const service = serviceSchema.parse(dataService);
        return ServiceRepository.update(service);

    }

    async delete(id: number){

        ServiceRepository.delete(id);
        return { message: "Serviço deletado com sucesso."};
    }

    async searchAll(){

        return ServiceRepository.searchAll();
        
    }
}

export default new ServiceService();