import prisma  from './../../lib/prisma';
import { Request, Response } from 'express';
import { serviceSchema } from './../..//helpers/service/valideService';
import { z } from 'zod';

class ServiceController {

  public async create(req: Request, res: Response) {

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

  public async show(req: Request, res: Response) {
    try {
      const services = await prisma.service.findMany({
        select: {
          id: true,
          tipo: true,
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

  public async update(req: Request, res: Response){

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

  public async delete(req: Request, res: Response) {
    try {
      await prisma.service.delete({
        where: { id: req.body.id }
      })
      return res.status(200).json({ message: 'Serviço deletado com sucesso.'});

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  public async servicesShow(req: Request, res: Response) {
    try {
        const services = prisma.service.findMany({
          select: {
            id: true,
            tipo: true,
            nome: true,
            loja: true,
            preco: true,
            descricao: true
          },
        });
        return res.status(200).json(services);
        
    } catch (err) {
        return res.status(400).json({ err });
    }

  }

};

export default new ServiceController();