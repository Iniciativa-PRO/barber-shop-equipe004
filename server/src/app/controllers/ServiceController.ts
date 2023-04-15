import prisma  from './../../lib/prisma';
import { Request, Response } from 'express';
import { serviceSchema } from './../../helpers/service/valideService';
import APIError from '../../errors/APIError';

class ServiceController {

  public async create(req: Request, res: Response) {

    try {

      const service = serviceSchema.parse(req.body);
      
      const createService = await prisma.service.create({ 
        data: service,
      });
      return res.status(201).json(createService);

    } catch (err: any) {
      APIError.msg(err, res);
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
      APIError.msg(err, res);
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

    } catch (err: any) {
      APIError.msg(err, res);
     };
  };

  public async delete(req: Request, res: Response) {
    try {
      await prisma.service.delete({
        where: { id: req.body.id }
      })
      return res.status(200).json({ message: 'Serviço deletado com sucesso.'});

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  public async servicesShow(req: Request, res: Response) {
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
      APIError.msg(err, res);
    }

  }

};

export default new ServiceController();