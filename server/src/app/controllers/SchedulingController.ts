import { Request, Response } from 'express';
import APIError from '../../errors/APIError';
import SchedulingService from '../../services/SchedulingService';

class SchedulingController {

  public async create(req: Request, res: Response) {
    try {
      const scheduling = await SchedulingService.create(req.body);
      return res.status(201).json(scheduling);
  
    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  public async show(req: Request, res: Response) {
    try {  
      const schedulings = await SchedulingService.show(req.body.id);
      return res.status(200).json(schedulings);

    } catch (err: any) {
      res.status(400).json({err: err.message});
    };
  };

  public async update(req: Request, res: Response) {
    try {
     const schedulingUpdate = await SchedulingService.update(req.body);
     return res.status(200).json(schedulingUpdate);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };
 
  public async delete(req: Request, res: Response) {
    try { 
      const schedulingDelete = await SchedulingService.delete(req.body.id);
      return res.status(200).json(schedulingDelete);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  // Rotas administrativas
  public async schedulingsShow(req: Request, res: Response) {
    try {
      const schedulings = await SchedulingService.schedulingsShow(); 
      return res.status(200).json(schedulings);

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  public async schedulingsSearch(req: Request, res: Response) {
    try {
      const search = await SchedulingService.search(req.body.key);
      return res.status(200).json(search);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

};

export default new SchedulingController();