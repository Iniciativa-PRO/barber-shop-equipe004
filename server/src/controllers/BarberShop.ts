import prisma  from '../database/prisma';
import { Request, Response } from 'express';
import { serviceSchema } from '../helpers/service/valideService';
import { z } from 'zod';

class BarberShopController {

  static async schedulingsShow(req: Request, res: Response) {
    
    try {
      const scheduling = await prisma.scheduling.findMany({
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
    return res.status(200).json(scheduling);

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  static async schedulingsSearch(req: Request, res: Response) {

    try {

      const schema = z.string({ 
        invalid_type_error: 'Deve ser uma string.' 
      }).min(8, { message: 'A data deve ter os 8 caracteres.'});

      const data = schema.parse(req.body);
    
      const schedulingSearch = await prisma.scheduling.findMany({
        where: {
          data: {
            equals: data,
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
      if (schedulingSearch.length == 0)
         return res.status(400).json({ message: 'Nenhum agendamento encontrado.' });

      return res.status(200).json(schedulingSearch);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join("."),
          })),
        });
      }
      return res.status(500).json({
        message: "Internal server error",
      });
    };
  };

  static async usersShow(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          nome: true,
          email: true,
          telefone: true
        },
      });
      return res.status(200).json(users);

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  static async serviceCreate(req: Request, res: Response) {

    try {

      const service = serviceSchema.parse(req.body);
      
      const createService = await prisma.service.create({ 
        data: service,
      });
      return res.status(200).json(createService);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join("."),
          })),
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    };
    
  };

  static async servicesShow(req: Request, res: Response) {
    try {
      const services = await prisma.service.findMany({
        select: {
          id: true,
          nome: true,
          loja: true,
          preco: true,
          descricao: true
        },
      });
      return res.status(200).json(services);

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  static async serviceUpdate(req: Request, res: Response){

    try {

      const service =  serviceSchema.parse(req.body);

      const updateService = await prisma.service.update({
         where: { id: req.body.id },
         data: service,
      });
      return res.status(200).json(updateService);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join("."),
          })),
        });
      }
      return res.status(400).json({ err });
    };
  };

  static async servicesDelete(req: Request, res: Response) {
    try {
      await prisma.service.delete({
        where: { id: req.body.id }
      })
      return res.status(200).json({ message: 'Serviço deletado com sucesso.'});

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };
};

export = BarberShopController;