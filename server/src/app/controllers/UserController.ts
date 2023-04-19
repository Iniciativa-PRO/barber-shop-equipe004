import { Request, Response } from 'express';
import APIError from '../../errors/APIError';
import UserService from '../../services/UserService';

class UserController {

  public async create(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  public async show(req: Request, res: Response) {
    try { 
      const user = await UserService.show(req.body.id);
      return res.status(200).json(user)

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  public async update(req: Request, res: Response) {
    try {
      const user = await UserService.update(req.body);
      return res.json(user);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

  public async delete(req: Request, res: Response) {
    try {
     const user = await UserService.delete(req.body.id);
     return res.status(200).json(user);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };
  
  // Rota administrativa
  public async usersShow(req: Request, res: Response) {
    try {
      const users = await UserService.showUsers();
      return res.status(200).json(users);

    } catch (err: any) {
      APIError.msg(err, res);
    };
  };

}

export default new UserController();