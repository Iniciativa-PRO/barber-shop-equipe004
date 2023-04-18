import { Request, Response } from 'express';
import APIError from '../../errors/APIError';
import ServiceService from '../../services/ServiceService';

class ServiceController {

  public async create(req: Request, res: Response) {

    try {

      const service = await ServiceService.create(req.body);
      return res.status(201).json(service);

    } catch (err: any) {
      APIError.msg(err, res);
    };
    
  };

  public async show(req: Request, res: Response) {
    try {
      const services = await ServiceService.show(req.body.id);
      return res.status(200).json(services);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  public async update(req: Request, res: Response){

    try {

      const service =  await ServiceService.update(req.body);
      return res.status(200).json(service);

    } catch (err: any) {
      APIError.msg(err, res);
     };
  };

  public async delete(req: Request, res: Response) {
    try {
      const service = await ServiceService.delete(req.body.id);
      return res.status(200).json(service);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  public async servicesShow(req: Request, res: Response) {
    try {
        const services = await ServiceService.searchAll();
        return res.status(200).json(services);
        
    } catch (err: any) {
      APIError.msg(err, res);
    }

  }

};

export default new ServiceController();