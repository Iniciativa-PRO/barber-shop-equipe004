import { response } from "express";
import prisma from "../../lib/prisma";
import { Service } from "../../services/ServiceService";

class ServiceRepository{

    async create({ tipo, nome, loja, preco, descricao}: Service){
        const response = await prisma.service.create({ 
            data: {
                tipo,
                nome,
                loja,
                preco,
                descricao
            },
            select:{
                tipo: true,
                nome: true,
                loja: true,
                preco: true,
                descricao: true,
            }
        });

        return response;
    }

    async show(id: number){

        const response = await prisma.service.findMany({
            where: { id },
            select: {
              id: true,
              tipo: true,
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          });

          return response;
    }

    async update({ id, tipo, nome, loja, preco, descricao }: Service){

      const response = await prisma.service.update({
          where: { id },
          data: {
            tipo,
            nome,
            loja,
            preco,
            descricao
          },
          select: {
            id: true,
            tipo: true,
            nome: true,
            loja: true,
            preco: true,
            descricao: true
          },
      });

      return response;
    }

    async delete(id: number){
       await prisma.service.delete({
          where: { id }
       })

       return;
    }

    async searchAll(){

        const response = await prisma.service.findMany({
            select: {
              id: true,
              tipo: true,
              nome: true,
              loja: true,
              preco: true,
              descricao: true
            },
          });

          return response;
    }
}

export default new ServiceRepository();