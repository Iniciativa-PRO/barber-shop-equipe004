import prisma from '../database/prisma';
import { Request, Response } from 'express';
import { z } from 'zod';
import { userUpdateSchema } from '../helpers/user/valideUserUpdate';
import { userSchema } from '../helpers/user/valideUser';
import { generateId, generateSenha } from '../helpers/user/processDataUser';

class UserController {

  static async create(req: Request, res: Response) {

    try {

      const { nome, email, telefone, senha } = userSchema.parse(req.body);

      const senhahash = generateSenha(senha);
      const id = generateId();

      const userExist = await prisma.user.findUnique({
        where: { email },
      });

      if (userExist)
        return res.json({ message: 'Usuário já existe.' });

      const user = await prisma.user.create({
        data: {
          id,
          nome,
          email,
          telefone: telefone.toString(),
          senha: senhahash,
        },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true
        },
      });
      return res.json(user);

    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.errors.map(({ message, path }) => ({
            message,
            field: path.join("."),
          })),
        });
      };
      res.status(400).json({ err: err.message });
    };
  };

  static async show(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.body.id },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          agendamento: {
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
            },
          },
        },
      });
      return res.status(200).json(user)

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  static async update(req: Request, res: Response) {

    try {
      
      const { id, nome, telefone, senha } = userUpdateSchema.parse(req.body);

      const senhahash = generateSenha(senha);

      const user = await prisma.user.update({
        where: { id },
        data: {
          nome,
          telefone: telefone.toString(),
          senha: senhahash
        },
        select: {
          nome: true,
          email: true,
          telefone: true
        },
      });
      return res.json(user);

    } catch (err: any) {
      res.status(400).json({ err: err.message });
    };
  };

  static async delete(req: Request, res: Response) {
    try {
      await prisma.user.delete({
        where: { id: req.body.id },
      });
      return res.json({
        message: 'Usuário deletado com sucesso.'
      });

    } catch (err) {
      res.status(400).json({ err });
    };
  };
}

export = UserController;