import prisma from "../../lib/prisma";
import { Scheduling, SchedulingUpdate } from "../../services/SchedulingService";

class SchedulingRepository{

    async create({ 
      id, data, hora, nome, email, telefone, senha
    }: Scheduling, idService: {id: number}[]){

        const response = await prisma.scheduling.create({
            data: {
             id,
             data,
             hora,
             servico: {
               connect: idService, 
             },
             usuario: {
               create: {
                 id,
                 nome,
                 email,
                 telefone,
                 senha
               }
             },
            },
            include: {
             servico: {
               select: {
                 tipo: true,
                 nome: true,
                 loja: true,
                 preco: true,
                 descricao: true
               },
             },
             usuario: {
               select: {
                 id: true,
                 nome: true,
                 telefone: true,
                 email: true,
               },
             },
            },
         });

         return response;
    }

    async show(id: string){
      const response = await prisma.scheduling.findUnique({
        where: { usuarioId: id },
        select: {
          data: true,
          hora: true,
          servico: {
            select: {
              id: true,
              tipo: true,
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          },
        },
      });

      return response;
    }

    async update({ 
      id, data, hora 
    }: SchedulingUpdate, idService: {id: number}[]){

      const response = await prisma.scheduling.upsert({
        where: { usuarioId: id },
        create: {
          id,
          data,
          hora,
          servico: {
            connect: idService,
          },
          usuario: {
            connect: {
              id,
            },
          },
        },
        update: {
          data,
          hora,
          servico: {
            set: [],
            connect: idService,
          },
        },
       });

       return response;
    }

    async delete(id: string){
      return await prisma.scheduling.delete({
        where: { id }
      });
    }

    async schedulingsShow(){
      const response = await prisma.scheduling.findMany({
        select: {
          data: true,
          hora: true,
          servico: {
            select: {
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          },
          usuario: {
            select: {
              nome: true,
              telefone: true
            },
          },
        },
    });

    return response;
    }

    async search(key: string){
      const response = await prisma.scheduling.findMany({
        where: {
          data: {
            equals: key,
          },
        },
        include: {
          servico: {
            select: {
              nome: true,
              preco: true,
            },
          },
          usuario: {
            select: {
              nome: true,
              telefone: true,
            },
          },
        },
      });

      return response;
    }
}

export default new SchedulingRepository();